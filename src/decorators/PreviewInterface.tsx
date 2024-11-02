import { addons, useCallback, useEffect, useState } from 'storybook/internal/preview-api';

import { EVENTS } from '@/constants';

import type { DecoratorFunction, PreparedStory, Renderer } from 'storybook/internal/types';

const PreviewInterface: DecoratorFunction<Renderer> = (StoryFn, context) => {
  // console.log('Preview Context', context);
  const channel = addons.getChannel();
  const [indexRequired, setIndexRequired] = useState(false);

  const onResponse = useCallback((required: boolean) => {
    setIndexRequired(required);
  }, []);

  useEffect(() => {
    if (context.viewMode === 'story') {
      channel.on(EVENTS.CHECK_INDEX_RESPONSE, onResponse);
      return (): void => void channel.off(EVENTS.CHECK_INDEX_RESPONSE, onResponse);
    }

    return;
  }, [channel, context.viewMode, onResponse]);

  useEffect(() => {
    if (context.viewMode === 'story') {
      channel.emit(EVENTS.CHECK_INDEX_REQUIRED);
    }
  }, [channel, context.viewMode]);

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

      channel.emit(EVENTS.INDEXED, {
        index: indexEntries,
        stories,
        // TODO: Send actual data if possible
        test: [],
      });
    };

    if (indexRequired) {
      void initialiseStories();
    }
  }, [channel, indexRequired]);

  return StoryFn();
};

export { PreviewInterface };
