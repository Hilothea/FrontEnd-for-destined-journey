<script lang="ts" setup>
import { getQualityClass } from '../../utils/quality';
import CommonStatus from '../common/CommonStatus.vue';

interface Props {
  /** 装备名称 */
  equipmentName: string;
  /** 装备品质 */
  quality?: string;
  /** 装备描述 */
  description?: string;
  /** 装备位置 */
  position?: string;
}

const props = withDefaults(defineProps<Props>(), {
  quality: '',
  description: '',
  position: '',
});

// 计算装备标题（只包含名称和品质）
const equipmentTitle = computed(() => {
  let title = props.equipmentName;
  if (props.quality) {
    title += `(${props.quality})`;
  }
  return title;
});

// 计算摘要详情（显示位置）
const summaryDetails = computed(() => {
  return props.position ? `位置: ${props.position}` : '';
});
</script>

<template>
  <CommonStatus
    :title="equipmentTitle"
    variant="entry"
    :default-open="false"
    custom-class="equipment-entry"
    :summary-details="summaryDetails"
  >
    <template #title>
      <span class="value-main" :class="getQualityClass(quality)">
        {{ equipmentName }}<template v-if="quality">({{ quality }})</template>
      </span>
    </template>

    <div class="equipment-details value-main">{{ description }}</div>
  </CommonStatus>
</template>

<style lang="scss" scoped>
.equipment-entry {
  :deep(.summary-title) {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.equipment-details {
  color: var(--theme-text-primary);
  line-height: 1.6;
}
</style>
