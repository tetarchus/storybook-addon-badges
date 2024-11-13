import { addons, useCallback, useEffect, useState } from 'storybook/internal/preview-api';

import { EVENTS } from '@/constants';

import type { DecoratorFunction, PreparedStory, Renderer } from 'storybook/internal/types';

const PreviewInterface: DecoratorFunction<Renderer> = (StoryFn, context) => {
  const id = context.id;
  const channel = addons.getChannel();
  const [indexRequired, setIndexRequired] = useState(false);

  const onResponse = useCallback(
    (required: boolean, triggeringId: string) => {
      if (triggeringId === id) {
        setIndexRequired(required);
      }
    },
    [id],
  );

  useEffect(() => {
    channel.on(EVENTS.CHECK_INDEX_RESPONSE, onResponse);

    return (): void => void channel.off(EVENTS.CHECK_INDEX_RESPONSE, onResponse);
  }, [channel, onResponse]);

  useEffect(() => {
    channel.emit(EVENTS.CHECK_INDEX_REQUIRED, id);
  }, [channel, id]);

  useEffect(() => {
    const initialiseStories = async () => {
      const preview = window.__STORYBOOK_PREVIEW__;
      const store = preview.storyStore;
      const index = store.storyIndex;

      const indexPromises: Array<Promise<PreparedStory<Renderer>>> = [];
      const indexEntries = Object.entries(index.entries);

      // Work through the stories
      for (const [key, value] of indexEntries) {
        if (value.type === 'story') {
          const story = store.loadStory({ storyId: key });
          indexPromises.push(story);
        }
      }
      const stories = await Promise.all(indexPromises);

      channel.emit(EVENTS.INDEX, {
        index: indexEntries,
        stories,
      });
    };

    if (indexRequired) {
      void initialiseStories();
    }
  }, [channel, indexRequired]);

  return StoryFn();
};

export { PreviewInterface };
