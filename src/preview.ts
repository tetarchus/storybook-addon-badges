import { PreviewInterface } from '@/decorators';

import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';

const preview: ProjectAnnotations<Renderer> = {
  decorators: [PreviewInterface],
};

export default preview;
