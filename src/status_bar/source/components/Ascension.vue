<script lang="ts" setup>
import { useStatData } from '../composables/use-stat-data';
import { getExtensibleItems, safeGet } from '../utils/data-adapter';
import CommonStatus from './common/CommonStatus.vue';

// 定义类型
interface AscensionItem {
  name: string;
  description: string;
}

interface DivinityInfo {
  name: string;
  kingdom: string;
  kingdomDesc: string;
}

// 使用状态数据
const { statData } = useStatData();

// 获取用户等级
const userLevel = computed(() => {
  if (!statData.value) return 1;
  return safeGet(statData.value, '角色.状态.等级', 1);
});

// 获取登神长阶数据
const ascensionData = computed(() => {
  if (!statData.value) return null;
  return safeGet(statData.value, '登神长阶', {});
});

// 获取要素数据 - 直接的键值对格式
const elementsData = computed((): AscensionItem[] => {
  if (!ascensionData.value) return [];

  const elementsObj = safeGet(ascensionData.value, '要素', {});
  const items = getExtensibleItems(elementsObj);

  return Object.entries(items).map(([name, description]: [string, any]) => ({
    name,
    description: String(description || ''),
  }));
});

// 获取权能数据 - 直接的键值对格式
const authorityData = computed((): AscensionItem[] => {
  if (!ascensionData.value) return [];

  const authorityObj = safeGet(ascensionData.value, '权能', {});
  const items = getExtensibleItems(authorityObj);

  return Object.entries(items).map(([name, description]: [string, any]) => ({
    name,
    description: String(description || ''),
  }));
});

// 获取法则数据 - 直接的键值对格式
const lawsData = computed((): AscensionItem[] => {
  if (!ascensionData.value) return [];

  const lawsObj = safeGet(ascensionData.value, '法则', {});
  const items = getExtensibleItems(lawsObj);

  return Object.entries(items).map(([name, description]: [string, any]) => ({
    name,
    description: String(description || ''),
  }));
});

// 获取神位/神国数据
const divinityData = computed((): DivinityInfo => {
  if (!ascensionData.value) return { name: '', kingdom: '', kingdomDesc: '' };

  return {
    name: safeGet(ascensionData.value, '神位', ''),
    kingdom: safeGet(ascensionData.value, '神国.名称', ''),
    kingdomDesc: safeGet(ascensionData.value, '神国.描述', ''),
  };
});

// 判断各阶段是否解锁
const isElementsUnlocked = computed(() => userLevel.value >= 13);
const isAuthorityUnlocked = computed(() => userLevel.value >= 17);
const isLawsUnlocked = computed(() => userLevel.value >= 21);
const isDivinityUnlocked = computed(() => userLevel.value >= 25);

// 计算摘要信息
const summaryDetails = computed(() => {
  if (userLevel.value < 13) return '未开启';
  if (userLevel.value >= 25 && divinityData.value.name) {
    return divinityData.value.name.trim() !== '' ? `已登神: ${divinityData.value.name}` : `已登神`;
  }
  if (userLevel.value >= 21 && lawsData.value.length > 0) {
    return '当前阶段: 法则';
  }
  if (userLevel.value >= 17 && authorityData.value.length > 0) {
    return '当前阶段: 权能';
  }
  if (userLevel.value >= 13 && elementsData.value.length > 0) {
    return '当前阶段: 要素';
  }
  return '长阶已启';
});
</script>

