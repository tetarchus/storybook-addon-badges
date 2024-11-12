import { useChannel, useEffect } from 'storybook/internal/preview-api';

import { EVENTS } from '@/constants';

import type {
  PreparedStory,
  Renderer,
  StoryContext,
  PartialStoryFn as StoryFunction,
} from 'storybook/internal/types';

const PreviewInterface = (StoryFn: StoryFunction<Renderer>, context: StoryContext<Renderer>) => {
  console.log('Preview Context', context);
  const emit = useChannel({});

  useEffect(() => {
    const initialiseStories = async () => {
      const preview = window.__STORYBOOK_PREVIEW__;
      const store = preview.storyStore;
      const index = store.storyIndex;

      const indexPromises: Array<Promise<PreparedStory<Renderer>>> = [];
      const indexEntries = Object.entries(index.entries);

      // Work through the stories
      for (const [key, value] of indexEntries) {
        if (value.type === 'docs') {
          // console.log('Docs - not indexing currently');
        } else {
          const story = store.loadStory({ storyId: key });
          indexPromises.push(story);
        }
      }
      const stories = await Promise.all(indexPromises);

      emit(EVENTS.INDEXED, {
        index: indexEntries,
        stories,
        // TODO: Send actual data if possible
        test: [],
      });
    };

    void initialiseStories();
  }, [emit]);

  return StoryFn();
};

export { PreviewInterface };
