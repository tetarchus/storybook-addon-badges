import { BADGE_LOCATION } from '@/constants';
import type { LocationMap } from '@/types';

/** The default values for which story types can appear where. */
const defaultLocations: Required<LocationMap> = {
  [BADGE_LOCATION.SIDEBAR]: ['component', 'docs', 'story'],
  [BADGE_LOCATION.TOOLBAR]: ['docs', 'story'],
  [BADGE_LOCATION.TOOLBAR_END]: ['docs', 'story'],
};

export { defaultLocations };
