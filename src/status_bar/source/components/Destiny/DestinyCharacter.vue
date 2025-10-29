<script lang="ts" setup>
import { getExtensibleItems, safeGet } from '../../utils/data-adapter';
import { sortItemsByRarity } from '../../utils/quality';
import CommonStatus from '../common/CommonStatus.vue';
import EquipmentSlot from '../common/EquipmentSlot.vue';
import SkillItem from '../common/SkillItem.vue';

interface Props {
  /* 是否在场景中 */
  bePresent: string;
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
  /** 装备（可扩展对象） */
  equipment?: Record<string, any>;
  /** 属性（五维） */
  attributes?: {
    力量?: number;
    敏捷?: number;
    体质?: number;
    智力?: number;
    精神?: number;
  };
  /** 登神长阶（对象） */
  ascension?: Record<string, any>;
  /** 是否缔结契约 */
  isTied?: string;
  /** 好感度（格式：当前/最大） */
  affection?: number;
  /** 评价 */
  evaluation?: string;
  /** 背景故事 */
  backstory?: string;
  /** 技能（可扩展对象） */
  skills?: Record<string, any>;
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
  equipment: () => ({}),
  attributes: () => ({}),
  ascension: () => ({}),
  isTied: '否',
  affection: 0,
  evaluation: '',
  backstory: '未知',
  skills: () => ({}),
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

  // 去除 '$__META_EXTENSIBLE__$' 字段
  const filterIdentity = props.identity.filter(item => item !== '$__META_EXTENSIBLE__$');

  if (Array.isArray(filterIdentity)) {
    if (filterIdentity.length === 0) return '未知';
    return filterIdentity.join('、');
  }
  return '未知';
});

// 格式化职业（兼容字符串和数组）
const occupationText = computed(() => {
  if (!props.occupation) return '未知';
  if (typeof props.occupation === 'string') return props.occupation;

  // 去除 '$__META_EXTENSIBLE__$' 字段
  const filterOccupation = props.occupation.filter(item => item !== '$__META_EXTENSIBLE__$');

  if (Array.isArray(filterOccupation)) {
    if (filterOccupation.length === 0) return '未知';
    return filterOccupation.join('、');
  }
  return '未知';
});

// 解析好感度（范围：-100 ~ 100，分段独立显示）
const affectionData = computed(() => {
  const current = props.affection || 0;
  const min = -100;
  const max = 100;

  // 判断是负数还是正数
  const isNegative = current < 0;
  const isPositive = current > 0;

  // 分段计算百分比（0 始终是 0%）
  let percentage = 0;
  if (isNegative) {
    // 负数：0~-100 映射到 0~100%
    percentage = (Math.abs(current) / 100) * 100;
  } else if (isPositive) {
    // 正数：0~100 映射到 0~100%
    percentage = (current / 100) * 100;
  }

  // 显示格式：当前值/上下限
  const displayText = isNegative ? `${current}/${min}` : `${current}/${max}`;

  return {
    current,
    min,
    max,
    text: displayText,
    percentage: percentage.toFixed(1),
    isNegative,
    isPositive,
  };
});

// 解析装备数据（按品质权重降序排列）
const equipmentList = computed(() => {
  if (!props.equipment) return [];

  const extensibleItems = getExtensibleItems(props.equipment);
  const entries = Object.entries(extensibleItems);

  const items = entries.map(([equipName, equipData]: [string, any]) => ({
    name: equipName,
    quality: safeGet(equipData, '品质', ''),
    type: safeGet(equipData, '类型', ''),
    tags: safeGet(equipData, '标签', ''),
    effect: safeGet(equipData, '效果', ''),
    description: safeGet(equipData, '描述', ''),
  }));

  // 按品质权重降序排列
  return sortItemsByRarity(items);
});

