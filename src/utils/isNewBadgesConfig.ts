import type { BadgeConfig, BadgesConfig, NewBadgesConfig, TooltipConfig } from '@/types';

const styleKeys = [
  'backgroundColor',
  'borderColor',
  'borderRadius',
  'borderStyle',
  'borderWidth',
  'color',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'paddingBlock',
  'paddingInline',
  'textTransform',
];

const isTooltipDefinition = (config: unknown): config is TooltipConfig => {
  if (typeof config === 'string') return true;
  if (typeof config === 'object' && config != null) {
    const hasKeys = Object.keys(config).length > 0;
    const hasDesc = 'desc' in config;
    const hasTitle = 'title' in config;
    const hasLinks = 'links' in config && Array.isArray(config.links);

    return !hasKeys || hasDesc || hasTitle || hasLinks;
  }
  return false;
};

const isValidStyles = (obj: unknown): boolean => {
  if (typeof obj === 'object' && obj != null) {
    if (Object.keys(obj).length > 0) return true;

    for (const key of styleKeys) {
      if (
        key in obj &&
        (typeof obj[key as keyof typeof obj] === 'string' ||
          typeof obj[key as keyof typeof obj] === 'number')
      ) {
        return true;
      }
    }
  }
  return false;
};

const isBadgeConfig = (config: unknown): config is BadgeConfig => {
  if (typeof config !== 'object' || config == null) {
    return false;
  }
  const hasKeys = Object.keys(config).length > 0;
  const hasValidTitle = 'title' in config && typeof config.title === 'string';
  const hasValidTooltip = 'tooltip' in config && isTooltipDefinition(config.tooltip);
  const hasValidStyles = 'styles' in config && isValidStyles(config.styles);

  return !hasKeys || hasValidStyles || hasValidTitle || hasValidTooltip;
};

const isNewBadgesConfig = (config: BadgesConfig): config is NewBadgesConfig =>
  config.badges != null && !isBadgeConfig(config.badges);

export { isNewBadgesConfig };
