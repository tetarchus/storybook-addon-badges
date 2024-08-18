import type { ComponentProps, CSSProperties } from 'react';
import type { TooltipMessage } from 'storybook/internal/components';

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

type BadgesConfig = {
  autobadges?: () => string[];
  badges: Record<string, BadgeConfig>;
};

type TooltipConfig = Omit<ComponentProps<typeof TooltipMessage>, 'children'> | string;

export type { BadgeConfig, BadgesConfig, BadgeStyles, TooltipConfig };
