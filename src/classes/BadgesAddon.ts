import { hash as ohash } from 'ohash';
import { STORY_RENDERED } from 'storybook/internal/core-events';
import { addons } from 'storybook/internal/manager-api';

import { defaultAddonState, hashOptions } from '@/config';
import {
  ADDON_LS_KEY,
  BADGE,
  DEFAULT_STORYBOOK_ID,
  EVENTS,
  PARAM_BADGES_KEY,
  PARAM_CONFIG_KEY,
  PARAM_STORYBOOK_ID,
} from '@/constants';
import {
  getBadgePartsInternal,
  getFullBadgeConfig,
  getFullConfig,
  logger,
  shouldDisplayBadge,
} from '@/utils';

import { A11y } from './A11y';
import { Testing } from './Testing';

import type {
  A11yState,
  AddonState,
  BadgeDefinition,
  BadgeLocation,
  BadgesConfig,
  EntryType,
  FullConfig,
  IndexerResult,
  StoryState,
} from '@/types';
import type { API, HashEntry } from 'storybook/internal/manager-api';
import type { Addon_Config } from 'storybook/internal/types';

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
  /** The saved state of the stories from local storage. */
  #savedState: AddonState;
  /** ID for referencing this storybook instance. */
  #storybookId: string;
  /** The testing addon interface instance. */
  #testingAddon: Testing;

  //===================================
  //== Constructor
  //===================================
  public constructor(api: API) {
    this.#addonChannel = addons.getChannel();
    this.#addonsConfig = addons.getConfig();
    this.#api = api;
    this.#storybookId = this.#assignStorybookId();
    this.#savedState = this.#getStateFromLocalStorage();
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
    const legacyConfig = this.#api.getCurrentParameter<BadgesConfig | undefined>(PARAM_CONFIG_KEY);
    return legacyConfig ? getFullConfig(legacyConfig) : (this.#baseConfig ?? getFullConfig());
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
    if (!this.a11yActive) return;

    const savedStoryData = this.#storedState.storyStates.find(story => story.id === storyId);
    if (!savedStoryData) {
      logger.warn('Could not find saved data for', storyId);
      return;
    }
    // Only update if changes to prevent updating localStorage unnecessarily
    if (JSON.stringify(state) !== JSON.stringify(savedStoryData.a11y)) {
      savedStoryData.a11y = state;
      this.#updateSavedState();
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

    const globalBadges = this.#addonsConfig[PARAM_BADGES_KEY];
    const storyData = this.#api.getData(entry.id) ?? entry;

    const autobadges = this.#getAutoBadges(storyData);
    const parameterBadges = this.#api.getCurrentParameter<string[]>(PARAM_BADGES_KEY) ?? [];
    const storyTags = this.#getTags(storyData);
    const { type } = storyData;

    console.log('Badges - in GetBadges', {
      id: entry.id,
      globalBadges,
      autobadges,
      parameterBadges,
      storyTags,
    });

    const filteredBadges = this.#filterBadges(
      [...globalBadges, ...autobadges, ...parameterBadges, ...storyTags],
      location,
      type,
    );

    return filteredBadges;
  }

  //===================================
  //== Private Getters/Setters
  //===================================
  // TODO: Do we need this? Could access localStorage directly rather than proxying...
  /** Retrieves the state that was stored in localStorage. */
  get #storedState(): AddonState {
    return this.#savedState;
  }

  // TODO: Do we need this? Could access localStorage directly rather than proxying...
  /** Updates the values saved in localStorage. */
  set #storedState(state: Partial<AddonState>) {
    console.log('Setting stored state');
    if (state.storyStates) {
      this.#savedState.storyStates = state.storyStates;
    }
    if (state.legacyWarningShown) {
      this.#savedState.legacyWarningShown = state.legacyWarningShown;
    }
    this.#updateSavedState();
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
    const { delimiter, displayContentOnly, locations } = addonConfig;

    return badges
      .filter((badge, idx, arr) => {
        const shouldDisable = arr.findIndex(
          negate => negate.startsWith('!') && negate.slice(1) === badge,
        );
        return !(shouldDisable > -1 && shouldDisable > idx);
      })
      .map(badge => {
        // TODO: Matchers
        const { badgeId, content } = getBadgePartsInternal(badge, delimiter);
        return {
          badgeId,
          config: getFullBadgeConfig(badgeId, addonConfig),
          content: displayContentOnly ? content || badgeId : badge,
        };
      })
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
      .sort((a, b) => a.config.priority - b.config.priority);
  }

  /**
   * Generates autobadges for a component.
   * @param entry The entry to generate autobadges for.
   * @returns An array of autobadge IDs to apply.
   */
  #getAutoBadges(entry: HashEntry): string[] {
    const { autobadges } = this.addonConfig;
    if (autobadges === false) return [];

    if (Array.isArray(autobadges)) {
      const auto: string[] = [];
      if (autobadges.includes(BADGE.NEW) && this.#isNew(entry)) {
        auto.push(BADGE.NEW);
      }
      if (autobadges.includes(BADGE.UPDATED) && this.#isUpdated(entry)) {
        auto.push(BADGE.UPDATED);
      }
      // TODO: A11Y/TEST Autobadges
      return auto;
    } else if (typeof autobadges === 'function') {
      return autobadges({ entry, isNew: this.#isNew(entry), isUpdated: this.#isUpdated(entry) });
    }
    return [];
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

    // TODO: Sort
    if (entry && !('tags' in entry)) {
      console.log(`${entry.type} does not have tags...`);
    }

    return entry && 'tags' in entry ? entry.tags.filter(tag => !excludeTags.includes(tag)) : [];
  }

  /**
   * Obtains the addon state from localStorage if it exists.
   * @returns The state stored in localStorage, or a default if none is found.
   */
  #getStateFromLocalStorage(): AddonState {
    if (this.addonConfig.autobadges === false) {
      return defaultAddonState;
    }

    if (typeof window === 'undefined') {
      logger.warn('Unable to get stored state - window is undefined');
      return defaultAddonState;
    }

    const storage = window.localStorage.getItem(ADDON_LS_KEY);
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

  /**
   * Checks whether an entry is new and has never been viewed.
   * @param entry The entry to check.
   * @returns A boolean indicating whether the entry is new since the last time
   * the saved state was updated.
   */
  #isNew(entry: HashEntry | undefined): boolean {
    // TODO: Only if auto
    if (!entry) return false;

    const current = this.#currentState.storyStates.find(story => story.id === entry.id);
    const stored = this.#savedState.storyStates.find(story => story.id === entry.id);
    return !!(current && !stored);
  }

  /**
   * Checks whether an entry has been updated since the last time it was viewed.
   * @param entry The entry to check.
   * @returns A boolean indicating whether the entry has been updated since it
   * was last viewed.
   */
  #isUpdated(entry: HashEntry | undefined): boolean {
    if (!entry) return false;

    const current = this.#currentState.storyStates.find(story => story.id === entry.id);
    const stored = this.#savedState.storyStates.find(story => story.id === entry.id);
    return !!(current && stored && current.hash !== stored.hash);
  }

  /**
   * Event handler for the `INDEXED` event. Processes the index/prepared data
   * into the AddonState for storage/comparison.
   * @param param0 The {@link IndexerResult} from the `PreviewInterface`
   * allowing us to generate hashes for stories including their args/parameters.
   */
  #onIndex({ index, stories }: IndexerResult): void {
    console.log('OnIndex');
    const state: StoryState[] = [];

    for (const [storyId, indexEntry] of index) {
      const preparedStory = stories.find(story => story.id === storyId);
      const combinedData = { ...indexEntry, ...preparedStory };
      const hash = ohash(combinedData, hashOptions);
      // TODO: A11y can only run for the currently active story - need to look at either adding a PR to allow running other stories, or incorporating our own plugin that can render each story independently.
      if (this.#activeStoryId === storyId) {
        this.#a11yAddon.runForStory(storyId);
      }
      state.push({ a11y: null, hash, id: storyId, test: null, type: indexEntry.type });
    }

    this.#currentState.storyStates = state;
    console.log(this.#storedState.storyStates.length);
    if (this.#storedState.storyStates.length === 0) {
      this.#storedState = { storyStates: state };
    }
    console.log('OnIndex Complete', this.#storedState, this.#currentState);
  }

  /**
   * Event handler for the `REQUEST` event. Emits a response with the value of
   * autobadges to allow `PreviewInterface` to only generate an index if we're
   * using autobadges.
   */
  #onRequest(): void {
    this.#addonChannel.emit(EVENTS.RESPONSE, this.addonConfig.autobadges);
  }

  /**
   * Event handler for the `STORY_RENDERED` event. Marks the story as viewed
   * and updates the a11y/test states for the story.
   * @param storyId The ID of the story that has been rendered.
   */
  #onStoryRender(storyId: string): void {
    console.log('Story Rendered', storyId);
    this.#activeStoryId = storyId;
    this.#a11yAddon.runForStory(storyId);
    // TODO: Update as viewed to update the state
  }

  /**
   * Register handlers to run when certain Storybook/Addon events are fired.
   */
  #registerEventHandlers(): void {
    // Addon Events
    this.#addonChannel.on(EVENTS.INDEXED, this.#onIndex.bind(this));
    this.#addonChannel.on(EVENTS.REQUEST, this.#onRequest.bind(this));

    // Storybook Events
    this.#addonChannel.on(STORY_RENDERED, this.#onStoryRender.bind(this));
  }

  /**
   * Updates the state saved in localStorage.
   */
  #updateSavedState(): void {
    console.log('Updating localStorage');
    // TODO: Only do this if using state? - Get from config.
    if (typeof window === 'undefined') {
      logger.warn('Unable to set stored state - window is undefined');
      return;
    }

    const storage = window.localStorage.getItem(ADDON_LS_KEY);
    let newStorage = {
      [this.#storybookId]: this.#savedState,
    };
    if (storage) {
      try {
        const parsed = JSON.parse(storage);
        newStorage = { ...parsed, ...newStorage };
      } catch (err) {
        logger.error(err);
      }
    }

    window.localStorage.setItem(ADDON_LS_KEY, JSON.stringify(newStorage));
    console.log('Saved State...', window.localStorage.getItem(ADDON_LS_KEY));
  }
}

export { BadgesAddon };
