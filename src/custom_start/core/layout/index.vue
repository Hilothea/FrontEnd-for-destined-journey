<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Steps from './component/Steps.vue';

const router = useRouter();
const route = useRoute();

const stepRef = ref<InstanceType<typeof Steps> | null>(null);

const stepTitles = ref([
  { title: '信息/属性' },
  { title: '装备/技能' },
  { title: '对象/背景' },
  { title: '确认' }
]);

// 路由到步骤的映射
const routeToStep: Record<string, number> = {
  'BasicInfo': 1,
  'Selections': 2,
  'Background': 3,
  'Confirm': 4
};

// 步骤到路由的映射
const stepToRoute: Record<number, string> = {
  1: 'BasicInfo',
  2: 'Selections',
  3: 'Background',
  4: 'Confirm'
};

// 从路由元信息或路由名获取当前步骤
const currentStep = computed(() => {
  const step = route.meta?.step as number;
  if (step) return step;

  const routeName = route.name as string;
  return routeToStep[routeName] || 1;
});

// 上一页
const handlePrevious = () => {
  const prevStep = currentStep.value - 1;
  if (prevStep >= 1) {
    const routeName = stepToRoute[prevStep];
    router.push({ name: routeName });
  }
};

// 下一页
const handleNext = () => {
  const nextStep = currentStep.value + 1;
  if (nextStep <= stepTitles.value.length) {
    const routeName = stepToRoute[nextStep];
    router.push({ name: routeName });
  }
};

// 判断是否可以点击上一页
const canGoPrevious = computed(() => currentStep.value > 1);

// 判断是否可以点击下一页
const canGoNext = computed(() => currentStep.value < stepTitles.value.length);

// 下一步按钮文字
const nextButtonText = computed(() => {
  return currentStep.value === stepTitles.value.length ? '踏上旅程' : '下一步';
});

// 过渡动画方向
const transitionName = ref('slide-left');

// 监听路由变化，设置过渡方向
watch(() => route.name, (newRoute, oldRoute) => {
  const newStep = routeToStep[newRoute as string] || 1;
  const oldStep = routeToStep[oldRoute as string] || 1;

  // 根据步骤变化决定动画方向
  transitionName.value = newStep > oldStep ? 'slide-left' : 'slide-right';
});
</script>

<template>
  <div class="layout">
    <h1 class="main-title">命定之诗与黄昏之歌</h1>
    <Steps
      ref="stepRef"
      :steps="stepTitles"
      :step="currentStep"
    />

    <div class="content-area">
      <router-view v-slot="{ Component, route: slotRoute }">
        <transition :name="transitionName" mode="out-in">
          <component :is="Component" :key="slotRoute.path" />
        </transition>
      </router-view>
    </div>

    <div class="navigation">
      <button
        class="nav-button prev-button"
        :disabled="!canGoPrevious"
        @click="handlePrevious"
      >
        <span class="text">上一步</span>
      </button>

      <button
        class="nav-button next-button"
        @click="handleNext"
      >
        <span class="text">{{ nextButtonText }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: var(--spacing-xl);
}

.main-title {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  color: var(--title-color);
}

.content-area {
  flex: 1;
  margin: var(--spacing-md) 0;
  padding: var(--spacing-md);
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

// 向左滑动过渡（前进）
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

// 向右滑动过渡（后退）
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-xl);
  background: var(--button-bg);
  color: var(--title-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-normal);
  box-shadow: var(--shadow-sm);

  &:hover:not(:disabled) {
    background: var(--button-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--border-color-light);
    color: var(--text-light);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .layout {
    padding: var(--spacing-md);
  }

  .navigation {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-button {
    flex: 1;
    min-width: 120px;
    justify-content: center;
  }
}
</style>