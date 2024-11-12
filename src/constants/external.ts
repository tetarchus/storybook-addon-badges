const EXTERNAL_ADDONS = {
  A11Y: 'storybook/a11y',
  JEST: 'storybookjs/test',
  VITEST: 'storybook/test',
};

const EXTERNAL = {
  A11Y: {
    ADDON_ID: EXTERNAL_ADDONS.A11Y,
    EVENTS: {
      MANUAL: `${EXTERNAL_ADDONS.A11Y}/manual`,
      RESULT: `${EXTERNAL_ADDONS.A11Y}/result`,
      REQUEST: `${EXTERNAL_ADDONS.A11Y}/request`,
      RUNNING: `${EXTERNAL_ADDONS.A11Y}/running`,
    },
    PARAM_KEY: 'a11y',
    PANEL_ID: `${EXTERNAL_ADDONS.A11Y}/panel`,
  },
  JEST: {
    ADDON_ID: EXTERNAL_ADDONS.JEST,
    EVENTS: {
      ADD_TESTS: `${EXTERNAL_ADDONS.JEST}/add_tests`,
    },
    PANEL_ID: `${EXTERNAL_ADDONS.JEST}/panel`,
  },
  VITEST: {
    ADDON_ID: EXTERNAL_ADDONS.VITEST,
    PANEL_ID: `${EXTERNAL_ADDONS.VITEST}/panel`,
  },
} as const;

export { EXTERNAL };
