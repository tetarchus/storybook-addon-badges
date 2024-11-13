import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { resolvedDefaultConfig } from '@/__test__/__fixtures__';
import { mockedApi } from '@/__test__/.mocks';
import { BadgesAddon } from '@/classes';
import { BadgesAddonProvider } from '@/contexts';
import { useAddon, useAddonConfig } from '@/hooks';

describe('Hooks', () => {
  describe('useAddon', () => {
    it('returns the BadgesAddon instance', () => {
      expect.assertions(1);
      const { result } = renderHook(useAddon, {
        wrapper: ({ children }) => (
          <BadgesAddonProvider state={new BadgesAddon(mockedApi, true)}>
            {children}
          </BadgesAddonProvider>
        ),
      });
      expect(result.current).toBeInstanceOf(BadgesAddon);
    });

    it('throws an error when used outside of a context', () => {
      expect.assertions(1);
      expect(() => renderHook(useAddon)).toThrow(
        '[storybook-addon-badges]: `useAddon` can only be accessed from within a <BadgesAddonProvider>.',
      );
    });
  });

  describe('useAddonConfig', () => {
    it('returns the badges addon config', () => {
      expect.assertions(1);
      const { result } = renderHook(useAddonConfig, {
        wrapper: ({ children }) => (
          <BadgesAddonProvider state={new BadgesAddon(mockedApi, true)}>
            {children}
          </BadgesAddonProvider>
        ),
      });
      expect(result.current).toMatchObject(resolvedDefaultConfig);
    });

    it('throws an error when used outside of a context', () => {
      expect.assertions(1);
      expect(() => renderHook(useAddonConfig)).toThrow(
        '[storybook-addon-badges]: `useAddon` can only be accessed from within a <BadgesAddonProvider>.',
      );
    });
  });
});
