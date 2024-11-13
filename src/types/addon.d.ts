import type { PreviewWeb } from 'storybook/internal/preview-api';
import type { Renderer } from 'storybook/internal/types';
import type { AxeMatchers } from 'vitest-axe/matchers';

declare global {
  interface Window {
    /** The Storybook PreviewWeb instance. */
    __STORYBOOK_PREVIEW__: PreviewWeb<Renderer>;
  }
}

declare module 'vitest' {
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}

export {};
