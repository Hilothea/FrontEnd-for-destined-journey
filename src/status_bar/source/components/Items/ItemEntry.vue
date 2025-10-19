<script lang="ts" setup>
import { getQualityClass } from '../../utils/quality';
import CommonStatus from '../common/CommonStatus.vue';

interface Props {
  /** 物品名称 */
  name: string;
  /** 物品品质 */
  quality?: string;
  /** 物品数量 */
  quantity: string | number;
  /** 物品类型 */
  type?: string;
  /** 物品标签 */
  tags?: string;
  /** 物品效果 */
  effect?: string;
  /** 物品描述 */
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  quality: '',
  type: '其它物品',
  tags: '',
  effect: '',
  description: '无',
});

// 计算物品标题（只包含名称和品质）
const itemTitle = computed(() => {
  let title = props.name;
  if (props.quality) {
    title += `(${props.quality})`;
  }
  return title;
});

// 计算摘要详情（显示数量）
const summaryDetails = computed(() => {
  return `数量: ${props.quantity}`;
});

// 检查是否是"其它物品"类型
const isOtherItem = computed(() => {
  return props.type && props.type !== '武器防具' && props.type !== '消耗品' && props.type !== '材料';
});

// 检查标签是否有效（不为空且不是"无"）
const hasValidTags = computed(() => {
  return props.tags && props.tags !== '无';
});
</script>

<template>
  <CommonStatus
    :title="itemTitle"
    variant="entry"
    :default-open="false"
    custom-class="item-entry"
    :summary-details="summaryDetails"
  >
    <template #title>
      <span class="value-main" :class="getQualityClass(quality)">
        {{ name }}<template v-if="quality">({{ quality }})</template>
      </span>
    </template>

    <div class="item-details value-main">
      <div v-if="isOtherItem" class="item-type"><strong>类型：</strong>{{ type }}</div>
      <div v-if="hasValidTags" class="item-meta"><strong>标签：</strong>{{ tags }}</div>
      <div class="item-meta"><strong>效果：</strong>{{ effect }}</div>
      <div class="item-meta"><strong>描述：</strong>{{ description }}</div>
    </div>
  </CommonStatus>
</template>

<style lang="scss" scoped>
.item-entry {
  :deep(.summary-title) {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.item-details {
  color: var(--theme-text-primary);
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-type,
.item-meta {
  color: var(--theme-text-secondary);
  font-size: 0.95em;

  strong {
    color: var(--theme-text-tertiary);
  }
}
</style>
