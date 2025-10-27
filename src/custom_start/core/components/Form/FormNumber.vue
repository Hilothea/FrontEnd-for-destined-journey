<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  showControls?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
  (e: 'blur', event: FocusEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  min: 1,
  max: 10000,
  step: 1,
  placeholder: '',
  disabled: false,
  readonly: false,
  showControls: true,
});

const emit = defineEmits<Emits>();
const inputRef = ref<HTMLInputElement>();

const numberValue = computed({
  get: () => props.modelValue,
  set: value => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(props.min, Math.min(props.max, numValue));
      emit('update:modelValue', clampedValue);
      emit('change', clampedValue);
    }
  },
});

const increment = () => {
  if (!props.disabled && !props.readonly) {
    const newValue = Math.min(props.max, props.modelValue + props.step);
    emit('update:modelValue', newValue);
    emit('change', newValue);
  }
};

const decrement = () => {
  if (!props.disabled && !props.readonly) {
    const newValue = Math.max(props.min, props.modelValue - props.step);
    emit('update:modelValue', newValue);
    emit('change', newValue);
  }
};

const handleBlur = (event: FocusEvent) => {
  // 失去焦点时，确保值在范围内
  let clampedValue: number;

  if (!isNaN(props.modelValue) && props.modelValue !== null) {
    clampedValue = Math.max(props.min, Math.min(props.max, props.modelValue));
  } else {
    // 如果值不是数字，重置为最小值
    clampedValue = props.min;
  }

  // 更新绑定值
  if (clampedValue !== props.modelValue) {
    emit('update:modelValue', clampedValue);
    emit('change', clampedValue);
  }

  // 强制同步 input 的显示值
  if (inputRef.value) {
    inputRef.value.value = String(clampedValue);
  }

  emit('blur', event);
};
</script>

<template>
  <div class="form-number-wrapper">
    <input
      ref="inputRef"
      v-model.number="numberValue"
      type="number"
      :min="min"
      :max="max"
      :step="step"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="form-number"
      :class="{
        'is-disabled': disabled,
        'is-readonly': readonly,
        'has-controls': showControls,
      }"
      @blur="handleBlur"
    />
    <div v-if="showControls" class="number-controls">
      <button
        type="button"
        class="control-btn up"
        :disabled="disabled || readonly || modelValue >= max"
        @click="increment"
      >
        ▲
      </button>
      <button
        type="button"
        class="control-btn down"
        :disabled="disabled || readonly || modelValue <= min"
        @click="decrement"
      >
        ▼
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-number-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.form-number {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  color: var(--text-color);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  outline: none;

  &.has-controls {
    padding-right: 36px;
    border-radius: var(--radius-md) 0 0 var(--radius-md);
    border-right: none;
  }

  // 隐藏默认的数字输入框箭头
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &::placeholder {
    color: var(--text-light);
  }

  &:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    background: #fff;
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: var(--border-color-strong);
  }

  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--border-color-light);
  }

  &.is-readonly {
    background: var(--border-color-light);
    cursor: default;
  }
}

.number-controls {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--border-color);
  border-left: none;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  background: var(--button-bg);
  overflow: hidden;

  .control-btn {
    width: 32px;
    height: 20px;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--text-color);
    font-size: 0.7rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
      background: var(--button-hover);
      color: var(--accent-color);
    }

    &:active:not(:disabled) {
      background: var(--border-color-strong);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &.up {
      border-bottom: 1px solid var(--border-color);
    }
  }
}
</style>
