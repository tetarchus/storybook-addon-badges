import EventEmitter from 'node:events';

import { vi } from 'vitest';

import { api } from '@/__test__/__fixtures__';

/** Custom emitter. */
const emitter = new EventEmitter();
/** Mocked version of the SB API's channels. */
const mockedChannel = {
  on: vi.fn(emitter.on.bind(emitter)),
  off: vi.fn(emitter.off.bind(emitter)),
  removeListener: vi.fn(emitter.off.bind(emitter)),
  emit: vi.fn(emitter.emit.bind(emitter)),
};

/** Wrapped API mock for tests. */
const mockedApi = vi.mocked(api);

export { mockedApi, mockedChannel };
