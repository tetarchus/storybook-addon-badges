import type { IndexEntry, PreparedStory, Renderer } from 'storybook/internal/types';
import type { EntryType } from './location.types';

/** The prepared index from PreviewInterface. Used to generate autobadges. */
type IndexerResult = {
  /** The internal index from the preview converted to a tuple array. */
  index: [string, IndexEntry][];
  /** An array of prepared stories so we can hash their data including args/parameters. */
  stories: PreparedStory<Renderer>[];
};

/**
 * A11y test outcome state.
 */
type A11yState = {
  /** The number of incomplete/inconclusive results. */
  incomplete: number;
  /** The number of passes. */
  passes: number;
  /** The number of accessibility violations. */
  violations: number;
};

/**
 * Testing suite outcome state.
 */
type TestState = {
  /** The number of test failures. */
  failures: number;
  /** The number of test passes. */
  passes: number;
  /** The number of skipped tests/todos. */
  skipped: number;
};

/**
 * The tracked state for a single story.
 */
type StoryState = {
  /** The outcome of a11y checks for a story. */
  a11y?: A11yState | null;
  /** Hashed data for the component, used to compare whether changes have been made. */
  hash: string;
  /** The ID of the story. */
  id: string;
  /** The outcome of testing for the component. */
  test?: TestState | null;
  /** The type of story. */
  type: EntryType;
};

/**
 * Addon state that is persisted to localStorage.
 */
type AddonState = {
  /** Whether a warning about using legacy config has been displayed. */
  legacyWarningShown: boolean;
  /** Individual story states for autobadge tracking. */
  storyStates: StoryState[];
};

/** The type of the state data. */
type StateType = 'current' | 'saved';

/** Content of internal index. */
type InternalIndex = IndexEntry & Partial<PreparedStory<Renderer>> & { hash: string };

export type {
  A11yState,
  AddonState,
  IndexerResult,
  InternalIndex,
  StateType,
  StoryState,
  TestState,
};
