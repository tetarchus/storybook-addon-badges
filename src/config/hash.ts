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

const hashOptions = {
  unorderedArrays: true,
  unorderedObjects: true,
  unorderedSets: true,
  respectType: false,
  excludeKeys: (key: string) => excludedHashKeys.includes(key),
};

// TODO: Add "attached-mdx" to excluded tags default

export { hashOptions };
