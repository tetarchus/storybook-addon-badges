import type { FullConfig } from '@/types';
import type { API_LeafEntry } from '@storybook/types';

/**
 * Gets tags for a story, filtering out any defined `excludeTags`.
 * @param story The story data from the Storybook API.
 * @param config The addon configuration.
 * @returns An array of tags for a story, with those defined in `excludeTags`
 * removed.
 */
const getStoryTags = (story: API_LeafEntry, config: FullConfig): string[] => {
  if (!config.useTags) {
    return [];
  }

  return story.tags.filter(tag => !config.excludeTags.includes(tag));
};

export { getStoryTags };
