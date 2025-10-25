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
  /** 技能标签 */
  tags?: string;
  /** 技能效果 */
  effect?: string;
  /** 技能描述 */
  description: string;
  /** 技能类型：主动、被动或其他 */
  type: 'active' | 'passive' | 'other';
  /** 其他技能的具体类型名称 */
  otherTypeName?: string;
  /** 是否在摘要中显示类型 */
  showTypeInSummary?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  quality: '',
  cost: '',
  tags: '',
  effect: '',
  otherTypeName: '其它',
  showTypeInSummary: false,
});

// 计算技能标题（只包含名称和品质）
const skillTitle = computed(() => {
  let title = props.name;
  if (props.quality) {
    title += `(${props.quality})`;
  }
  return title;
});

// 计算摘要详情
const summaryDetails = computed(() => {
  const parts: string[] = [];

  // 仅在需要时显示类型名称（命定之人技能）
  if (props.showTypeInSummary) {
    let typeName = '';
    if (props.type === 'active') {
      typeName = '主动';
    } else if (props.type === 'passive') {
      typeName = '被动';
    } else if (props.type === 'other' && props.otherTypeName) {
      typeName = props.otherTypeName;
    }

    if (typeName) {
      parts.push(`类型: ${typeName}`);
    }
  }

  // 显示消耗（主动技能和其他技能）
  if ((props.type === 'active' || props.type === 'other') && props.cost) {
    parts.push(`消耗: ${props.cost}`);
  }

  return parts.join(' | ');
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
      <!-- 其他类型技能在描述中显示类型 -->
      <div v-if="type === 'other' && otherTypeName && !showTypeInSummary" class="skill-type">
        <strong>类型：</strong>{{ otherTypeName }}
      </div>
      <div class="skill-meta"><strong>标签：</strong>{{ tags }}</div>
      <div class="skill-meta"><strong>效果：</strong>{{ effect }}</div>
      <div class="skill-meta"><strong>描述：</strong>{{ description }}</div>
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

.skill-type,
.skill-meta {
  color: var(--theme-text-secondary);
  font-size: 0.95em;

  strong {
    color: var(--theme-text-tertiary);
  }
}
</style>
