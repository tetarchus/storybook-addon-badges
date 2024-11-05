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

const Default: Story = {
  args: {
    badgeId: BADGE.DEFAULT,
    baseStyle: 'default',
  },
};

const A11yCheck: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.A11Y_CHECK,
  },
};

const A11yFail: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.A11Y_FAIL,
  },
};

const A11yPass: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.A11Y_PASS,
  },
};

const Beta: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.BETA,
  },
};

const Deprecated: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.DEPRECATED,
  },
};

const Experimental: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.EXPERIMENTAL,
  },
};

const NeedsRevision: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.NEEDS_REVISION,
  },
};

const New: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.NEW,
  },
};

const Obsolete: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.OBSOLETE,
  },
};

const Stable: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.STABLE,
  },
};

const TestFail: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.TEST_FAIL,
  },
};

const TestPass: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.TEST_PASS,
  },
};

const Updated: Story = {
  args: {
    ...Default.args,
    badgeId: BADGE.UPDATED,
  },
};

export default meta;
export {
  A11yCheck,
  A11yFail,
  A11yPass,
  Beta,
  Default,
  Deprecated,
  Experimental,
  NeedsRevision,
  New,
  Obsolete,
  Stable,
  TestFail,
  TestPass,
  Updated,
};
