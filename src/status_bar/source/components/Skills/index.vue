<script lang="ts" setup>
import { useStatData } from '../../composables/use-stat-data';
import { getExtensibleItems, safeGet } from '../../utils/data-adapter';
import CommonStatus from '../common/CommonStatus.vue';
import SkillItem from './SkillItem.vue';

const { statData } = useStatData();

// 品质排序权重
const rarityOrder: Record<string, number> = {
  神话: 6,
  传说: 5,
  史诗: 4,
  稀有: 3,
  优良: 2,
  普通: 1,
};

// 获取并分类技能
const skills = computed(() => {
  const skillData = safeGet(statData.value, '技能列表', {});
  const items = getExtensibleItems(skillData);

  const active: any[] = [];
  const passive: any[] = [];

  Object.entries(items).forEach(([key, skill]: [string, any]) => {
    const skillInfo = {
      key,
      name: key,
      quality: safeGet(skill, '品质', ''),
      cost: safeGet(skill, '消耗', ''),
      description: safeGet(skill, '描述', ''),
      type: safeGet(skill, '类型', ''),
    };

    if (skillInfo.type === '主动') {
      active.push(skillInfo);
    } else if (skillInfo.type === '被动') {
      passive.push(skillInfo);
    }
  });

  // 按品质排序
  const sortByRarity = (a: any, b: any) => (rarityOrder[b.quality] || 0) - (rarityOrder[a.quality] || 0);

  active.sort(sortByRarity);
  passive.sort(sortByRarity);

  return { active, passive };
});
</script>

<template>
  <CommonStatus title="💫 角色技能" variant="section" :default-open="false">
    <div class="skills-grid">
      <!-- 主动技能列 -->
      <div class="skills-column">
        <h3 class="skills-category-title">🌀 主动技能</h3>
        <div v-if="skills.active.length > 0" class="skills-list">
          <SkillItem
            v-for="skill in skills.active"
            :key="skill.key"
            :name="skill.name"
            :quality="skill.quality"
            :cost="skill.cost"
            :description="skill.description"
            type="active"
          />
        </div>
        <p v-else class="empty-message value-main">尚未习得任何主动技能</p>
      </div>

      <!-- 被动技能列 -->
      <div class="skills-column">
        <h3 class="skills-category-title">📌 被动技能</h3>
        <div v-if="skills.passive.length > 0" class="skills-list">
          <SkillItem
            v-for="skill in skills.passive"
            :key="skill.key"
            :name="skill.name"
            :quality="skill.quality"
            :description="skill.description"
            type="passive"
          />
        </div>
        <p v-else class="empty-message value-main">尚未拥有任何被动技能</p>
      </div>
    </div>
  </CommonStatus>
</template>

<style lang="scss" scoped>
/* 技能网格布局 */
.skills-grid {
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
    background-color: #d3c5b3;
    justify-self: center;
  }
}

.skills-column {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:first-child {
    grid-column: 1;
  }

  &:last-child {
    grid-column: 3;
  }
}

.skills-category-title {
  font-family: 'Cinzel', serif;
  font-size: 1em;
  font-weight: 700;
  color: #5d4037;
  padding-bottom: 8px;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.empty-message {
  color: #7a655d;
  font-style: italic;
  margin: 0;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 20px;

    &::before {
      display: none;
    }
  }

  .skills-column {
    grid-column: 1 !important;

    &:last-child {
      padding-top: 10px;
      border-top: 1px solid #d3c5b3;
    }
  }
}
</style>
