<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  disableIncrement?: boolean;
  label?: string;
}

interface Emits {
  (e: 'update:modelValue', value: number): void;
  (e: 'increment'): void;
  (e: 'decrement'): void;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  disableIncrement: false,
});

const emit = defineEmits<Emits>();

const canDecrement = computed(() => !props.disabled && props.modelValue > props.min);
const canIncrement = computed(() => !props.disabled && !props.disableIncrement && props.modelValue < props.max);

const increment = () => {
  if (canIncrement.value) {
    const newValue = Math.min(props.max, props.modelValue + props.step);
    emit('update:modelValue', newValue);
    emit('increment');
  }
};

const decrement = () => {
  if (canDecrement.value) {
    const newValue = Math.max(props.min, props.modelValue - props.step);
    emit('update:modelValue', newValue);
    emit('decrement');
  }
};
</script>

<template>
  <div class="form-stepper">
    <span v-if="label" class="stepper-label">{{ label }}</span>
    <div class="stepper-controls">
      <button type="button" class="stepper-btn decrement" :disabled="!canDecrement" @click="decrement">−</button>
      <span class="stepper-value">{{ modelValue }}</span>
      <button type="button" class="stepper-btn increment" :disabled="!canIncrement" @click="increment">+</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-stepper {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.stepper-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--title-color);
  min-width: 60px;
}

.stepper-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-xs);
}

.stepper-btn {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border-color);
  background: var(--button-bg);
  color: var(--text-color);
  border-radius: var(--radius-sm);
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover:not(:disabled) {
    background: var(--button-hover);
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: var(--border-color-light);
  }

  &.decrement {
    &:hover:not(:disabled) {
      color: var(--error-color);
      border-color: var(--error-color);
    }
  }

  &.increment {
    &:hover:not(:disabled) {
      color: var(--success-color);
      border-color: var(--success-color);
    }
  }
}

.stepper-value {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-color);
  user-select: none;
}
</style>
