import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import * as Stories from './BadgeTooltip.stories';

const BadgeTooltipStories = composeStories(Stories);
const { Basic, Rich } = BadgeTooltipStories;

const testId = 'badge-tooltip';
/** Test ID applied by Storybook to tooltips. */
const existingTestId = 'tooltip';

describe('BadgeTooltip Component', () => {
  describe('Accessibility', () => {
    it.each(Object.entries(BadgeTooltipStories))(
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
    it('displays the correct text - Basic', () => {
      expect.assertions(3);

      render(<Basic data-testid={testId} />);
      const trigger = screen.getByTestId(testId);
      expect(trigger).toBeInTheDocument();
      const badge = screen.getByTestId(existingTestId);
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('This is a basic string tooltip!');
    });

    it('displays the correct text - Rich', () => {
      expect.assertions(3);

      render(<Rich data-testid={testId} />);
      const trigger = screen.getByTestId(testId);
      expect(trigger).toBeInTheDocument();
      const badge = screen.getByTestId(existingTestId);
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('Rich Tooltip!');
    });
  });
});
