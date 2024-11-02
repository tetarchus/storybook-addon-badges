import { Badge } from '.';

import { DELIMITER, storyEntry } from '@/__test__/__fixtures__';
import { defaultConfig } from '@/config';
import { BADGE } from '@/constants';
import { StorybookManagerMock } from '@/decorators/StorybookManagerMock';
import { getFullBadgeConfig, getFullConfig } from '@/utils';

import type { BadgeStyleBase } from '@/types/style.types';
import type { Meta, StoryObj } from '@storybook/react';

/** Props for the proxy wrapper. */
type BadgeWrapperProps = {
  badgeId: (typeof BADGE)[keyof typeof BADGE];
  baseStyle: BadgeStyleBase;
  'data-testid'?: string | undefined;
};

/** Util function to get the full config with limited props. */
const getBadgeConfig = (badgeId: string, baseStyle: BadgeStyleBase) =>
  getFullBadgeConfig(badgeId, getFullConfig({ ...defaultConfig, baseStyle }));

/** Badge component proxy to allow display of built-in badges and their styles with minimal props. */
const BadgeWrapper = (props: BadgeWrapperProps) => (
  <Badge
    badgeId={props.badgeId}
    config={getBadgeConfig(props.badgeId, props.baseStyle)}
    data-testid={props['data-testid']}
    content='Replaced'
    delimiter={DELIMITER}
    entry={storyEntry}
  />
);

const meta = {
  title: 'Addon/Badge',
  argTypes: {
    baseStyle: {
      control: 'select',
      options: ['default', 'github'],
    },
  },
  component: BadgeWrapper,
  decorators: [StorybookManagerMock],
  tags: ['autodocs', 'meta'],
} satisfies Meta<typeof BadgeWrapper>;

type Story = StoryObj<typeof meta>;

const Beta: Story = {
  args: {
    badgeId: BADGE.BETA,
    baseStyle: 'default',
  },
};

const Default: Story = {
  args: {
    ...Beta.args,
    badgeId: BADGE.DEFAULT,
  },
};

const Deprecated: Story = {
  args: {
    ...Beta.args,
    badgeId: BADGE.DEPRECATED,
  },
};

const Experimental: Story = {
  args: {
    ...Beta.args,
    badgeId: BADGE.EXPERIMENTAL,
  },
};

const NeedsRevision: Story = {
  args: {
    ...Beta.args,
    badgeId: BADGE.NEEDS_REVISION,
  },
};

const New: Story = {
  args: {
    ...Beta.args,
    badgeId: BADGE.NEW,
  },
};

const Obsolete: Story = {
  args: {
    ...Beta.args,
    badgeId: BADGE.OBSOLETE,
  },
};

const Stable: Story = {
  args: {
    ...Beta.args,
    badgeId: BADGE.STABLE,
  },
};

const Updated: Story = {
  args: {
    ...Beta.args,
    badgeId: BADGE.UPDATED,
  },
};

export default meta;
export { Beta, Default, Deprecated, Experimental, NeedsRevision, New, Obsolete, Stable, Updated };
