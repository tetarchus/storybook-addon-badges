import type { UserConfig } from '@commitlint/types';

/**
 * Commitlint configuration.
 * Based on commitlint/config-conventional.
 * @see [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/src/index.ts) for source
 */
const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'refactor', 'style', 'test', 'revert', 'chore'],
    ],
  },
} satisfies UserConfig;

export default commitlintConfig;
