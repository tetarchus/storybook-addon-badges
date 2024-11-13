import { addons } from 'storybook/internal/manager-api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mockedApi, mockedChannel } from '@/__test__/.mocks';
import { BadgesAddon } from '@/classes';
import { Testing } from '@/classes/Testing';

import type { Channel } from 'storybook/internal/channels';

let mockChannel: Channel | null = null;

describe('Testing Class', () => {
  beforeEach(() => {
    mockChannel = mockedChannel();
    addons.setChannel(mockChannel);
  });

  afterEach(() => {
    mockChannel?.removeAllListeners();
  });

  it('initializes as inactive', () => {
    expect.assertions(1);
    const testing = new Testing(mockedApi, new BadgesAddon(mockedApi, true));
    expect(testing.active).toBe(false);
  });

  it('can be set to active', () => {
    expect.assertions(2);
    const testing = new Testing(mockedApi, new BadgesAddon(mockedApi, true));
    expect(testing.active).toBe(false);
    testing.active = true;
    expect(testing.active).toBe(true);
  });

  it('runs for story', () => {
    expect.assertions(2);
    const testing = new Testing(mockedApi, new BadgesAddon(mockedApi, true));
    const spy = vi.spyOn(testing, 'runForStory');
    testing.runForStory('example-story');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith('example-story');
  });
});
