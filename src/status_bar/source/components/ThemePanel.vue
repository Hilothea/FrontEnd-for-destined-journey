<script setup lang="ts">
import { computed, ref } from 'vue';
import { useThemeStore } from '../store/theme';
import type { ThemeColors } from '../types/theme';

const themeStore = useThemeStore();

// 主题编辑模式开关
const isEditing = ref(false);

// 当前编辑的颜色组
const editingGroup = ref<keyof typeof colorGroups>('main');

// 颜色分组配置
const colorGroups = {
  main: {
    label: '主题背景与边框',
    keys: [
      'background',
      'backgroundOpacity',
      'mainBorder',
      'mainBorderWidth',
      'backgroundSecondary',
      'backgroundTertiary',
      'backgroundTertiaryOpacity',
    ],
  },
  borders: {
    label: '边框颜色',
    keys: ['borderLight', 'borderDark'],
  },
  text: {
    label: '文本颜色',
    keys: ['textPrimary', 'textSecondary', 'textTertiary', 'textMuted'],
  },
  quality: {
    label: '品质颜色',
    keys: ['qualityUnique', 'qualityMythic', 'qualityLegendary', 'qualityEpic', 'qualityRare', 'qualityUncommon'],
  },
  button: {
    label: '按钮颜色',
    keys: ['buttonBg', 'buttonBgHover', 'buttonText'],
  },
  progress: {
    label: '进度条颜色',
    keys: [
      'progressBarBg',
      'progressBarFill',
      'resourceHp',
      'resourceMp',
      'resourceSp',
      'resourceExp',
      'affectionBar',
      'affectionBarNegative',
    ],
  },
  special: {
    label: '特殊元素',
    keys: ['starActive', 'starInactive', 'newsImportant', 'newsNormal', 'newsMinor'],
  },
  status: {
    label: '状态颜色',
    keys: ['disabledBg', 'disabledText', 'titleBg', 'titleBgHover', 'openBg', 'openBorderColor'],
  },
};

// 颜色名称映射
const colorLabels: Record<keyof ThemeColors, string> = {
  background: '主背景色',
  backgroundOpacity: '主背景透明度',
  mainBorder: '主边框色',
  mainBorderWidth: '主边框宽度',
  backgroundSecondary: '次级背景色',
  backgroundTertiary: '三级背景色',
  backgroundTertiaryOpacity: '三级背景透明度',
  borderLight: '浅色边框',
  borderDark: '深色边框',
  textPrimary: '主文本色',
  textSecondary: '次文本色',
  textTertiary: '三级文本色',
  textMuted: '淡化文本色',
  qualityUnique: '唯一品质',
  qualityMythic: '神话品质',
  qualityLegendary: '传说品质',
  qualityEpic: '史诗品质',
  qualityRare: '稀有品质',
  qualityUncommon: '精良品质',
  resourceHp: '生命值',
  resourceMp: '法力值',
  resourceSp: '体力值',
  resourceExp: '经验值',
  buttonBg: '按钮背景',
  buttonBgHover: '按钮悬停',
  buttonText: '按钮文字',
  progressBarBg: '进度条背景',
  progressBarFill: '进度条填充',
  starActive: '激活星标',
  starInactive: '非激活星标',
  affectionBar: '好感度进度条',
  affectionBarNegative: '负好感度进度条',
  newsImportant: '阿斯塔利亚快讯',
  newsNormal: '酒馆留言板',
  newsMinor: '午后茶会',
  disabledBg: '禁用背景',
  disabledText: '禁用文本',
  titleBg: '标题背景',
  titleBgHover: '标题悬停',
  openBg: '打开背景',
  openBorderColor: '打开边框',
};

// 获取当前编辑组的颜色
const currentGroupColors = computed(() => {
  const group = colorGroups[editingGroup.value];
  const colors = themeStore.effectiveColors;
  return group.keys.map(key => ({
    key: key as keyof ThemeColors,
    label: colorLabels[key as keyof ThemeColors],
    value: colors[key as keyof ThemeColors],
  }));
});

// 判断颜色值是否为数字型（透明度或宽度）
const isNumericValue = (key: keyof ThemeColors): boolean => {
  return key === 'backgroundOpacity' || key === 'backgroundTertiaryOpacity' || key === 'mainBorderWidth';
};

// 获取数值范围
const getNumericRange = (key: keyof ThemeColors): { min: number; max: number; step: number } => {
  if (key === 'backgroundOpacity' || key === 'backgroundTertiaryOpacity') {
    return { min: 0, max: 1, step: 0.1 };
  }
  if (key === 'mainBorderWidth') {
    return { min: 1, max: 10, step: 1 };
  }
  return { min: 0, max: 100, step: 1 };
};

// 更新颜色
const handleColorChange = (key: keyof ThemeColors, value: string | number) => {
  themeStore.updateColor(key, value);
};

// 保存主题到酒馆
const handleSave = async () => {
  await themeStore.saveThemeToTavern();
  isEditing.value = false;
};

// 重置为默认
const handleReset = async () => {
  if (confirm('确定要重置为默认主题吗？')) {
    await themeStore.resetToDefault();
  }
};
</script>

