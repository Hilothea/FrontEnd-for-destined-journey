import { watch } from 'vue';
import { useThemeStore } from '../store/theme';

/**
 * 主题 composable
 * 自动监听主题变化并应用 CSS 变量
 */
export function useTheme() {
  const themeStore = useThemeStore();

  // 监听主题变化，自动应用 CSS 变量
  watch(
    () => themeStore.effectiveColors,
    () => {
      themeStore.applyCssVariables();
    },
    { deep: true },
  );

  return {
    themeStore,
  };
}
