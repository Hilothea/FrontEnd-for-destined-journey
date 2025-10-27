/**
 * Cost 计算工具
 * 用于根据品质等级自动计算合理的 cost 值
 * 避免玩家自由修改导致平衡性问题
 */

import type { Rarity } from '../types';

/**
 * 品质对应的 Cost 范围配置
 */
export const RARITY_COST_RANGES: Record<Rarity, { min: number; max: number }> = {
  common: { min: 5, max: 30 },
  uncommon: { min: 20, max: 60 },
  rare: { min: 35, max: 100 },
  epic: { min: 80, max: 200 },
  legendary: { min: 150, max: 400 },
  mythic: { min: 300, max: 1000 },
  only: { min: 666, max: 666 }, // 唯一品质，固定值 666
};

/**
 * 根据品质和在该品质内的位置计算 Cost
 * @param rarity 品质等级
 * @param position 在该品质内的位置 (0-1)，0 表示最低值，1 表示最高值
 * @returns 计算后的 cost 值
 */
export function calculateCostByPosition(rarity: Rarity, position: number = 0.5): number {
  const range = RARITY_COST_RANGES[rarity];
  const cost = range.min + (range.max - range.min) * position;
  return Math.round(cost);
}

/**
 * 命定之人总层级数（固定为 7）
 */
export const DESTINED_TOTAL_TIERS = 7;

/**
 * 命定之人 Cost 范围
 */
export const DESTINED_COST_RANGE = {
  min: 100,
  max: 1000,
};

/**
 * 命定之人层级 Cost 计算
 * @param currentTier 当前层级（1-7）
 * @returns 该层级对应的 cost 值
 */
export function calculateDestinedCost(currentTier: number): number {
  if (currentTier < 1 || currentTier > DESTINED_TOTAL_TIERS) {
    throw new Error(`层级必须在 1 到 ${DESTINED_TOTAL_TIERS} 之间`);
  }

  const { min, max } = DESTINED_COST_RANGE;
  const step = (max - min) / (DESTINED_TOTAL_TIERS - 1);
  return Math.round(min + step * (currentTier - 1));
}

/**
 * 生成命定之人所有 7 个层级的 Cost 数组
 * @returns Cost 数组 [100, 250, 400, 550, 700, 850, 1000]
 */
export function getDestinedCostArray(): number[] {
  return Array.from({ length: DESTINED_TOTAL_TIERS }, (_, i) => calculateDestinedCost(i + 1));
}

/**
 * 验证 Cost 是否在品质范围内
 * @param cost 要验证的 cost 值
 * @param rarity 品质等级
 * @returns 是否在合理范围内
 */
export function validateCost(cost: number, rarity: Rarity): boolean {
  const range = RARITY_COST_RANGES[rarity];
  return cost >= range.min && cost <= range.max;
}

/**
 * 获取品质的 Cost 范围描述
 * @param rarity 品质等级
 * @returns Cost 范围字符串
 */
export function getCostRange(rarity: Rarity): string {
  const range = RARITY_COST_RANGES[rarity];
  return `${range.min}-${range.max}`;
}
