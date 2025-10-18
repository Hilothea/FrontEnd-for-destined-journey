<script setup lang="ts">
import { useStatData } from '../composables/use-stat-data';
import { getExtensibleItems, safeGet } from '../utils/data-adapter';
import CommonStatus from './common/CommonStatus.vue';

const { statData } = useStatData();

// 获取任务列表
const tasks = computed(() => {
  const taskData = safeGet(statData.value, '任务列表', {});
  const items = getExtensibleItems(taskData);

  return Object.entries(items).map(([key, task]: [string, any]) => ({
    key,
    title: key,
    intro: safeGet(task, '简介', ''),
    target: safeGet(task, '目标', ''),
    reward: safeGet(task, '奖励', ''),
  }));
});

const taskCount = computed(() => tasks.value.length);
const summaryDetails = computed(() => `进行中: ${taskCount.value}个`);
</script>

<template>
  <CommonStatus title="📜 当前任务" variant="section" :summary-details="summaryDetails" :default-open="false">
    <div v-if="taskCount > 0" class="tasks-container">
      <CommonStatus
        v-for="task in tasks"
        :key="task.key"
        :title="`🚩 ${task.title}`"
        variant="entry"
        :default-open="false"
      >
        <div class="task-content">
          <p class="task-field">
            <span class="field-label">📖 简介:</span>
            <span class="value-main">{{ task.intro }}</span>
          </p>
          <p class="task-field">
            <span class="field-label">🎯 目标:</span>
            <span class="value-main">{{ task.target }}</span>
          </p>
          <p class="task-field">
            <span class="field-label">🏆 奖励:</span>
            <span class="value-main">{{ task.reward }}</span>
          </p>
        </div>
      </CommonStatus>
    </div>
    <p v-else class="empty-message value-main">暂无任务</p>
  </CommonStatus>
</template>

<style lang="scss" scoped>
.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.task-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-field {
  margin: 0;
  line-height: 1.6;
}

.field-label {
  font-weight: bold;
  color: var(--theme-text-secondary);
  margin-right: 4px;
}

.empty-message {
  color: var(--theme-text-muted);
  font-style: italic;
  margin: 0;
}
</style>
