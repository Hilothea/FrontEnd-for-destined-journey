<script setup lang="ts">
import { computed } from 'vue';

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  modelValue: string | number;
  options: Option[] | readonly string[] | string[];
  placeholder?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string | number): void;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择',
  disabled: false,
});

const emit = defineEmits<Emits>();

const selectValue = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value);
    emit('change', value);
  },
});

// 规范化选项格式
const normalizedOptions = computed(() => {
  return props.options.map(option => {
    if (typeof option === 'string') {
      return { label: option, value: option, disabled: false };
    }
    return option;
  });
});
</script>

<template>
  <div class="form-select-wrapper">
    <select v-model="selectValue" :disabled="disabled" class="form-select" :class="{ 'is-disabled': disabled }">
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in normalizedOptions" :key="option.value" :value="option.value" :disabled="option.disabled">
        {{ option.label }}
      </option>
    </select>
    <span class="select-arrow">▼</span>
  </div>
</template>

<style lang="scss" scoped>
.form-select-wrapper {
  position: relative;
  width: 100%;
}

.form-select {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  padding-right: 36px;
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  color: var(--text-color);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  outline: none;
  cursor: pointer;
  appearance: none;

  &:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    background: #fff;
  }

  &:hover:not(:disabled) {
    border-color: var(--border-color-strong);
  }

  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--border-color-light);
  }

  option {
    background: var(--input-bg);
    color: var(--text-color);
    padding: var(--spacing-sm);

    &:disabled {
      color: var(--text-light);
    }
  }
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-color);
  font-size: 0.7rem;
  pointer-events: none;
  transition: transform var(--transition-normal);

  .form-select:focus ~ & {
    transform: translateY(-50%) rotate(180deg);
  }
}
</style>
