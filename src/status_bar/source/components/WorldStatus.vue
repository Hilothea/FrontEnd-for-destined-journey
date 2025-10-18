<script setup lang="ts">
import { useStatData } from '../composables/use-stat-data';
import { safeGet } from '../utils/data-adapter';

const { statData } = useStatData();

const worldTime = computed(() => safeGet(statData.value, '世界.时间', '未知时间'));

const worldLocation = computed(() => safeGet(statData.value, '世界.地点', '未知地点'));
</script>

<template>
  <div class="world-status">
    <p class="world-info">
      <span class="info-icon">⏳️</span>
      <span class="info-label">时间:</span>
      <span class="value-main">{{ worldTime }}</span>
    </p>
    <p class="world-info">
      <span class="info-icon">📍</span>
      <span class="info-label">地点:</span>
      <span class="value-main">{{ worldLocation }}</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.world-status {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: var(--theme-background-secondary);
  padding: 10px 15px;
  margin-bottom: 15px;
  border: 1px solid var(--theme-border-dark);
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
}

.world-info {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1.6;
}

.info-icon {
  flex-shrink: 0;
  line-height: 1;
}

.info-label {
  font-weight: 500;
  color: var(--theme-text-primary);
  flex-shrink: 0;
  line-height: 1;
}
</style>
