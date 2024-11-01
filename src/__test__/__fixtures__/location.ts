import type { LocationMap } from '@/types';

/** Example full location config for use in tests. */
const fullLocationMap: Required<LocationMap<true>> = {
  'sidebar': ['component', 'story'],
  'toolbar': ['story'],
  'toolbar-end': ['docs'],
};

export { fullLocationMap };
