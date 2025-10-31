import type { Currency, Item } from '../types';
import { loadCustomItems, mergeData } from '../utils/loader';

interface ItemData {
  Money: Currency[];
  [key: string]: Item[] | Currency[];
}

/**
 * 初始物品
 */

export const InitialItems: ItemData = {
  // 货币
  Money: [
    // 白 (Common, 1-10)
    { name: '一点点钱', type: '货币', cost: 10, rarity: 'common', description: '初始自带10银币、10铜币。' },
    // 绿 (Uncommon, 11-20)
    { name: '一些钱', type: '货币', cost: 20, rarity: 'uncommon', description: '初始自带30银币、30铜币。' },
    // 蓝 (Rare, 21-35)
    { name: '不算少的钱', type: '货币', cost: 40, rarity: 'rare', description: '初始自带60银币、60铜币。' },
    // 紫 (Epic, 36-50)
    { name: '很多钱', type: '货币', cost: 80, rarity: 'epic', description: '初始自带30金币、50银币、50铜币。' },
    // 金 (Legendary, 51-100)
    {
      name: '很多很多钱',
      type: '货币',
      cost: 150,
      rarity: 'legendary',
      description: '初始自带150金币、50银币、50铜币。',
    },
  ],
};

// 加载并合并自定义道具数据
let mergedItemsData: ItemData | null = null;

/**
 * 初始化道具数据（加载自定义数据并合并）
 */
async function initializeItems() {
  const customData = await loadCustomItems();
  mergedItemsData = mergeData(InitialItems, customData) as ItemData;
}

/**
 * 获取合并后的道具数据
 */
export function getInitialItems(): ItemData {
  return mergedItemsData || InitialItems;
}

// 自动初始化
initializeItems();
