/**
 * Keys in the PreparedStory data that are non-serializable and should be
 * ignored when hashing.
 */
const excludedHashKeys = [
  'applyBeforeEach',
  'applyLoaders',
  'component',
  'mount',
  'originalStoryFn',
  'playFunction',
  'renderToCanvas',
  'runStep',
  'subcomponents',
  'testingLibraryRender',
  'unboundStoryFn',
  'undecoratedStoryFn',
];

/**
 * Options to pass in to ohash to ensure consistent hashes are returned.
 */
const hashOptions = {
  unorderedArrays: true,
  unorderedObjects: true,
  unorderedSets: true,
  respectType: false,
  excludeKeys: (key: string) => excludedHashKeys.includes(key),
};

export { hashOptions };
