import { addons } from 'storybook/internal/manager-api';

import { EXTERNAL } from '@/constants';

import type { BadgesAddon } from './BadgesAddon';
import type { A11yResult, A11yState } from '@/types';
import type { A11yParameters } from '@storybook/addon-a11y';
import type { API } from 'storybook/internal/manager-api';

/**
 * Class for interfacing with `storybook-addon-a11y`.
 */
class A11y {
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
  /** Whether `storybook-addon-a11y` is present in this workspace. */
  #active: boolean = false;
  /**
   * The queue of runs to work through. Currently not very useful as can only render the
   * current story. In future we hope to be able to run through a queue to generate a11y
   * badges without having to render the story to the canvas.
   */
  #queue: [string, A11yParameters | undefined][] = [];
  /** Whether a a11y check is currently being executed. */
  #running: boolean = false;

  //===================================
  //== Constructor
  //===================================
  public constructor(api: API, badgesAddon: BadgesAddon) {
    this.#addonChannel = addons.getChannel();
    this.#api = api;
    this.#badgesAddon = badgesAddon;
  }

  //===================================
  //== Public Getters/Setters
  //===================================
  /** Retrieves the current state of the a11y plugin. */
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
  /**
   * Starts a manual run for a specific story.
   *
   * Currently this doesn't work properly and will only run against the current story.
   * @param storyId The ID of the story to run an a11y check against.
   */
  public runForStory(storyId: string): void {
    const parameters = this.#api.getParameters(storyId, EXTERNAL.A11Y.PARAM_KEY);
    this.#addToQueue(storyId, parameters);
  }

  /**
   * Adds an a11y run to the queue, beginning processing of the queue if not
   * currently running.
   * @param storyId The ID of the story to add to the queue.
   * @param parameters The a11y parameters for the story.
   */
  #addToQueue(storyId: string, parameters: A11yParameters | undefined): void {
    if (!this.#active) return;

    this.#queue.push([storyId, parameters]);
    if (!this.#running) {
      this.#processQueue();
    }
  }

  /**
   * Handler for the `RUNNING` event. Sets the internal state for tracking.
   */
  #onA11yRunning(): void {
    this.#running = true;
  }

  /**
   * Removes the first item in the queue and begins an a11y run for it.
   */
  #processQueue(): void {
    if (this.#active && !this.#running) {
      const next = this.#queue.shift();
      if (next) {
        this.#addonChannel.emit(EXTERNAL.A11Y.EVENTS.REQUEST, ...next);
      }
    }
  }

  /**
   * Handler for the `RESULT` event. Adds the result to the state to allow for
   * autobadge processing.
   * @param result The result from the handler.
   */
  #registerA11yResults(result: A11yResult): void {
    this.#running = false;

    const parsed = A11y.#toA11yState(result);
    if (!parsed) return;
    const [storyId, state] = parsed;
    this.#badgesAddon.addA11yState(storyId, state);

    this.#processQueue();
  }

  /**
   * Registers event handlers for the a11y plugin.
   */
  #registerEventHandlers(): void {
    // A11y Events
    this.#addonChannel.on(EXTERNAL.A11Y.EVENTS.RUNNING, this.#onA11yRunning.bind(this));
    this.#addonChannel.on(EXTERNAL.A11Y.EVENTS.RESULT, this.#registerA11yResults.bind(this));
  }

  /**
   * Static function for converting an {@link A11yResult} to our internal state.
   * @param result The a11y result to convert.
   * @returns A tuple containing the ID of the story, and the internal state if
   * valid, otherwise `null`.
   */
  static #toA11yState(result: A11yResult): [string, A11yState] | null {
    const storyUrl = result?.url ? new URL(result.url) : null;
    const storyId = storyUrl?.searchParams.get('id');

    if (!storyId) return null;

    const state: A11yState = {
      incomplete: result.incomplete.length,
      passes: result.passes.length,
      violations: result.violations.length,
    };

    return [storyId, state];
  }
}

export { A11y };
