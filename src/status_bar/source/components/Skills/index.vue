<script lang="ts" setup>
import { useStatData } from '../../composables/use-stat-data';
import { getExtensibleItems, safeGet } from '../../utils/data-adapter';
import { sortByRarity } from '../../utils/quality';
import CommonStatus from '../common/CommonStatus.vue';
import SkillItem from '../common/SkillItem.vue';

const { statData } = useStatData();

// 获取并分类技能
const skills = computed(() => {
  const skillData = safeGet(statData.value, '技能列表', {});
  const items = getExtensibleItems(skillData);

  const active: any[] = [];
  const passive: any[] = [];
  const other: any[] = [];

  Object.entries(items).forEach(([key, skill]: [string, any]) => {
    const skillType = safeGet(skill, '类型', '') as string;
    const skillInfo = {
      key,
      name: key,
      quality: safeGet(skill, '品质', ''),
      cost: safeGet(skill, '消耗', ''),
      tags: safeGet(skill, '标签', ''),
      effect: safeGet(skill, '效果', ''),
      description: safeGet(skill, '描述', ''),
      type: skillType,
    };

    if (skillType === '主动') {
      active.push(skillInfo);
    } else if (skillType === '被动') {
      passive.push(skillInfo);
    } else if (skillType) {
      // 其他类型的技能
      other.push(skillInfo);
    }
  });

  // 按品质排序
  active.sort(sortByRarity);
  passive.sort(sortByRarity);
  other.sort(sortByRarity);

  return { active, passive, other };
});
</script>

<template>
  <CommonStatus title="💫 角色技能" variant="section" :default-open="false">
    <div class="skills-grid" :class="{ 'has-other': skills.other.length > 0 }">
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
            :tags="skill.tags"
            :effect="skill.effect"
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
            :tags="skill.tags"
            :effect="skill.effect"
            :description="skill.description"
            type="passive"
          />
        </div>
        <p v-else class="empty-message value-main">尚未拥有任何被动技能</p>
      </div>

      <!-- 其他技能列 -->
      <div v-if="skills.other.length > 0" class="skills-column">
        <h3 class="skills-category-title">✨ 其他技能</h3>
        <div class="skills-list">
          <SkillItem
            v-for="skill in skills.other"
            :key="skill.key"
            :name="skill.name"
            :quality="skill.quality"
            :cost="skill.cost"
            :tags="skill.tags"
            :effect="skill.effect"
            :description="skill.description"
            :other-type-name="skill.type"
            type="other"
          />
        </div>
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
    background-color: var(--theme-border-light);
    justify-self: center;
  }

  /* 有其他技能时改为垂直布局 */
  &.has-other {
    grid-template-columns: 1fr;
    gap: 20px;

    &::before {
      display: none;
    }

    .skills-column {
      grid-column: 1;

      &:not(:first-child) {
        padding-top: 15px;
        border-top: 1px solid var(--theme-border-light);
      }
    }
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
  color: var(--theme-text-tertiary);
  padding-bottom: 8px;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.empty-message {
  color: var(--theme-text-muted);
  font-style: italic;
  margin: 0;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 20px;

    &::before,
    &::after {
      display: none;
    }
  }

  .skills-column {
    grid-column: 1 !important;

    &:not(:first-child) {
      padding-top: 10px;
      border-top: 1px solid var(--theme-border-light);
    }
  }
}
</style>
