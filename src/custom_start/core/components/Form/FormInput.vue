<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string | number;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number;
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
});

const emit = defineEmits<Emits>();

const inputValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};
</script>

<template>
  <div class="form-input-wrapper">
    <input
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      class="form-input"
      :class="{ 'is-disabled': disabled, 'is-readonly': readonly }"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<style lang="scss" scoped>
.form-input-wrapper {
  position: relative;
  width: 100%;
}

.form-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  color: var(--text-color);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  outline: none;

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
</style>