// 解析技能数据（按类型和品质排序：主动→被动→其它，每组内按品质降序）
const skillsList = computed(() => {
  if (!props.skills) return [];

  const extensibleItems = getExtensibleItems(props.skills);
  const entries = Object.entries(extensibleItems);

  const items = entries.map(([skillName, skillData]: [string, any]) => ({
    name: skillName,
    quality: safeGet(skillData, '品质', ''),
    type: safeGet(skillData, '类型', ''),
    cost: safeGet(skillData, '消耗', ''),
    tags: safeGet(skillData, '标签', ''),
    effect: safeGet(skillData, '效果', ''),
    description: safeGet(skillData, '描述', ''),
  }));

  // 按类型分组
  const activeSkills = items.filter(s => s.type === '主动');
  const passiveSkills = items.filter(s => s.type === '被动');
  const otherSkills = items.filter(s => s.type !== '主动' && s.type !== '被动');

  // 每组内按品质权重降序排列
  sortItemsByRarity(activeSkills);
  sortItemsByRarity(passiveSkills);
  sortItemsByRarity(otherSkills);

  // 按顺序合并：主动→被动→其它
  return [...activeSkills, ...passiveSkills, ...otherSkills];
});

// 解析登神长阶数据
const ascensionInfo = computed(() => {
  if (!props.ascension || typeof props.ascension !== 'object') {
    return {
      enabled: false,
      elements: [] as Array<{ name: string; description: string }>,
      powers: [] as Array<{ name: string; description: string }>,
      laws: [] as Array<{ name: string; description: string }>,
      position: '',
      realm: { name: '', description: '' },
    };
  }

  const isEnabled = String(safeGet(props.ascension, '是否开启', '否')) === '是';

  const elementsObj = getExtensibleItems(safeGet(props.ascension, '要素', {}));
  const powersObj = getExtensibleItems(safeGet(props.ascension, '权能', {}));
  const lawsObj = getExtensibleItems(safeGet(props.ascension, '法则', {}));

  return {
    enabled: isEnabled,
    elements: Object.entries(elementsObj).map(([name, desc]) => ({ name, description: String(desc || '') })),
    powers: Object.entries(powersObj).map(([name, desc]) => ({ name, description: String(desc || '') })),
    laws: Object.entries(lawsObj).map(([name, desc]) => ({ name, description: String(desc || '') })),
    position: safeGet(props.ascension, '神位', ''),
    realm: {
      name: safeGet(props.ascension, '神国.名称', ''),
      description: safeGet(props.ascension, '神国.描述', ''),
    },
  };
});

// 格式化登神长阶摘要信息
const ascensionSummary = computed(() => {
  if (!ascensionInfo.value.enabled) return '未开启';

  const parts: string[] = [];

  // 显示具体名称而不是数量
  if (ascensionInfo.value.elements.length > 0) {
    const names = ascensionInfo.value.elements.map(e => e.name).join('，');
    parts.push(`要素: ${names}`);
  }
  if (ascensionInfo.value.powers.length > 0) {
    const names = ascensionInfo.value.powers.map(p => p.name).join('，');
    parts.push(`权能: ${names}`);
  }
  if (ascensionInfo.value.laws.length > 0) {
    const names = ascensionInfo.value.laws.map(l => l.name).join('，');
    parts.push(`法则: ${names}`);
  }
  if (ascensionInfo.value.position) {
    parts.push(`神位: ${ascensionInfo.value.position}`);
  }

  return parts.length > 0 ? parts.join(' | ') : '已开启';
});

// 基本信息数据结构
const basicInfoFields = computed(() => [
  { icon: '✔️', label: '是否在场', value: props.bePresent },
  { icon: '⚜️', label: '生命层级', value: props.lifeLevel },
  { icon: '🎯', label: '等级', value: String(props.level) },
  { icon: '🧬', label: '种族', value: props.race },
  { icon: '👑', label: '身份', value: identityText.value },
  { icon: '⚖️', label: '职业', value: occupationText.value },
  { icon: '🎭', label: '性格', value: props.personality },
  { icon: '💖', label: '喜爱', value: props.favorites },
  { icon: '🌸', label: '外貌特质', value: props.appearance },
  { icon: '👗', label: '衣物装饰', value: props.adornments },
]);

