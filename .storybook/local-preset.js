const managerEntries = (entry = []) => [...entry, require.resolve('../dist/manager.js')];

const previewAnnotations = (entry = []) => [...entry, require.resolve('../dist/preview.js')];

module.exports = {
  managerEntries,
  previewAnnotations,
};
