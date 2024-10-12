import { useStorybookApi } from 'storybook/internal/manager-api';

import { PARAM_BADGES_KEY } from '@/constants';
import { generateStoryBadges, getStoryTags } from '@/utils';

import type { FullConfig } from '@/types';
import type { API_LeafEntry } from '@storybook/types';

/**
 * Convenience hook for getting all badges for a specific story.
 * @param config The addon configuration.
 * @param item The item to get badges for.
 * @returns An array of badge IDs for the story.
 */
const useStoryBadges = (config: FullConfig, item?: API_LeafEntry): string[] => {
  const api = useStorybookApi();
  const currentStory = item ?? api.getCurrentStoryData();
  const storyBadges = api.getCurrentParameter<string[]>(PARAM_BADGES_KEY) || [];
  const storyTags = getStoryTags(currentStory, config);

  return generateStoryBadges([...storyBadges, ...storyTags]);
};

export { useStoryBadges };
