// 稀有度类型
export type Rarity =
  | 'only' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

// 物品类型
export type Item = {
  name: string;
  type: string;
  cost: number;
  rarity: Rarity;
  description: string;
};

export type Equipment = Item;

// 技能类型
export type Skill = Item;

// 红线对象类型
export interface RedThread {
  name: string;
  type: string;
  cost: number;
  description: string;
}

// 背景类型
export interface Background {
  name: string;
  description: string;
  requiredRace?: string;
  requiredLocation?: string;
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