// 五维属性数据结构
const attributesFields = computed(() => {
  const attrs = props.attributes || {};
  return [
    { icon: '💪', label: '力量', value: String(attrs.力量 ?? 0) },
    { icon: '⚡', label: '敏捷', value: String(attrs.敏捷 ?? 0) },
    { icon: '🛡️', label: '体质', value: String(attrs.体质 ?? 0) },
    { icon: '🧠', label: '智力', value: String(attrs.智力 ?? 0) },
    { icon: '✨', label: '精神', value: String(attrs.精神 ?? 0) },
  ];
});

// 命运关系数据结构
const destinyFields = computed(() => [
  { icon: '💍', label: '是否缔结契约', value: props.isTied },
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

    <!-- 登神长阶 -->
    <CommonStatus
      title="♾️ 登神长阶"
      variant="sub-section"
      :default-open="false"
      :locked="!ascensionInfo.enabled"
      :summary-details="ascensionSummary"
      custom-class="ascension-section"
    >
      <template v-if="ascensionInfo.enabled">
        <!-- 要素 -->
        <template v-if="ascensionInfo.elements.length > 0">
          <div class="subsection-content">
            <div class="subsection-label">❖ 要素</div>
            <div v-for="item in ascensionInfo.elements" :key="item.name" class="ascension-item">
              <span class="item-name">{{ item.name }}:</span>
              <span class="item-desc">{{ item.description }}</span>
            </div>
          </div>
        </template>

        <!-- 权能 -->
        <template v-if="ascensionInfo.powers.length > 0">
          <div class="subsection-content">
            <div class="subsection-label">❖ 权能</div>
            <div v-for="item in ascensionInfo.powers" :key="item.name" class="ascension-item">
              <span class="item-name">{{ item.name }}:</span>
              <span class="item-desc">{{ item.description }}</span>
            </div>
          </div>
        </template>

        <!-- 法则 -->
        <template v-if="ascensionInfo.laws.length > 0">
          <div class="subsection-content">
            <div class="subsection-label">❖ 法则</div>
            <div v-for="item in ascensionInfo.laws" :key="item.name" class="ascension-item">
              <span class="item-name">{{ item.name }}:</span>
              <span class="item-desc">{{ item.description }}</span>
            </div>
          </div>
        </template>

        <!-- 神位/神国 -->
        <template v-if="ascensionInfo.position || ascensionInfo.realm.name">
          <div class="subsection-content">
            <div class="subsection-label">❖ 神位 / 神国</div>
            <div v-if="ascensionInfo.position" class="ascension-item">
              <span class="item-name">神位:</span>
              <span class="value-main">{{ ascensionInfo.position }}</span>
            </div>
            <div v-if="ascensionInfo.realm.name" class="ascension-item">
              <span class="item-name">神国:</span>
              <span class="value-main">{{ ascensionInfo.realm.name }}</span>
            </div>
            <div v-if="ascensionInfo.realm.description" class="ascension-item">
              <span class="item-desc">{{ ascensionInfo.realm.description }}</span>
            </div>
          </div>
        </template>
      </template>
    </CommonStatus>

    <!-- 战斗相关区 -->
    <div class="info-section">
      <div class="section-header">⚔️ 战斗相关</div>

      <!-- 五维属性 -->
      <div class="subsection-content">
        <div class="subsection-label">属性</div>
        <div class="attributes-grid">
          <div v-for="field in attributesFields" :key="field.label" class="attribute-item">
            <span class="property-name">{{ field.icon }} {{ field.label }}:</span>
            <span class="value-main">{{ field.value }}</span>
          </div>
        </div>
      </div>

      <!-- 装备 -->
      <template v-if="equipmentList.length > 0">
        <div class="subsection-content">
          <div class="subsection-label">装备</div>
          <div class="equipment-list">
            <EquipmentSlot
              v-for="equip in equipmentList"
              :key="equip.name"
              :equipment-name="equip.name"
              :quality="equip.quality"
              :type="equip.type"
              :tags="equip.tags"
              :effect="equip.effect"
              :description="equip.description"
            />
          </div>
        </div>
      </template>

      <!-- 技能 -->
      <template v-if="skillsList.length > 0">
        <div class="subsection-content">
          <div class="subsection-label">技能</div>
          <div class="skills-list">
            <SkillItem
              v-for="skill in skillsList"
              :key="skill.name"
              :name="skill.name"
              :quality="skill.quality"
              :type="skill.type === '主动' ? 'active' : skill.type === '被动' ? 'passive' : 'other'"
              :other-type-name="skill.type"
              :cost="skill.cost"
              :tags="skill.tags"
              :effect="skill.effect"
              :description="skill.description"
              :show-type-in-summary="true"
            />
          </div>
        </div>
      </template>
    </div>

    <!-- 命运关系区 -->
    <div class="info-section">
      <div class="section-header">💞 命运关系</div>
      <template v-for="field in destinyFields" :key="field.label">
        <div class="info-row" :class="{ 'wrap-value': shouldWrapText(field.value) }">
          <span class="property-name">{{ field.icon }}{{ field.icon ? ' ' : '' }}{{ field.label }}:</span>
          <span class="value-main">{{ field.value }}</span>
        </div>
        <div v-if="field.showBar" class="affection-bar-container">
          <div
            class="affection-bar-value"
            :class="{ negative: affectionData.isNegative }"
            :style="{ width: `${affectionData.percentage}%` }"
          ></div>
        </div>
      </template>
    </div>
  </CommonStatus>
</template>
<style lang="scss" scoped>
.destiny-character {
  margin-bottom: 6px;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-header {
  font-weight: bold;
  font-size: 1.05em;
  color: var(--theme-text-tertiary);
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--theme-border-light);
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
  transition:
    width 0.8s ease-out,
    background-color 0.3s ease;
  border-radius: 9px;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.1));
  box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.1);

  /* 正数（0~100）：粉色 */
  background-color: var(--theme-affection-bar);

  /* 负数（-100~0）：红色 */
  &.negative {
    background-color: var(--theme-affection-bar-negative);
  }
}

