<script setup lang="ts">
interface Props {
  /** 标题文本 */
  title: string;
  /** 右侧摘要信息（可选） */
  summaryDetails?: string;
  /** 是否默认展开 */
  defaultOpen?: boolean;
  /** 是否锁定（未解锁状态） */
  locked?: boolean;
  /** 变体类型：section(主要区块) | sub-section(子区块) | entry(条目) */
  variant?: 'section' | 'sub-section' | 'entry';
  /** 左侧图标（可选，默认使用星星） */
  icon?: string;
  /** 额外的 CSS 类名 */
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  summaryDetails: '',
  defaultOpen: false,
  locked: false,
  variant: 'section',
  icon: '',
  customClass: '',
});

// 控制展开/收起状态
const isOpen = ref(props.defaultOpen);

// 响应式的窗口宽度
const windowWidth = ref(window.innerWidth);

// 监听窗口大小变化
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

// 判断摘要内容是否过长，需要换行显示
// 基于字符长度和窗口宽度的简单判断
const shouldWrapSummary = computed(() => {
  if (!props.summaryDetails) return false;

  const textLength = props.summaryDetails.length;

  // 移动端（<= 600px）：超过10个字符就换行
  if (windowWidth.value <= 600) {
    return textLength > 10;
  }

  // 平板端（600px < width <= 1000px）：超过30个字符就换行
  if (windowWidth.value <= 1000) {
    return textLength > 30;
  }

  // 桌面端（> 1000px）：超过50个字符才换行
  return textLength > 50;
});

// 计算组件的 CSS 类名
const containerClass = computed(() => {
  const classes = ['details-status', `details-${props.variant}`];
  if (props.locked) classes.push('locked');
  if (isOpen.value) classes.push('is-open');
  if (props.customClass) classes.push(props.customClass);
  return classes.join(' ');
});

// 切换展开/收起
const toggleOpen = () => {
  if (props.locked) return; // 锁定状态不允许展开
  isOpen.value = !isOpen.value;
};

// 过渡钩子函数 - 实现高度动画
const onEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '0';
  element.style.overflow = 'hidden';
  // 强制重排
  void element.offsetHeight;
  // 设置目标高度
  element.style.height = `${element.scrollHeight}px`;
};

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '';
  element.style.overflow = '';
};

const onLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = `${element.scrollHeight}px`;
  element.style.overflow = 'hidden';
  // 强制重排以触发过渡
  void element.offsetHeight;
  element.style.height = '0';
};

const onAfterLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '';
  element.style.overflow = '';
};
</script>

<template>
  <div :class="containerClass">
    <div class="summary" :class="{ 'has-wrapped-summary': shouldWrapSummary }" @click="toggleOpen">
      <div class="summary-main-line">
        <!-- 左侧图标，如果提供了自定义图标则使用，否则使用默认星星 -->
        <span class="icon-star" :class="{ 'is-open': isOpen }">
          {{ locked ? '🔒' : icon || '✦' }}
        </span>

        <!-- 标题内容 -->
        <span class="summary-title">
          <slot name="title">{{ title }}</slot>
        </span>

        <!-- 右侧摘要信息（内容较短时显示在同一行） -->
        <span v-if="summaryDetails && !shouldWrapSummary" class="summary-details">
          {{ summaryDetails }}
        </span>

        <!-- 右侧箭头 -->
        <span class="arrow-toggle" :class="{ rotated: isOpen }">▼</span>
      </div>

      <!-- 摘要信息换行显示（内容较长时） -->
      <div v-if="summaryDetails && shouldWrapSummary" class="summary-wrapped-details">
        {{ summaryDetails }}
      </div>
    </div>

    <!-- 折叠内容区域 -->
    <Transition
      name="collapse"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div v-show="isOpen" class="details-content">
        <div class="details-content-inner">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
