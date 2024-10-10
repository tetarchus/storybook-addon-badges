import { styled } from '@storybook/theming';

import type { BadgesWrapperProps } from './prop.types';

/** Wrapper component around the badges to display them together. */
const BadgesWrapper = styled.div<BadgesWrapperProps>(({ placement, theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: placement === 'sidebar' ? 'wrap' : 'nowrap',
  gap: theme.layoutMargin,
  justifyContent: placement === 'sidebar' ? 'flex-start' : 'space-evenly',
  paddingInline: placement === 'sidebar' ? '0px' : theme.layoutMargin / 2,
  rowGap: theme.layoutMargin / 3,
}));

export { BadgesWrapper };
