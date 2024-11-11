import { addons } from 'storybook/internal/manager-api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { PREFIX, resolvedDefaultConfig, storyEntry } from '@/__test__/__fixtures__';
import { mockedApi, mockedChannel } from '@/__test__/.mocks';
import { BadgesAddon } from '@/classes';
import { EVENTS, LOCAL_STORAGE_KEY } from '@/constants';

import type { Channel } from 'storybook/internal/channels';
import type { MockInstance } from 'vitest';

// Common values
const storyId = 'example-story--entry';
const a11yState = { incomplete: 0, passes: 2, violations: 0 };
const storyState = { hash: 'zFD8daDEKZ', id: storyId, type: 'story' };
const defaultSbState = {
  legacyWarningShown: false,
  storyStates: [storyState],
};
const storedValueMock = JSON.stringify({
  default: defaultSbState,
  other: defaultSbState,
});

// Mock placeholders
let mockChannel: Channel | null = null;
let getItemSpy: MockInstance<(key: string) => string | null> | null = null;
let setItemSpy: MockInstance<(key: string) => string | null> | null = null;
let consoleSpy: MockInstance<{
  (...data: unknown[]): void;
  (message?: unknown, ...optionalParams: unknown[]): void;
}> | null;

describe('BadgesAddon Class', () => {
  beforeEach(() => {
    mockChannel = mockedChannel();
    addons.setChannel(mockChannel as unknown as Channel);

    const value: Record<string, string> = {};
    getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(key => value[key] ?? null);
    setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, val) => {
      value[key] = val;
    });
    consoleSpy = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mockChannel?.removeAllListeners();
  });

  it('gets and sets the state of the A11y sub-class', () => {
    expect.assertions(2);
    const addon = new BadgesAddon(mockedApi, true);
    expect(addon.a11yActive).toBe(false);
    addon.a11yActive = true;
    expect(addon.a11yActive).toBe(true);
  });

  it('gets and sets the state of the Testing sub-class', () => {
    expect.assertions(2);
    const addon = new BadgesAddon(mockedApi, true);
    expect(addon.testActive).toBe(false);
    addon.testActive = true;
    expect(addon.testActive).toBe(true);
  });

  it('returns a resolved configuration', () => {
    expect.assertions(1);
    const addon = new BadgesAddon(mockedApi, true);
    expect(addon.addonConfig).toMatchObject(resolvedDefaultConfig);
  });

  it('returns an array of badges', () => {
    expect.assertions(1);
    const addon = new BadgesAddon(mockedApi, true);
    const badges = addon.getBadgesForEntry(storyEntry, 'sidebar');
    expect(badges).toHaveLength(2);
  });

  it('adds a11y state to storage', () => {
    expect.assertions(3);
    // Initialize local storage with a value
    window.localStorage.setItem(LOCAL_STORAGE_KEY, storedValueMock);
    const addon = new BadgesAddon(mockedApi, true);
    addon.a11yActive = true;
    addon.addA11yState(storyId, a11yState);
    expect(getItemSpy).toHaveBeenLastCalledWith(LOCAL_STORAGE_KEY);
    const expectedStored = JSON.stringify({
      default: {
        legacyWarningShown: false,
        storyStates: [{ ...storyState, a11y: a11yState }],
      },
      other: defaultSbState,
    });
    expect(setItemSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, expectedStored);
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    expect(stored).toBe(expectedStored);
  });

  it("displays an error if there's no existing state", () => {
    expect.assertions(2);
    const addon = new BadgesAddon(mockedApi, true);
    addon.a11yActive = true;
    addon.addA11yState(storyId, a11yState);
    expect(consoleSpy).toHaveBeenCalledOnce();
    expect(consoleSpy).toHaveBeenCalledWith(PREFIX, 'Could not find saved data for', storyId);
  });

  it('sets the initial value of localstorage', () => {
    expect.assertions(4);
    new BadgesAddon(mockedApi, true);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(null);
    const mockIndex = {
      index: [[storyEntry.id, storyEntry]],
      stories: [{ storyEntry }],
    };
    mockChannel?.emit(EVENTS.INDEX, mockIndex);
    expect(mockChannel?.emit).toHaveBeenCalledWith(EVENTS.INDEX, mockIndex);
    expect(mockChannel?.emit).toHaveBeenLastCalledWith(EVENTS.INDEX_COMPLETE);
    expect(setItemSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        default: {
          legacyWarningShown: false,
          storyStates: [storyState],
        },
      }),
    );
  });
});
