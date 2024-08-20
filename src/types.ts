import type { ComponentProps, CSSProperties } from 'react';
import type { TooltipMessage } from 'storybook/internal/components';

type TooltipMessageProps = Omit<ComponentProps<typeof TooltipMessage>, 'children'>;
type TooltipConfig = TooltipMessageProps | string;

type BadgeStyles = {
  backgroundColor?: CSSProperties['backgroundColor'];
  borderColor?: CSSProperties['borderColor'];
  borderRadius?: CSSProperties['borderRadius'];
  borderStyle?: CSSProperties['borderStyle'];
  borderWidth?: CSSProperties['borderWidth'];
  color?: CSSProperties['color'];
  fontFamily?: CSSProperties['fontFamily'];
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
  lineHeight?: CSSProperties['lineHeight'];
  paddingBlock?: CSSProperties['paddingBlock'];
  paddingInline?: CSSProperties['paddingInline'];
  textTransform?: CSSProperties['textTransform'];
};

type BadgeConfig = {
  styles?: BadgeStyles;
  title?: string;
  tooltip?: TooltipConfig;
};

type BadgesMap = Record<string, BadgeConfig>;
type NewBadgesConfig = {
  // autobadges?: () => string[];
  badges: BadgesMap;
};

type BadgesConfig = BadgesMap | NewBadgesConfig;

export type {
  BadgeConfig,
  BadgesMap,
  BadgesConfig,
  BadgeStyles,
  NewBadgesConfig,
  TooltipConfig,
  TooltipMessageProps,
};
