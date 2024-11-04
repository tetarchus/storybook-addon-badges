import { ADDON_ID } from './addon';

/** The key to store persisted state to in localStorage. */
const LOCAL_STORAGE_KEY = `${ADDON_ID}/store`;

/** Notification message ID for the legacy warning. */
const LEGACY_NOTIFICATION_ID = `${ADDON_ID}/legacy-warning`;

/** Events emitted by the addon. */
const EVENTS = {
  /** Emitted once indexing is complete and current/saved states have been updated. */
  INDEX_COMPLETE: `${ADDON_ID}/index-complete`,
  /** Emitted when the PreviewInterface has finished preparing stories. */
  INDEX: `${ADDON_ID}/index`,
  /** Emitted by the PreviewInterface to check with the BadgesAddon whether to prepare stories for indexing. */
  CHECK_INDEX_REQUIRED: `${ADDON_ID}/check`,
  /** Emitted by the BadgesAddon to confirm whether to prepare stories for indexing. */
  CHECK_INDEX_RESPONSE: `${ADDON_ID}/check-response`,
};

export { EVENTS, LEGACY_NOTIFICATION_ID, LOCAL_STORAGE_KEY };
