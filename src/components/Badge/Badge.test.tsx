import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import * as Stories from './Badge.stories';

const BadgeStories = composeStories(Stories);
const { Beta } = BadgeStories;

const testId = 'badge';

describe('Badge Component', () => {
  describe('Accessibility', () => {
    it.each(Object.entries(BadgeStories))(
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
    it('displays the correct text', () => {
      expect.assertions(2);

      render(<Beta data-testid={testId} />);
      const badge = screen.getByTestId(testId);
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('Beta');
    });
  });
});
