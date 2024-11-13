import satisfies from 'semver/functions/satisfies';
import coerce from 'semver/functions/coerce';
import {
  TESTING_MODULE_PROGRESS_REPORT,
  TESTING_MODULE_RUN_ALL_REQUEST,
  TESTING_MODULE_RUN_REQUEST,
} from 'storybook/internal/core-events';
import { addons } from 'storybook/internal/manager-api';

import { EXTERNAL } from '@/constants';

import type { BadgesAddon } from './BadgesAddon';
import type {
  TestingModuleProgressReportPayload,
  TestingModuleRunAllRequestPayload,
  TestingModuleRunRequestPayload,
} from 'storybook/internal/core-events';
import type { API } from 'storybook/internal/manager-api';

/** The minimum version of Storybook to support the `updated` autobadge. */
const AVAILABLE_FROM_VERSION = '8.4.1';

class Testing {
  //===================================
  //== Private Readonly Properties
  //===================================
  /** The addon event emitter channel. */
  readonly #addonChannel: ReturnType<(typeof addons)['getChannel']>;
  /** The Storybook Manager API. */
  readonly #api: API;
  /** The parent {@link BadgesAddon} class. */
  readonly #badgesAddon: BadgesAddon;

  //===================================
  //== Private Properties
  //===================================
  /** Whether a testing addon is present. */
  #active: boolean = false;
  /** Temporary disable for this integration until the experimental addon is ready. */
  #enabled: boolean = false;
  /**
   * The queue of runs to work through. Currently not very useful as can only render the
   * current story. In future we hope to be able to run through a queue to generate a11y
   * badges without having to render the story to the canvas.
   */
  #queue: string[] = [];
  /** Whether the testing addon is currently running. */
  #running: boolean = false;

  //===================================
  //== Constructor
  //===================================
  public constructor(api: API, badgesAddon: BadgesAddon) {
    this.#addonChannel = addons.getChannel();
    this.#api = api;
    this.#badgesAddon = badgesAddon;

    // Currently disabled due to testing addon not being finalized/returning the value we would need
    const storybookVersion = coerce(this.#api.getCurrentVersion().version);
    this.#enabled = storybookVersion
      ? // TODO: Remove && false once available
        satisfies(storybookVersion, AVAILABLE_FROM_VERSION) && false
      : false;
  }

  //===================================
  //== Public Getters/Setters
  //===================================
  /** Retrieves the current state of the test plugin. */
  public get active(): boolean {
    return this.#active;
  }

  /** Sets the current state of the a11y plugin and processes the queue. */
  public set active(active: boolean) {
    this.#active = active;
    if (active) {
      this.#registerEventHandlers();
      this.#processQueue();
    }
  }

  //===================================
  //== Public Methods
  //===================================
  /** Execute a test for the named story. */
  public runForStory(storyId: string): void {
    this.#addToQueue(storyId);
  }

  //===================================
  //== Private Methods
  //===================================
  /**
   * Adds a test run to the queue, beginning processing of the queue if not
   * currently running.
   * @param storyId The ID of the story to add to the queue.
   */
  #addToQueue(storyId: string): void {
    if (!this.#active || !this.#enabled) return;

    this.#queue.push(storyId);
    if (!this.#running) {
      this.#processQueue();
    }
  }

  /**
   * Event handler for the `TESTING_MODULE_PROGRESS_REPORT` event. When a run has
   * completed, it can record the status for a story.
   * @param payload The {@link TestingModuleProgressReportPayload} from Storybook's
   * testing module.
   */
  #onTestingModuleProgressReport(payload: TestingModuleProgressReportPayload): void {
    // Check the module being run and the progress
    // Currently we only care about the Vitest test provider
    if (payload.providerId === EXTERNAL.VITEST.TEST_PROVIDER) {
      if (payload.status === 'pending') {
        this.#running = true;
      } else {
        this.#running = false;
        // TODO: Parse the payload -- currently doesn't have enough information.
      }
    }
  }

  /**
   * Event handler for the `TESTING_MODULE_RUN_REQUEST` event. If for an addon
   * we're hooking into, set the running state.
   * @param payload The {@link TestingModuleRunRequestPayload} from Storybook's
   * testing module.
   */
  #onTestingModuleRun(payload: TestingModuleRunRequestPayload): void {
    if (payload.providerId === EXTERNAL.VITEST.TEST_PROVIDER) {
      this.#running = true;
    }
  }

  /**
   * Event handler for the `TESTING_MODULE_RUN_ALL_REQUEST` event. If for an addon
   * we're hooking into, set the running state.
   * @param payload The {@link TestingModuleRunAllRequestPayload} from Storybook's
   * testing module.
   */
  #onTestingModuleRunAll(payload: TestingModuleRunAllRequestPayload): void {
    if (payload.providerId === EXTERNAL.VITEST.TEST_PROVIDER) {
      this.#running = true;
    }
  }

  /**
   * Removes the first item in the queue and begins a test run for it.
   */
  #processQueue(): void {
    if (this.#active && this.#enabled && !this.#running) {
      const queue = [...this.#queue];
      this.#queue = [];

      const storiesPayload: TestingModuleRunRequestPayload['payload'] = [];
      for (const item of queue) {
        const storyIndex = this.#badgesAddon.getIndexForStory(item);
        if (storyIndex) {
          const existing = storiesPayload.find(entry => entry.importPath === storyIndex.importPath);
          if (existing) {
            existing.stories.push({ id: storyIndex.id, name: storyIndex.name });
          } else {
            storiesPayload.push({
              stories: [{ id: storyIndex.id, name: storyIndex.name }],
              importPath: storyIndex.importPath,
              componentPath: '', // TODO: Where to get this from?
            });
          }
        }
      }

      if (storiesPayload.length > 0) {
        this.#addonChannel.emit(TESTING_MODULE_RUN_REQUEST, {
          providerId: EXTERNAL.VITEST.TEST_PROVIDER,
          payload: storiesPayload,
        } satisfies TestingModuleRunRequestPayload);
      }
    }
  }

  /**
   * Registers the event handlers for the testing interface.
   */
  #registerEventHandlers(): void {
    this.#addonChannel.on(
      TESTING_MODULE_PROGRESS_REPORT,
      this.#onTestingModuleProgressReport.bind(this),
    );
    this.#addonChannel.on(TESTING_MODULE_RUN_REQUEST, this.#onTestingModuleRun.bind(this));
    this.#addonChannel.on(TESTING_MODULE_RUN_ALL_REQUEST, this.#onTestingModuleRunAll.bind(this));
  }
}

export { Testing };
