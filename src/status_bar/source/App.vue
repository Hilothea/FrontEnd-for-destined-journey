<script setup lang="ts">
import { onMounted } from 'vue';
import Ascension from './components/Ascension.vue';
import Destiny from './components/Destiny/index.vue';
import Equipment from './components/Equipment/index.vue';
import Items from './components/Items/index.vue';
import News from './components/News/index.vue';
import Skills from './components/Skills/index.vue';
import Task from './components/Task.vue';
import ThemePanel from './components/ThemePanel.vue';
import UserInfo from './components/UserInfo/index.vue';
import WorldStatus from './components/WorldStatus.vue';
import { useTheme } from './composables/use-theme';

const { themeStore } = useTheme();

// 初始化主题
onMounted(() => {
  // 从酒馆加载主题配置
  themeStore.loadThemeFromTavern();
  // 应用 CSS 变量
  themeStore.applyCssVariables();
});
</script>

<template>
  <div class="layout">
    <ThemePanel />
    <WorldStatus />
    <Ascension />
    <Task />
    <UserInfo />
    <Equipment />
    <Skills />
    <Items />
    <Destiny />
    <News />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: var(--theme-background);
  opacity: var(--theme-background-opacity);
  border: var(--theme-main-border-width) solid var(--theme-main-border);
  border-radius: 8px;
  overflow: hidden;
}
</style>
