<script setup lang="ts">
interface Props {
  modelValue: string;
  categories: string[];
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleSelect = (category: string) => {
  emit('update:modelValue', category);
};
</script>

<template>
  <div class="background-category-nav">
    <button
      v-for="category in props.categories"
      :key="category"
      class="category-item"
      :class="{ active: modelValue === category }"
      @click="handleSelect(category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.background-category-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--input-bg);
    border-radius: var(--radius-sm);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: var(--radius-sm);

    &:hover {
      background: var(--border-color-strong);
    }
  }
}

.category-item {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.9rem;
  color: var(--text-color);
  text-align: left;
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.4;
  min-height: 32px;
  display: flex;
  align-items: center;

  &:hover {
    border-color: var(--accent-color);
    background: rgba(212, 175, 55, 0.1);
  }

  &.active {
    background: var(--accent-color);
    border-color: var(--accent-color);
    color: var(--primary-bg);
    font-weight: 600;
  }
}

@media (max-width: 768px) {
  .background-category-nav {
    padding: var(--spacing-xs) 4px;
  }

  .category-item {
    font-size: 0.8rem;
    padding: 4px var(--spacing-sm);
    min-height: 28px;
  }
}
</style>
