import { arrayIncludes } from '@tetarchus/utils';

import { BADGE_LOCATION } from '@/constants';

import type {
  BadgeLocation,
  BadgeLocations,
  EntryType,
  LocationMap,
  LocationOption,
  ShouldDisplayBadgeParameters,
} from '@/types';

/** All available types of HashEntry. */
const entryTypes: EntryType[] = ['component', 'docs', 'group', 'root', 'story'];
/** Types of entry excluded from being displayed in the toolbar (due to not being selectable). */
const toolbarExcludedTypes = ['component', 'group', 'root'] as const satisfies EntryType[];

/** Available {@link BadgeLocation}s for the sidebar. */
const sidebarPermittedTypes = entryTypes.filter(type => type !== 'root');
/** Available {@link BadgeLocation}s for the toolbar. */
const toolbarPermittedTypes = entryTypes.filter(type => !arrayIncludes(toolbarExcludedTypes, type));

/**
 * Extracts the value from a LocationMap/array for a given location.
 * @param locations The locations setting value.
 * @param location The location to extract.
 * @returns The extracted value.
 */
const getLocationValue = <Loc extends BadgeLocation>(
  locations: BadgeLocations | null | undefined,
  location: Loc,
): boolean | LocationMap<false>[Loc] | undefined =>
  Array.isArray(locations) ? locations.includes(location) : locations?.[location];

/**
 * Given a `value`, extracts which entry types may be displayed, restricting
 * to only the `valid` options.
 * @param value The value to normalize.
 * @param defaultValue The default value to use in case of undefined.
 * @param valid Valid values to return.
 * @returns The available types restricted to `valid` based on the `value`.
 */
const normalizeProperty = <T extends EntryType>(
  value: LocationOption<T> | null | undefined,
  defaultValue: LocationOption<T>,
  valid: T[],
): LocationOption<T, true> => {
  if (value == null) {
    return normalizeProperty(defaultValue, defaultValue, valid);
  }
  if (value === true) {
    return valid;
  }
  if (value === false) {
    return [];
  }
  if (typeof value === 'string') {
    return [value];
  }
  return [...value];
};

/**
 * Generates a {@link LocationMap} where all values are present and assigned
 * valid values.
 * @param fallbackLocations The provided fallback value.
 * @param configLocations The default values from the addon config.
 * @returns A {@link LocationMap} with all values set.
 */
const setFallbackLocations = (
  fallbackLocations: BadgeLocations | null | undefined,
  configLocations: Required<LocationMap>,
): Required<LocationMap<true>> => ({
  [BADGE_LOCATION.SIDEBAR]: normalizeProperty(
    getLocationValue(fallbackLocations, BADGE_LOCATION.SIDEBAR),
    configLocations[BADGE_LOCATION.SIDEBAR],
    sidebarPermittedTypes,
  ),
  [BADGE_LOCATION.TOOLBAR]: normalizeProperty(
    getLocationValue(fallbackLocations, BADGE_LOCATION.TOOLBAR),
    configLocations[BADGE_LOCATION.TOOLBAR],
    toolbarPermittedTypes,
  ),
  [BADGE_LOCATION.TOOLBAR_END]: normalizeProperty(
    getLocationValue(fallbackLocations, BADGE_LOCATION.TOOLBAR_END),
    configLocations[BADGE_LOCATION.TOOLBAR_END],
    toolbarPermittedTypes,
  ),
});

/**
 * Converts any other type of location definition into a {@link LocationMap}.
 * @param locations The override locations.
 * @param fallbackLocations The fallback locations.
 * @param configLocations The default locations, in case neither the override/fallback have a value.
 * @returns A {@link LocationMap} with all values set.
 */
const normalizeLocations = (
  locations: BadgeLocations | null | undefined,
  fallbackLocations: BadgeLocations | null | undefined,
  configLocations: Required<LocationMap>,
): Required<LocationMap<true>> => ({
  [BADGE_LOCATION.SIDEBAR]: normalizeProperty(
    getLocationValue(locations, BADGE_LOCATION.SIDEBAR),
    setFallbackLocations(fallbackLocations, configLocations)[BADGE_LOCATION.SIDEBAR],
    sidebarPermittedTypes,
  ),
  [BADGE_LOCATION.TOOLBAR]: normalizeProperty(
    getLocationValue(locations, BADGE_LOCATION.TOOLBAR),
    setFallbackLocations(fallbackLocations, configLocations)[BADGE_LOCATION.TOOLBAR],
    toolbarPermittedTypes,
  ),
  [BADGE_LOCATION.TOOLBAR_END]: normalizeProperty(
    getLocationValue(locations, BADGE_LOCATION.TOOLBAR_END),
    setFallbackLocations(fallbackLocations, configLocations)[BADGE_LOCATION.TOOLBAR_END],
    toolbarPermittedTypes,
  ),
});

/**
 * Checks whether a badge should be displayed in a location for a specific type/configuration.
 * @param param0 An object of {@link ShouldDisplayBadgeParameters}.
 * @returns A boolean indicating whether the badge should be displayed.
 */
const shouldDisplayBadge = ({
  badgeConfig,
  config,
  defaults,
  location,
  type,
}: ShouldDisplayBadgeParameters): boolean =>
  arrayIncludes(
    normalizeLocations(badgeConfig.locations, defaults, config.locations)[location],
    type,
  );

export { normalizeLocations, shouldDisplayBadge };