/* 登神长阶区块 */
.ascension-section {
  margin-top: 12px;
  margin-bottom: 12px;

  :deep(.details-content-inner) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.subsection-content {
  margin-top: 2px;

  & + .subsection-content {
    margin-top: 4px;
  }
}

.subsection-label {
  font-weight: bold;
  color: var(--theme-text-secondary);
  font-size: 0.95em;
  margin-bottom: 8px;
  padding-left: 4px;
  border-left: 3px solid var(--theme-border-light);
}

/* 属性网格布局 */
.attributes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.attribute-item {
  display: flex;
  gap: 6px;
  line-height: 1.6;

  .property-name {
    font-weight: bold;
    color: var(--theme-text-secondary);
    flex-shrink: 0;
  }

  .value-main {
    color: var(--theme-text-primary);
  }
}

/* 装备和技能列表 */
.equipment-list,
.skills-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skills-list {
  margin-bottom: 6px;
}

/* 登神长阶样式 */
.ascension-item {
  margin-bottom: 4px;
  line-height: 1.6;

  .item-name {
    font-weight: bold;
    color: var(--theme-text-secondary);
    margin-right: 4px;
  }

  .item-desc {
    font-size: 0.9em;
    color: var(--theme-text-muted);
    font-style: italic;
    display: block;
    margin-left: 1.5em;
  }
}

/* 空状态提示 */
.empty-message {
  color: var(--theme-text-muted);
  font-style: italic;
  margin: 0;
}
</style>
