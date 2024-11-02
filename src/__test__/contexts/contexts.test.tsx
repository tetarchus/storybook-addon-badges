import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockedApi } from '@/__test__/__fixtures__';
import { BadgesAddon } from '@/classes';
import { BadgesAddonContext, BadgesAddonProvider } from '@/contexts';

const ConsumerMock = () => (
  <BadgesAddonContext.Consumer>
    {props => {
      return `Context a11yActive: ${String(props?.a11yActive)}`;
    }}
  </BadgesAddonContext.Consumer>
);

describe('Contexts', () => {
  describe('BadgesAddonContext', () => {
    it('returns the value when used inside of a provider', () => {
      expect.assertions(1);
      render(
        <BadgesAddonProvider state={new BadgesAddon(mockedApi)}>
          <ConsumerMock />
        </BadgesAddonProvider>,
      );
      expect(screen.getByText(/^Context a11yActive/)).toHaveTextContent(
        'Context a11yActive: false',
      );
    });

    it('returns undefined when consumed outside of a provider', () => {
      expect.assertions(1);
      render(<ConsumerMock />);
      expect(screen.getByText(/^Context a11yActive/)).toHaveTextContent(
        'Context a11yActive: undefined',
      );
    });
  });
});
