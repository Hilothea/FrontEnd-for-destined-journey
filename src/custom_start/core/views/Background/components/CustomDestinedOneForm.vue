<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import FormInput from '../../../components/Form/FormInput.vue';
import FormLabel from '../../../components/Form/FormLabel.vue';
import FormNumber from '../../../components/Form/FormNumber.vue';
import FormTextarea from '../../../components/Form/FormTextarea.vue';
import type { DestinedOne } from '../../../types';
import { calculateDestinedCost } from '../../../utils/cost-calculator';

interface Emits {
  (e: 'add', item: DestinedOne): void;
}

const emit = defineEmits<Emits>();

// 折叠状态
const isExpanded = ref(false);

// 层级与等级的映射关系
const LEVEL_GRADE_MAP: Record<number, { name: string; minGrade: number; maxGrade: number }> = {
  1: { name: '第一层级 (普通层级)', minGrade: 1, maxGrade: 4 },
  2: { name: '第二层级 (中坚层级)', minGrade: 5, maxGrade: 8 },
  3: { name: '第三层级 (精英层级)', minGrade: 9, maxGrade: 12 },
  4: { name: '第四层级 (史诗层级)', minGrade: 13, maxGrade: 16 },
  5: { name: '第五层级 (传说层级)', minGrade: 17, maxGrade: 20 },
  6: { name: '第六层级 (神话层级)', minGrade: 21, maxGrade: 24 },
  7: { name: '第七层级 (神祗)', minGrade: 25, maxGrade: 25 },
};

// 表单数据
const itemName = ref('');
const itemLevel = ref(1); // 层级 1-7
const itemLifeLevel = ref('');
const itemGrade = ref(1);
const itemRace = ref('');
const itemIdentity = ref('');
const itemCareer = ref('');
const itemPersonality = ref('');
const itemLike = ref('');
const itemApp = ref('');
const itemCloth = ref('');
const itemEquip = ref('');
const itemAttributes = ref('');
const itemStairway = ref('');
const itemIsContract = ref('是');
const itemAffinity = ref(0);
const itemComment = ref('');
const itemBackgroundInfo = ref('');
const itemSkills = ref('');

// 根据层级计算点数
const calculatedCost = computed(() => {
  return calculateDestinedCost(itemLevel.value);
});

// 当前层级的等级范围
const currentLevelInfo = computed(() => {
  return LEVEL_GRADE_MAP[itemLevel.value];
});

// 监听层级变化，自动更新生命层级和等级范围
watch(
  () => itemLevel.value,
  newLevel => {
    const levelInfo = LEVEL_GRADE_MAP[newLevel];
    if (levelInfo) {
      itemLifeLevel.value = levelInfo.name;
      // 如果当前等级不在新层级的范围内，重置为该层级的最小等级
      if (itemGrade.value < levelInfo.minGrade || itemGrade.value > levelInfo.maxGrade) {
        itemGrade.value = levelInfo.minGrade;
      }
    }
  },
  { immediate: true }, // 立即执行，确保初始化时也会设置生命层级
);

// 表单验证
const isValid = computed(() => {
  return itemName.value.trim() !== '' && itemRace.value.trim() !== '';
});

// 重置表单
const resetForm = () => {
  itemName.value = '';
  itemLevel.value = 1;
  itemLifeLevel.value = '';
  itemGrade.value = 1;
  itemRace.value = '';
  itemIdentity.value = '';
  itemCareer.value = '';
  itemPersonality.value = '';
  itemLike.value = '';
  itemApp.value = '';
  itemCloth.value = '';
  itemEquip.value = '';
  itemAttributes.value = '';
  itemStairway.value = '';
  itemIsContract.value = '是';
  itemAffinity.value = 0;
  itemComment.value = '';
  itemBackgroundInfo.value = '';
  itemSkills.value = '';
};

