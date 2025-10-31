import { Skill } from '../types';
import { loadCustomSkills, mergeSkillData } from '../utils/loader';

/**
 * 初始技能
 */
interface Skills {
  [key: string]: Skill[];
}

// 主动技能
export const ActiveSkills: Skills = {};

// 被动技能
export const PassiveSkills: Skills = {};

// 加载并合并自定义技能数据
let mergedSkillsData: {
  ActiveSkills: Skills;
  PassiveSkills: Skills;
} | null = null;

/**
 * 初始化技能数据（加载自定义数据并合并）
 */
async function initializeSkills() {
  const customData = await loadCustomSkills();
  mergedSkillsData = mergeSkillData(ActiveSkills, PassiveSkills, customData);
}

/**
 * 获取合并后的主动技能数据
 */
export function getActiveSkills(): Skills {
  return mergedSkillsData?.ActiveSkills || ActiveSkills;
}

/**
 * 获取合并后的被动技能数据
 */
export function getPassiveSkills(): Skills {
  return mergedSkillsData?.PassiveSkills || PassiveSkills;
}

// 自动初始化
initializeSkills();
