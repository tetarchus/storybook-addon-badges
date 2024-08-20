import { describe, expect, it } from 'vitest';

import { isNewBadgesConfig } from '@/utils';

import type { BadgesMap, NewBadgesConfig } from '@/types';

const oldConfig: BadgesMap = {
  title: { title: 'Test Badge' },
  badges: { title: 'Test Badge' },
};

const oldConfig2: BadgesMap = {
  title: { title: 'Test Badge' },
  badges: { tooltip: 'Tooltip Test' },
};

const oldConfig3: BadgesMap = {
  title: { title: 'Test Badge' },
  badges: { tooltip: { desc: 'Tooltip' } },
};

const newConfig: NewBadgesConfig = {
  badges: {
    // title: { title: 'Test Badge' },
    badges: { tooltip: { desc: 'Tooltip' } },
  },
};

describe('isNewBadgesConfig', () => {
  it('correctly identifies the new config', () => {
    expect.assertions(4);
    expect(isNewBadgesConfig(oldConfig)).toBe(false);
    expect(isNewBadgesConfig(oldConfig2)).toBe(false);
    expect(isNewBadgesConfig(oldConfig3)).toBe(false);
    expect(isNewBadgesConfig(newConfig)).toBe(true);
  });
});
