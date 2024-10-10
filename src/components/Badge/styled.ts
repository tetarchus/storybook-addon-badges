import { styled } from '@storybook/theming';

import type { StyledBadgeProps } from './prop.types';

const StyledBadge = styled.div<StyledBadgeProps>(({ config: { styles } }) => ({
  alignItems: 'center',
  backgroundColor: styles.backgroundColor,
  borderColor: styles.borderColor,
  borderRadius: styles.borderRadius,
  borderStyle: styles.borderStyle,
  borderWidth: styles.borderWidth,
  color: styles?.color,
  cursor: 'pointer',
  display: 'flex',
  flexShrink: 0,
  fontFamily: styles.fontFamily,
  fontSize: styles.fontSize,
  fontWeight: styles.fontWeight,
  justifyContent: 'center',
  lineHeight: styles.lineHeight,
  paddingBlock: styles.paddingBlock,
  paddingInline: styles.paddingInline,
  textTransform: styles.textTransform,
}));

export { StyledBadge };
