import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import {BADGE} from "../constants";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  parameters: {
    badges: [BADGE.BETA]
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const AllBadges: Story = {
  parameters: {
    badges: [
      BADGE.DEFAULT,
      BADGE.BETA,
      BADGE.STABLE,
      BADGE.NEEDS_REVISION,
      BADGE.OBSOLETE,
      BADGE.EXPERIMENTAL,
      BADGE.DEPRECATED,
    ]
  },
  args: {
    primary: true,
    label: "Button",
  },
};

export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
