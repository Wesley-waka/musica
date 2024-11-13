import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import About from "@/views/About.vue";
import Manage from "@/views/Manage.vue";

const routes = [
  {
    path: "/",
    component: Home, 
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: "/manage",
    component: Manage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'text-yellow-500'
})

export default router;
