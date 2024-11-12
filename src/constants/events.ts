import { ADDON_ID } from './addon';

const INITIALISE_NOTIFICATION = `${ADDON_ID}/initialize`;
const LOCAL_STORAGE_KEY = `${ADDON_ID}/store`;

// TODO: Not used...
const PERSIST = {
  FOREVER: 'permanent',
  NONE: 'none',
  SESSION: 'session',
} as const;

const EVENTS = {
  INDEXED: `${ADDON_ID}/indexed`,
  REQUEST: `${ADDON_ID}/request`,
  RESPONSE: `${ADDON_ID}/response`,

  // OLD?
  A11Y_RESULTS: `${ADDON_ID}/a11y-results`,
  INIT: `${ADDON_ID}/init`,
  INIT_COMPLETE: `${ADDON_ID}/init-complete`,
  PREVIEW_AVAILABLE: `${ADDON_ID}/preview`,
  REGISTER_STORY: `${ADDON_ID}/register`,
  INDEX_READY: `${ADDON_ID}/index-ready`,
  INIT_RESPONSE: `${ADDON_ID}/init-response`,
  REGISTERED_STORY: `${ADDON_ID}/story-register`,
};

export { EVENTS, INITIALISE_NOTIFICATION, LOCAL_STORAGE_KEY, PERSIST };
