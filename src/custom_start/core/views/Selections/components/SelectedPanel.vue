<script setup lang="ts">
import type { Equipment, Item, Skill } from '../../../types';

interface Props {
  equipments: Equipment[];
  items: Item[];
  skills: Skill[];
  availablePoints: number;
  totalPoints: number;
  consumedPoints: number;
}

interface Emits {
  (e: 'remove', item: Equipment | Item | Skill, type: 'equipment' | 'item' | 'skill'): void;
  (e: 'clear'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleRemove = (item: Equipment | Item | Skill, type: 'equipment' | 'item' | 'skill') => {
  emit('remove', item, type);
};

const handleClear = () => {
  emit('clear');
};

const totalCount = computed(() => {
  return props.equipments.length + props.items.length + props.skills.length;
});

const totalCost = computed(() => {
  const equipmentCost = props.equipments.reduce((sum, item) => sum + item.cost, 0);
  const itemCost = props.items.reduce((sum, item) => sum + item.cost, 0);
  const skillCost = props.skills.reduce((sum, item) => sum + item.cost, 0);
  return equipmentCost + itemCost + skillCost;
});
</script>

<template>
  <div class="selected-panel">
    <div class="panel-header">
      <div class="header-top">
        <h3 class="title">已选项目</h3>
        <div class="count-badge">{{ totalCount }}</div>
      </div>
      <div class="points-info">
        <span class="points-label">转生点数：</span>
        <span class="points-value" :class="{ negative: availablePoints < 0 }">
          {{ availablePoints }}
        </span>
        <span class="points-total">/ {{ totalPoints }}</span>
        <span class="points-consumed">（已消耗：{{ consumedPoints }}）</span>
      </div>
    </div>

    <div class="panel-body">
      <!-- 装备列表 -->
      <div v-if="equipments.length > 0" class="section">
        <div class="section-title">
          <span>⚔️ 装备</span>
          <span class="count">({{ equipments.length }})</span>
        </div>
        <div class="item-list">
          <div v-for="item in equipments" :key="item.name" class="selected-item">
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-cost">{{ item.cost }} 点</div>
            </div>
            <button class="remove-btn" @click="handleRemove(item, 'equipment')">×</button>
          </div>
        </div>
      </div>

      <!-- 道具列表 -->
      <div v-if="items.length > 0" class="section">
        <div class="section-title">
          <span>🎒 道具</span>
          <span class="count">({{ items.length }})</span>
        </div>
        <div class="item-list">
          <div v-for="item in items" :key="item.name" class="selected-item">
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-cost">{{ item.cost }} 点</div>
            </div>
            <button class="remove-btn" @click="handleRemove(item, 'item')">×</button>
          </div>
        </div>
      </div>

      <!-- 技能列表 -->
      <div v-if="skills.length > 0" class="section">
        <div class="section-title">
          <span>✨ 技能</span>
          <span class="count">({{ skills.length }})</span>
        </div>
        <div class="item-list">
          <div v-for="item in skills" :key="item.name" class="selected-item">
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-cost">{{ item.cost }} 点</div>
            </div>
            <button class="remove-btn" @click="handleRemove(item, 'skill')">×</button>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="totalCount === 0" class="empty-state">
        <div class="empty-icon">🎯</div>
        <div class="empty-text">还没有选择任何物品</div>
      </div>
    </div>

    <div class="panel-footer">
      <div class="total-info">
        <span class="label">总消耗：</span>
        <span class="value">{{ totalCost }} 点</span>
      </div>
      <button v-if="totalCount > 0" class="clear-btn" @click="handleClear">清空全部</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selected-panel {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 800px;

  .panel-header {
    padding: var(--spacing-md);
    border-bottom: 2px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-size: 1.1rem;
      margin: 0;
      color: var(--title-color);
      font-weight: 700;
    }

    .count-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
      padding: 0 var(--spacing-sm);
      background: var(--accent-color);
      color: var(--primary-bg);
      border-radius: 50%;
      font-weight: 700;
      font-size: 1rem;
    }

    .points-info {
      display: flex;
      align-items: baseline;
      gap: var(--spacing-xs);
      font-size: 0.9rem;

      .points-label {
        color: var(--text-light);
        font-weight: 500;
      }

      .points-value {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--accent-color);
        font-family: var(--font-mono);

        &.negative {
          color: var(--error-color);
        }
      }

      .points-total {
        color: var(--text-light);
        font-family: var(--font-mono);
      }

      .points-consumed {
        color: var(--text-light);
        font-size: 0.85rem;
      }
    }
  }

  .panel-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-lg);

    .section {
      margin-bottom: var(--spacing-lg);

      &:last-child {
        margin-bottom: 0;
      }

      .section-title {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        font-size: 1rem;
        font-weight: 600;
        color: var(--title-color);
        margin-bottom: var(--spacing-sm);
        padding-bottom: var(--spacing-xs);
        border-bottom: 1px solid var(--border-color-light);

        .count {
          font-size: 0.9rem;
          color: var(--text-light);
        }
      }

      .item-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      .selected-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-sm);
        background: var(--input-bg);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        transition: all var(--transition-fast);

        &:hover {
          border-color: var(--accent-color);
          box-shadow: var(--shadow-sm);
        }

        .item-info {
          flex: 1;
          min-width: 0;

          .item-name {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-color);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .item-cost {
            font-size: 0.85rem;
            color: var(--accent-color);
            font-family: var(--font-mono);
            margin-top: 2px;
          }
        }

        .remove-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--error-color);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.3rem;
          line-height: 1;
          transition: all var(--transition-fast);
          flex-shrink: 0;
          margin-left: var(--spacing-sm);

          &:hover {
            background: #b71c1c;
            transform: scale(1.1);
          }
        }
      }
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-2xl) var(--spacing-lg);
      text-align: center;

      .empty-icon {
        font-size: 3rem;
        margin-bottom: var(--spacing-md);
        opacity: 0.5;
      }

      .empty-text {
        font-size: 0.95rem;
        color: var(--text-light);
        font-style: italic;
      }
    }
  }

  .panel-footer {
    padding: var(--spacing-lg);
    border-top: 2px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-md);

    .total-info {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);

      .label {
        font-size: 0.95rem;
        color: var(--text-light);
      }

      .value {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--accent-color);
        font-family: var(--font-mono);
      }
    }

    .clear-btn {
      padding: var(--spacing-sm) var(--spacing-lg);
      background: var(--error-color);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all var(--transition-fast);

      &:hover {
        background: #b71c1c;
        transform: translateY(-1px);
        box-shadow: var(--shadow-sm);
      }
    }
  }
}

