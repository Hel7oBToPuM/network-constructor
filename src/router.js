import { createWebHistory, createRouter } from 'vue-router'
import './assets/css/main.css'


import LevelsView from '@/pages/LevelsView.vue';

import ErrorView from '@/pages/ErrorView.vue' 

const routes = [
  { path: "/", component: LevelsView},
  { path: '/404', component: ErrorView },
  { path: '/:catchAll(.*)', redirect: '/404'},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router