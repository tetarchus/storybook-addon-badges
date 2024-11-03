import { addons } from 'storybook/internal/manager-api';

import type { API } from 'storybook/internal/manager-api';
import type { BadgesAddon } from './BadgesAddon';

class Testing {
  /** The addon event emitter channel. */
  readonly #addonChannel: ReturnType<(typeof addons)['getChannel']>;
  readonly #api: API;
  readonly #badgesAddon: BadgesAddon;

  #active: boolean = false;

  public constructor(api: API, badgesAddon: BadgesAddon) {
    this.#addonChannel = addons.getChannel();
    this.#api = api;
    this.#badgesAddon = badgesAddon;
  }

  /** Retrieves the current state of the test plugin. */
  public get active(): boolean {
    return this.#active;
  }

  /** Sets the current state of the a11y plugin and processes the queue. */
  public set active(active: boolean) {
    this.#active = active;
  }
}

export { Testing };
