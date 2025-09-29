import { createApp } from 'vue';
import App from './source/App.vue';
import './source/styles/index.scss';

$(() => {
  createApp(App).mount('#app');
});