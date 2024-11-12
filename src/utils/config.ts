import { defaultConfig, defaultLocations } from '@/config';

import { getBaseStyle } from './style';
import { normalizeLocations } from './locations';

import type { BadgesConfig, FullConfig } from '@/types';

/**
 * Generates the full configuration for the addon.
 * @param configs Array of additional custom config objects to use as overrides.
 * @returns A {@link FullConfig} object with all values set to fallbacks and
 * normalized.
 */
const getFullConfig = (
  ...configs: Array<Partial<BadgesConfig> | FullConfig | undefined>
): FullConfig => {
  const combinedConfigs = configs.reduce(
    (config, current) => ({
      autobadges: config?.autobadges ?? current?.autobadges,
      badgeMap:
        (config?.replaceDefaultBadgeMap ?? current?.replaceDefaultBadgeMap)
          ? (config?.badgeMap ?? current?.badgeMap)
          : { ...config?.badgeMap, ...current?.badgeMap },
      baseStyle: config?.baseStyle ?? current?.baseStyle,
      delimiter: config?.delimiter ?? current?.delimiter,
      displayContentOnly: config?.displayContentOnly ?? current?.displayContentOnly,
      excludeTags: config?.excludeTags ?? current?.excludeTags,
      locations: config?.locations ?? current?.locations,
      matchers: config?.matchers ?? current?.matchers,
      markAllAsReadOnDocsView: config?.markAllAsReadOnDocsView ?? current?.markAllAsReadOnDocsView,
      replaceDefaultBadgeMap: config?.replaceDefaultBadgeMap ?? current?.replaceDefaultBadgeMap,
      separators: config?.separators ?? current?.separators,
      sidebarDisplayBadges: config?.sidebarDisplayBadges ?? current?.sidebarDisplayBadges,
      useBadgeFallback: config?.useBadgeFallback ?? current?.useBadgeFallback,
      useTags: config?.useTags ?? current?.useTags,
      warnOnLegacyConfig: config?.warnOnLegacyConfig ?? current?.warnOnLegacyConfig,
    }),
    {} as { [K in keyof BadgesConfig]: BadgesConfig[K] | undefined },
  );

  const replaceDefaultBadgeMap =
    combinedConfigs?.replaceDefaultBadgeMap ?? defaultConfig.replaceDefaultBadgeMap;

  const fullConfig: FullConfig = {
    autobadges: combinedConfigs?.autobadges ?? defaultConfig.autobadges,
    badgeMap: replaceDefaultBadgeMap
      ? (combinedConfigs?.badgeMap ?? defaultConfig.badgeMap)
      : { ...defaultConfig.badgeMap, ...combinedConfigs?.badgeMap },
    baseStyle: getBaseStyle(combinedConfigs?.baseStyle ?? defaultConfig.baseStyle),
    delimiter: combinedConfigs?.delimiter ?? defaultConfig.delimiter,
    displayContentOnly: combinedConfigs?.displayContentOnly ?? defaultConfig.displayContentOnly,
    excludeTags: combinedConfigs?.excludeTags ?? defaultConfig.excludeTags,
    locations: normalizeLocations(
      combinedConfigs?.locations,
      defaultConfig.locations,
      defaultLocations,
    ),
    matchers: combinedConfigs?.matchers ?? defaultConfig.matchers,
    markAllAsReadOnDocsView:
      combinedConfigs?.markAllAsReadOnDocsView ?? defaultConfig.markAllAsReadOnDocsView,
    replaceDefaultBadgeMap,
    separators: combinedConfigs?.separators ?? defaultConfig.separators,
    sidebarDisplayBadges:
      combinedConfigs?.sidebarDisplayBadges ?? defaultConfig.sidebarDisplayBadges,
    useBadgeFallback: combinedConfigs?.useBadgeFallback ?? defaultConfig.useBadgeFallback,
    useTags: combinedConfigs?.useTags ?? defaultConfig.useTags,
    warnOnLegacyConfig: combinedConfigs?.warnOnLegacyConfig ?? defaultConfig.warnOnLegacyConfig,
  };

  return fullConfig;
};

export { getFullConfig };
