import { createRouter, createWebHistory } from 'vue-router'

import MainPage from "@/pages/MaingPage/MainPage.vue";
import ChartPage from "@/pages/ChartPage/ChartPage.vue";

const routes = [
  { path: '/', component: MainPage },
  { path: '/chart-page', component: ChartPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
