import { hash as ohash } from 'ohash';
import {
  DOCS_RENDERED,
  STORY_CHANGED,
  STORY_INDEX_INVALIDATED,
  STORY_RENDERED,
} from 'storybook/internal/core-events';
import { addons } from 'storybook/internal/manager-api';

import { defaultAddonState, hashOptions } from '@/config';
import {
  ADDON_ID,
  BADGE,
  DEFAULT_STORYBOOK_ID,
  DOCS_URL,
  EVENTS,
  LEGACY_NOTIFICATION_ID,
  LOCAL_STORAGE_KEY,
  PARAM_BADGES_KEY,
  PARAM_CONFIG_KEY,
  PARAM_STORYBOOK_ID,
} from '@/constants';
import {
  getBadgePartsInternal,
  getFullBadgeConfig,
  getFullConfig,
  getMatcherBadge,
  logger,
  matchBadge,
  shouldDisplayBadge,
} from '@/utils';

import { A11y } from './A11y';
import { Testing } from './Testing';

import type {
  A11yState,
  A11yStatus,
  AddonState,
  BadgeDefinition,
  BadgeLocation,
  BadgeMap,
  BadgesConfig,
  EntryType,
  FullConfig,
  IndexerResult,
  InternalIndex,
  StateType,
  StoryState,
} from '@/types';
import type { API, HashEntry } from 'storybook/internal/manager-api';
import type { Addon_Config, IndexEntry, PreparedStory, Renderer } from 'storybook/internal/types';

class BadgesAddon {
  //===================================
  //== Private Properties
  //===================================
  /** The a11y addon interface instance. */
  #a11yAddon: A11y;
  /** The ID currently active story. */
  #activeStoryId: string | null = null;
  /** The addon event emitter channel. */
  #addonChannel: ReturnType<(typeof addons)['getChannel']>;
  /** The value of `addons.getConfig()` to access default/user values. */
  #addonsConfig: Addon_Config;
  /** The Storybook Manager API. */
  #api: API;
  /** The standard configuration for the addon. */
  #baseConfig: FullConfig;
  /** The latest parsed state of the stories. */
  #currentState: AddonState;
  /**
   * Whether we've already received an indexing request this render-cycle.
   * Used to prevent multiple indexing running in Docs mode.
   */
  #hasHadIndexRequest: boolean = false;
  /** Whether indexing has been completed this render-cycle. */
  #hasIndexed: boolean = false;
  /** Whether the current story is a docs page. */
  #isDocsPage: boolean;
  /**
   * The ID of the last story decorator to have a successful request. Used
   * to re-emit on index invalidation, without sending to all active decorators.
   */
  #lastRequestId: string | null = null;
  /** Stores the computed values from the latest index. */
  #latestIndex: InternalIndex[] = [];
  /** Whether the legacy warning is being displayed. */
  #legacyWarningVisible: boolean = false;
  /** If running in tests/mocks, prevent certain functionality that cannot currently be mocked. */
  #mocked: boolean;
  /** Store of stories that need their state syncing. */
  #saveQueue: string[] = [];
  /** ID for referencing this storybook instance. */
  #storybookId: string;
  /** The testing addon interface instance. */
  #testingAddon: Testing;

  //===================================
  //== Constructor
  //===================================
  public constructor(api: API, mocked?: boolean) {
    this.#mocked = mocked ?? false;
    this.#addonChannel = addons.getChannel();
    this.#addonsConfig = addons.getConfig();
    this.#api = api;
    this.#storybookId = this.#assignStorybookId();
    this.#isDocsPage = mocked ? false : this.#api.getUrlState().viewMode === 'docs';
    this.#currentState = { ...this.#savedState };
    this.#a11yAddon = new A11y(api, this);
    this.#testingAddon = new Testing(api, this);
    this.#baseConfig = this.addonConfig;
    this.#registerEventHandlers();
  }

  //===================================
  //== Public Getters/Setters
  //===================================
  /** Retrieves the current state of the a11y addon. */
  public get a11yActive(): boolean {
    return this.#a11yAddon.active;
  }

  /** Sets the current state of the a11y addon and processes the queue. */
  public set a11yActive(active: boolean) {
    this.#a11yAddon.active = active;
  }

  /** Retrieves the current state of the test addon. */
  public get testActive(): boolean {
    return this.#testingAddon.active;
  }

  /** Sets the current state of the test addon. */
  public set testActive(active: boolean) {
    this.#testingAddon.active = active;
  }

