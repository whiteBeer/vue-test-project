import { createRouter, createWebHistory } from 'vue-router';

import ProgressPage from '@/pages/ProgressPage/ProgressPage.vue';
import ChartPage from '@/pages/ChartPage/ChartPage.vue';

const routes = [
  { path: '/', component: ProgressPage },
  { path: '/chart-page', component: ChartPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
