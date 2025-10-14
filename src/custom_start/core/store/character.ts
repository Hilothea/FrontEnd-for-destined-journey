import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { BASE_STAT, generateInitialPoints, IDENTITY_COSTS, INITIAL_REINCARNATION_POINTS, RACE_COSTS } from '../data/base-info';
import type { Attributes, CharacterConfig } from '../types';

export const useCharacterStore = defineStore('character', () => {
  // ============ State ============
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

  const selectedEquipments = ref<string[]>([]);
  const selectedSkills = ref<string[]>([]);
  const selectedItems = ref<string[]>([]);
  const selectedRedThread = ref<string>('');
  const selectedBackground = ref<string>('');

  // ============ Computed ============

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
    const attributeAddPoints = Object.values(character.value.attributePoints).reduce(
      (sum, points) => sum + points,
      0
    );
    total += attributeAddPoints;

    return total;
  });

  /**
   * 计算可用的转生点数
   */
  const availablePoints = computed(() => {
    return character.value.reincarnationPoints - consumedPoints.value;
  });

  /**
   * 检查是否超过点数限制
   */
  const isOverBudget = computed(() => {
    return availablePoints.value < 0;
  });

  // ============ Actions ============

  const updateCharacterField = (field: keyof CharacterConfig, value: unknown) => {
    character.value[field] = value as never;
  };

  const updateAttribute = (attr: keyof Attributes, points: number) => {
    character.value.attributePoints[attr] = Math.max(0, points);
  };

  const addAttributePoint = (attr: keyof Attributes) => {
    if (availablePoints.value > 0) {
      character.value.attributePoints[attr]++;
    }
  };

  const removeAttributePoint = (attr: keyof Attributes) => {
    if (character.value.attributePoints[attr] > 0) {
      character.value.attributePoints[attr]--;
    }
  };

  const toggleEquipment = (equipment_id: string) => {
    const idx = selectedEquipments.value.indexOf(equipment_id);
    if (idx === -1) {
      selectedEquipments.value.push(equipment_id);
    } else {
      selectedEquipments.value.splice(idx, 1);
    }
  };

  const toggleSkill = (skill_id: string) => {
    const idx = selectedSkills.value.indexOf(skill_id);
    if (idx === -1) {
      selectedSkills.value.push(skill_id);
    } else {
      selectedSkills.value.splice(idx, 1);
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
    selectedEquipments.value = [];
    selectedSkills.value = [];
    selectedItems.value = [];
    selectedRedThread.value = '';
    selectedBackground.value = '';
  };

  return {
    character,
    selectedEquipments,
    selectedSkills,
    selectedItems,
    selectedRedThread,
    selectedBackground,
    consumedPoints,
    availablePoints,
    isOverBudget,
    updateCharacterField,
    updateAttribute,
    addAttributePoint,
    removeAttributePoint,
    toggleEquipment,
    toggleSkill,
    rollInitialPoints,
    resetCharacter,
  };
});