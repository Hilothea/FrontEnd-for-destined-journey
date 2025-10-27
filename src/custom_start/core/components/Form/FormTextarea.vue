<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';

interface Props {
  modelValue: string;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number;
  autoResize?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
  placeholder: '',
  disabled: false,
  readonly: false,
  autoResize: false,
});

const emit = defineEmits<Emits>();

const textareaRef = ref<HTMLTextAreaElement>();

const textareaValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

// 自动调整高度
const adjustHeight = () => {
  if (props.autoResize && textareaRef.value) {
    nextTick(() => {
      if (textareaRef.value) {
        textareaRef.value.style.height = 'auto';
        textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
      }
    });
  }
};

watch(() => props.modelValue, adjustHeight);
</script>

<template>
  <div class="form-textarea-wrapper">
    <textarea
      ref="textareaRef"
      v-model="textareaValue"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      class="form-textarea"
      :class="{
        'is-disabled': disabled,
        'is-readonly': readonly,
        'auto-resize': autoResize,
      }"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="adjustHeight"
    />
  </div>
</template>

<style lang="scss" scoped>
.form-textarea-wrapper {
  position: relative;
  width: 100%;
}

.form-textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: var(--font-body);
  color: var(--text-color);
  line-height: 1.5;
  resize: vertical;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
  outline: none;

  &.auto-resize {
    resize: none;
    overflow-y: hidden;
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
</style>
