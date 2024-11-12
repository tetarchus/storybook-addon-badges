import { styled } from '@storybook/theming';

import { getThemeValue } from '@/utils';

import type { StyledBadgeProps } from './prop.types';
import type { CSSObject } from '@storybook/theming';

/** Base style that doesn't change. */
const baseStyle: CSSObject = {
  alignItems: 'center',
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'center',
};

/** The main badge container. */
const StyledBadge = styled.div<StyledBadgeProps>(({ badgeStyle, hasTooltip, uiTheme }) => ({
  ...baseStyle,
  backgroundColor: getThemeValue(badgeStyle.backgroundColor, uiTheme),
  borderColor: getThemeValue(badgeStyle.borderColor, uiTheme),
  borderRadius: getThemeValue(badgeStyle.borderRadius, uiTheme),
  borderStyle: getThemeValue(badgeStyle.borderStyle, uiTheme),
  borderWidth: getThemeValue(badgeStyle.borderWidth, uiTheme),
  boxShadow: getThemeValue(badgeStyle.boxShadow, uiTheme),
  color: getThemeValue(badgeStyle.color, uiTheme),
  cursor: hasTooltip ? 'pointer' : 'auto',
  fontFamily: getThemeValue(badgeStyle.fontFamily, uiTheme),
  fontSize: getThemeValue(badgeStyle.fontSize, uiTheme),
  fontWeight: getThemeValue(badgeStyle.fontWeight, uiTheme),
  lineHeight: getThemeValue(badgeStyle.lineHeight, uiTheme),
  paddingBlock: getThemeValue(badgeStyle.paddingBlock, uiTheme),
  paddingInline: getThemeValue(badgeStyle.paddingInline, uiTheme),
  textTransform: getThemeValue(badgeStyle.textTransform, uiTheme),
}));

export { StyledBadge };
