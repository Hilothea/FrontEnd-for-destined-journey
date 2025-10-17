<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { GENDERS, START_LOCATIONS } from '../../data/base-info';
import { useCharacterStore } from '../../store';

const characterStore = useCharacterStore();
const { character } = storeToRefs(characterStore);

// 注入父组件提供的触发器
const randomGenerateTrigger = inject<Ref<number>>('randomGenerateTrigger');
const resetPageTrigger = inject<Ref<number>>('resetPageTrigger');

// 监听随机生成事件
watch(() => randomGenerateTrigger?.value, () => {
  if (randomGenerateTrigger && randomGenerateTrigger.value > 0) {
    randomGenerate();
  }
});

// 监听重置事件
watch(() => resetPageTrigger?.value, () => {
  if (resetPageTrigger && resetPageTrigger.value > 0) {
    resetPage();
  }
});

// 随机生成基本信息
const randomGenerate = () => {
  // 随机性别
  character.value.gender = GENDERS[Math.floor(Math.random() * (GENDERS.length - 1))];

  // 随机年龄 (18-100)
  character.value.age = Math.floor(Math.random() * 83) + 18;

  // 随机出生地
  character.value.startLocation = START_LOCATIONS[Math.floor(Math.random() * (START_LOCATIONS.length - 1))];

  console.log('基本信息已随机生成');
};

// 重置页面
const resetPage = () => {
  character.value.name = '';
  character.value.gender = '男';
  character.value.customGender = '';
  character.value.age = 18;
  character.value.startLocation = '大陆东南部区域-索伦蒂斯王国';
  character.value.customStartLocation = '';

  console.log('基本信息已重置');
};
</script>

<template>
  <div class="basic-info">
    <h2>基本信息</h2>

    <div class="form-group">
      <label>姓名：</label>
      <input v-model="character.name" type="text" placeholder="请输入角色姓名" />
    </div>

    <div class="form-group">
      <label>性别：</label>
      <select v-model="character.gender">
        <option v-for="gender in GENDERS" :key="gender" :value="gender">
          {{ gender }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label>年龄：</label>
      <input v-model.number="character.age" type="number" min="1" max="10000" />
    </div>

    <div class="form-group">
      <label>出生地：</label>
      <select v-model="character.startLocation">
        <option v-for="location in START_LOCATIONS" :key="location" :value="location">
          {{ location }}
        </option>
      </select>
    </div>

    <div class="info-display">
      <p><strong>当前配置：</strong></p>
      <p>姓名：{{ character.name || '未设置' }}</p>
      <p>性别：{{ character.gender }}</p>
      <p>年龄：{{ character.age }}</p>
      <p>出生地：{{ character.startLocation }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.basic-info {
  padding: var(--spacing-lg);
}

h2 {
  margin-bottom: var(--spacing-xl);
  color: var(--title-color);
  text-align: center;
}

.form-group {
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);

  label {
    min-width: 80px;
    font-weight: 600;
    color: var(--text-color);
  }

  input, select {
    flex: 1;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: 1rem;
    color: var(--text-color);
    transition: var(--transition-normal);

    &:focus {
      outline: none;
      border-color: var(--accent-color);
      box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.1);
    }
  }
}

.info-display {
  margin-top: var(--spacing-2xl);
  padding: var(--spacing-lg);
  background: rgba(212, 196, 176, 0.3);
  border-radius: var(--radius-md);
  border: 1px dashed var(--border-color);

  p {
    margin: var(--spacing-xs) 0;
    color: var(--text-color);

    strong {
      color: var(--title-color);
    }
  }
}
</style>