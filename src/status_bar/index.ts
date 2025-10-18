import { createApp } from 'vue';
import App from './source/App.vue';
import { pinia } from './source/store';
import './source/styles/index.scss';

$(() => {
  const app = createApp(App);
  app.use(pinia);
  app.mount('#app');
});
