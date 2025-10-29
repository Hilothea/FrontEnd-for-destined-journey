<script setup lang="ts">
import type { Rarity } from '../../../types';

interface Props {
  modelValue: Rarity | 'all';
}

interface Emits {
  (e: 'update:modelValue', value: Rarity | 'all'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 品质选项配置
const rarityOptions: { value: Rarity | 'all'; label: string; color: string }[] = [
  { value: 'all', label: '全部', color: '#666' },
  { value: 'only', label: '唯一', color: '#ff0000' },
  { value: 'mythic', label: '神话', color: '#e91e63' },
  { value: 'legendary', label: '传说', color: '#ff9800' },
  { value: 'epic', label: '史诗', color: '#9c27b0' },
  { value: 'rare', label: '稀有', color: '#2196f3' },
  { value: 'uncommon', label: '优秀', color: '#4caf50' },
  { value: 'common', label: '普通', color: '#9e9e9e' },
];

const handleSelect = (value: Rarity | 'all') => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="rarity-filter">
    <div class="filter-label">品质筛选：</div>
    <div class="filter-buttons">
      <button
        v-for="option in rarityOptions"
        :key="option.value"
        class="filter-btn"
        :class="{ active: modelValue === option.value }"
        :style="{ '--rarity-color': option.color }"
        @click="handleSelect(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rarity-filter {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--input-bg);
  flex-wrap: wrap;

  .filter-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-color);
    white-space: nowrap;
  }

  .filter-buttons {
    display: flex;
    gap: var(--spacing-xs);
    flex-wrap: wrap;
    flex: 1;
  }

  .filter-btn {
    padding: 4px var(--spacing-sm);
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: 0.85rem;
    color: var(--text-color);
    white-space: nowrap;

    &:hover {
      border-color: var(--rarity-color);
      background: var(--card-bg);
      color: var(--rarity-color);
      transform: translateY(-1px);
    }

    &.active {
      background: var(--rarity-color);
      border-color: var(--rarity-color);
      color: white;
      font-weight: 600;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .rarity-filter {
    padding: var(--spacing-xs) var(--spacing-sm);
    gap: var(--spacing-sm);

    .filter-label {
      font-size: 0.85rem;
    }

    .filter-buttons {
      gap: 4px;
    }

    .filter-btn {
      font-size: 0.8rem;
      padding: 3px var(--spacing-xs);
    }
  }
}

@media (max-width: 480px) {
  .rarity-filter {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);

    .filter-label {
      font-size: 0.8rem;
    }

    .filter-buttons {
      width: 100%;
      justify-content: flex-start;
    }

    .filter-btn {
      font-size: 0.75rem;
      padding: 2px 6px;
    }
  }
}
</style>
