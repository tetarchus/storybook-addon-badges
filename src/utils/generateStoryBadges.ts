const generateStoryBadges = (baseBadges: string[]) => {
  const badges = [...new Set(baseBadges)];
  const finalBadges: string[] = [...badges];

  for (const [index, badge] of badges.entries()) {
    const isRemove = badge.startsWith('!');
    const badgeName = isRemove ? badge.replace('!', '') : badge;
    const originalBadgeIndex = badges.findIndex(b => b === badgeName);
    if (originalBadgeIndex < index) {
      finalBadges.filter(b => b !== badgeName);
    }
  }

  return finalBadges;
};

export { generateStoryBadges };
