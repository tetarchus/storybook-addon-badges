// Setting this as a .js file will allow us to run commands that are relevant
// to a file (e.g test using the correct config for that file) in future

const lintstagedConfig = {
  '*': [
    'prettier --check',
    'eslint --no-warn-ignored --flag unstable_ts_config',
    'vitest related --run --no-coverage',
  ],
};

export default lintstagedConfig;
