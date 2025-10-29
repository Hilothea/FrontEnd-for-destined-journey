<script setup lang="ts">
import { computed, ref } from 'vue';
import { FormInput, FormLabel, FormTextarea } from '../../../components/Form';
import type { Equipment, Item, Rarity, Skill } from '../../../types';
import { calculateCostByPosition, getCostRange } from '../../../utils/cost-calculator';

interface Emits {
  (e: 'add', item: Equipment | Item | Skill, type: 'equipment' | 'item' | 'skill'): void;
}

const emit = defineEmits<Emits>();

// 折叠状态
const isExpanded = ref(false);

// 表单数据
const categoryType = ref<'equipment' | 'item' | 'skill'>('equipment'); // 大分类，用于确定添加到哪个列表
const customItemType = ref(''); // 物品的 type 属性，由玩家自定义
const itemName = ref('');
const itemRarity = ref<Rarity>('common');
const itemTag = ref('');
const itemEffect = ref('');
const itemDescription = ref('');
const itemConsume = ref(''); // 仅技能需要

// 品质选项
const rarityOptions: { value: Rarity; label: string; color: string }[] = [
  { value: 'common', label: '普通', color: '#9e9e9e' },
  { value: 'uncommon', label: '优秀', color: '#4caf50' },
  { value: 'rare', label: '稀有', color: '#2196f3' },
  { value: 'epic', label: '史诗', color: '#9c27b0' },
  { value: 'legendary', label: '传说', color: '#ff9800' },
  { value: 'mythic', label: '神话', color: '#e91e63' },
  { value: 'only', label: '唯一', color: '#ff0000' },
];

// 大分类选项
const categoryOptions = [
  { value: 'equipment', label: '装备' },
  { value: 'item', label: '道具' },
  { value: 'skill', label: '技能' },
];

// 根据品质计算点数（使用 0.5-1 之间的随机位置）
const calculatedCost = computed(() => {
  const randomPosition = 0.5 + Math.random() * 0.5;
  return calculateCostByPosition(itemRarity.value, randomPosition);
});

// 点数范围提示
const costRangeText = computed(() => {
  return getCostRange(itemRarity.value);
});

// 表单验证
const isValid = computed(() => {
  return itemName.value.trim() !== '' && customItemType.value.trim() !== '' && itemEffect.value.trim() !== '';
});

// 重置表单
const resetForm = () => {
  itemName.value = '';
  customItemType.value = '';
  itemRarity.value = 'common';
  itemTag.value = '';
  itemEffect.value = '';
  itemDescription.value = '';
  itemConsume.value = '';
};

// 添加自定义物品
const handleAdd = () => {
  if (!isValid.value) return;

  const baseItem = {
    name: itemName.value.trim(),
    cost: calculatedCost.value,
    type: customItemType.value.trim(),
    tag: itemTag.value.trim(),
    rarity: itemRarity.value,
    effect: itemEffect.value.trim(),
    description: itemDescription.value.trim() || '自定义物品',
    isCustom: true, // 标记为自定义数据
  };

  let newItem: Equipment | Item | Skill;

  if (categoryType.value === 'skill') {
    newItem = {
      ...baseItem,
      consume: itemConsume.value.trim() || '',
      isCustom: true, // 标记为自定义数据
    } as Skill;
  } else {
    newItem = baseItem as Equipment | Item;
  }

  emit('add', newItem, categoryType.value);
  resetForm();
  isExpanded.value = false; // 添加后自动折叠
};
</script>

