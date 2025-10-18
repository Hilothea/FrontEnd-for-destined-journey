<script lang="ts" setup>
import { getQualityClass } from '../../utils/quality';
import CommonStatus from '../common/CommonStatus.vue';

interface Props {
  /** 技能名称 */
  name: string;
  /** 技能品质 */
  quality?: string;
  /** 技能消耗 */
  cost?: string;
  /** 技能描述 */
  description: string;
  /** 技能类型：主动、被动或其他 */
  type: 'active' | 'passive' | 'other';
  /** 其他技能的具体类型名称 */
  otherTypeName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  quality: '',
  cost: '',
  otherTypeName: '其它',
});

// 计算技能标题（只包含名称和品质）
const skillTitle = computed(() => {
  let title = props.name;
  if (props.quality) {
    title += `(${props.quality})`;
  }
  return title;
});

// 计算摘要详情（显示消耗）
const summaryDetails = computed(() => {
  if ((props.type === 'active' || props.type === 'other') && props.cost) {
    return `消耗: ${props.cost}`;
  }
  return '';
});
</script>

<template>
  <CommonStatus
    :title="skillTitle"
    variant="entry"
    :default-open="false"
    custom-class="skill-item"
    :summary-details="summaryDetails"
  >
    <template #title>
      <span class="value-main" :class="getQualityClass(quality)">
        {{ name }}<template v-if="quality">({{ quality }})</template>
      </span>
    </template>

    <div class="skill-description value-main">
      <div v-if="type === 'other' && otherTypeName" class="skill-type">
        <strong>类型：</strong>{{ otherTypeName }}
      </div>
      <div>{{ description }}</div>
    </div>
  </CommonStatus>
</template>

<style lang="scss" scoped>
.skill-item {
  :deep(.summary-title) {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.skill-description {
  color: var(--theme-text-primary);
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-type {
  color: var(--theme-text-secondary);
  font-size: 0.95em;

  strong {
    color: var(--theme-text-tertiary);
  }
}
</style>
