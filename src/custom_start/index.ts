import './core/styles/index.scss';

import { createApp } from 'vue';
import App from './core/App.vue';
import { pinia } from './core/store';

import type { RouteRecordRaw } from 'vue-router';
import { createMemoryHistory, createRouter } from 'vue-router';

import Layout from './core/layout/index.vue';
import Background from './core/views/Background/index.vue';
import BasicInfo from './core/views/BasicInfo/index.vue';
import Confirm from './core/views/Confirm/index.vue';
import Selections from './core/views/Selections/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/basic',
    children: [
      {
        path: 'basic',
        name: 'BasicInfo',
        component: BasicInfo,
        meta: { title: '基础信息与属性', step: 1 },
      },
      {
        path: 'selections',
        name: 'Selections',
        component: Selections,
        meta: { title: '装备与技能', step: 2 },
      },
      {
        path: 'background',
        name: 'Background',
        component: Background,
        meta: { title: '红线对象与初始背景', step: 3 },
      },
      {
        path: 'confirm',
        name: 'Confirm',
        component: Confirm,
        meta: { title: '确认提交', step: 4 },
      },
    ],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const app = createApp(App);

$(() => {
  app.use(pinia);
  app.use(router);
  app.mount('#app');
});
