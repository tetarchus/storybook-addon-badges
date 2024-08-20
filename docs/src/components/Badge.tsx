// import type { BadgeConfig, BadgesConfig, NewBadgesConfig } from '@/types';
import { defaultBadgesConfig, defaultBadgeStyle } from '@/config';
import { BadgeConfig } from '@/types';

import type { FC } from 'react';

type BadgeProps = {
  badge: string;
};

const Badge: FC<BadgeProps> = ({ badge }: BadgeProps) => {
  const badgeConfig: BadgeConfig = defaultBadgesConfig.badges[badge];

  return (
    <div
      style={{
        backgroundColor: badgeConfig?.styles?.backgroundColor ?? defaultBadgeStyle.backgroundColor,
        borderColor: badgeConfig?.styles?.borderColor ?? defaultBadgeStyle.borderColor,
        borderRadius: badgeConfig?.styles?.borderRadius ?? defaultBadgeStyle.borderRadius,
        borderStyle: badgeConfig?.styles?.borderStyle ?? defaultBadgeStyle.borderStyle,
        borderWidth: badgeConfig?.styles?.borderWidth ?? defaultBadgeStyle.borderWidth,
        color: badgeConfig?.styles?.color ?? defaultBadgeStyle.color,
        display: 'inline',
        fontFamily: badgeConfig?.styles?.fontFamily ?? defaultBadgeStyle.fontFamily,
        fontSize: badgeConfig?.styles?.fontSize ?? defaultBadgeStyle.fontSize,
        fontWeight: badgeConfig?.styles?.fontWeight ?? defaultBadgeStyle.fontWeight,
        lineHeight: badgeConfig?.styles?.lineHeight ?? defaultBadgeStyle.lineHeight,
        paddingBlock: badgeConfig?.styles?.paddingBlock ?? defaultBadgeStyle.paddingBlock,
        paddingInline: badgeConfig?.styles?.paddingInline ?? defaultBadgeStyle.paddingInline,
        textTransform: badgeConfig?.styles?.textTransform ?? defaultBadgeStyle.textTransform,
      }}
    >
      {badgeConfig.title}
    </div>
  );
};

export { Badge };
export { BADGE } from '@/constants';
