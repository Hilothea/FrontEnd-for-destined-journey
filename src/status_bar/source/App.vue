<script setup lang="ts">
import Ascension from './components/Ascension.vue';
import WorldStatus from './components/WorldStatus.vue';
</script>

<template>
  <div class="layout">
    <WorldStatus />
    <Ascension />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: rgba(240, 230, 210, 0.85);
  border: 2px solid #785a4e;
  border-radius: 8px;
  overflow: hidden;
}
</style>
