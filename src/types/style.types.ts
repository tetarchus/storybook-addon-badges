import type { CSSProperties } from 'react';
import type { BadgeFnParameters } from './badge.types';
import type { baseStyles } from '@/config';

/** Built-in badge styles. */
type BadgeStyleBase = (typeof baseStyles)[number]; //'default' | 'github' | 'shield';

/** Alias for a non-null value of a style property. */
type StyleValue<Key extends keyof CSSProperties> = NonNullable<CSSProperties[Key]>;
/**
 * Options available for a style property. Can either be a single value, or a
 * map of theme names to its value for that theme, along with a `default` for
 * non-matched themes.
 */
type StyleProp<Key extends keyof CSSProperties> =
  | StyleValue<Key>
  | {
      // The fallback value to use when a style value is not provided for a theme.
      default: StyleValue<Key>;
      [theme: string]: StyleValue<Key>;
    };

/** Style options for a badge. */
type BadgeStyle = {
  backgroundColor?: StyleProp<'backgroundColor'>;
  borderColor?: StyleProp<'borderColor'>;
  borderRadius?: StyleProp<'borderRadius'>;
  borderStyle?: StyleProp<'borderStyle'>;
  borderWidth?: StyleProp<'borderWidth'>;
  boxShadow?: StyleProp<'boxShadow'>;
  color?: StyleProp<'color'>;
  fontFamily?: StyleProp<'fontFamily'>;
  fontSize?: StyleProp<'fontSize'>;
  fontWeight?: StyleProp<'fontWeight'>;
  lineHeight?: StyleProp<'lineHeight'>;
  paddingBlock?: StyleProp<'paddingBlock'>;
  paddingInline?: StyleProp<'paddingInline'>;
  textTransform?: StyleProp<'textTransform'>;
};

/** A {@link BadgeStyle} with all properties required. */
type FullBadgeStyle = Required<BadgeStyle>;
/** A function to dynamically create a {@link BadgeStyle}. */
type BadgeStyleFn<T = unknown> = (params: BadgeFnParameters) => BadgeStyle & T;
/** A function to dynamically create a {@link FullBadgeStyle}. */
type FullBadgeStyleFn = (params: BadgeFnParameters) => FullBadgeStyle;
/** Alias to allow for an inline, or function style. */
type BadgeStyleOrFn<T = unknown> = BadgeStyle | BadgeStyleFn<T>;

/** All static options for defining a fallback base style. */
type BaseBadgeStyle = BadgeStyleBase | (BadgeStyle & { base: BadgeStyleBase }) | FullBadgeStyle;

/** All function options for defining a fallback base style. */
type BaseBadgeStyleFn =
  | ((params: BadgeFnParameters) => BadgeStyleBase)
  | BadgeStyleFn<{ base: BadgeStyleBase }>
  | FullBadgeStyleFn;

/** All options for defining a fallback base style. */
type BaseBadgeStyleOrFn = BaseBadgeStyle | BaseBadgeStyleFn;

export type {
  BadgeStyle,
  BadgeStyleBase,
  BadgeStyleFn,
  BadgeStyleOrFn,
  BaseBadgeStyle,
  BaseBadgeStyleOrFn,
  FullBadgeStyle,
  FullBadgeStyleFn,
  StyleProp,
};
