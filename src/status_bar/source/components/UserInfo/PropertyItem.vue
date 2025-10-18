<script lang="ts" setup>
interface Props {
  /** 属性名称 */
  label: string;
  /** 左侧 emoji 图标（可选） */
  icon?: string;
  /** 属性值 */
  value: string | number;
}

defineProps<Props>();
</script>

<template>
  <p class="property-item">
    <span class="property-name">
      <template v-if="icon">{{ icon }} </template>{{ label }}:
    </span>
    <span class="value-main">{{ value }}</span>
  </p>
</template>

<style lang="scss" scoped>
.property-item {
  margin: 0;
  line-height: 1.6;
}

.property-name {
  font-weight: bold;
  color: var(--theme-text-secondary);
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
}
</style>
