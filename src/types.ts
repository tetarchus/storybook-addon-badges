import type { BADGE_LOCATION } from '@/constants';
import type {
  API_ComponentEntry,
  API_DocsEntry,
  API_GroupEntry,
  API_RootEntry,
  API_StoryEntry,
} from '@storybook/types';
import type { ComponentProps, CSSProperties } from 'react';
import type { TooltipMessage } from 'storybook/internal/components';
import type { RequiredDeep } from 'type-fest';

/** Available locations to display badges. */
type BadgeLocation = (typeof BADGE_LOCATION)[keyof typeof BADGE_LOCATION];
/** Built-in badge styles. */
type BadgeStyleBase = 'default' | 'github';
/** Props to pass to the TooltipMessage component from storybook. */
type TooltipMessageProps = Omit<ComponentProps<typeof TooltipMessage>, 'children'>;
/** Badge tooltip configuration for a badge. */
type TooltipConfig = TooltipMessageProps | string;
/** A sidebar story entry that can be of any valid kind. */
type StoryEntry =
  | API_ComponentEntry
  | API_DocsEntry
  | API_GroupEntry
  | API_RootEntry
  | API_StoryEntry;

/** Style options for a badge. */
type BadgeStyle = {
  backgroundColor?: NonNullable<CSSProperties['backgroundColor']>;
  borderColor?: NonNullable<CSSProperties['borderColor']>;
  borderRadius?: NonNullable<CSSProperties['borderRadius']>;
  borderStyle?: NonNullable<CSSProperties['borderStyle']>;
  borderWidth?: NonNullable<CSSProperties['borderWidth']>;
  color?: NonNullable<CSSProperties['color']>;
  fontFamily?: NonNullable<CSSProperties['fontFamily']>;
  fontSize?: NonNullable<CSSProperties['fontSize']>;
  fontWeight?: NonNullable<CSSProperties['fontWeight']>;
  lineHeight?: NonNullable<CSSProperties['lineHeight']>;
  paddingBlock?: NonNullable<CSSProperties['paddingBlock']>;
  paddingInline?: NonNullable<CSSProperties['paddingInline']>;
  textTransform?: NonNullable<CSSProperties['textTransform']>;
};

/** Configuration for a single badge. */
type BadgeConfig = {
  /** The locations that the badge should display. */
  location?: BadgeLocation[];
  /** The style of the badge. */
  styles?: BadgeStyle;
  /** The text to display by default. */
  title?: string;
  /** Tooltip to display on hover. */
  tooltip?: TooltipConfig;
};
/** Full configuration object containing parsed fallback values. */
type FullBadgeConfig = RequiredDeep<Omit<BadgeConfig, 'tooltip'>> & Pick<BadgeConfig, 'tooltip'>;

/** Available badges configuration. */
type BadgesMap = Record<string, BadgeConfig>;

/** Addon configuration object. */
type NewBadgesConfig = {
  /** The defined badge styles. */
  badges: BadgesMap;
  /** The default style to use when no value is given in `badges`. */
  baseStyle: BadgeStyleBase | (BadgeStyle & { base: BadgeStyleBase });
  /** The names of tags to exclude when generating badges from tags. */
  excludeTags?: string[];
  /** Default locations to display badges unless their {@link BadgeConfig} overrides it. */
  locations?: BadgeLocation[];
  /** Whether to generate badges from tags. */
  useTags?: boolean;
};

/** Addon configuration using just a badge map, or the new-style configuration object. */
type BadgesConfig = BadgesMap | NewBadgesConfig;
/** Merged configuration containing all required values. */
type FullConfig = Required<Omit<NewBadgesConfig, 'baseStyle'>> & {
  baseStyle: RequiredDeep<BadgeStyle>;
};

export type {
  BadgeConfig,
  BadgeLocation,
  BadgesMap,
  BadgesConfig,
  BadgeStyle,
  FullConfig,
  FullBadgeConfig,
  NewBadgesConfig,
  StoryEntry,
  TooltipConfig,
  TooltipMessageProps,
};
