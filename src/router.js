import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/pages/HomeView.vue';

import ErrorView from '@/pages/ErrorView.vue' 

const routes = [
  { path: "/", component: HomeView, alias: '/home'},
  { path: '/404', component: ErrorView },
  { path: '/:catchAll(.*)', redirect: '/404'},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router