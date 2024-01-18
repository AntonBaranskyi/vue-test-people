import { createApp } from 'vue';
import './styles/main.scss';
import store from './store/store';

import App from './App.vue';

import 'vue-select/dist/vue-select.css';

import components from './components/UI';
import vSelect from 'vue-select';

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.component('v-select', vSelect).use(store).mount('#app');
