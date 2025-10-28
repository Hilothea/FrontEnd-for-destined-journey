<script setup lang="ts">
interface Props {
  categories: string[];
  modelValue: string;
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
  <div class="sub-category-filter">
    <div class="filter-label">分类筛选：</div>
    <div class="filter-buttons">
      <button
        v-for="category in categories"
        :key="category"
        class="filter-button"
        :class="{ active: modelValue === category }"
        @click="handleSelect(category)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-category-filter {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;

  .filter-label {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--title-color);
    white-space: nowrap;
  }

  .filter-buttons {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
    flex: 1;
  }

  .filter-button {
    padding: var(--spacing-xs) var(--spacing-md);
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: 0.9rem;
    color: var(--text-color);
    white-space: nowrap;

    &:hover {
      border-color: var(--accent-color);
      background: rgba(212, 175, 55, 0.1);
    }

    &.active {
      background: var(--accent-color);
      border-color: var(--accent-color);
      color: var(--primary-bg);
      font-weight: 600;
      box-shadow: var(--shadow-sm);
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .sub-category-filter {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);

    .filter-label {
      font-size: 0.9rem;
    }

    .filter-buttons {
      width: 100%;
    }

    .filter-button {
      font-size: 0.85rem;
      padding: 6px var(--spacing-sm);
    }
  }
}
</style>