<template>
  <div class="custom-item-form" :class="{ expanded: isExpanded }">
    <div class="form-header" @click="isExpanded = !isExpanded">
      <div class="header-left">
        <h3 class="form-title">✨ 自定义物品</h3>
        <div class="form-desc">创建您的专属物品、装备或技能</div>
      </div>
      <div class="toggle-icon" :class="{ rotated: isExpanded }">▼</div>
    </div>

    <div v-show="isExpanded" class="form-body">
      <!-- 大分类选择 -->
      <div class="form-row">
        <label class="form-label">添加到分类</label>
        <div class="category-buttons">
          <button
            v-for="option in categoryOptions"
            :key="option.value"
            class="category-btn"
            :class="{ active: categoryType === option.value }"
            @click="categoryType = option.value as 'equipment' | 'item' | 'skill'"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- 名称 -->
      <div class="form-row">
        <FormLabel label="名称" required />
        <FormInput v-model="itemName" placeholder="请输入物品名称" :maxlength="50" />
      </div>

      <!-- 类型 -->
      <div class="form-row">
        <FormLabel label="类型" required />
        <FormInput v-model="customItemType" placeholder="例如：武器、防具、消耗品、主动、被动等" :maxlength="20" />
      </div>

      <!-- 品质 -->
      <div class="form-row">
        <FormLabel label="品质" required />
        <div class="rarity-buttons">
          <button
            v-for="option in rarityOptions"
            :key="option.value"
            class="rarity-btn"
            :class="{ active: itemRarity === option.value }"
            :style="{ '--rarity-color': option.color }"
            @click="itemRarity = option.value"
          >
            {{ option.label }}
          </button>
        </div>
        <div class="cost-info">
          <span class="cost-label">消耗点数：</span>
          <span class="cost-value">{{ calculatedCost }}</span>
          <span class="cost-range">（范围：{{ costRangeText }}）</span>
        </div>
      </div>

      <!-- 标签 -->
      <div class="form-row">
        <FormLabel label="标签" />
        <FormInput v-model="itemTag" placeholder="例如：[关联属性][目标类型][核心功能][威力: XXX][可选机制]" />
      </div>

      <!-- 消耗（仅技能分类） -->
      <div v-if="categoryType === 'skill'" class="form-row">
        <FormLabel label="消耗" />
        <FormInput v-model="itemConsume" placeholder="例如：[动作: 50 SP]" />
      </div>

      <!-- 效果 -->
      <div class="form-row">
        <FormLabel label="效果" required />
        <FormTextarea v-model="itemEffect" placeholder="请描述物品的效果..." :rows="3" />
      </div>

      <!-- 描述 -->
      <div class="form-row">
        <FormLabel label="描述" />
        <FormTextarea v-model="itemDescription" placeholder="请描述物品的背景故事..." :rows="2" />
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
.custom-item-form {
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
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%);
    border-bottom: 2px solid var(--border-color);
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all var(--transition-fast);

    &:hover {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.08) 100%);
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
  }

  .form-row {
    margin-bottom: var(--spacing-md);

    &:last-child {
      margin-bottom: 0;
    }
  }

  .category-buttons,
  .rarity-buttons {
    display: flex;
    gap: var(--spacing-xs);
    flex-wrap: wrap;
  }

  .category-btn {
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: 0.9rem;
    color: var(--text-color);

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

  .rarity-btn {
    padding: 4px var(--spacing-sm);
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: 0.85rem;
    color: var(--text-color);

    &:hover {
      border-color: var(--rarity-color);
      color: var(--rarity-color);
    }

    &.active {
      background: var(--rarity-color);
      border-color: var(--rarity-color);
      color: white;
      font-weight: 600;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

    .cost-range {
      font-size: 0.8rem;
      color: var(--text-light);
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
}

// 响应式设计
@media (max-width: 768px) {
  .custom-item-form {
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
    }

    .form-row {
      margin-bottom: var(--spacing-sm);
    }

    .category-buttons,
    .rarity-buttons {
      gap: 4px;
    }

    .category-btn {
      padding: 6px var(--spacing-sm);
      font-size: 0.85rem;
    }

    .rarity-btn {
      padding: 3px var(--spacing-xs);
      font-size: 0.8rem;
    }

    .form-actions {
      flex-direction: column;
      gap: var(--spacing-sm);
    }
  }
}
</style>
