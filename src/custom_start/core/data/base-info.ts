export const GENDERS = ['男', '女', '雌性', '雄性', '自定义'] as const;

// 种族消耗点数
export const RACE_COSTS: Record<string, number> = {
  地精: -10,
  人类: 0,
  兽族: 0,
  翼民: 10,
  矮人: 10,
  魔物: 10,
  半身人: 10,
  亡灵种族: 10,
  深渊魔族: 20,
  巨人: 30,
  妖精: 30,
  精灵: 40,
  血族: 50,
  龙族: 60,
  自定义: 80,
};

// 身份消耗点数
export const IDENTITY_COSTS: Record<string, number> = {
  沦为奴隶: -20,
  魔王残党: -20,
  自由平民: 0,
  游荡亡灵: 0,
  野生魔物: 0,
  中产阶级: 20,
  贵族阶级: 40,
  自定义: 80,
};

export const START_LOCATIONS = [
  '大陆东南部区域-索伦蒂斯王国',
  '大陆东北部区域-诺斯加德联盟',
  '大陆东北部沿海区域-伯伦斯法环联邦-雾晶港',
  '大陆中东部区域-奥古斯提姆帝国',
  '大陆中央区域-神迹山脉-天空圣域高原-圣都梵尼亚',
  '大陆中西部区域-无尽风痕草原-卡拉什特里斯(兽族联盟)',
  '大陆西南端-翡翠之心-艾尔文海姆(精灵王国)',
  '大陆西南部区域-无尽树海-奥古斯提姆帝国-诺瓦·瓦伦蒂亚城',
  '大陆西南部区域-无尽树海-雨林中层区域',
  '大陆西南部区域-诺瓦尔河流域-主河道中游河底',
  '大陆西南部区域-无尽树海-雨林中央-无尽深渊地城-地下23层',
  '大陆南端-悲鸣沼泽-伯恩·瑞瑟喃斯(骸响之都)-城门内',
  '大陆上空-泣歌云海-艾琉德雷姆·尼尔(泣空遗迹)',
  '无尽海东部-碎星群岛-蓝泪岛',
  '自定义',
] as const;

/**
 * 检查是否启用开发者模式（通过姓名暗号）
 * 暗号：名字包含特定字符序列
 */
const checkDevModeByName = (name: string): boolean => {
  // 暗号：姓名中包含 "[dev]" 或 "[test]"（不区分大小写）
  const devPatterns = ['[dev]', '[test]'];
  const lowerName = name.toLowerCase();
  return devPatterns.some(pattern => lowerName.includes(pattern));
};

/**
 * 生成随机初始转生点数
 * 范围: 100-1000
 * 概率分布: 降低300以上的概率
 * 使用加权随机，倾向于生成较低的点数
 * @param characterName 可选的角色名，用于检测开发者模式
 */
export const generateInitialPoints = (characterName?: string): number => {
  // 开发者模式：如果角色名包含特定暗号，返回高点数
  if (characterName && checkDevModeByName(characterName)) {
    return 9999;
  }

  const random = Math.random();

  // 70% 概率: 100-300 点
  if (random < 0.7) {
    return Math.floor(Math.random() * 201) + 100; // 100-300
  }
  // 20% 概率: 300-500 点
  else if (random < 0.9) {
    return Math.floor(Math.random() * 201) + 300; // 300-500
  }
  // 10% 概率: 500-1000 点
  else {
    return Math.floor(Math.random() * 501) + 500; // 500-1000
  }
};

// 初始转生点数（默认值）
export const INITIAL_REINCARNATION_POINTS = 300;

// 属性列表
export const ATTRIBUTES = ['力量', '敏捷', '体质', '智力', '精神'] as const;

// 等级相关常量
export const MAX_LEVEL = 10;
export const MIN_LEVEL = 1;

// 基础属性值
export const BASE_STAT = 4;

/**
 * 根据等级计算可用的【额外】AP点数
 * @param level 角色等级
 * @returns 可自由分配的AP点数
 */
export const calculateAPByLevel = (level: number): number => {
  const baseAP = 5;

  // 额外属性点 = 等级 - 1
  const extraAP = Math.max(0, level - 1);

  return baseAP + extraAP;
};

/**
 * 获取等级对应的层级属性点
 * @param level 角色等级
 * @returns 每个属性获得的层级加成
 */
export const getTierAttributeBonus = (level: number): number => {
  if (level >= 1 && level <= 4) return 0;
  if (level >= 5 && level <= 8) return 1;
  if (level >= 9 && level <= 12) return 2;
  if (level >= 13 && level <= 16) return 3;
  if (level >= 17 && level <= 20) return 4;
  if (level >= 21 && level <= 24) return 5;
  if (level >= 25) return 6;
  return 0;
};

/**
 * 获取等级对应的层级名称
 * @param level 角色等级
 * @returns 层级名称
 */
export const getLevelTierName = (level: number): string => {
  if (level >= 1 && level <= 4) return '第一层级';
  if (level >= 5 && level <= 8) return '第二层级';
  if (level >= 9 && level <= 12) return '第三层级';
  if (level >= 13 && level <= 16) return '第四层级';
  if (level >= 17 && level <= 20) return '第五层级';
  if (level >= 21 && level <= 24) return '第六层级';
  if (level >= 25) return '第七层级';
  return '未知层级';
};
