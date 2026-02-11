import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import App from './App.vue'
import router from './router'

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Lara
    }
});

app.mount('#app')
