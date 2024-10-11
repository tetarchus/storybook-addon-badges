import { styled } from '@storybook/theming';

import type { BadgesWrapperProps } from './prop.types';

/** Wrapper component around the badges to display them together. */
const BadgesWrapper = styled.div<BadgesWrapperProps>(({ location, theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: location === 'sidebar' ? 'wrap' : 'nowrap',
  gap: theme.layoutMargin,
  justifyContent: location === 'sidebar' ? 'flex-start' : 'space-evenly',
  paddingInline: location === 'sidebar' ? '0px' : theme.layoutMargin / 2,
  rowGap: theme.layoutMargin / 3,
}));

export { BadgesWrapper };
