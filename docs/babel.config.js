module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  plugins: [['babel-plugin-tsconfig-paths', { tsconfig: 'docs/tsconfig.json' }]],
};
