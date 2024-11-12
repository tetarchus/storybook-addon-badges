import type { PreviewWeb } from 'storybook/internal/preview-api';
import type { Renderer } from 'storybook/internal/types';

declare global {
  interface Window {
    /** The Storybook PreviewWeb instance. */
    __STORYBOOK_PREVIEW__: PreviewWeb<Renderer>;
  }
}

export {};
