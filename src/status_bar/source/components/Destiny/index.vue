<script lang="ts" setup>
import { useStatData } from '../../composables/use-stat-data';
import { getExtensibleItems, safeGet } from '../../utils/data-adapter';
import CommonStatus from '../common/CommonStatus.vue';
import DestinyCharacter from './DestinyCharacter.vue';

// 使用状态数据
const { statData } = useStatData();

// 获取命运点数
const destinyPoints = computed(() => {
  if (!statData.value) return 0;
  return safeGet(statData.value, '命定系统.命运点数', 0);
});

// 获取命定之人角色数据
const charactersData = computed(() => {
  if (!statData.value) return [];

  const destinyPeopleObj = safeGet(statData.value, '命定系统.命定之人', {});
  const characters = getExtensibleItems(destinyPeopleObj);

  return Object.entries(characters).map(([charName, charData]: [string, any]) => ({
    name: charName,
    bePresent: safeGet(charData, '是否在场', '是'),
    lifeLevel: safeGet(charData, '生命层级', ''),
    level: safeGet(charData, '等级', 1),
    race: safeGet(charData, '种族', ''),
    identity: safeGet(charData, '身份', []),
    occupation: safeGet(charData, '职业', []),
    personality: safeGet(charData, '性格', ''),
    favorites: safeGet(charData, '喜爱', ''),
    appearance: safeGet(charData, '外貌特质', ''),
    adornments: safeGet(charData, '衣物装饰', ''),
    equipment: safeGet(charData, '装备', {}),
    attributes: safeGet(charData, '属性', {}),
    ascension: safeGet(charData, '登神长阶', {}),
    isTied: safeGet(charData, '是否缔结契约', '否'),
    affection: safeGet(charData, '好感度', 0),
    evaluation: safeGet(charData, '评价', ''),
    backstory: safeGet(charData, '背景故事', ''),
    skills: safeGet(charData, '技能', {}),
  }));
});

// 计算摘要信息
const summaryDetails = computed(() => {
  const fp = destinyPoints.value;
  const count = charactersData.value.length;
  return `FP: ${fp} | 命定: ${count}人`;
});

// 触发命运抽卡
const handleGacha = () => {
  // 调用 SillyTavern 的斜杠命令
  if (typeof triggerSlash === 'function') {
    triggerSlash('/send 开始命运抽卡*5|/trigger');
  } else {
    console.error('triggerSlash function is not available.');
  }
};
</script>

<template>
  <CommonStatus title="💞 命定之人" variant="section" :default-open="false" :summary-details="summaryDetails">
    <!-- 命运抽卡按钮 -->
    <button class="gacha-button" @click="handleGacha">命运抽卡(5连/500点)</button>

    <!-- 命运点数显示 -->
    <div class="destiny-points">
      <span class="property-name">💖 命运点数 FP:</span>
      <span class="value-main">{{ destinyPoints }}</span>
    </div>

    <!-- 命定之人角色列表 -->
    <div v-if="charactersData.length > 0" class="characters-list">
      <DestinyCharacter
        v-for="(char, index) in charactersData"
        :key="index"
        :be-present="char.bePresent"
        :name="char.name"
        :life-level="char.lifeLevel"
        :level="char.level"
        :race="char.race"
        :identity="char.identity"
        :occupation="char.occupation"
        :personality="char.personality"
        :favorites="char.favorites"
        :appearance="char.appearance"
        :adornments="char.adornments"
        :equipment="char.equipment"
        :attributes="char.attributes"
        :ascension="char.ascension"
        :is-tied="char.isTied"
        :affection="char.affection"
        :evaluation="char.evaluation"
        :backstory="char.backstory"
        :skills="char.skills"
      />
    </div>

    <!-- 空状态提示 -->
    <p v-else class="empty-message value-main">尚未与任何人缔结命定契约</p>
  </CommonStatus>
</template>

<style lang="scss" scoped>
/* 命运抽卡按钮 */
.gacha-button {
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

/* 命运点数 */
.destiny-points {
  margin-bottom: 12px;
  line-height: 1.6;

  .property-name {
    font-weight: bold;
    color: var(--theme-text-secondary);
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
  }

  .value-main {
    color: var(--theme-text-primary);
  }
}

/* 角色列表 */
.characters-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* 空状态提示 */
.empty-message {
  color: var(--theme-text-muted);
  font-style: italic;
  margin: 0;
}
</style>
