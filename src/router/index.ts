import { createRouter, createWebHistory } from 'vue-router'

import MainPage from "@/pages/MainPage.vue";
import SecondPage from "@/pages/SecondPage.vue";

const routes = [
  { path: '/', component: MainPage },
  { path: '/second-page', component: SecondPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
