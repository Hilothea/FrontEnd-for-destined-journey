// 稀有度类型
export type Rarity = 'only' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

// 物品类型
export interface Item {
  name: string;
  cost: number;
  type: string;
  tag: string;
  rarity: Rarity;
  effect: string;
  description: string;
}

export interface Equipment {
  name: string;
  cost: number;
  type: string;
  effect: string;
  description: string;
  position: string;
}

// 技能类型
export interface Skill {
  name: string;
  cost: number;
  consume: string;
  tag: string;
  type: string;
  effect: string;
  description: string;
}

// 红线对象类型
export interface RedThread {
  name: string;
  cost: number;
  lifeLevel: string;
  level: number;
  race: string;
  identity: string[];
  career: string[];
  personality: string;
  like: string;
  app: string;
  cloth: string;
  equip: string;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    mind: number;
  };
  stairway: string;
  isRedLine: string;
  affinity: number;
  comment?: string;
  backgroundInfo?: string;
  skills: {
    [key: string]: string;
  };
}

// 背景类型
export interface Background {
  name: string;
  description: string;
  requiredRace?: string;
  requiredLocation?: string;
  [key: string]: any;
}

// 属性类型
export interface Attributes {
  力量: number;
  敏捷: number;
  体质: number;
  智力: number;
  精神: number;
}

// 角色配置类型
export interface CharacterConfig {
  name: string;
  gender: string;
  customGender: string;
  age: number;
  race: string;
  customRace: string;
  identity: string;
  customIdentity: string;
  startLocation: string;
  customStartLocation: string;
  level: number;
  backgroundStory: string;
  attributes: Attributes;
  attributePoints: Record<keyof Attributes, number>;
  reincarnationPoints: number; // 转生点数
  destinyPoints: number; // 命运点数
}
