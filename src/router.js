import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import DrinkDetails from './views/DrinkDetails.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/drink/:id', component: DrinkDetails }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;