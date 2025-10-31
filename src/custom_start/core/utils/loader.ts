import type { Equipment, Item, Skill } from '../types';

/**
 * 数据基础路径 - CDN 部署环境
 */
const DATA_BASE_PATH =
  'https://testingcf.jsdelivr.net/gh/The-poem-of-destiny/FrontEnd-for-destined-journey@latest/public/assets/data';

/**
 * 加载自定义装备数据
 * 从 public/assets/data 目录加载用户自定义的装备数据
 */
export async function loadCustomEquipments(): Promise<Record<string, Equipment[]>> {
  try {
    const response = await fetch(`${DATA_BASE_PATH}/equipments.json`);
    if (!response.ok) {
      console.log('📝 未找到自定义装备数据文件 (equipments.json)');
      return {};
    }
    const data = await response.json();
    console.log('✅ 成功加载自定义装备数据');
    return data;
  } catch (error) {
    console.log('📝 未找到自定义装备数据或格式错误:', error);
    return {};
  }
}

/**
 * 加载自定义道具数据
 * 从 public/assets/data 目录加载用户自定义的道具数据
 */
export async function loadCustomItems(): Promise<Record<string, Item[]>> {
  try {
    const response = await fetch(`${DATA_BASE_PATH}/items.json`);
    if (!response.ok) {
      console.log('📝 未找到自定义道具数据文件 (items.json)');
      return {};
    }
    const data = await response.json();
    console.log('✅ 成功加载自定义道具数据');
    return data;
  } catch (error) {
    console.log('📝 未找到自定义道具数据或格式错误:', error);
    return {};
  }
}

/**
 * 加载自定义技能数据
 * 从 public/assets/data 目录加载用户自定义的技能数据
 */
export async function loadCustomSkills(): Promise<{
  ActiveSkills?: Record<string, Skill[]>;
  PassiveSkills?: Record<string, Skill[]>;
}> {
  try {
    const response = await fetch(`${DATA_BASE_PATH}/skills.json`);
    if (!response.ok) {
      console.log('📝 未找到自定义技能数据文件 (skills.json)');
      return {};
    }
    const data = await response.json();

    // 将中文字段名转换为英文（兼容两种格式）
    const result: {
      ActiveSkills?: Record<string, Skill[]>;
      PassiveSkills?: Record<string, Skill[]>;
    } = {};

    if (data.主动技能) {
      result.ActiveSkills = data.主动技能;
    } else if (data.ActiveSkills) {
      result.ActiveSkills = data.ActiveSkills;
    }

    if (data.被动技能) {
      result.PassiveSkills = data.被动技能;
    } else if (data.PassiveSkills) {
      result.PassiveSkills = data.PassiveSkills;
    }

    console.log('✅ 成功加载自定义技能数据');
    return result;
  } catch (error) {
    console.log('📝 未找到自定义技能数据或格式错误:', error);
    return {};
  }
}

/**
 * 合并内置数据和自定义数据
 * @param builtinData 内置数据
 * @param customData 自定义数据
 * @returns 合并后的数据
 */
export function mergeData<T>(builtinData: Record<string, T[]>, customData: Record<string, T[]>): Record<string, T[]> {
  const merged = { ...builtinData };

  for (const [category, items] of Object.entries(customData)) {
    if (merged[category]) {
      // 如果分类已存在，追加数据
      merged[category] = [...merged[category], ...items];
    } else {
      // 如果分类不存在，创建新分类
      merged[category] = items;
    }
  }

  return merged;
}

/**
 * 合并技能数据（主动技能和被动技能）
 */
export function mergeSkillData(
  builtinActive: Record<string, Skill[]>,
  builtinPassive: Record<string, Skill[]>,
  customData: {
    ActiveSkills?: Record<string, Skill[]>;
    PassiveSkills?: Record<string, Skill[]>;
  },
): {
  ActiveSkills: Record<string, Skill[]>;
  PassiveSkills: Record<string, Skill[]>;
} {
  const mergedActive = customData.ActiveSkills ? mergeData(builtinActive, customData.ActiveSkills) : builtinActive;

  const mergedPassive = customData.PassiveSkills ? mergeData(builtinPassive, customData.PassiveSkills) : builtinPassive;

  return {
    ActiveSkills: mergedActive,
    PassiveSkills: mergedPassive,
  };
}
