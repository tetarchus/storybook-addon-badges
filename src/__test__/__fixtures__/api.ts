import * as api from 'storybook/internal/manager-api';

import { defaultConfig } from '@/config';
import { PARAM_BADGES_KEY, PARAM_CONFIG_KEY } from '@/constants';

import type { API } from 'storybook/internal/manager-api';

/** Mock values return from getCurrentParameters. */
const mockInitialValues: Record<string, unknown> = {
  [PARAM_BADGES_KEY]: [],
  [PARAM_CONFIG_KEY]: defaultConfig,
};

/** Mock globals function to prevent errors. */
const mockGlobalsFn = () => ({});

/** Basic mock Storybook API for use in tests/internal stories. */
const mockApi: API = {
  ...(api as unknown as API),
  getGlobals: mockGlobalsFn,
  getStoryGlobals: mockGlobalsFn,
  getUserGlobals: mockGlobalsFn,
  getCurrentParameter: <S>(_storyId: string, parameterName?: string) => {
    if (!parameterName) return mockInitialValues as S;
    return mockInitialValues[parameterName] as S;
  },
};

export { mockApi };
