import { setProjectAnnotations } from '@storybook/react';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, expect } from 'vitest';
import * as axeMatchers from 'vitest-axe/matchers';

import preview from '../.storybook/preview';
import addonPreview from '../src/preview';

const annotations = setProjectAnnotations({ ...preview, ...addonPreview });

expect.extend(axeMatchers);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);

afterEach(() => {
  cleanup();
});