  /** Get the fully resolved config for the addon. */
  public get addonConfig(): FullConfig {
    const legacyConfig = this.#api.getCurrentParameter<BadgesConfig | BadgeMap | undefined>(
      PARAM_CONFIG_KEY,
    );
    const legacyBadges =
      this.#api.getCurrentParameter<string[] | undefined>(PARAM_BADGES_KEY) ?? [];

    const addonConfig = this.#addonsConfig[PARAM_CONFIG_KEY] ?? {};
    const fullConfig = legacyConfig
      ? getFullConfig(legacyConfig, addonConfig)
      : (this.#baseConfig ?? getFullConfig(addonConfig));

    if (legacyConfig || legacyBadges.length > 0) {
      this.#showLegacyConfigWarning(fullConfig);
    }

    return fullConfig;
  }

  //===================================
  //== Public Methods
  //===================================
  /**
   * Adds an a11y state to the saved data for a story.
   * @param storyId The ID of the story to add the a11y state to.
   * @param state The {@link A11yState} to add to the story.
   */
  public addA11yState(storyId: string, state: A11yState): void {
    if (!this.a11yActive || !this.#autobadges) return;

    const existingData = this.#savedState.storyStates;
    const savedStoryData = existingData.find(story => story.id === storyId);
    if (!savedStoryData) {
      logger.warn('Could not find saved data for', storyId);
      return;
    }

    // Only update if changes to prevent updating localStorage unnecessarily
    if (JSON.stringify(state) !== JSON.stringify(savedStoryData.a11y)) {
      savedStoryData.a11y = state;
      this.#savedState = { storyStates: existingData };
    }
  }

  /**
   * Retrieves the badges to display for a given entry and UI location.
   * @param entry The {@link HashEntry} to get badges for.
   * @param location The location to generate badges for.
   * @returns An array of {@link BadgeDefinition}s for the given entry/location.
   */
  public getBadgesForStory(
    entry: HashEntry | undefined,
    location: BadgeLocation,
  ): BadgeDefinition[] {
    if (!entry) return [];

    if (entry.type === 'component') {
      const componentBadges: BadgeDefinition[] = [];
      const stories = entry.children;
      for (const story of stories) {
        const indexEntry = this.#latestIndex.find(index => index.id === story);
        componentBadges.push(
          ...this.getBadgesForStory(indexEntry as unknown as HashEntry | undefined, location),
        );
      }

      return componentBadges.reduce<BadgeDefinition[]>((acc, current) => {
        if (acc.every(({ badgeId }) => badgeId !== current.badgeId)) {
          acc.push(current);
        }
        return acc;
      }, []);
    }

    const globalBadges = this.#addonsConfig[PARAM_BADGES_KEY] ?? [];
    const storyData = this.#api.getData(entry.id) ?? entry;

    const autobadges = this.#getAutoBadges(storyData);
    const parameterBadges = this.#api.getCurrentParameter<string[]>(PARAM_BADGES_KEY) ?? [];
    const storyTags = this.#getTags(storyData);
    const { type } = storyData;

    const filteredBadges = this.#filterBadges(
      [...globalBadges, ...autobadges, ...parameterBadges, ...storyTags],
      location,
      type,
    );

    return filteredBadges;
  }

  /**
   * Gets the internal index value for a story.
   * @param storyId The ID of the story to fetch.
   * @returns The internal index that has been stored for a story.
   */
  public getIndexForStory(storyId: string): InternalIndex | undefined {
    return this.#latestIndex.find(story => story.id === storyId);
  }

  //===================================
  //== Private Getters/Setters
  //===================================
  /** Whether autobadges are active. Dictates whether additional functionality is active. */
  get #autobadges(): boolean {
    const config = this.addonConfig;
    if (
      config.autobadges === false ||
      (Array.isArray(config.autobadges) && config.autobadges.length === 0)
    ) {
      return false;
    }

