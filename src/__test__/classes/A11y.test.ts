import { addons } from 'storybook/internal/manager-api';
import { describe, expect, it } from 'vitest';

import { mockedApi, mockedChannel } from '@/__test__/__fixtures__';
import { BadgesAddon } from '@/classes';
import { A11y } from '@/classes/A11y';
import { EXTERNAL } from '@/constants';

import type { Channel } from 'storybook/internal/channels';

addons.setChannel(mockedChannel as unknown as Channel);

const addonInstance = new BadgesAddon(mockedApi);

describe('A11y Class', () => {
  it('initializes as inactive', () => {
    expect.assertions(1);
    const a11y = new A11y(mockedApi, addonInstance);
    expect(a11y.active).toBe(false);
  });

  it('can be set to active', () => {
    expect.assertions(2);
    const a11y = new A11y(mockedApi, addonInstance);
    expect(a11y.active).toBe(false);
    a11y.active = true;
    expect(a11y.active).toBe(true);
  });

  it('processes its queue', () => {
    expect.assertions(2);
    const storyId = 'mockStory';
    const a11y = new A11y(mockedApi, addonInstance);
    a11y.active = true;
    a11y.runForStory(storyId);
    expect(mockedChannel.emit).toHaveBeenCalledOnce();
    expect(mockedChannel.emit).toHaveBeenCalledWith(
      EXTERNAL.A11Y.EVENTS.REQUEST,
      storyId,
      undefined,
    );
  });
});
