import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import * as Stories from './Sidebar.stories';

const SidebarStories = composeStories(Stories);
const { Base } = SidebarStories;

const testId = 'sidebar';

describe('Sidebar Component', () => {
  describe('Accessibility', () => {
    it.each(Object.entries(SidebarStories))(
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
      expect.assertions(4);

      render(<Base data-testid={testId} />);
      const sidebar = screen.getByTestId(testId);
      expect(sidebar).toBeInTheDocument();
      expect(sidebar).toHaveTextContent('ExampleStory');
      expect(screen.getByTestId(`${testId}-badges`)).toBeInTheDocument();
      expect(screen.getAllByTestId(`${testId}-badges-badge`)).toHaveLength(2);
    });
  });
});
