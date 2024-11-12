import type { BadgeStyle } from '@/types';

/** The default base style for badges. */
const defaultBadgeStyle: Required<BadgeStyle> = {
  backgroundColor: '#EDEFF5',
  borderColor: '#474D66',
  borderRadius: '3px',
  borderStyle: 'solid',
  borderWidth: '1px',
  boxShadow: 'none',
  color: '#474D66',
  fontFamily: 'inherit',
  fontSize: '0.625rem',
  fontWeight: 'bold',
  lineHeight: '1',
  paddingBlock: '2px',
  paddingInline: '5px',
  textTransform: 'uppercase',
};

/** Base style for badges similar to github labels. */
const githubBadgeStyle: Required<BadgeStyle> = {
  ...defaultBadgeStyle,
  borderRadius: '10px',
  fontSize: '0.75rem',
  paddingInline: '8px',
  textTransform: 'lowercase',
};

export { defaultBadgeStyle, githubBadgeStyle };
