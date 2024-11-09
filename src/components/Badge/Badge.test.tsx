import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { versionBadge } from '@/__test__/__fixtures__';

import * as Stories from './Badge.stories';
import * as InternalStories from './BadgeInternal.stories';

const BadgeStories = composeStories(Stories);
const BadgeInternalStories = composeStories(InternalStories);
const { Beta } = BadgeStories;
const { Base } = BadgeInternalStories;

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

    it.each(Object.entries(BadgeInternalStories))(
      'passes accessibility tests - internal - %s',
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

  describe('Docs', () => {
    it('displays the expected text from the docs example -- delimited badge', () => {
      expect.assertions(1);
      render(<Base badgeId='version' data-testid={testId} config={versionBadge} content='3.0.0' />);
      const badge = screen.getByTestId(testId);
      expect(badge).toHaveTextContent('v3.0.0');
    });

    it('displays the expected text from the docs example -- with displayContentOnly=false', () => {
      expect.assertions(1);
      render(
        <Base
          badgeId='version'
          data-testid={testId}
          config={{ ...versionBadge, title: ({ content }) => content, displayContentOnly: false }}
          content='version:3.0.0'
        />,
      );
      const badge = screen.getByTestId(testId);
      expect(badge).toHaveTextContent('version:3.0.0');
    });
  });
});
