import { convert, themes } from '@storybook/theming';
import * as managerApi from 'storybook/internal/manager-api';

import { defaultConfig } from '@/config';
import { BADGE, PARAM_BADGES_KEY, PARAM_CONFIG_KEY } from '@/constants';

import { storyEntry } from './storybook';

import type { API } from 'storybook/internal/manager-api';

/** Theme vars to pass into mock manager state. */
const mockedThemeVars = themes.dark;
/** Mocked theme to use in mock theme provider. */
const mockedTheme = convert();

/** Mock values return from getCurrentParameters. */
const mockInitialValues: Record<string, unknown> = {
  [PARAM_BADGES_KEY]: Object.values(BADGE),
  [PARAM_CONFIG_KEY]: defaultConfig,
};

/** Mock globals function to prevent errors. */
const mockGlobalsFn = () => ({});

/** Mock function for the API's `getParameter` function. */
const getParametersMock = <S>(
  _storyId:
    | string
    | {
        storyId: string;
        refId: string;
      },
  parameterName?: string,
) => {
  if (!parameterName) return mockInitialValues as S;
  return mockInitialValues[parameterName] as S;
};

/** Mock function for the API's `getCurrentParameter` function. */
const getCurrentParameterMock = <S>(parameterName?: string) => {
  if (!parameterName) return mockInitialValues as S;
  return mockInitialValues[parameterName] as S;
};

/** Basic mock Storybook API for use in tests/internal stories. */
const api: API = {
  ...(managerApi as unknown as API),
  getGlobals: mockGlobalsFn,
  getStoryGlobals: mockGlobalsFn,
  getUserGlobals: mockGlobalsFn,
  getCurrentParameter: getCurrentParameterMock,
  getParameters: getParametersMock,
  getData: () => storyEntry,
  getCurrentStoryData: () => storyEntry,
  getCurrentVersion: () => ({ version: '8.0.0' }),
};

export { api, mockedTheme, mockedThemeVars, mockInitialValues };
