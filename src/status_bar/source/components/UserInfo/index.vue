<script lang="ts" setup>
import { useStatData } from '../../composables/use-stat-data';
import { useThemeStore } from '../../store/theme';
import { normalizeStringOrArray, safeGet } from '../../utils/data-adapter';
import CommonStatus from '../common/CommonStatus.vue';
import PropertyItem from './PropertyItem.vue';
import ResourceBar from './ResourceBar.vue';

// 使用状态数据
const { statData } = useStatData();
const themeStore = useThemeStore();

// 获取资源数据
const resourcesData = computed(() => {
  if (!statData.value)
    return {
      hp: { current: 0, max: 0 },
      mp: { current: 0, max: 0 },
      sp: { current: 0, max: 0 },
      exp: { current: 0, needed: 0, isMaxLevel: false },
    };

  const resources = safeGet(statData.value, '角色.资源', {});
  const status = safeGet(statData.value, '角色.状态', {});
  const level = safeGet(status, '等级', 1);

  // 判断是否达到最高等级（25级）
  const isMaxLevel = level >= 25;

  return {
    hp: {
      current: safeGet(resources, '生命值', 0),
      max: safeGet(resources, '生命值上限', 0),
    },
    mp: {
      current: safeGet(resources, '法力值', 0),
      max: safeGet(resources, '法力值上限', 0),
    },
    sp: {
      current: safeGet(resources, '体力值', 0),
      max: safeGet(resources, '体力值上限', 0),
    },
    exp: {
      current: safeGet(status, '累计经验值', 0),
      needed: safeGet(status, '升级所需经验', 0),
      isMaxLevel,
    },
  };
});

// 获取状态数据
const statusData = computed(() => {
  if (!statData.value) {
    return {
      lifeLevel: '第一层级/普通层级',
      level: 1,
      race: '未知',
      identity: '暂无',
      occupation: '暂无',
      adventurerRank: '未评级',
    };
  }

  const character = safeGet(statData.value, '角色', {});
  const status = safeGet(character, '状态', {});
  const identity = normalizeStringOrArray(safeGet(character, '身份', []));
  const occupation = normalizeStringOrArray(safeGet(character, '职业', []));

  return {
    lifeLevel: safeGet(status, '生命层级', '第一层级/普通层级'),
    level: safeGet(status, '等级', 1),
    race: safeGet(character, '种族', '未知'),
    identity: Array.isArray(identity) ? (identity.length > 0 ? identity.join('、') : '暂无') : identity || '暂无',
    occupation: Array.isArray(occupation)
      ? occupation.length > 0
        ? occupation.join('、')
        : '暂无'
      : occupation || '暂无',
    adventurerRank: safeGet(status, '冒险者等级', '未评级'),
  };
});

// 获取属性数据
const attributesData = computed(() => {
  if (!statData.value) return { ap: 0, str: 0, agi: 0, con: 0, int: 0, spi: 0 };

  const attributes = safeGet(statData.value, '角色.属性', {});

  return {
    ap: safeGet(attributes, '属性点', 0),
    str: safeGet(attributes, '力量', 0),
    agi: safeGet(attributes, '敏捷', 0),
    con: safeGet(attributes, '体质', 0),
    int: safeGet(attributes, '智力', 0),
    spi: safeGet(attributes, '精神', 0),
  };
});

// 计算摘要信息
const summaryDetails = computed(() => {
  return `${statusData.value.lifeLevel} | 等级: ${statusData.value.level} | HP: ${resourcesData.value.hp.current}/${resourcesData.value.hp.max} | MP: ${resourcesData.value.mp.current}/${resourcesData.value.mp.max} | SP: ${resourcesData.value.sp.current}/${resourcesData.value.sp.max}`;
});
</script>

<template>
  <CommonStatus title="👤 角色信息与状态" variant="section" :summary-details="summaryDetails" :default-open="false">
    <!-- 资源条区域 -->
    <div class="resources-section">
      <ResourceBar
        label="HP"
        icon="❤️"
        :current="resourcesData.hp.current"
        :max="resourcesData.hp.max"
        :color="themeStore.effectiveColors.resourceHp"
      />
      <ResourceBar
        label="MP"
        icon="🔮"
        :current="resourcesData.mp.current"
        :max="resourcesData.mp.max"
        :color="themeStore.effectiveColors.resourceMp"
      />
      <ResourceBar
        label="SP"
        icon="⚡"
        :current="resourcesData.sp.current"
        :max="resourcesData.sp.max"
        :color="themeStore.effectiveColors.resourceSp"
      />
      <ResourceBar
        label="累计经验"
        icon="⭐"
        :current="resourcesData.exp.current"
        :max="resourcesData.exp.needed"
        :color="themeStore.effectiveColors.resourceExp"
        :is-max-level="resourcesData.exp.isMaxLevel"
      />
    </div>

    <!-- 状态网格布局 -->
    <div class="status-grid">
      <!-- 左侧：生命层级、等级、种族、身份、职业、状态、称号等 -->
      <div class="status-grid-left">
        <PropertyItem label="⚜️ 生命层级" :value="statusData.lifeLevel" />
        <PropertyItem label="✨ 等级" :value="statusData.level" />
        <PropertyItem label="🧬 种族" :value="statusData.race" />
        <PropertyItem label="👑 身份" :value="statusData.identity" />
        <PropertyItem label="⚖️ 职业" :value="statusData.occupation" />
        <PropertyItem label="🔥 冒险者等级" :value="statusData.adventurerRank" />
      </div>

      <!-- 右侧：属性点和五维属性 -->
      <div class="status-grid-right">
        <PropertyItem icon="🎯" label="属性点 AP" :value="attributesData.ap" />
        <PropertyItem icon="💪" label="力量 STR" :value="attributesData.str" />
        <PropertyItem icon="🤸" label="敏捷 AGI" :value="attributesData.agi" />
        <PropertyItem icon="🏋️" label="体质 CON" :value="attributesData.con" />
        <PropertyItem icon="🧠" label="智力 INT" :value="attributesData.int" />
        <PropertyItem icon="🧘" label="精神 SPI" :value="attributesData.spi" />
      </div>
    </div>
  </CommonStatus>
</template>

<style lang="scss" scoped>
/* 资源条区域 */
.resources-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--theme-border-light);
}

/* 状态网格布局 */
.status-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: start;

  /* 中间分隔线 */
  &::before {
    content: '';
    grid-column: 2;
    grid-row: 1;
    width: 1px;
    height: 100%;
    background-color: var(--theme-border-light);
    justify-self: center;
  }
}

.status-grid-left,
.status-grid-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 左侧列放在第一列 */
.status-grid-left {
  grid-column: 1;
}

/* 右侧列放在第三列 */
.status-grid-right {
  grid-column: 3;
}

/* 属性名称样式 */
.property-name {
  font-weight: bold;
  color: var(--theme-text-secondary);
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .status-grid {
    grid-template-columns: 1fr;
    gap: 10px;

    &::before {
      display: none;
    }
  }

  .status-grid-left,
  .status-grid-right {
    grid-column: 1;
  }

  .status-grid-right {
    padding-top: 10px;
    border-top: 1px solid var(--theme-border-light);
  }
}
</style>
