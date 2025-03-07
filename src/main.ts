import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';

import App from './App.vue'
import router from './router'

const app = createApp(App)

import Antd from 'ant-design-vue';
function resolveGLobalComponents() {
  app.use(Antd);
}
app.use(createPinia())
app.use(router)
app.config.errorHandler = (err) =>
{
  console.log(err)
}
app.use(
  Vue3Toasity,
  {
    // the Toast application is separate from the main application, so we need to call .use
    useHandler: resolveGLobalComponents,
    autoClose: 3000,
    // other props...
  } as ToastContainerOptions,
);
app.mount('#app')
