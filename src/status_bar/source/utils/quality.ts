/**
 * 获取品质对应的 CSS 类名
 * @param quality 品质字符串（如：神话、传说、史诗等）
 * @returns 对应的 CSS 类名
 */
export function getQualityClass(quality: string): string {
  const qualityMap: Record<string, string> = {
    神话: 'quality-mythic',
    传说: 'quality-legendary',
    史诗: 'quality-epic',
    稀有: 'quality-rare',
    优良: 'quality-uncommon',
    普通: 'quality-common',
  };
  return qualityMap[quality] || '';
}
