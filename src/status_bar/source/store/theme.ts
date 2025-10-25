import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { defaultTheme, type Theme, type ThemeColors } from '../types/theme';

/**
 * 主题管理 Pinia store
 * 负责主题的加载、切换、自定义和持久化
 */
export const useThemeStore = defineStore('status-bar-theme', () => {
  // ============ State ============

  /** 当前使用的主题 */
  const currentTheme = ref<Theme>(JSON.parse(JSON.stringify(defaultTheme)));

  /** 用户自定义的主题数据（从酒馆变量加载） */
  const userTheme = ref<Partial<ThemeColors> | null>(null);

  /** 主题是否已加载 */
  const themeLoaded = ref(false);

  // Computed

  /**
   * 获取有效的主题颜色
   * 优先级: 用户自定义 > 当前主题
   */
  const effectiveColors = computed((): ThemeColors => {
    if (!userTheme.value) {
      return currentTheme.value.colors;
    }
    // 合并用户自定义颜色和默认颜色
    return {
      ...currentTheme.value.colors,
      ...userTheme.value,
    };
  });

  // Actions

  /**
   * 从酒馆全局变量加载主题配置
   */
  const loadThemeFromTavern = () => {
    try {
      // 从酒馆全局变量中读取主题配置
      const variables = getVariables({ type: 'character' });
      const themeData = _.get(variables, 'status_bar_theme', null);

      if (themeData && typeof themeData === 'object') {
        userTheme.value = themeData;
      }
      themeLoaded.value = true;
    } catch (error) {
      console.error('加载主题配置失败:', error);
      themeLoaded.value = true;
    }
  };

  /**
   * 保存主题配置到酒馆角色卡变量
   */
  const saveThemeToTavern = async () => {
    try {
      // 使用 insertOrAssignVariables 来只更新 status_bar_theme 变量，不影响其他变量
      await insertOrAssignVariables({ status_bar_theme: userTheme.value || {} }, { type: 'character' });
    } catch (error) {
      console.error('保存主题配置失败:', error);
    }
  };

  /**
   * 更新单个颜色值
   * @param colorKey 颜色键
   * @param colorValue 颜色值
   */
  const updateColor = (colorKey: keyof ThemeColors, colorValue: string | number) => {
    if (!userTheme.value) {
      userTheme.value = {};
    }
    userTheme.value[colorKey] = colorValue as never;
  };

  /**
   * 更新多个颜色值
   * @param colors 颜色对象
   */
  const updateColors = (colors: Partial<ThemeColors>) => {
    if (!userTheme.value) {
      userTheme.value = {};
    }
    Object.assign(userTheme.value, colors);
  };

  /**
   * 重置为默认主题
   * 清空用户自定义配置，恢复到预设主题
   */
  const resetToDefault = async () => {
    // 清空用户主题，使其使用默认主题
    userTheme.value = null;
    try {
      // 删除酒馆变量中的主题配置
      await deleteVariable('status_bar_theme', { type: 'character' });
    } catch (error) {
      console.error('重置主题配置失败:', error);
    }
  };

  /**
   * 获取当前主题信息
   */
  const getThemeInfo = () => {
    return {
      name: currentTheme.value.name,
      id: currentTheme.value.id,
      isCustomized: userTheme.value !== null && Object.keys(userTheme.value).length > 0,
    };
  };

  /**
   * 应用CSS变量到document根元素
   * 使得所有组件可以使用 var(--theme-xxx) 来引用颜色
   */
  const applyCssVariables = () => {
    const colors = effectiveColors.value;
    const root = document.documentElement;

    // 遍历所有颜色配置，生成CSS变量
    Object.entries(colors).forEach(([key, value]) => {
      // 将驼峰命名转换为kebab-case，例如: backgroundOpacity -> background-opacity
      const cssVarName = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;

      // 为边框宽度添加 px 单位
      let cssValue = String(value);
      if (key === 'mainBorderWidth' && typeof value === 'number') {
        cssValue = `${value}px`;
      }

      root.style.setProperty(cssVarName, cssValue);
    });
  };

  return {
    currentTheme,
    userTheme,
    themeLoaded,
    effectiveColors,
    loadThemeFromTavern,
    saveThemeToTavern,
    updateColor,
    updateColors,
    resetToDefault,
    getThemeInfo,
    applyCssVariables,
  };
});