    return true;
  }

  /** The state for the current storybook instance from localStorage. */
  get #savedState(): AddonState {
    if (typeof localStorage === 'undefined') {
      logger.warn("Unable to fetch localStorage as it's undefined");
      return defaultAddonState;
    }

    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storage) {
      try {
        const parsed = JSON.parse(storage);
        const current = parsed[this.#storybookId];
        if (current) {
          return current;
        } else {
          logger.info('No state found - initializing');
        }
      } catch (err) {
        logger.error(err);
      }
    }

    return defaultAddonState;
  }

  /** The state for the current storybook instance from localStorage. */
  set #savedState(newState: Partial<AddonState>) {
    if (!this.#autobadges) return;

    if (typeof localStorage === 'undefined') {
      logger.warn("Unable to set localStorage as it's undefined");
      return;
    }

    const existingData = { ...this.#savedState };
    const updatedStates: StoryState[] = [...existingData.storyStates];

    if (
      newState.legacyWarningShown != null &&
      newState.legacyWarningShown !== existingData.legacyWarningShown
    ) {
      existingData.legacyWarningShown = newState.legacyWarningShown;
    }

    for (const storyState of newState.storyStates ?? []) {
      const exists = updatedStates.findIndex(story => story.id === storyState.id);
      if (exists > -1) {
        updatedStates.splice(exists, 1, storyState);
      } else {
        updatedStates.push(storyState);
      }
    }
    existingData.storyStates = updatedStates
      .filter(story => this.#getStateForEntry(story.id, 'current') != null)
      .sort((a, b) => a.id.localeCompare(b.id));

    try {
      const fullStored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}');
      const fullState = { ...fullStored, [this.#storybookId]: existingData };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fullState));
    } catch (err) {
      logger.error(err);
    }
  }

  //===================================
  //== Private Methods
  //===================================

  /**
   * Obtains a Storybook ID from the config, or assigns a default. Allows for
   * multiple storybooks on the same URL during development.
   * @returns The ID to use to store the data against.
   */
  #assignStorybookId(): string {
    const configId = this.#addonsConfig[PARAM_STORYBOOK_ID];
    if (typeof configId === 'string' && configId.trim()) {
      return configId;
    }
    return DEFAULT_STORYBOOK_ID;
  }

  /**
   * Checks whether an `entry` has a given `state` for a11y checks.
   * @param state The state to check for.
   * @param entry The {@link HashEntry} to check.
   * @returns A boolean indicating whether the `entry` meets the criteria.
   */
  #checkA11yState(entry: HashEntry): A11yStatus {
    const entryState = this.#getStateForEntry(entry, 'saved');

    return (entryState?.a11y?.violations ?? 0) > 0
      ? 'fail'
      : (entryState?.a11y?.incomplete ?? 0) > 0
        ? 'incomplete'
        : (entryState?.a11y?.passes ?? 0) > 0
          ? 'pass'
          : null;
  }

  /**
   * Checks whether an `entry` has a given `state` for tests.
   * @param state The state to check for.
   * @param entry The {@link HashEntry} to check.
   * @returns A boolean indicating whether the `entry` meets the criteria.
   */
  #checkTestState(state: 'fail' | 'pass' | 'todo', entry: HashEntry): boolean {
    const entryState = this.#getStateForEntry(entry, 'saved');

    switch (state) {
      case 'fail':
        return (entryState?.test?.failures ?? 0) > 0;
      case 'pass':
        return (entryState?.test?.passes ?? 0) > 0;
      case 'todo':
        return (entryState?.test?.skipped ?? 0) > 0;
      // No  default -- exhaustive
    }
  }

  /**
   * Takes all badges that may be on an entry and filters/sorts them by:
   * - Removing any 'negated' badges (prefixed with !)
   * - Filtering based on whether the badge should be displayed in the location
   * - Removing duplicates
   * - Sorting by priority
   * @param badges The original badges to filter.
   * @param location The location to return badges for.
   * @param type The type of entry.
   * @returns An array of filtered and sorted {@link BadgeDefinition}s for the given
   * entry/location.
   */
  #filterBadges(badges: string[], location: BadgeLocation, type: EntryType): BadgeDefinition[] {
    const addonConfig = this.addonConfig;
    const { delimiter, locations, matchers, useBadgeFallback } = addonConfig;

    return badges
      .filter((badge, idx, arr) => {
        const shouldDisable = arr.findIndex(
          negate => negate.startsWith('!') && negate.slice(1) === badge,
        );
        return !(shouldDisable > -1 && shouldDisable > idx);
      })
      .map(badge => {
        // Run any matchers first
        for (const matcher of matchers) {
          const matched = matchBadge(badge, matcher, delimiter);
          if (matched) {
            const { badgeId: parsedId } = getBadgePartsInternal(
              badge,
              matcher.delimiter ?? delimiter,
            );
            const { displayContentOnly: displayContentOverride } = matcher;
            const { badgeId, config } = getMatcherBadge(matcher, addonConfig, parsedId);

            return {
              badgeId,
              config: {
                ...config,
                ...(displayContentOverride != null
                  ? { displayContentOnly: displayContentOverride }
                  : {}),
                ...(matcher.delimiter != null ? { delimiter: matcher.delimiter } : {}),
              },
              content: badge,
              // (displayContentOverride ?? config.displayContentOnly ?? displayContentOnly)
              //   ? content || badgeId
              //   : badge,
            };
          }
        }

        // If we get here with no return, either there are no matchers, or none
        // match the found badge ID - check if we should continue searching
        if (matchers.length > 0 && !useBadgeFallback) {
          return null;
        }

        const { badgeId } = getBadgePartsInternal(badge, delimiter);
        const config = getFullBadgeConfig(badgeId, addonConfig);
        return {
          badgeId,
          config,
          content: badge,
          //(config.displayContentOnly ?? displayContentOnly) ? content || badgeId : badge,
        };
      })
      .filter(badge => badge != null)
      .filter(badge =>
        shouldDisplayBadge({
          badgeConfig: badge.config,
          config: addonConfig,
          defaults: locations,
          location,
          type,
        }),
      )
      .reduce<BadgeDefinition[]>((acc, current) => {
        if (acc.every(({ badgeId }) => badgeId !== current.badgeId)) {
          acc.push(current);
        }
        return acc;
      }, [])
      .sort((a, b) => {
        const priorityOrder = a.config.priority - b.config.priority;
        if (priorityOrder != 0) return priorityOrder;
        return a.badgeId.localeCompare(b.badgeId);
      });
  }

  /**
   * Generates autobadges for a component.
   * @param entry The entry to generate autobadges for.
   * @returns An array of autobadge IDs to apply.
   */
  #getAutoBadges(entry: HashEntry): string[] {
    const { autobadges } = this.addonConfig;
    if (!this.#autobadges || autobadges === false) return [];

    if (Array.isArray(autobadges) || typeof autobadges === 'string') {
      const autobadgeOptions = [autobadges].flat();
      const auto: string[] = [];
      if (autobadgeOptions.includes(BADGE.NEW) && this.#isNew(entry)) {
        auto.push(BADGE.NEW);
      }
      if (autobadgeOptions.includes(BADGE.UPDATED) && this.#isUpdated(entry)) {
        auto.push(BADGE.UPDATED);
      }
      if (
        autobadgeOptions.includes(BADGE.A11Y_CHECK) &&
        this.#checkA11yState(entry) === 'incomplete'
      ) {
        auto.push(BADGE.A11Y_CHECK);
      }
      if (autobadgeOptions.includes(BADGE.A11Y_FAIL) && this.#checkA11yState(entry) === 'fail') {
        auto.push(BADGE.A11Y_FAIL);
      }
      if (autobadgeOptions.includes(BADGE.A11Y_PASS) && this.#checkA11yState(entry) === 'pass') {
        auto.push(BADGE.A11Y_PASS);
      }
      if (autobadgeOptions.includes(BADGE.TEST_FAIL) && this.#checkTestState('fail', entry)) {
        auto.push(BADGE.TEST_FAIL);
      }
      if (autobadgeOptions.includes(BADGE.TEST_PASS) && this.#checkTestState('pass', entry)) {
        auto.push(BADGE.TEST_PASS);
      }
      if (autobadgeOptions.includes(BADGE.TEST_TODO) && this.#checkTestState('todo', entry)) {
        auto.push(BADGE.TEST_TODO);
      }

      return auto;
    } else if (typeof autobadges === 'function') {
      return autobadges({
        a11yStatus: this.#checkA11yState(entry),
        entry,
        isNew: this.#isNew(entry),
        isUpdated: this.#isUpdated(entry),
      });
    }
    return [];
  }

  /**
   * Retrieves the {@link StoryState} for a given entry from current or saved state.
   * @param entry The {@link HashEntry} or storyId to retrieve the state for.
   * @param state The state object to check.
   * @returns The {@link StoryState} if found, otherwise undefined.
   */
  #getStateForEntry(entry: HashEntry | string, state: StateType): StoryState | undefined {
    const storyId = typeof entry === 'string' ? entry : entry.id;
    const stateObject = state === 'current' ? this.#currentState : this.#savedState;

    return stateObject.storyStates.find(story => story.id === storyId);
  }

  /**
   * Gets the tags for an entry.
   * @param entry The entry to get the tags for.
   * @returns An array of tags for the entry.
   */
  #getTags(entry: HashEntry): string[] {
    const { excludeTags, useTags } = this.addonConfig;
    if (!useTags) {
      return [];
    }

    return entry && 'tags' in entry ? entry.tags.filter(tag => !excludeTags.includes(tag)) : [];
  }

  /**
   * Checks whether an entry is new and has never been viewed.
   * @param entry The entry to check.
   * @returns A boolean indicating whether the entry is new since the last time
   * the saved state was updated.
   */
  #isNew(entry: HashEntry | undefined): boolean {
    if (!entry || !this.#autobadges) return false;

    const current = this.#getStateForEntry(entry, 'current');
    const stored = this.#getStateForEntry(entry, 'saved');

    return !!(current && !stored);
  }

  /**
   * Checks whether an entry has been updated since the last time it was viewed.
   * @param entry The entry to check.
   * @returns A boolean indicating whether the entry has been updated since it
   * was last viewed.
   */
  #isUpdated(entry: HashEntry | undefined): boolean {
    if (!entry || !this.#autobadges) return false;

    const current = this.#getStateForEntry(entry, 'current');
    const stored = this.#getStateForEntry(entry, 'saved');

    return !!(current && stored && current.hash !== stored.hash);
  }

  /**
   * Stores the current hash/state of a story so that any new/updated state is cleared.
   * @param storyId The ID of the story to mark as viewed.
   */
  #markAsViewed(storyId: string): void {
    this.#saveQueue.push(storyId);
    if (this.#hasIndexed) {
      this.#processQueue();
    }
  }

  /**
   * Event handler for the `DOCS_RENDERED` event. Registers the docs page so that
   * each subsequent `STORY_RENDERED` call is aware that it's on the docs page.
   */
  #onDocsRendered(storyId: string): void {
    this.#isDocsPage = true;
    if (!this.#autobadges) return;
    this.#markAsViewed(storyId);
  }

  /**
   * Event handler for the `INDEX` event. Processes the index/prepared data
   * into the AddonState for storage/comparison.
   * @param param0 The {@link IndexerResult} from the `PreviewInterface`
   * allowing us to generate hashes for stories including their args/parameters.
   */
  #onIndex({ index, stories }: IndexerResult): void {
    if (!this.#autobadges) return;
    const state: StoryState[] = [];
    this.#latestIndex = [];

    for (const [storyId, indexEntry] of index) {
      const preparedStory = stories.find(story => story.id === storyId);
      const combinedData: IndexEntry & Partial<PreparedStory<Renderer>> = {
        ...indexEntry,
        ...preparedStory,
      };
      const hash = ohash(combinedData, hashOptions);
      this.#latestIndex.push({ ...combinedData, hash });

      // TODO: A11y can only run for the currently active story - need to
      // check out the new testing addon to see if that's changed.
      if (this.#activeStoryId === storyId) {
        this.#a11yAddon.runForStory(storyId);
      }
      state.push({ hash, id: storyId, type: indexEntry.type });
    }

    this.#currentState.storyStates = state;
    if (this.#savedState.storyStates.length === 0) {
      this.#savedState = { ...this.#currentState };
    } else {
      const savedStoryStates = this.#savedState.storyStates;
      const prevLength = savedStoryStates.length;
      for (const [index, storyState] of savedStoryStates.entries()) {
        const inCurrent = this.#getStateForEntry(storyState.id, 'current');
        if (!inCurrent) {
          savedStoryStates.splice(index, 1);
        }
      }
      if (savedStoryStates.length !== prevLength) {
        this.#savedState = { storyStates: savedStoryStates };
      }
    }

    this.#hasIndexed = true;
    this.#processQueue();
  }

  /**
   * Event handler for the `REQUEST` event. Emits a response with the value of
   * autobadges to allow `PreviewInterface` to only generate an index if we're
   * using autobadges.
   */
  #onRequest(id: string): void {
    if (!this.#hasHadIndexRequest) {
      this.#lastRequestId = id;
      this.#hasHadIndexRequest = true;
      this.#addonChannel.emit(EVENTS.CHECK_INDEX_RESPONSE, this.#autobadges, id);
    }
  }

  /**
   * Event handler for the `STORY_CHANGED` event, used to reset whether indexing
   * is allowed.
   */
  #onStoryChanged(): void {
    this.#isDocsPage = false;
    this.#hasHadIndexRequest = false;
    this.#hasIndexed = false;
  }

  /**
   * Event handler for the `STORY_INDEX_INVALIDATED` event to reset internal
   * indexing.
   */
  onIndexInvalidated(): void {
    this.#onStoryChanged();
    this.#addonChannel.emit(EVENTS.CHECK_INDEX_RESPONSE, this.#autobadges, this.#lastRequestId);
  }

  /**
   * Event handler for the `STORY_RENDERED` event. Marks the story as viewed
   * and updates the a11y/test states for the story.
   * @param storyId The ID of the story that has been rendered.
   */
  #onStoryRender(storyId: string): void {
    this.#activeStoryId = storyId;

    if (!this.#autobadges) return;

    this.#a11yAddon.runForStory(storyId);

    if (!this.#isDocsPage || (this.addonConfig.markAllAsReadOnDocsView && this.#isDocsPage)) {
      this.#markAsViewed(storyId);
    }
  }

  /**
   * Processes the state-save queue once indexing is complete.
   */
  #processQueue(): void {
    // Dedupe and process
    const queue = [...new Set(this.#saveQueue)];
    this.#saveQueue = [];
    while (queue.length > 0) {
      const next = queue.shift();
      if (next) {
        const currentValue = this.#getStateForEntry(next, 'current');
        this.#updateStoryState(next, 'saved', currentValue);
      }
    }
    this.#addonChannel.emit(EVENTS.INDEX_COMPLETE);
  }

  /**
   * Register handlers to run when certain Storybook/Addon events are fired.
   */
  #registerEventHandlers(): void {
    // Addon Events
    this.#addonChannel.on(EVENTS.INDEX, this.#onIndex.bind(this));
    this.#addonChannel.on(EVENTS.CHECK_INDEX_REQUIRED, this.#onRequest.bind(this));

    // Storybook Events
    this.#addonChannel.on(DOCS_RENDERED, this.#onDocsRendered.bind(this));
    this.#addonChannel.on(STORY_CHANGED, this.#onStoryChanged.bind(this));
    this.#addonChannel.on(STORY_INDEX_INVALIDATED, this.#onStoryChanged.bind(this));
    this.#addonChannel.on(STORY_RENDERED, this.#onStoryRender.bind(this));
  }

  /**
   * If a legacy configuration/badges has been detected, display a warning once, and
   * inform the user that `parameters` based configs are no longer recommended.
   * @param config The config containing the legacy configuration.
   */
  #showLegacyConfigWarning(config: FullConfig): void {
    if (
      !this.#mocked &&
      !this.#legacyWarningVisible &&
      config.warnOnLegacyConfig &&
      !this.#savedState.legacyWarningShown
    ) {
      this.#legacyWarningVisible = true;
      this.#api.addNotification({
        content: {
          headline: 'Badges Legacy Config',
          subHeadline: (
            <span>
              A <code>{ADDON_ID}</code> configuration was found in <code>parameters</code>. This is
              no longer the recommended as it offers less control. Please see the{' '}
              <a href={`${DOCS_URL}/customisation/configuration#legacy-config-warning`}>
                documentation
              </a>{' '}
              for more information.
            </span>
          ),
        },
        id: LEGACY_NOTIFICATION_ID,
        onClear: ({ dismissed }) => {
          if (dismissed) {
            this.#legacyWarningVisible = true;
            this.#savedState = { legacyWarningShown: true };
            this.#currentState.legacyWarningShown = true;
          }
        },
        onClick: ({ onDismiss }) => {
          onDismiss();
        },
      });
    }
  }

  /**
   * Updates a single story's state with new data.
   * @param entry The entry to update.
   * @param state The state location to update the story in.
   * @param data The new data to update the story with.
   */
  #updateStoryState(
    entry: HashEntry | string,
    state: StateType,
    data: Partial<StoryState> | undefined,
  ): void {
    if (!data) return;
    const storyId = typeof entry === 'string' ? entry : entry.id;
    const existingState = state === 'current' ? this.#currentState : this.#savedState;
    const existingIndex = existingState.storyStates.findIndex(story => story.id === storyId);
    const existingStoryData = this.#getStateForEntry(entry, state);
    if (!existingStoryData) {
      // Create from scratch and push (if enough info)
      const { hash, id, type } = data;
      if (hash && id && type) {
        existingState.storyStates.push({ ...data, hash, id, type });
      }
    } else {
      const newData = { ...existingStoryData };
      data.a11y && (newData.a11y = data.a11y);
      data.hash && (newData.hash = data.hash);
      data.test && (newData.test = data.test);
      existingState.storyStates.splice(existingIndex, 1, newData);
    }

    if (state === 'current') {
      this.#currentState = existingState;
    } else {
      this.#savedState = existingState;
    }
  }
}

export { BadgesAddon };