// 自定义滚动条
.panel-body {
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--input-bg);
    border-radius: var(--radius-md);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: var(--radius-md);

    &:hover {
      background: var(--border-color-strong);
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .selected-panel {
    max-height: none;

    .panel-header {
      padding: var(--spacing-md);

      .title {
        font-size: 1.1rem;
      }

      .count-badge {
        min-width: 28px;
        height: 28px;
        font-size: 0.9rem;
      }
    }

    .panel-body {
      padding: var(--spacing-md);

      .section {
        .section-title {
          font-size: 0.95rem;
        }

        .selected-item {
          padding: var(--spacing-xs) var(--spacing-sm);

          .item-info {
            .item-name {
              font-size: 0.85rem;
            }

            .item-cost {
              font-size: 0.8rem;
            }
          }

          .remove-btn {
            width: 24px;
            height: 24px;
          }
        }
      }

      .empty-state {
        padding: var(--spacing-xl) var(--spacing-md);

        .empty-icon {
          font-size: 2.5rem;
        }

        .empty-text {
          font-size: 0.9rem;
        }
      }
    }

    .panel-footer {
      padding: var(--spacing-md);
      flex-direction: column;
      align-items: stretch;

      .total-info {
        justify-content: center;

        .label {
          font-size: 0.9rem;
        }

        .value {
          font-size: 1.1rem;
        }
      }

      .clear-btn {
        width: 100%;
        font-size: 0.85rem;
      }
    }
  }
}
</style>
