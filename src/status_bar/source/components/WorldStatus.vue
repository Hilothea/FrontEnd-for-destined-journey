<script setup lang="ts"></script>

<template>
  <div class="world-status">
    <div>⏳️ 时间: <span id="world-time" class="value-main">111</span></div>
    <div>📍 地点: <span id="world-location" class="value-main">111</span></div>
  </div>
</template>

<style lang="scss" scoped>
.world-status {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  background-color: #e8ddcb;
  padding: 10px 15px;
  margin-bottom: 15px;
  border: 1px solid #c6b8a5;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
}
</style>