/* 折叠面板基础样式 */
.details-status {
  margin-bottom: 6px;
  border: 1px solid var(--theme-border-light);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  }

  // 锁定状态
  &.locked {
    .summary {
      background-color: var(--theme-disabled-bg);
      color: var(--theme-disabled-text);
      cursor: not-allowed;

      .icon-star {
        color: var(--theme-disabled-text);
      }
    }
  }
}

/* 折叠面板标题 (summary) */
.summary {
  font-family: 'Cinzel', serif;
  font-weight: 700;
  color: var(--theme-text-tertiary);
  background-color: var(--theme-title-bg);
  padding: 4px 15px;
  cursor: pointer;
  list-style: none;
  border-bottom: 1px solid var(--theme-border-dark);
  text-align: left;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--theme-title-bg-hover);
    color: var(--theme-text-primary);
  }

  .is-open & {
    background-color: var(--theme-open-bg);
    border-bottom-color: var(--theme-open-border-color);
  }

  // 当摘要需要换行时，调整内边距
  &.has-wrapped-summary {
    padding-bottom: 8px;
  }
}

/* 标题主行（包含图标、标题、箭头） */
.summary-main-line {
  display: flex;
  align-items: center;
  width: 100%;
}

/* 左侧星星图标 */
.icon-star {
  font-size: 1.1em;
  color: var(--theme-star-inactive);
  text-shadow: none;
  margin-right: 12px;
  flex-shrink: 0;
  transform-origin: center center;
  transition:
    transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    color 0.4s ease,
    text-shadow 0.4s ease;

  &.is-open {
    transform: rotate(360deg);
    color: var(--theme-star-active);
    text-shadow:
      0 0 3px rgba(255, 255, 255, 0.8),
      0 0 6px var(--theme-star-active),
      0 0 10px #e5a50a;
  }
}

/* 标题文本 */
.summary-title {
  flex: 1;
}

/* 右侧摘要信息（同行显示） */
.summary-details {
  margin-left: auto;
  padding-right: 15px;
  font-family: 'Noto Sans SC', 'Courier New', monospace;
  font-weight: 500;
  font-size: 0.8em;
  color: var(--theme-text-secondary);
  letter-spacing: 0.5px;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.05);
  align-self: center;
  flex-shrink: 0;
}

/* 摘要信息换行显示 */
.summary-wrapped-details {
  margin-top: 6px;
  padding-left: 22px;
  padding-right: 10px;
  font-family: 'Noto Sans SC', 'Courier New', monospace;
  font-weight: 500;
  font-size: 0.8em;
  color: var(--theme-text-secondary);
  letter-spacing: 0.5px;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.05);
  line-height: 1.4;
  word-break: auto-phrase; /* 实验性功能，智能换行 */
}

/* 右侧箭头 */
.arrow-toggle {
  transition: transform 0.2s ease-in-out;
  font-size: 0.8em;
  padding-left: 5px;
  margin-left: auto;
  flex-shrink: 0;

  &.rotated {
    transform: rotate(90deg);
  }
}

/* 折叠内容区域 */
.details-content {
  background-color: var(--theme-background-tertiary);
  opacity: var(--theme-background-tertiary-opacity);
  transition: height 0.2s ease-in-out;
  overflow: hidden;
}

.details-content-inner {
  padding: 15px;
  text-align: left;
  font-size: 0.9em;
}

/* 过渡动画类 */
.collapse-enter-active,
.collapse-leave-active {
  transition: height 0.2s ease-in-out;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  height: 0 !important;
}

/* 子区块变体样式微调 */
.details-sub-section {
  .details-content-inner {
    padding-top: 5px;
    padding-bottom: 5px;
  }
}

/* 条目变体样式微调（如技能、物品等） */
.details-entry {
  .summary {
    padding-top: 0.8px;
    padding-bottom: 0.8px;
    font-size: 0.9em;
  }

  .details-content-inner {
    padding: 10px 15px;
  }
}
</style>