<template>
  <div class="theme-panel">
    <!-- 主题信息 -->
    <div class="theme-info">
      <div class="info-content">
        <h3>
          🎨 主题设置
          <span v-if="themeStore.getThemeInfo().isCustomized" class="customized-tag"> 自定义 </span>
          <span v-else class="theme-name">
            {{ themeStore.getThemeInfo().name }}
          </span>
        </h3>
      </div>
      <button class="toggle-btn" :class="{ active: isEditing }" @click="isEditing = !isEditing">
        {{ isEditing ? '折叠编辑' : '📝 编辑' }}
      </button>
    </div>

    <!-- 编辑面板 -->
    <div v-if="isEditing" class="editing-panel">
      <!-- 颜色分组选择 -->
      <div class="group-selector">
        <button
          v-for="(group, groupKey) in colorGroups"
          :key="groupKey"
          class="group-btn"
          :class="{ active: editingGroup === groupKey }"
          @click="editingGroup = groupKey as typeof editingGroup"
        >
          {{ group.label }}
        </button>
      </div>

      <!-- 颜色编辑区域 -->
      <div class="color-editor">
        <h4>{{ colorGroups[editingGroup].label }}</h4>

        <div class="color-items">
          <div v-for="item in currentGroupColors" :key="item.key" class="color-item">
            <label>{{ item.label }}</label>
            <div class="input-group">
              <template v-if="isNumericValue(item.key)">
                <input
                  type="range"
                  class="slider"
                  :value="item.value"
                  :min="getNumericRange(item.key).min"
                  :max="getNumericRange(item.key).max"
                  :step="getNumericRange(item.key).step"
                  @input="e => handleColorChange(item.key, parseFloat((e.target as HTMLInputElement).value))"
                />
                <span class="value-display">{{ item.value }}</span>
              </template>
              <template v-else>
                <input
                  type="color"
                  class="color-input"
                  :value="item.value"
                  @input="e => handleColorChange(item.key, (e.target as HTMLInputElement).value)"
                />
                <input
                  type="text"
                  class="text-input"
                  :value="item.value"
                  @input="e => handleColorChange(item.key, (e.target as HTMLInputElement).value)"
                />
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="actions">
        <button class="btn-primary" @click="handleSave">💾 保存</button>
        <button class="btn-secondary" @click="handleReset">🔄 重置为默认</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme-panel {
  background-color: var(--theme-background-secondary);
  border: 1px solid var(--theme-border-light);
  border-radius: 6px;
  padding: 8px 14px;
  margin-bottom: 15px;
}

/* 主题信息 */
.theme-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  .info-content {
    h3 {
      margin: 0;
      font-size: 0.95em;
      color: var(--theme-text-secondary);
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .theme-name {
      font-weight: 400;
      color: var(--theme-text-muted);
    }

    .customized-tag {
      font-weight: 400;
      color: var(--theme-button-bg);
    }
  }

  .toggle-btn {
    padding: 6px 12px;
    background-color: var(--theme-button-bg);
    color: var(--theme-button-text);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85em;
    transition: background-color 0.2s ease;
    white-space: nowrap;

    &:hover {
      background-color: var(--theme-button-bg-hover);
    }

    &.active {
      background-color: var(--theme-button-bg-hover);
    }
  }
}

/* 编辑面板 */
.editing-panel {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--theme-border-light);
}

.group-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;

  .group-btn {
    padding: 6px 10px;
    background-color: var(--theme-background-tertiary);
    color: var(--theme-text-secondary);
    border: 1px solid var(--theme-border-light);
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8em;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--theme-title-bg-hover);
      border-color: var(--theme-border-dark);
    }

    &.active {
      background-color: var(--theme-button-bg);
      color: var(--theme-button-text);
      border-color: var(--theme-button-bg);
    }
  }
}

.color-editor {
  margin-bottom: 12px;

  h4 {
    margin: 0 0 10px 0;
    font-size: 0.9em;
    color: var(--theme-text-secondary);
    font-weight: 600;
  }
}

.color-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 350px;
  overflow-y: auto;
  padding-right: 6px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--theme-border-light);
    border-radius: 3px;

    &:hover {
      background: var(--theme-border-dark);
    }
  }
}

.color-item {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.8em;
    color: var(--theme-text-secondary);
    font-weight: 600;
  }

  .input-group {
    display: flex;
    gap: 8px;
    align-items: center;

    .color-input {
      width: 50px;
      height: 32px;
      border: 1px solid var(--theme-border-light);
      border-radius: 4px;
      cursor: pointer;
    }

    .text-input {
      flex: 1;
      padding: 6px 8px;
      border: 1px solid var(--theme-border-light);
      border-radius: 4px;
      font-size: 0.8em;
      color: var(--theme-text-primary);
      background-color: var(--theme-background-tertiary);

      &:focus {
        outline: none;
        border-color: var(--theme-button-bg);
      }
    }

    .slider {
      flex: 1;
      cursor: pointer;
    }

    .value-display {
      min-width: 45px;
      font-size: 0.8em;
      color: var(--theme-text-muted);
      text-align: right;
    }
  }
}

/* 操作按钮 */
.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--theme-border-light);

  button {
    flex: 1;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    font-size: 0.85em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background-color: var(--theme-button-bg);
    color: var(--theme-button-text);

    &:hover {
      background-color: var(--theme-button-bg-hover);
    }
  }

  .btn-secondary {
    background-color: var(--theme-background-secondary);
    color: var(--theme-text-secondary);
    border: 1px solid var(--theme-border-light);

    &:hover {
      background-color: var(--theme-title-bg-hover);
      border-color: var(--theme-border-dark);
    }
  }
}
</style>
