import EventEmitter from 'node:events';

import { vi } from 'vitest';

import { api } from '@/__test__/__fixtures__';

import type { Channel } from 'storybook/internal/channels';

/** Custom emitter. */
const emitter = new EventEmitter();
/** Mocked version of the SB API's channels. */
const mockedChannel = vi.fn(() => ({
  emit: vi.fn(emitter.emit.bind(emitter)),
  off: vi.fn(emitter.off.bind(emitter)),
  on: vi.fn(emitter.on.bind(emitter)),
  removeListener: vi.fn(emitter.off.bind(emitter)),
  removeAllListeners: vi.fn(emitter.removeAllListeners.bind(emitter)),
})) as unknown as () => Channel;

/** Wrapped API mock for tests. */
const mockedApi = vi.mocked(api);

export { mockedApi, mockedChannel };
