const managerEntries = (entry = []) => [...entry, require.resolve('../dist/manager.js')];

module.exports = {
  managerEntries,
};
