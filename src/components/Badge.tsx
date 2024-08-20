import { styled } from '@storybook/theming';
import { useStorybookApi } from 'storybook/internal/manager-api';

import { defaultBadgeConfig, defaultBadgesConfig, defaultBadgeStyle } from '@/config';
import { PARAM_CONFIG_KEY } from '@/constants';
import { isNewBadgesConfig } from '@/utils';

import { BadgeTooltipWrapper } from './BadgeTooltipWrapper';

import type { BadgeConfig, BadgesConfig, NewBadgesConfig } from '@/types';
import type { FC } from 'react';

type StyledBadgeProps = {
  config: BadgeConfig;
};

type BadgeProps = {
  badge: string;
};

const StyledBadge = styled.div<StyledBadgeProps>(({ config: { styles } }) => ({
  backgroundColor: styles?.backgroundColor ?? defaultBadgeStyle.backgroundColor,
  borderColor: styles?.borderColor ?? defaultBadgeStyle.borderColor,
  borderRadius: styles?.borderRadius ?? defaultBadgeStyle.borderRadius,
  borderStyle: styles?.borderStyle ?? defaultBadgeStyle.borderStyle,
  borderWidth: styles?.borderWidth ?? defaultBadgeStyle.borderWidth,
  color: styles?.color ?? defaultBadgeStyle.color,
  display: 'block',
  fontFamily: styles?.fontFamily ?? defaultBadgeStyle.fontFamily,
  fontSize: styles?.fontSize ?? defaultBadgeStyle.fontSize,
  fontWeight: styles?.fontWeight ?? defaultBadgeStyle.fontWeight,
  lineHeight: styles?.lineHeight ?? defaultBadgeStyle.lineHeight,
  paddingBlock: styles?.paddingBlock ?? defaultBadgeStyle.paddingBlock,
  paddingInline: styles?.paddingInline ?? defaultBadgeStyle.paddingInline,
  textTransform: styles?.textTransform ?? defaultBadgeStyle.textTransform,
}));

const Badge: FC<BadgeProps> = ({ badge }: BadgeProps) => {
  const api = useStorybookApi();
  const customBadgesConfig = api.getCurrentParameter<BadgesConfig>(PARAM_CONFIG_KEY) || {};

  const badgesConfig: NewBadgesConfig = {
    badges: {
      ...defaultBadgesConfig,
      ...(isNewBadgesConfig(customBadgesConfig) ? customBadgesConfig.badges : customBadgesConfig),
    },
  };

  const config = badgesConfig.badges[badge] ?? defaultBadgeConfig;

  const Component = () => <StyledBadge config={config}>{config.title}</StyledBadge>;

  return config.tooltip ? (
    <BadgeTooltipWrapper tooltip={config.tooltip}>
      <Component />
    </BadgeTooltipWrapper>
  ) : (
    <Component />
  );
};

export { Badge };
