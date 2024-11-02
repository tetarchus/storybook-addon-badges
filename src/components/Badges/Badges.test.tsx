import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import * as Stories from './Badges.stories';
import { BADGE } from '@/constants';

const BaseButtonStories = composeStories(Stories);
const { Base } = BaseButtonStories;

const testId = 'badge';

describe('Badge Component', () => {
  describe('Accessibility', () => {
    it.each(Object.entries(BaseButtonStories))(
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

      render(<Base data-testid={testId} />);
      expect(screen.getByTestId(testId)).toBeInTheDocument();
      expect(screen.getAllByTestId(`${testId}-badge`)).toHaveLength(Object.keys(BADGE).length);
    });
  });
});
