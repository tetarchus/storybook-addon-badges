import { useTheme } from '@storybook/theming';
import { useMemo } from 'react';
import { useGlobals } from 'storybook/internal/manager-api';

import { useAddonConfig } from '@/hooks';
import { getBadgeParts, getBadgePartsInternal } from '@/utils';

import { BadgeTooltip } from '../BadgeTooltip';
import { StyledBadge } from './styled';

import type { BadgeProps } from './prop.types';
import type { BadgeFnParameters } from '@/types';
import type { FC } from 'react';

/**
 * A single badge component to convey simple information at a glance.
 */
const Badge: FC<BadgeProps> = ({
  badgeId,
  config,
  content: rawContent,
  'data-testid': dataTestId,
  delimiter,
  entry,
}: BadgeProps) => {
  const uiTheme = useTheme();
  const [{ theme }] = useGlobals();

  const { baseStyle } = useAddonConfig();
  const { content } = getBadgePartsInternal(rawContent, config.delimiter);

  /** Parameters passed into dynamic functions. */
  const badgeFnParams: BadgeFnParameters = useMemo(
    () => ({
      entry,
      content: config.displayContentOnly ? (content ?? badgeId) : rawContent,
      badgeId,
      getBadgeParts: getBadgeParts(delimiter),
      rawContent,
    }),
    [badgeId, config.displayContentOnly, content, delimiter, entry, rawContent],
  );

  /** Calculated text content of the badge. */
  const badgeText = useMemo(() => {
    if (typeof config.title === 'string') {
      return config.title;
    }
    return config.title(badgeFnParams);
  }, [badgeFnParams, config]);

  /** Calculated style for the badge. */
  const badgeStyle = useMemo(() => {
    const style = typeof config.style === 'function' ? config.style(badgeFnParams) : config.style;
    return { ...baseStyle, ...style };
  }, [badgeFnParams, baseStyle, config]);

  /** Main badge content - to display on its own, or wrapped with a tooltip. */
  const Component = useMemo(
    () => (
      <StyledBadge
        badgeStyle={badgeStyle}
        data-badgeid={badgeId}
        data-testid={dataTestId}
        hasTooltip={config.tooltip != null}
        uiTheme={theme || uiTheme['base']}
      >
        {badgeText}
      </StyledBadge>
    ),
    [badgeId, badgeStyle, badgeText, config.tooltip, dataTestId, theme, uiTheme],
  );

  return config.tooltip ? (
    <BadgeTooltip tooltip={config.tooltip}>{Component}</BadgeTooltip>
  ) : (
    Component
  );
};

export { Badge };
export type { BadgeProps } from './prop.types';
