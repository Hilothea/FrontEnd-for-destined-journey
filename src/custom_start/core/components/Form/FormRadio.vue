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
  disabled?: boolean;
  layout?: 'vertical' | 'horizontal';
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string | number): void;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  layout: 'vertical',
});

const emit = defineEmits<Emits>();

const radioValue = computed({
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
  <div class="form-radio-group" :class="[`layout-${layout}`]">
    <label
      v-for="option in normalizedOptions"
      :key="option.value"
      class="radio-option"
      :class="{
        'is-checked': radioValue === option.value,
        'is-disabled': disabled || option.disabled,
      }"
    >
      <input
        v-model="radioValue"
        type="radio"
        :value="option.value"
        :disabled="disabled || option.disabled"
        class="radio-input"
      />
      <span class="radio-indicator"></span>
      <span class="radio-label">{{ option.label }}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.form-radio-group {
  display: flex;
  gap: var(--spacing-sm);

  &.layout-vertical {
    flex-direction: column;
  }

  &.layout-horizontal {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.radio-option {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  position: relative;

  &:hover:not(.is-disabled) {
    background: var(--card-bg);
    border-color: var(--accent-color);
    box-shadow: var(--shadow-md);
  }

  &.is-checked {
    background: var(--card-bg);
    border-color: var(--accent-color);
    box-shadow: var(--shadow-md);

    .radio-label {
      color: var(--accent-color);
      font-weight: 600;
    }
  }

  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }

  .radio-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .radio-indicator {
    width: 20px;
    height: 20px;
    min-width: 20px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    background: #fff;
    flex-shrink: 0;
    margin-top: 2px;
    transition: all var(--transition-normal);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-color);
      transform: scale(0);
      transition: transform var(--transition-fast);
    }
  }

  .radio-input:focus-visible ~ .radio-indicator {
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
  }

  &:hover:not(.is-disabled) .radio-indicator {
    border-color: var(--accent-color);
  }

  .radio-input:checked ~ .radio-indicator {
    border-color: var(--accent-color);
    background: #fff;

    &::after {
      transform: scale(1);
    }
  }

  .radio-label {
    color: var(--text-color);
    font-size: 1rem;
    line-height: 1.5;
    word-break: break-word;
    flex: 1;
    transition: color var(--transition-fast);
  }
}
</style>
