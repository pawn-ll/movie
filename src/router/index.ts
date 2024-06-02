// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import MovieDetail from '@/views/MovieDetail.vue';
import Home from '@/views/Home.vue';

// 引入Vue Router的类型定义
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
      path: '/detail/:movieCode',
      name: 'movie-detail',
      component: MovieDetail,
      props: true,
    },
    // 更多路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;