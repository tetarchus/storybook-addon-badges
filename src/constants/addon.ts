import { AUTOBADGES } from './autobadges';

/** ID of the addon. */
const ADDON_ID = 'storybook-addon-badges';
/** The name of the addon. */
const ADDON_TITLE = 'Storybook Addon Badges';
/** Base Documentation URL. */
const DOCS_URL = 'https://tetarchus.github.io/storybook-addon-badges';

/** ID of the toolbar addon. */
const TOOL_ID = `${ADDON_ID}/tool`;
/** ID of the toolbar-extra addon. */
const TOOL_EXTRA_ID = `${ADDON_ID}/extra`;

/** The parameters key containing the base addon configuration. */
const PARAM_CONFIG_KEY = 'badgesConfig';
/** The parameters key containing the badges that apply to a story. */
const PARAM_BADGES_KEY = 'badges';
/** Parameter that allows assigning a unique ID to a storybook. */
const PARAM_STORYBOOK_ID = 'storybookId';
/** Default ID in local storage for the storybook if one is not provided. */
const DEFAULT_STORYBOOK_ID = 'default';

/** Places in the UI that a badge can appear. */
const BADGE_LOCATION = {
  SIDEBAR: 'sidebar',
  TOOLBAR: 'toolbar',
  TOOLBAR_END: 'toolbar-end',
} as const;

/** Default badge ID's as a convenience map. */
const BADGE = {
  ...AUTOBADGES,
  BETA: 'beta',
  DEFAULT: 'default',
  DEPRECATED: 'deprecated',
  EXPERIMENTAL: 'experimental',
  NEEDS_REVISION: 'needs-revision',
  OBSOLETE: 'obsolete',
  STABLE: 'stable',
} as const;

export {
  ADDON_ID,
  ADDON_TITLE,
  BADGE,
  BADGE_LOCATION,
  DEFAULT_STORYBOOK_ID,
  DOCS_URL,
  PARAM_BADGES_KEY,
  PARAM_CONFIG_KEY,
  PARAM_STORYBOOK_ID,
  TOOL_EXTRA_ID,
  TOOL_ID,
};
