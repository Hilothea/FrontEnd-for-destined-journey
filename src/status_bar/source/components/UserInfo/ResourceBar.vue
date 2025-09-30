<script lang="ts" setup>
interface Props {
  /** 资源类型标签（如 HP、MP 等） */
  label: string
  /** 左侧 emoji 图标 */
  icon: string
  /** 当前值 */
  current: number
  /** 最大值 */
  max: number
  /** 进度条颜色 */
  color: string
}

defineProps<Props>()

// 计算进度条百分比
const getPercentage = (current: number, max: number) => {
  return Math.min(100, (current / max) * 100)
}
</script>

<template>
  <div class="resource-item">
    <div class="resource-label">
      <span class="property-name">{{ icon }} {{ label }}:</span>
      <span class="value-main">{{ current }}</span> /
      <span class="value-main">{{ max }}</span>
    </div>
    <div class="progress-bar-container">
      <div
        class="progress-bar-value"
        :style="{
          width: `${getPercentage(current, max)}%`,
          backgroundColor: color
        }"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resource-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.resource-label {
  line-height: 1.6;
}

.property-name {
  font-weight: bold;
  color: #6a514d;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
  margin-right: 4px;
}

/* 进度条样式 */
.progress-bar-container {
  background-color: #c8bbaf;
  border-radius: 9px;
  height: 18px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
}

.progress-bar-value {
  height: 100%;
  transition: width 0.8s ease-out;
  border-radius: 9px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.15),
    rgba(0, 0, 0, 0.1)
  );
  box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.1);
}
</style>