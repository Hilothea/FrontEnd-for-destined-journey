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
  /** 物品描述 */
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  quality: '',
  type: '其它物品',
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

    <div class="item-details value-main">{{ description }}</div>
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
  color: #4a3b31;
  line-height: 1.6;
}
</style>
