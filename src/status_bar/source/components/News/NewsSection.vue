<script lang="ts" setup>
import CommonStatus from '../common/CommonStatus.vue';

interface Props {
  /** 新闻标题 */
  title: string;
  /** 新闻内容 */
  content?: string;
  /** 空状态提示文本 */
  emptyMessage?: string;
  /** 标题样式类名 */
  titleClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  emptyMessage: '（暂无内容）',
  titleClass: '',
});

// 格式化新闻内容（处理换行）
const formattedContent = computed(() => {
  if (!props.content || props.content.trim() === '') {
    return props.emptyMessage;
  }
  // 将 | 符号替换为换行
  return props.content.replace(/\|/g, '\n');
});
</script>

<template>
  <CommonStatus :title="title" variant="sub-section" :default-open="true" custom-class="news-section">
    <template #title>
      <span :class="titleClass">{{ title }}</span>
    </template>

    <div class="news-content value-main">
      {{ formattedContent }}
    </div>
  </CommonStatus>
</template>

<style lang="scss" scoped>
.news-content {
  white-space: pre-wrap;
  line-height: 1.6;
  color: var(--theme-text-primary);
}
</style>
