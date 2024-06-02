import { createWebHistory, createRouter } from 'vue-router';
import './assets/css/main.css';

import LevelsView from '@/pages/LevelsView.vue';
import ErrorView from '@/pages/ErrorView.vue';
import NetworkConstructorView from "@/pages/constuctors/NetworkConstructorView.vue";
import LevelsData from '@/assets/json/OSI.json'
import DatalinkView from './pages/DatalinkView.vue';

const levelRoutes = LevelsData.map(item => ({
  path: `/${item.props.id}`,
  component: LevelsView,
  props: {url: item.props.id}
}));

const routes = [
  { path: "/", component: LevelsView },
  ...levelRoutes,
  { path: '/network-layer/constructor', component: NetworkConstructorView },
  { path: '/datalink-layer/constructor', component: DatalinkView},
  { path: '/404', component: ErrorView },
  { path: '/:catchAll(.*)', redirect: '/404'},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;