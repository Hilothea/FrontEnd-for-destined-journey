level-tabs
<script setup lang="ts">
interface Props {
  modelValue: string;
  levels: string[];
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleSelect = (level: string) => {
  emit('update:modelValue', level);
};
</script>

<template>
  <div class="level-tabs">
    <button
      v-for="level in props.levels"
      :key="level"
      class="level-tab"
      :class="{ active: modelValue === level }"
      @click="handleSelect(level)"
    >
      {{ level }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.level-tabs {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
}

.level-tab {
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--input-bg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--title-color);

  &:hover {
    border-color: var(--accent-color);
    background: rgba(212, 175, 55, 0.1);
    transform: translateY(-2px);
  }

  &.active {
    background: var(--accent-color);
    border-color: var(--accent-color);
    box-shadow: var(--shadow-md);
    color: var(--primary-bg);
  }
}

@media (max-width: 768px) {
  .level-tabs {
    gap: var(--spacing-sm);
  }

  .level-tab {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 0.95rem;
  }
}
</style>