// 解析数组字符串（用换行或逗号分隔）
const parseArrayString = (str: string): string[] => {
  if (!str.trim()) return [];
  return str
    .split(/[,，\n]/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
};

// 解析装备字符串
const parseEquipString = (str: string): Partial<any>[] => {
  if (!str.trim()) return [];
  const equips = str
    .split(/\n\n+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  return equips.map(equip => {
    const lines = equip.split('\n');
    const name = lines[0] || '未命名装备';
    const details = lines.slice(1).join('\n');
    return {
      name,
      description: details || undefined,
    };
  });
};

// 解析属性字符串（格式：力量:10,敏捷:20）
const parseAttributesString = (str: string): any => {
  if (!str.trim()) {
    return {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      mind: 0,
    };
  }
  const attrs: any = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    mind: 0,
  };
  const pairs = str.split(/[,，]/).map(s => s.trim());
  for (const pair of pairs) {
    const [key, value] = pair.split(/[:：]/).map(s => s.trim());
    const numValue = parseInt(value) || 0;
    if (key.includes('力量')) attrs.strength = numValue;
    else if (key.includes('敏捷')) attrs.dexterity = numValue;
    else if (key.includes('体质')) attrs.constitution = numValue;
    else if (key.includes('智力')) attrs.intelligence = numValue;
    else if (key.includes('精神')) attrs.mind = numValue;
  }
  return attrs;
};

// 解析登神长阶字符串（简化版）
const parseStairwayString = (str: string): any => {
  if (!str.trim()) {
    return { isOpen: false };
  }
  return {
    isOpen: true,
    elements: { 描述: str },
  };
};

// 解析技能字符串（简化版，只解析名称和效果）
const parseSkillsString = (str: string): any[] => {
  if (!str.trim()) return [];
  const skills = str
    .split(/\n\n+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  return skills.map(skill => {
    const lines = skill.split('\n');
    return {
      name: lines[0] || '未命名技能',
      type: '主动',
      tag: '',
      rarity: 'common' as const,
      effect: lines.slice(1).join('\n') || '无描述',
      description: '',
    };
  });
};

// 添加自定义命定之人
const handleAdd = () => {
  if (!isValid.value) return;

  const newItem: DestinedOne = {
    name: itemName.value.trim(),
    cost: calculatedCost.value,
    lifeLevel: itemLifeLevel.value.trim() || '未知',
    level: itemGrade.value,
    race: itemRace.value.trim(),
    identity: parseArrayString(itemIdentity.value),
    career: parseArrayString(itemCareer.value),
    personality: itemPersonality.value.trim() || '未知',
    like: itemLike.value.trim() || '未知',
    app: itemApp.value.trim() || '未知',
    cloth: itemCloth.value.trim() || '未知',
    equip: parseEquipString(itemEquip.value),
    attributes: parseAttributesString(itemAttributes.value),
    stairway: parseStairwayString(itemStairway.value),
    isContract: itemIsContract.value,
    affinity: itemAffinity.value,
    comment: itemComment.value.trim(),
    backgroundInfo: itemBackgroundInfo.value.trim(),
    skills: parseSkillsString(itemSkills.value),
    isCustom: true, // 标记为自定义数据
  };

  emit('add', newItem);
  resetForm();
  isExpanded.value = false; // 添加后自动折叠
};
</script>

<template>
  <div class="custom-destined-form" :class="{ expanded: isExpanded }">
    <div class="form-header" @click="isExpanded = !isExpanded">
      <div class="header-left">
        <h3 class="form-title">✨ 自定义命定之人</h3>
        <div class="form-desc">创建您的专属命定之人</div>
      </div>
      <div class="toggle-icon" :class="{ rotated: isExpanded }">▼</div>
    </div>

    <div v-show="isExpanded" class="form-body">
      <!-- 姓名 -->
      <div class="form-row">
        <FormLabel label="姓名" required />
        <FormInput v-model="itemName" placeholder="请输入姓名" :maxlength="50" />
      </div>

      <!-- 层级 -->
      <div class="form-row">
        <FormLabel label="层级" required />
        <div class="level-buttons">
          <button
            v-for="level in 7"
            :key="level"
            class="level-btn"
            :class="{ active: itemLevel === level }"
            @click="itemLevel = level"
          >
            第{{ ['一', '二', '三', '四', '五', '六', '七'][level - 1] }}层级
          </button>
        </div>
        <div class="cost-info">
          <span class="cost-label">消耗点数：</span>
          <span class="cost-value">{{ calculatedCost }}</span>
        </div>
      </div>

      <!-- 生命层级（自动填充） -->
      <div class="form-row">
        <FormLabel label="生命层级（根据层级自动填充）" />
        <FormInput v-model="itemLifeLevel" readonly disabled />
      </div>

      <!-- 等级 -->
      <div class="form-row">
        <FormLabel :label="`等级（${currentLevelInfo.minGrade}-${currentLevelInfo.maxGrade}级）`" />
        <FormNumber
          v-model="itemGrade"
          :min="currentLevelInfo.minGrade"
          :max="currentLevelInfo.maxGrade"
          :placeholder="`${currentLevelInfo.minGrade}-${currentLevelInfo.maxGrade}`"
        />
        <div class="field-hint">
          该层级的等级范围：{{ currentLevelInfo.minGrade }}-{{ currentLevelInfo.maxGrade }}级
        </div>
      </div>

      <!-- 种族 -->
      <div class="form-row">
        <FormLabel label="种族" required />
        <FormInput v-model="itemRace" placeholder="例如：人类、精灵等" :maxlength="20" />
      </div>

      <!-- 身份 -->
      <div class="form-row">
        <FormLabel label="身份（多个用逗号或换行分隔）" />
        <FormTextarea v-model="itemIdentity" placeholder="例如：&#10;吟游诗人&#10;异世界的猩红女巫" :rows="2" />
      </div>

      <!-- 职业 -->
      <div class="form-row">
        <FormLabel label="职业（多个用逗号或换行分隔）" />
        <FormTextarea v-model="itemCareer" placeholder="例如：&#10;调律者&#10;指挥家" :rows="2" />
      </div>

      <!-- 性格 -->
      <div class="form-row">
        <FormLabel label="性格" />
        <FormInput v-model="itemPersonality" placeholder="描述角色的性格特征..." />
      </div>

      <!-- 喜爱 -->
      <div class="form-row">
        <FormLabel label="喜爱" />
        <FormTextarea v-model="itemLike" placeholder="描述喜好和习惯..." :rows="2" />
      </div>

      <!-- 外貌特质 -->
      <div class="form-row">
        <FormLabel label="外貌特质" />
        <FormTextarea v-model="itemApp" placeholder="描述外貌特征..." :rows="2" />
      </div>

      <!-- 衣物装饰 -->
      <div class="form-row">
        <FormLabel label="衣物装饰" />
        <FormTextarea v-model="itemCloth" placeholder="描述穿着打扮..." :rows="2" />
      </div>

      <!-- 装备 -->
      <div class="form-row">
        <FormLabel label="装备（每个装备用空行分隔，第一行为装备名）" />
        <FormTextarea
          v-model="itemEquip"
          placeholder="装备名称&#10;装备效果和描述&#10;&#10;另一个装备名称&#10;装备效果和描述"
          :rows="4"
        />
      </div>

      <!-- 属性 -->
      <div class="form-row">
        <FormLabel label="属性（格式：力量:6,敏捷:6,体质:6,智力:11,精神:12）" />
        <FormInput v-model="itemAttributes" placeholder="力量:6,敏捷:6,体质:6,智力:11,精神:12" />
      </div>

      <!-- 登神长阶 -->
      <div class="form-row">
        <FormLabel label="登神长阶（需等级 ≥ 13）" />
        <FormTextarea
          v-model="itemStairway"
          :disabled="itemGrade < 13"
          :placeholder="itemGrade >= 13 ? '描述登神长阶信息...' : '等级需达到 13 级或以上才可填写'"
          :rows="2"
        />
        <div v-if="itemGrade < 13" class="field-hint">
          ⚠️ 当前等级 {{ itemGrade }} 级，需要达到 13 级才能开启登神长阶
        </div>
      </div>

      <!-- 是否缔结契约 -->
      <div class="form-row">
        <FormLabel label="是否缔结契约" />
        <div class="radio-group">
          <label class="radio-label">
            <input v-model="itemIsContract" type="radio" value="是" />
            是
          </label>
          <label class="radio-label">
            <input v-model="itemIsContract" type="radio" value="否" />
            否
          </label>
        </div>
      </div>

      <!-- 好感度 -->
      <div class="form-row">
        <FormLabel label="好感度 (-100~100)" />
        <FormNumber v-model="itemAffinity" :min="-100" :max="100" placeholder="49" />
      </div>

      <!-- 评价 -->
      <div class="form-row">
        <FormLabel label="评价" />
        <FormTextarea v-model="itemComment" placeholder="该角色对你的评价..." :rows="2" />
      </div>

      <!-- 背景故事 -->
      <div class="form-row">
        <FormLabel label="背景故事" />
        <FormTextarea v-model="itemBackgroundInfo" placeholder="描述背景故事..." :rows="3" />
      </div>

      <!-- 技能 -->
      <div class="form-row">
        <FormLabel label="技能（每个技能用空行分隔，第一行为技能名）" />
        <FormTextarea
          v-model="itemSkills"
          placeholder="技能名称&#10;技能描述&#10;&#10;另一个技能名称&#10;技能描述"
          :rows="4"
        />
      </div>

      <!-- 操作按钮 -->
      <div class="form-actions">
        <button class="btn-reset" @click="resetForm">清空</button>
        <button class="btn-submit" :disabled="!isValid" @click="handleAdd">添加到已选项目</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-destined-form {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);

  &:not(.expanded) {
    .form-header {
      border-bottom: none;
    }
  }

  .form-header {
    padding: var(--spacing-md) var(--spacing-lg);
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(139, 69, 19, 0.05) 100%);
    border-bottom: 2px solid var(--border-color);
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all var(--transition-fast);

    &:hover {
      background: linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(139, 69, 19, 0.08) 100%);
    }

    .header-left {
      flex: 1;
    }

    .form-title {
      font-size: 1.1rem;
      margin: 0 0 var(--spacing-xs) 0;
      color: var(--title-color);
      font-weight: 700;
    }

    .form-desc {
      font-size: 0.85rem;
      color: var(--text-light);
    }

    .toggle-icon {
      font-size: 0.9rem;
      color: var(--text-light);
      transition: transform var(--transition-fast);
      margin-left: var(--spacing-md);

      &.rotated {
        transform: rotate(180deg);
      }
    }
  }

  .form-body {
    padding: var(--spacing-lg);
    max-height: 70vh;
    overflow-y: auto;
  }

  .form-row {
    margin-bottom: var(--spacing-md);

    &:last-child {
      margin-bottom: 0;
    }
  }

  .radio-group {
    display: flex;
    gap: var(--spacing-md);
  }

  .level-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--spacing-xs);
  }

  .level-btn {
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: 0.85rem;
    color: var(--text-color);
    white-space: nowrap;

    &:hover {
      border-color: var(--accent-color);
      background: rgba(212, 175, 55, 0.1);
    }

    &.active {
      background: var(--accent-color);
      border-color: var(--accent-color);
      color: var(--primary-bg);
      font-weight: 600;
      box-shadow: 0 2px 4px rgba(212, 175, 55, 0.3);
    }
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--text-color);

    input[type='radio'] {
      cursor: pointer;
    }
  }

  .cost-info {
    margin-top: var(--spacing-xs);
    font-size: 0.85rem;
    color: var(--text-light);

    .cost-value {
      font-size: 1rem;
      font-weight: 700;
      color: var(--accent-color);
      font-family: var(--font-mono);
      margin: 0 var(--spacing-xs);
    }
  }

  .form-actions {
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--border-color);
  }

  .btn-reset,
  .btn-submit {
    flex: 1;
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all var(--transition-fast);
  }

  .btn-reset {
    background: var(--input-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover {
      background: var(--card-bg);
      border-color: var(--border-color-strong);
    }
  }

  .btn-submit {
    background: var(--accent-color);
    color: var(--primary-bg);

    &:hover:not(:disabled) {
      background: #c9a842;
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .field-hint {
    margin-top: var(--spacing-xs);
    font-size: 0.8rem;
    color: var(--text-light);
    font-style: italic;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .custom-destined-form {
    .form-header {
      padding: var(--spacing-sm) var(--spacing-md);

      .header-left {
        .form-title {
          font-size: 1rem;
        }

        .form-desc {
          font-size: 0.8rem;
        }
      }

      .toggle-icon {
        font-size: 0.85rem;
      }
    }

    .form-body {
      padding: var(--spacing-md);
      max-height: 60vh;
    }

    .form-row {
      margin-bottom: var(--spacing-sm);
    }

    .level-buttons {
      grid-template-columns: repeat(2, 1fr);
    }

    .level-btn {
      padding: 6px var(--spacing-sm);
      font-size: 0.8rem;
    }

    .form-actions {
      flex-direction: column;
      gap: var(--spacing-sm);
    }
  }
}
</style>
