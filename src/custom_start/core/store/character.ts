import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {
  BASE_STAT,
  generateInitialPoints,
  IDENTITY_COSTS,
  INITIAL_REINCARNATION_POINTS,
  RACE_COSTS,
} from '../data/base-info';
import type { Attributes, CharacterConfig } from '../types';

export const useCharacterStore = defineStore('character', () => {
  // State
  const character = ref<CharacterConfig>({
    name: '',
    gender: '男',
    customGender: '',
    age: 18,
    race: '人类',
    customRace: '',
    identity: '自由平民',
    customIdentity: '',
    startLocation: '大陆东南部区域-索伦蒂斯王国',
    customStartLocation: '',
    level: 1,
    backgroundStory: '',
    attributes: {
      力量: BASE_STAT,
      敏捷: BASE_STAT,
      体质: BASE_STAT,
      智力: BASE_STAT,
      精神: BASE_STAT,
    },
    attributePoints: {
      力量: 0,
      敏捷: 0,
      体质: 0,
      智力: 0,
      精神: 0,
    },
    reincarnationPoints: INITIAL_REINCARNATION_POINTS, // 转生点数
    destinyPoints: 0, // 命运点数
  });

  // Computed

  /**
   * 计算当前消耗的转生点数
   */
  const consumedPoints = computed(() => {
    let total = 0;

    // 种族消耗
    total += RACE_COSTS[character.value.race] || 0;

    // 身份消耗
    total += IDENTITY_COSTS[character.value.identity] || 0;

    // 属性加点消耗 (每点1个转生点)
    const attributeAddPoints = Object.values(character.value.attributePoints).reduce((sum, points) => sum + points, 0);
    total += attributeAddPoints;

    return total;
  });

  // Actions

  const updateCharacterField = (field: keyof CharacterConfig, value: unknown) => {
    character.value[field] = value as never;
  };

  const updateAttribute = (attr: keyof Attributes, points: number) => {
    character.value.attributePoints[attr] = Math.max(0, points);
  };

  const addAttributePoint = (attr: keyof Attributes) => {
    // 计算当前可用点数
    const available = character.value.reincarnationPoints - consumedPoints.value;
    if (available > 0) {
      character.value.attributePoints[attr]++;
    }
  };

  const removeAttributePoint = (attr: keyof Attributes) => {
    if (character.value.attributePoints[attr] > 0) {
      character.value.attributePoints[attr]--;
    }
  };

  const rollInitialPoints = () => {
    const newPoints = generateInitialPoints();
    character.value.reincarnationPoints = newPoints;
    return newPoints;
  };

  const resetCharacter = () => {
    character.value = {
      name: '',
      gender: '男',
      customGender: '',
      age: 18,
      race: '人类',
      customRace: '',
      identity: '自由平民',
      customIdentity: '',
      startLocation: '大陆东南部区域-索伦蒂斯王国',
      customStartLocation: '',
      level: 1,
      backgroundStory: '',
      attributes: {
        力量: BASE_STAT,
        敏捷: BASE_STAT,
        体质: BASE_STAT,
        智力: BASE_STAT,
        精神: BASE_STAT,
      },
      attributePoints: {
        力量: 0,
        敏捷: 0,
        体质: 0,
        智力: 0,
        精神: 0,
      },
      reincarnationPoints: INITIAL_REINCARNATION_POINTS,
      destinyPoints: 0,
    };
  };

  return {
    character,
    consumedPoints,
    updateCharacterField,
    updateAttribute,
    addAttributePoint,
    removeAttributePoint,
    rollInitialPoints,
    resetCharacter,
  };
});
