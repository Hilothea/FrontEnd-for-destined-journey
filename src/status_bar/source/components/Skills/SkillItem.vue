<script lang="ts" setup>
import { getQualityClass } from '../../utils/quality'
import CommonStatus from '../common/CommonStatus.vue'

interface Props {
  /** 技能名称 */
  name: string
  /** 技能品质 */
  quality?: string
  /** 技能消耗（仅主动技能） */
  cost?: string
  /** 技能描述 */
  description: string
  /** 技能类型：主动或被动 */
  type: 'active' | 'passive'
}

const props = withDefaults(defineProps<Props>(), {
  quality: '',
  cost: ''
})

// 计算技能标题（只包含名称和品质）
const skillTitle = computed(() => {
  let title = props.name
  if (props.quality) {
    title += `(${props.quality})`
  }
  return title
})

// 计算摘要详情（显示消耗）
const summaryDetails = computed(() => {
  if (props.type === 'active' && props.cost) {
    return `消耗: ${props.cost}`
  }
  return ''
})
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
      {{ description }}
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
  color: #4a3b31;
  line-height: 1.6;
}
</style>