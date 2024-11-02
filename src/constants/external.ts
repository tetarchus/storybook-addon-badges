/** External addons that we may interface with to display autobadges. */
const EXTERNAL_ADDONS = {
  // TODO: May not be needed with the testing plugin
  /** Accessibility testing - allows for showing pass/fail badges. */
  A11Y: 'storybook/a11y',
  /** The legacy jest addon for displaying test results. */
  JEST: 'storybookjs/test',
  /** The new testing plugin for vitest. Currently experimental. */
  VITEST: 'storybook/test',
};

/** Map of external addons to various IDs they use, but don't export. */
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