<template>
  <CommonStatus title="♾️ 登神长阶" variant="section" :summary-details="summaryDetails" :default-open="false">
    <!-- 要素 -->
    <CommonStatus title="要素" variant="sub-section" :default-open="false" :locked="!isElementsUnlocked">
      <template #title> 要素 <span class="step-level-req">13级开启</span> </template>

      <div v-if="isElementsUnlocked" class="step-items-container">
        <div v-if="elementsData.length > 0">
          <div v-for="(item, index) in elementsData" :key="index" class="step-item">
            <span class="item-name">❖ {{ item.name }}:</span>
            <span class="item-desc">{{ item.description }}</span>
          </div>
        </div>
        <p v-else class="empty-slot">尚无要素</p>
      </div>
    </CommonStatus>

    <!-- 权能 -->
    <CommonStatus title="权能" variant="sub-section" :default-open="false" :locked="!isAuthorityUnlocked">
      <template #title> 权能 <span class="step-level-req">17级开启</span> </template>

      <div v-if="isAuthorityUnlocked" class="step-items-container">
        <div v-if="authorityData.length > 0">
          <div v-for="(item, index) in authorityData" :key="index" class="step-item">
            <span class="item-name">❖ {{ item.name }}:</span>
            <span class="item-desc">{{ item.description }}</span>
          </div>
        </div>
        <p v-else class="empty-slot">尚无权能</p>
      </div>
    </CommonStatus>

    <!-- 法则 -->
    <CommonStatus title="法则" variant="sub-section" :default-open="false" :locked="!isLawsUnlocked">
      <template #title> 法则 <span class="step-level-req">21级开启</span> </template>

      <div v-if="isLawsUnlocked" class="step-items-container">
        <div v-if="lawsData.length > 0">
          <div v-for="(item, index) in lawsData" :key="index" class="step-item">
            <span class="item-name">❖ {{ item.name }}:</span>
            <span class="item-desc">{{ item.description }}</span>
          </div>
        </div>
        <p v-else class="empty-slot">（尚无法则）</p>
      </div>
    </CommonStatus>

    <!-- 神位 / 神国 -->
    <CommonStatus title="神位 / 神国" variant="sub-section" :default-open="false" :locked="!isDivinityUnlocked">
      <template #title> 神位 / 神国 <span class="step-level-req">25级开启</span> </template>

      <div v-if="isDivinityUnlocked" class="god-tier-grid">
        <div>
          <div class="step-item">
            <span class="item-name">神位: </span>
            <span v-if="divinityData.name" class="value-main">{{ divinityData.name }}</span>
            <span v-else class="empty-slot">尚未登临</span>
          </div>
        </div>
        <div>
          <template v-if="divinityData.kingdom">
            <div class="step-item">
              <span class="item-name">神国: </span>
              <span class="value-main">{{ divinityData.kingdom }}</span>
            </div>
            <div v-if="divinityData.kingdomDesc" class="step-item kingdom-desc">
              <span class="item-desc">{{ divinityData.kingdomDesc }}</span>
            </div>
          </template>
          <div v-else class="step-item">
            <span class="item-name">神国: </span>
            <span class="empty-slot">尚未开辟</span>
          </div>
        </div>
      </div>
    </CommonStatus>
  </CommonStatus>
</template>

<style lang="scss" scoped>
/* 等级要求标签 */
.step-level-req {
  font-size: 0.8em;
  color: var(--theme-text-muted);
  font-style: italic;
  margin-left: 15px;
}

/* 步骤项容器 */
.step-items-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 步骤项 */
.step-item {
  margin-bottom: 5px;
  line-height: 1.6;
}

.item-name {
  font-weight: bold;
  color: var(--theme-text-tertiary);
}

.item-desc {
  font-size: 0.9em;
  font-style: italic;
  color: var(--theme-text-muted);
  margin-left: 20px;
  display: block; /* 确保换行 */
}

/* 空状态提示 */
.empty-slot {
  color: var(--theme-text-muted);
  font-style: italic;
  margin: 0;
}

/* 神位/神国网格布局 */
.god-tier-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* 神国描述缩进 */
.kingdom-desc {
  margin-top: -5px;

  .item-desc {
    margin-left: 0;
    padding-left: 1.5em;
  }
}

/* 响应式布局 */
@media (max-width: 768px) {
  .god-tier-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
