<script setup lang="ts">
interface Props {
  /** 标题文本 */
  title: string
  /** 右侧摘要信息（可选） */
  summaryDetails?: string
  /** 是否默认展开 */
  defaultOpen?: boolean
  /** 是否锁定（未解锁状态） */
  locked?: boolean
  /** 变体类型：section(主要区块) | sub-section(子区块) | entry(条目) */
  variant?: 'section' | 'sub-section' | 'entry'
  /** 左侧图标（可选，默认使用星星） */
  icon?: string
  /** 额外的 CSS 类名 */
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  summaryDetails: '',
  defaultOpen: false,
  locked: false,
  variant: 'section',
  icon: '',
  customClass: '',
})

// 控制展开/收起状态
const isOpen = ref(props.defaultOpen)

// 计算组件的 CSS 类名
const containerClass = computed(() => {
  const classes = ['details-status', `details-${props.variant}`]
  if (props.locked) classes.push('locked')
  if (isOpen.value) classes.push('is-open')
  if (props.customClass) classes.push(props.customClass)
  return classes.join(' ')
})

// 切换展开/收起
const toggleOpen = () => {
  if (props.locked) return // 锁定状态不允许展开
  isOpen.value = !isOpen.value
}

// 过渡钩子函数 - 实现高度动画
const onEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.overflow = 'hidden'
  // 强制重排
  void element.offsetHeight
  // 设置目标高度
  element.style.height = `${element.scrollHeight}px`
}

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = ''
  element.style.overflow = ''
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
  element.style.overflow = 'hidden'
  // 强制重排以触发过渡
  void element.offsetHeight
  element.style.height = '0'
}

const onAfterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = ''
  element.style.overflow = ''
}
</script>

<template>
  <div :class="containerClass">
    <div class="summary" @click="toggleOpen">
      <!-- 左侧图标，如果提供了自定义图标则使用，否则使用默认星星 -->
      <span class="icon-star" :class="{ 'is-open': isOpen }">
        {{ locked ? '🔒' : (icon || '✦') }}
      </span>

      <!-- 标题内容 -->
      <span class="summary-title">
        <slot name="title">{{ title }}</slot>
      </span>

      <!-- 右侧摘要信息 -->
      <span v-if="summaryDetails" class="summary-details">
        {{ summaryDetails }}
      </span>

      <!-- 右侧箭头 -->
      <span class="arrow-toggle" :class="{ rotated: isOpen }">▼</span>
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
  border: 1px solid #d3c5b3;
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
      background-color: #e8e4e0;
      color: #b5aaa2;
      cursor: not-allowed;

      .icon-star {
        color: #b5aaa2;
      }
    }
  }
}

/* 折叠面板标题 (summary) */
.summary {
  font-family: 'Cinzel', serif;
  font-weight: 700;
  color: #5d4037;
  background-color: #d7c8b6;
  padding: 4px 15px;
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c6b8a5;
  text-align: left;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: #cbb8a5;
    color: #4a3b31;
  }

  .is-open & {
    background-color: #bfa996;
    border-bottom-color: #a39281;
  }
}

/* 左侧星星图标 */
.icon-star {
  font-size: 1.1em;
  color: #a39281;
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
    color: #f7d75a;
    text-shadow:
      0 0 3px rgba(255, 255, 255, 0.8),
      0 0 6px #f7d75a,
      0 0 10px #e5a50a;
  }
}

/* 标题文本 */
.summary-title {
  flex: 1;
}

/* 右侧摘要信息 */
.summary-details {
  margin-left: auto;
  padding-right: 15px;
  font-family: 'Noto Sans SC', 'Courier New', monospace;
  font-weight: 500;
  font-size: 0.8em;
  color: #6a514d;
  letter-spacing: 0.5px;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.05);
  align-self: center;
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
  background-color: rgba(253, 250, 245, 0.9);
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
