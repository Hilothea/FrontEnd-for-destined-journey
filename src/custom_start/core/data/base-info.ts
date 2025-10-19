export const GENDERS = ['男', '女', '雌性', '雄性', '自定义'] as const;

// 种族消耗点数
export const RACE_COSTS: Record<string, number> = {
  人类: 0,
  兽族: 0,
  精灵: 10,
  翼民: 10,
  自然魔物: 10,
  亡灵种族: 10,
  深渊魔族: 20,
  血族: 30,
  自定义: 80,
};

// 身份消耗点数
export const IDENTITY_COSTS: Record<string, number> = {
  沦为奴隶: -20,
  自由平民: 0,
  中产阶级: 20,
  贵族阶级: 40,
  游荡亡灵: 0,
  野生魔物: 0,
  魔王残党: -20,
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
 * 生成随机初始转生点数
 * 范围: 100-1000
 * 概率分布: 降低300以上的概率
 * 使用加权随机，倾向于生成较低的点数
 */
export const generateInitialPoints = (): number => {
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

// 初始可用AP点数
export const INITIAL_AP = 5;

// 基础属性值
export const BASE_STAT = 4;
