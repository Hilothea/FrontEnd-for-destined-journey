<script lang="ts" setup>
import CommonStatus from './common/CommonStatus.vue';
</script>

<template>
  <CommonStatus
    title="♾️ 登神长阶"
    variant="section"
    summary-details="长阶未开启"
    :default-open="false"
  >
    <!-- 要素 -->
    <CommonStatus
      title="要素"
      variant="sub-section"
      :default-open="false"
      :locked="false"
    >
      <template #title>
        要素 <span class="step-level-req">60级开启</span>
      </template>

      <div class="step-items-container">
        <div class="step-item">
          <span class="item-name">❖ 示例要素:</span>
          <span class="item-desc">这是要素的描述信息</span>
        </div>
        <p class="empty-slot">（尚无要素）</p>
      </div>
    </CommonStatus>

    <!-- 权能 -->
    <CommonStatus
      title="权能"
      variant="sub-section"
      :default-open="false"
      :locked="false"
    >
      <template #title>
        权能 <span class="step-level-req">80级开启</span>
      </template>

      <div class="step-items-container">
        <div class="step-item">
          <span class="item-name">❖ 示例权能:</span>
          <span class="item-desc">这是权能的描述信息</span>
        </div>
        <p class="empty-slot">（尚无权能）</p>
      </div>
    </CommonStatus>

    <!-- 法则 -->
    <CommonStatus
      title="法则"
      variant="sub-section"
      :default-open="false"
      :locked="false"
    >
      <template #title>
        法则 <span class="step-level-req">90级开启</span>
      </template>

      <div class="step-items-container">
        <div class="step-item">
          <span class="item-name">❖ 示例法则:</span>
          <span class="item-desc">这是法则的描述信息</span>
        </div>
        <p class="empty-slot">（尚无法则）</p>
      </div>
    </CommonStatus>

    <!-- 神位 / 神国 -->
    <CommonStatus
      title="神位 / 神国"
      variant="sub-section"
      :default-open="false"
      :locked="false"
    >
      <template #title>
        神位 / 神国 <span class="step-level-req">100级开启</span>
      </template>

      <div class="god-tier-grid">
        <div>
          <div class="step-item">
            <span class="item-name">神位: </span>
            <span class="value-main">示例神位</span>
            <span class="empty-slot">（尚未登临）</span>
          </div>
        </div>
        <div>
          <div class="step-item">
            <span class="item-name">神国: </span>
            <span class="value-main">示例神国</span>
            <span class="empty-slot">（尚未开辟）</span>
          </div>
        </div>
      </div>
    </CommonStatus>
  </CommonStatus>
</template>

<style lang="scss" scoped>
/* 等级要求标签 */
.step-level-req {
  font-size: 0.8em;
  color: #7a655d;
  font-style: italic;
  margin-left: 15px;
}

/* 步骤项容器 */
.step-items-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* 步骤项 */
.step-item {
  margin-bottom: 5px;
  line-height: 1.6;
}

.item-name {
  font-weight: bold;
  color: #6d4c41;
}

.item-desc {
  font-size: 0.9em;
  font-style: italic;
  color: #7a655d;
  margin-left: 20px;
  display: block; /* 确保换行 */
}

/* 空状态提示 */
.empty-slot {
  color: #9e9e9e;
  font-style: italic;
}

/* 神位/神国网格布局 */
.god-tier-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .god-tier-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>