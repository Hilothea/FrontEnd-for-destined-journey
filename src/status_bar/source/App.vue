<script setup lang="ts">
import Ascension from './components/Ascension.vue';
import Destiny from './components/Destiny/index.vue';
import Equipment from './components/Equipment/index.vue';
import Items from './components/Items/index.vue';
import News from './components/News/index.vue';
import Skills from './components/Skills/index.vue';
import Task from './components/Task.vue';
import UserInfo from './components/UserInfo/index.vue';
import WorldStatus from './components/WorldStatus.vue';
</script>

<template>
  <div class="layout">
    <WorldStatus />
    <Ascension />
    <Task />
    <UserInfo />
    <Equipment />
    <Skills />
    <Items />
    <Destiny />
    <News />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: rgb(240, 230, 210);
  border: 2px solid #785a4e;
  border-radius: 8px;
  overflow: hidden;
}
</style>
