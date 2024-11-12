import { ADDON_ID } from './addon';

const ADDON_LS_KEY = `${ADDON_ID}/state`;

// TODO: Remove these??!
// TODO: Combine these into a single localStorage object?
/** Local storage key for displaying the legacy config warning. */
const LS_LEGACY_WARNING_ID = `${ADDON_ID}-legacy-warned`;
/** The `localStorage` key for storing the new/updated state. */
const LS_NEW_TRACKER_KEY = `${ADDON_ID}-state`;
/** The `localStorage` key for tracking whether the state has been initialized. */
const LS_TRACKER_INIT_KEY = `${ADDON_ID}-initialized`;

export { ADDON_LS_KEY, LS_LEGACY_WARNING_ID, LS_NEW_TRACKER_KEY, LS_TRACKER_INIT_KEY };
