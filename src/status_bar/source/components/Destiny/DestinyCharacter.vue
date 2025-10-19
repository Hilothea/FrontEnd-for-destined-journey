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

// 响应式的窗口宽度
const windowWidth = ref(window.innerWidth);

// 监听窗口大小变化
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

// 判断文本是否需要换行显示
// 基于字符长度和窗口宽度的判断
const shouldWrapText = (text: string) => {
  if (!text) return false;

  const textLength = text.length;

  // 移动端（<= 600px）：超过20个字符就换行
  if (windowWidth.value <= 600) {
    return textLength > 20;
  }

  // 平板端（600px < width <= 1000px）：超过30个字符就换行
  if (windowWidth.value <= 1000) {
    return textLength > 30;
  }

  // 桌面端（> 1000px）：超过50个字符才换行
  return textLength > 50;
};

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

// 基本信息数据结构
const basicInfoFields = computed(() => [
  { icon: '⚜️', label: '生命层级', value: props.lifeLevel },
  { icon: '✨', label: '等级', value: String(props.level) },
  { icon: '🧬', label: '种族', value: props.race },
  { icon: '👑', label: '身份', value: identityText.value },
  { icon: '⚖️', label: '职业', value: occupationText.value },
  { icon: '🎭', label: '性格', value: props.personality },
  { icon: '💖', label: '喜爱', value: props.favorites },
  { icon: '🌸', label: '外貌特质', value: props.appearance },
  { icon: '👗', label: '衣物装饰', value: props.adornments },
  { icon: '⚔️', label: '角色装备', value: props.equipment },
  { icon: '♾️', label: '登神长阶', value: props.ascension },
]);

// 命运关系数据结构
const destinyFields = computed(() => [
  { icon: '', label: '是否缔结红线', value: props.isTied },
  { icon: '❤️', label: '好感度', value: affectionData.value.text, showBar: true },
  { icon: '💭', label: '评价', value: props.evaluation || '暂无评价' },
  { icon: '📜', label: '背景故事', value: props.backstory },
]);
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
        <div
          v-for="field in basicInfoFields"
          :key="field.label"
          class="info-row"
          :class="{ 'wrap-value': shouldWrapText(field.value) }"
        >
          <span class="property-name">{{ field.icon }} {{ field.label }}:</span>
          <span class="value-main">{{ field.value }}</span>
        </div>
      </div>

      <hr class="divider" />

      <!-- 命运关系区 -->
      <div class="destiny-section">
        <template v-for="field in destinyFields" :key="field.label">
          <div class="info-row" :class="{ 'wrap-value': shouldWrapText(field.value) }">
            <span class="property-name">{{ field.icon }}{{ field.icon ? ' ' : '' }}{{ field.label }}:</span>
            <span class="value-main">{{ field.value }}</span>
          </div>
          <div v-if="field.showBar" class="affection-bar-container">
            <div class="affection-bar-value" :style="{ width: `${affectionData.percentage}%` }"></div>
          </div>
        </template>
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
    color: var(--theme-text-secondary);
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
    flex-shrink: 0;
  }

  .value-main {
    color: var(--theme-text-primary);
    word-break: break-word;
  }

  /* 根据字符数判断是否需要换行 */
  &.wrap-value {
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;

    .value-main {
      padding-left: 1.5em;
    }
  }
}

.divider {
  border: 0;
  border-top: 1px solid var(--theme-border-dark);
  width: 100%;
}

/* 好感度进度条 */
.affection-bar-container {
  background-color: var(--theme-progress-bar-bg);
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
  background-color: var(--theme-affection-bar);
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
  color: var(--theme-text-tertiary);
}

.skill-description {
  font-size: 0.9em;
  color: var(--theme-text-muted);
  padding-left: 1em;
}
</style>
