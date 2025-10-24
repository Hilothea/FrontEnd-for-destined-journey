/**
 * 品质排序权重映射
 * 权重越高，品质越高
 */
export const RARITY_ORDER: Record<string, number> = {
  唯一: 7,
  神话: 6,
  传说: 5,
  史诗: 4,
  稀有: 3,
  优良: 2,
  普通: 1,
};

/**
 * 获取品质对应的 CSS 类名
 * @param quality 品质字符串（如：唯一、神话、传说、史诗等）
 * @returns 对应的 CSS 类名
 */
export function getQualityClass(quality: string): string {
  const qualityMap: Record<string, string> = {
    唯一: 'quality-unique',
    神话: 'quality-mythic',
    传说: 'quality-legendary',
    史诗: 'quality-epic',
    稀有: 'quality-rare',
    优良: 'quality-uncommon',
    普通: 'quality-common',
  };
  return qualityMap[quality] || '';
}

/**
 * 获取品质的排序权重
 * @param quality 品质名称
 * @returns 排序权重，未知品质返回 0
 */
export function getRarityWeight(quality: string): number {
  return RARITY_ORDER[quality] || 0;
}

/**
 * 品质比较函数，用于数组排序（降序）
 * @param a 对象 a，需包含 quality 属性
 * @param b 对象 b，需包含 quality 属性
 * @returns 比较结果
 */
export function sortByRarity<T extends { quality: string }>(a: T, b: T): number {
  return getRarityWeight(b.quality) - getRarityWeight(a.quality);
}

/**
 * 对数组按品质排序（降序，会修改原数组）
 * @param items 包含 quality 属性的对象数组
 * @returns 排序后的数组（原数组引用）
 */
export function sortItemsByRarity<T extends { quality: string }>(items: T[]): T[] {
  return items.sort(sortByRarity);
}
