<script lang="ts" setup>
import { useStatData } from '../../composables/use-stat-data';
import { getExtensibleItems, safeGet } from '../../utils/data-adapter';
import { sortByRarity } from '../../utils/quality';
import CommonStatus from '../common/CommonStatus.vue';
import ItemEntry from './ItemEntry.vue';

// 使用状态数据
const { statData } = useStatData();

// 物品类型排序权重
const typeOrder: Record<string, number> = {
  武器防具: 4,
  其它物品: 3,
  消耗品: 2,
  材料: 1,
};

// 获取货币数据
const currencyData = computed(() => {
  if (!statData.value) return { gold: 0, silver: 0, copper: 0 };

  const currency = safeGet(statData.value, '财产.货币', {});
  return {
    gold: safeGet(currency, '金币', 0),
    silver: safeGet(currency, '银币', 0),
    copper: safeGet(currency, '铜币', 0),
  };
});

// 获取物品数据
const itemsData = computed(() => {
  if (!statData.value) return [];

  const inventoryData = safeGet(statData.value, '财产.背包', {});
  const items = getExtensibleItems(inventoryData);

  return Object.entries(items).map(([itemName, itemData]: [string, any]) => ({
    name: itemName,
    quality: safeGet(itemData, '品质', '普通'),
    quantity: safeGet(itemData, '数量', 1),
    type: safeGet(itemData, '类型', '其它物品'),
    tags: safeGet(itemData, '标签', ''),
    effect: safeGet(itemData, '效果', ''),
    description: safeGet(itemData, '描述', '无描述'),
  }));
});

// 按类型分组物品
const itemsByType = computed(() => {
  const grouped: Record<string, typeof itemsData.value> = {};

  // 对物品进行分组
  itemsData.value.forEach(item => {
    const type = item.type || '其它物品';
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(item);
  });

  // 对每个分组内的物品按品质排序
  Object.values(grouped).forEach(items => {
    items.sort(sortByRarity);
  });

  return grouped;
});

// 获取排序后的类型列表
const sortedTypes = computed(() => {
  return Object.keys(itemsByType.value).sort((a, b) => {
    const orderA = typeOrder[a] || 0;
    const orderB = typeOrder[b] || 0;
    return orderB - orderA;
  });
});

// 计算物品总数和种类
const itemStats = computed(() => {
  const types = sortedTypes.value.length;
  const total = itemsData.value.length;
  return { types, total };
});

// 计算摘要信息
const summaryDetails = computed(() => {
  const { gold, silver, copper } = currencyData.value;
  return `金币: ${gold} | 银币: ${silver} | 铜币: ${copper} | 物品: ${itemStats.value.total}`;
});
</script>

<template>
  <CommonStatus title="🎒 角色背包" variant="section" :default-open="false" :summary-details="summaryDetails">
    <!-- 货币显示 -->
    <div class="currency-section">
      <p class="property-name">💰 货币:</p>
      <div class="currency-display">
        <span class="currency-item">
          🟡<span class="value-main">{{ currencyData.gold }}</span>
        </span>
        <span class="currency-item">
          ⚪<span class="value-main">{{ currencyData.silver }}</span>
        </span>
        <span class="currency-item">
          🟤<span class="value-main">{{ currencyData.copper }}</span>
        </span>
      </div>
    </div>

    <hr class="thin-divider" />

    <!-- 物品列表 -->
    <div class="items-section">
      <p class="property-name">📦 物品列表:</p>

      <div v-if="itemStats.total > 0" class="items-grid">
        <!-- 按类型分栏显示 -->
        <div v-for="type in sortedTypes" :key="type" class="items-column">
          <h3 class="items-category-title">{{ type }}</h3>
          <div class="items-list">
            <ItemEntry
              v-for="(item, index) in itemsByType[type]"
              :key="index"
              :name="item.name"
              :quality="item.quality"
              :quantity="item.quantity"
              :type="item.type"
              :tags="item.tags"
              :effect="item.effect"
              :description="item.description"
            />
          </div>
        </div>
      </div>

      <p v-else class="empty-message value-main">背包空空如也</p>
    </div>
  </CommonStatus>
</template>

<style lang="scss" scoped>
/* 货币部分样式 */
.currency-section {
  margin-bottom: 8px;

  .property-name {
    font-weight: bold;
    color: var(--theme-text-secondary);
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
    margin-bottom: 8px;
  }
}

.currency-display {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 16px;
  padding-left: 15px;
  align-items: center;
}

.currency-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.95em;

  .value-main {
    font-weight: 500;
  }
}

/* 分隔线 */
.thin-divider {
  border: 0;
  border-top: 2px solid var(--theme-border-dark);
  margin: 10px 0;
  width: 100%;
}

/* 物品部分样式 */
.items-section {
  .property-name {
    font-weight: bold;
    color: var(--theme-text-secondary);
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
    margin-bottom: 12px;
  }
}

/* 物品网格布局 - 动态列数 */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  align-items: start;
}

.items-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.items-category-title {
  font-family: 'Cinzel', serif;
  font-size: 1em;
  font-weight: 700;
  color: var(--theme-text-tertiary);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--theme-border-light);
  margin-bottom: 6px;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.empty-message {
  color: var(--theme-text-muted);
  font-style: italic;
  margin: 0;
  padding-left: 15px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .items-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .currency-display {
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
