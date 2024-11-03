import { addons } from 'storybook/internal/manager-api';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { mockedApi, mockedChannel } from '@/__test__/.mocks';
import { BadgesAddon } from '@/classes';
import { A11y } from '@/classes/A11y';
import { EXTERNAL } from '@/constants';

import type { Channel } from 'storybook/internal/channels';

let mockChannel: Channel | null = null;

describe('A11y Class', () => {
  beforeEach(() => {
    mockChannel = mockedChannel();
    addons.setChannel(mockChannel);
  });

  afterEach(() => {
    mockChannel?.removeAllListeners();
  });

  it('initializes as inactive', () => {
    expect.assertions(1);
    const a11y = new A11y(mockedApi, new BadgesAddon(mockedApi));
    expect(a11y.active).toBe(false);
  });

  it('can be set to active', () => {
    expect.assertions(2);
    const a11y = new A11y(mockedApi, new BadgesAddon(mockedApi));
    expect(a11y.active).toBe(false);
    a11y.active = true;
    expect(a11y.active).toBe(true);
  });

  it('processes its queue', () => {
    expect.assertions(2);
    const storyId = 'mockStory';
    const a11y = new A11y(mockedApi, new BadgesAddon(mockedApi));
    a11y.active = true;
    a11y.runForStory(storyId);
    expect(mockChannel?.emit).toHaveBeenCalledOnce();
    expect(mockChannel?.emit).toHaveBeenCalledWith(
      EXTERNAL.A11Y.EVENTS.REQUEST,
      storyId,
      undefined,
    );
  });
});
