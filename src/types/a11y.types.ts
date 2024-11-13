import type axe from 'axe-core';

/**
 * Result of `storybook-addon-a11y` check on a component, accounting for an empty result
 * which only includes the empty arrays.
 */
type A11yResult = Partial<axe.AxeResults> &
  Pick<axe.AxeResults, 'incomplete' | 'passes' | 'violations'>;

export type { A11yResult };
