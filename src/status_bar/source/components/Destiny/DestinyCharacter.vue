<script lang="ts" setup>
import { getExtensibleItems } from '../../utils/data-adapter';
import CommonStatus from '../common/CommonStatus.vue';

interface Props {
  /** 角色名称 */
  name: string;
  /** 生命层级 */
  lifeLevel?: string;
  /** 等级 */
  level?: number;
  /** 种族 */
  race?: string;
  /** 身份 */
  identity?: string[] | string;
  /** 职业 */
  occupation?: string[] | string;
  /** 性格 */
  personality?: string;
  /** 喜爱 */
  favorites?: string;
  /** 外貌特质 */
  appearance?: string;
  /** 衣物装饰 */
  adornments?: string;
  /** 角色装备 */
  equipment?: string;
  /** 登神长阶 */
  ascension?: string;
  /** 是否缔结红线 */
  isTied?: string;
  /** 好感度（格式：当前/最大） */
  affection?: number;
  /** 评价 */
  evaluation?: string;
  /** 背景故事 */
  backstory?: string;
  /** 羁绊技能 */
  bondSkill?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  lifeLevel: '未知',
  level: 1,
  race: '未知',
  identity: () => [],
  occupation: () => [],
  personality: '未知',
  favorites: '未知',
  appearance: '未知',
  adornments: '未知',
  equipment: '未知',
  ascension: '未开启',
  isTied: '否',
  affection: 0,
  evaluation: '',
  backstory: '未知',
  bondSkill: () => ({}),
});

// 格式化身份（兼容字符串和数组）
const identityText = computed(() => {
  if (!props.identity) return '未知';
  if (typeof props.identity === 'string') return props.identity;
  if (Array.isArray(props.identity)) {
    if (props.identity.length === 0) return '未知';
    return props.identity.join('，');
  }
  return '未知';
});

// 格式化职业（兼容字符串和数组）
const occupationText = computed(() => {
  if (!props.occupation) return '未知';
  if (typeof props.occupation === 'string') return props.occupation;
  if (Array.isArray(props.occupation)) {
    if (props.occupation.length === 0) return '未知';
    return props.occupation.join('，');
  }
  return '未知';
});

// 解析好感度
const affectionData = computed(() => {
  const current = props.affection || 0;
  const max = 1000;
  return {
    current,
    max,
    text: `${current}/${max}`,
    percentage: ((current / max) * 100).toFixed(1),
  };
});

const bondSkills = computed(() => {
  if (props.isTied !== '是' || !props.bondSkill) {
    return [];
  }

  const extensibleItems = getExtensibleItems(props.bondSkill);
  const entries = Object.entries(extensibleItems);
  if (entries.length === 0) {
    return [];
  }

  return entries.map(([skillName, skillDescription]) => ({
    name: skillName,
    description: String(skillDescription),
  }));
});
</script>

<template>
  <CommonStatus
    :title="name"
    variant="entry"
    :default-open="false"
    :summary-details="`❤️ ${affectionData.text}`"
    custom-class="destiny-character"
  >
    <div class="character-info">
      <!-- 基本信息区 -->
      <div class="info-section">
        <div class="info-row">
          <span class="property-name">⚜️ 生命层级:</span>
          <span class="value-main">{{ lifeLevel }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">✨ 等级:</span>
          <span class="value-main">{{ level }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">🧬 种族:</span>
          <span class="value-main">{{ race }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">👑 身份:</span>
          <span class="value-main">{{ identityText }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">⚖️ 职业:</span>
          <span class="value-main">{{ occupationText }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">🎭 性格:</span>
          <span class="value-main">{{ personality }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">💖 喜爱:</span>
          <span class="value-main">{{ favorites }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">🌸 外貌特质:</span>
          <span class="value-main">{{ appearance }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">👗 衣物装饰:</span>
          <span class="value-main">{{ adornments }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">⚔️ 角色装备:</span>
          <span class="value-main">{{ equipment }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">♾️ 登神长阶:</span>
          <span class="value-main">{{ ascension }}</span>
        </div>
      </div>

      <hr class="divider" />

      <!-- 命运关系区 -->
      <div class="destiny-section">
        <div class="info-row">
          <span class="property-name">是否缔结红线:</span>
          <span class="value-main">{{ isTied }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">❤️ 好感度:</span>
          <span class="value-main">{{ affectionData.text }}</span>
        </div>
        <div class="affection-bar-container">
          <div class="affection-bar-value" :style="{ width: `${affectionData.percentage}%` }"></div>
        </div>
        <div class="info-row">
          <span class="property-name">💭 评价:</span>
          <span class="value-main">{{ evaluation || '暂无评价' }}</span>
        </div>
        <div class="info-row">
          <span class="property-name">📜 背景故事:</span>
          <span class="value-main">{{ backstory }}</span>
        </div>
      </div>

      <hr class="divider" />

      <!-- 羁绊技能区 -->
      <CommonStatus title="💞 羁绊技能" variant="sub-section" :default-open="false" custom-class="bond-skill-section">
        <div class="bond-skill-content">
          <template v-if="isTied !== '是'">
            <p class="value-main">无羁绊技能</p>
          </template>
          <template v-else-if="bondSkills.length > 0">
            <div v-for="skill in bondSkills" :key="skill.name" class="skill-item">
              <div class="skill-name">{{ skill.name }}</div>
              <div class="skill-description">{{ skill.description }}</div>
            </div>
          </template>
          <template v-else>
            <p class="value-main">尚未觉醒</p>
          </template>
        </div>
      </CommonStatus>
    </div>
  </CommonStatus>
</template>

<style lang="scss" scoped>
.destiny-character {
  margin-bottom: 6px;
}

.character-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-section,
.destiny-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  gap: 8px;
  line-height: 1.6;
  align-items: baseline;

  .property-name {
    font-weight: bold;
    color: #6a514d;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
    flex-shrink: 0;
  }

  .value-main {
    color: #4a3b31;
    word-break: break-word;
  }
}

.divider {
  border: 0;
  border-top: 1px solid #c6b8a5;
  width: 100%;
}

/* 好感度进度条 */
.affection-bar-container {
  background-color: #c8bbaf;
  border-radius: 9px;
  height: 18px;
  margin-top: 4px;
  margin-bottom: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
}

.affection-bar-value {
  height: 100%;
  transition: width 0.8s ease-out;
  border-radius: 9px;
  background-color: #ec407a;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.1));
  box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.1);
}

.bond-skill-section {
  margin-top: 10px;
}

.bond-skill-content {
  white-space: pre-wrap;
  line-height: 1.6;
}

.skill-item {
  & + .skill-item {
    margin-top: 8px;
  }
}

.skill-name {
  font-weight: bold;
  color: #6d4c41;
}

.skill-description {
  font-size: 0.9em;
  color: #7a655d;
  padding-left: 1em;
}
</style>
