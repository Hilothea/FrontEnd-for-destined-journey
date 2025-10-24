<script lang="ts" setup>
import { useStatData } from '../../composables/use-stat-data';
import { safeGet } from '../../utils/data-adapter';
import CommonStatus from '../common/CommonStatus.vue';
import NewsSection from './NewsSection.vue';

const { statData } = useStatData();

// 获取新闻数据
const goldLionNews = computed(() => safeGet(statData.value, '每日新闻.阿斯塔利亚快讯', ''));

const tavernNews = computed(() => safeGet(statData.value, '每日新闻.酒馆留言板', ''));

const teaPartyNews = computed(() => safeGet(statData.value, '每日新闻.午后茶会', ''));

// 触发更新新闻
const handleUpdateNews = () => {
  // 调用 SillyTavern 的斜杠命令
  if (typeof triggerSlash === 'function') {
    triggerSlash('/send 更新"每日新闻"|/trigger');
  } else {
    console.error('triggerSlash function is not available.');
  }
};
</script>

<template>
  <CommonStatus title="🌍 每日新闻" variant="section" :default-open="false">
    <!-- 更新新闻按钮 -->
    <button class="update-button" @click="handleUpdateNews">更新每日新闻</button>

    <!-- 阿斯塔利亚快讯 -->
    <NewsSection
      title="📰 阿斯塔利亚快讯"
      :content="goldLionNews"
      empty-message="暂无最新快讯"
      title-class="news-gold-lion"
    />

    <!-- 酒馆留言板 -->
    <NewsSection
      title="🍻 酒馆留言板"
      :content="tavernNews"
      empty-message="留言板上空空如也"
      title-class="news-tavern"
    />

    <!-- 红线助手的午后茶会 -->
    <NewsSection
      title="☕ 午后茶会"
      :content="teaPartyNews"
      empty-message="茶会上没什么新八卦"
      title-class="news-tea-party"
    />
  </CommonStatus>
</template>

<style lang="scss" scoped>
/* 更新按钮 */
.update-button {
  background-color: var(--theme-button-bg);
  color: var(--theme-button-text);
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.9em;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--theme-button-bg-hover);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
}

/* 新闻标题样式 */
:deep(.news-gold-lion) {
  font-family: 'Cinzel', serif;
  color: var(--theme-news-important);
  font-weight: 700;
}

:deep(.news-tavern) {
  font-family: 'Merriweather', serif;
  color: var(--theme-news-normal);
  font-weight: 700;
}

:deep(.news-tea-party) {
  font-family: 'Cinzel', serif;
  color: var(--theme-news-minor);
  font-weight: 700;
}
</style>
