<script lang="ts" setup>
import { getQualityClass } from '../../utils/quality';
import CommonStatus from '../common/CommonStatus.vue';

interface Props {
  /** 装备名称 */
  equipmentName: string;
  /** 装备品质 */
  quality?: string;
  /** 装备标签 */
  tags?: string;
  /** 装备效果 */
  effect?: string;
  /** 装备描述 */
  description?: string;
  /** 装备位置（主角装备用） */
  position?: string;
  /** 装备类型（命定之人装备用） */
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  quality: '',
  tags: '',
  effect: '',
  description: '',
  position: '',
  type: '',
});

// 计算装备标题（只包含名称和品质）
const equipmentTitle = computed(() => {
  let title = props.equipmentName;
  if (props.quality) {
    title += `(${props.quality})`;
  }
  return title;
});

// 计算摘要详情（显示类型和位置，有则显示）
const summaryDetails = computed(() => {
  const parts: string[] = [];

  // 类型优先显示
  if (props.type) {
    parts.push(`类型: ${props.type}`);
  }

  // 位置其次
  if (props.position) {
    parts.push(`位置: ${props.position}`);
  }

  return parts.join(' | ');
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

    <div class="equipment-details value-main">
      <div class="equipment-meta"><strong>标签：</strong>{{ tags }}</div>
      <div class="equipment-meta"><strong>效果：</strong>{{ effect }}</div>
      <div class="equipment-meta"><strong>描述：</strong>{{ description }}</div>
    </div>
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
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.equipment-meta {
  color: var(--theme-text-secondary);
  font-size: 0.95em;

  strong {
    color: var(--theme-text-tertiary);
  }
}
</style>
