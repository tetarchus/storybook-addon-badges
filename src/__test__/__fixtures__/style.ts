import type { FullBadgeStyle, StyleProp } from '@/types';

/** Example full style for use in tests. */
const fullStyle: FullBadgeStyle = {
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

/** Example style prop for use in tests. */
const styleProp: StyleProp<'backgroundColor'> = { default: '#00C7AC', dark: '#C7AC00' };

export { fullStyle, styleProp };
