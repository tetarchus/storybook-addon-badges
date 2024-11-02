import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import * as Stories from './Toolbar.stories';

const ToolbarStories = composeStories(Stories);
const { Base } = ToolbarStories;

const testId = 'toolbar';

describe('Toolbar Component', () => {
  describe('Accessibility', () => {
    it.each(Object.entries(ToolbarStories))(
      'passes accessibility tests - %s',
      async (_name, Story) => {
        expect.assertions(1);
        const { container } = render(<Story />);
        const AxeResults = await axe(container);
        expect(AxeResults).toHaveNoViolations();
      },
    );
  });

  describe('Display', () => {
    it('displays the correct elements', () => {
      expect.assertions(2);

      render(<Base data-testid={testId} />);
      const sidebar = screen.getByTestId(testId);
      expect(sidebar).toBeInTheDocument();
      expect(screen.getAllByTestId(`${testId}-badge`)).toHaveLength(9);
    });
  });
});
