<script lang="ts" setup>
import { useStatData } from '../../composables/use-stat-data';
import { safeGet } from '../../utils/data-adapter';
import { sortItemsByRarity } from '../../utils/quality';
import CommonStatus from '../common/CommonStatus.vue';
import EquipmentSlot from '../common/EquipmentSlot.vue';

// 使用状态数据
const { statData } = useStatData();

// 装备类别配置
const equipmentCategories = [
  { key: '武器', title: '🗡️ 武器' },
  { key: '防具', title: '🛡️ 防具' },
  { key: '饰品', title: '💍 饰品' },
];

// 获取装备数据（按类别分组）
const equipmentData = computed(() => {
  if (!statData.value) {
    return equipmentCategories.map(category => ({
      ...category,
      items: [],
    }));
  }

  const equipment = safeGet(statData.value, '财产.装备', {});

  return equipmentCategories.map(category => {
    const categoryData = safeGet(equipment, category.key, {});
    const items: Array<{
      name: string;
      quality: string;
      tags: string;
      effect: string;
      description: string;
      position: string;
    }> = [];

    // 遍历类别中的所有装备（排除 $meta）
    Object.entries(categoryData).forEach(([key, value]) => {
      if (key === '$meta') return;

      const equipData = value as Record<string, unknown>;
      items.push({
        name: key,
        quality: safeGet(equipData, '品质', '') as string,
        tags: safeGet(equipData, '标签', '') as string,
        effect: safeGet(equipData, '效果', '') as string,
        description: safeGet(equipData, '描述', '') as string,
        position: safeGet(equipData, '位置', '') as string,
      });
    });

    // 按品质排序装备
    sortItemsByRarity(items);

    return {
      ...category,
      items,
    };
  });
});

// 计算装备总数
const totalEquipmentCount = computed(() => {
  return equipmentData.value.reduce((sum, category) => sum + category.items.length, 0);
});
</script>

<template>
  <CommonStatus
    title="⚔️ 角色装备"
    variant="section"
    :default-open="false"
    :summary-details="`共 ${totalEquipmentCount} 件装备`"
  >
    <div class="equipment-section">
      <div v-if="totalEquipmentCount > 0" class="equipment-grid">
        <!-- 按类别分栏显示 -->
        <div v-for="category in equipmentData" :key="category.key" class="equipment-column">
          <h3 class="equipment-category-title">{{ category.title }}</h3>
          <div v-if="category.items.length === 0" class="empty-category">暂无{{ category.key }}</div>
          <div v-else class="equipment-list">
            <EquipmentSlot
              v-for="item in category.items"
              :key="item.name"
              :equipment-name="item.name"
              :quality="item.quality"
              :tags="item.tags"
              :effect="item.effect"
              :description="item.description"
              :position="item.position"
            />
          </div>
        </div>
      </div>

      <p v-else class="empty-message value-main">暂无装备</p>
    </div>
  </CommonStatus>
</template>

<style lang="scss" scoped>
/* 装备部分样式 */
.equipment-section {
  .property-name {
    font-weight: bold;
    color: var(--theme-text-secondary);
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
    margin-bottom: 12px;
  }
}

/* 装备网格布局 - 垂直排列 */
.equipment-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.equipment-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.equipment-category-title {
  font-family: 'Cinzel', serif;
  font-size: 1em;
  font-weight: 700;
  color: var(--theme-text-tertiary);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--theme-border-light);
  margin-bottom: 6px;
}

.equipment-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty-category {
  color: var(--theme-text-muted);
  font-style: italic;
  font-size: 0.9em;
  padding: 5px 10px;
}

.empty-message {
  color: var(--theme-text-muted);
  font-style: italic;
  margin: 0;
  padding-left: 15px;
}
</style>
