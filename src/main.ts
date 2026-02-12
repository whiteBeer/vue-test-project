import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import { definePreset } from '@primeuix/themes';
import App from './App.vue';
import router from './router';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const MyLara = definePreset(Lara, {
  semantic: {
    primary: {
      200: '#ABD2FF',
      500: '#1B84FF',
      600: '#107dff',
      700: '#0b7bff',
    },
  }
});

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MyLara
  }
});

app.mount('#app');
