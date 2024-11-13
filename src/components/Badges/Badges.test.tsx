import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { BADGE } from '@/constants';

import * as Stories from './Badges.stories';

const BadgesStories = composeStories(Stories);
const { Base } = BadgesStories;

const testId = 'badge';

describe('Badges Component', () => {
  describe('Accessibility', () => {
    it.each(Object.entries(BadgesStories))(
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
      expect(screen.getByTestId(testId)).toBeInTheDocument();
      expect(screen.getAllByTestId(`${testId}-badge`)).toHaveLength(Object.keys(BADGE).length);
    });
  });
});
