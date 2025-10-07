<script lang="ts" setup>
import { useStatData } from '../../composables/use-stat-data';
import { safeGet } from '../../utils/data-adapter';
import CommonStatus from '../common/CommonStatus.vue';
import EquipmentSlot from './EquipmentSlot.vue';

// 使用状态数据
const { statData } = useStatData();

// 装备槽位映射
const equipmentSlots = [
  { key: '主武器', slotName: '主武器', icon: '🗡️' },
  { key: '副武器', slotName: '副武器', icon: '🛡️' },
  { key: '身体防具', slotName: '身体', icon: '🧥' },
  { key: '头部防具', slotName: '头部防具', icon: '🎓' },
  { key: '手部防具', slotName: '手部防具', icon: '🧤' },
  { key: '脚部防具', slotName: '脚部防具', icon: '👢' },
  { key: '饰品1', slotName: '饰品1', icon: '💍' },
  { key: '饰品2', slotName: '饰品2', icon: '📿' },
];

// 获取装备数据
const equipmentData = computed(() => {
  if (!statData.value) {
    return equipmentSlots.map(slot => ({
      ...slot,
      name: '无装备',
      quality: '',
      description: '',
    }));
  }

  const equipment = safeGet(statData.value, '财产.装备', {});

  return equipmentSlots.map(slot => {
    const equipData = safeGet(equipment, slot.key, {});
    return {
      ...slot,
      name: safeGet(equipData, '名称', '无装备'),
      quality: safeGet(equipData, '品质', ''),
      description: safeGet(equipData, '描述', ''),
    };
  });
});
</script>

<template>
  <CommonStatus title="⚔️ 角色装备" variant="section" :default-open="false">
    <div class="equipment-grid">
      <EquipmentSlot
        v-for="equipment in equipmentData"
        :key="equipment.key"
        :slot-name="equipment.slotName"
        :icon="equipment.icon"
        :equipment-name="equipment.name"
        :quality="equipment.quality"
        :description="equipment.description"
      />
    </div>
  </CommonStatus>
</template>

<style lang="scss" scoped>
.equipment-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;

  /* 为每个装备槽位添加底部分隔线，除了最后一个 */
  > *:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid #d3c5b3;
  }
}
</style>
