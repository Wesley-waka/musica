import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import About from "@/views/About.vue";
import Manage from "@/views/Manage.vue";
import useUserStore from "@/stores/user";


const routes = [
  {
    name: 'home',
    path: "/",
    component: Home, 
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'manage',
    // alias: '/manage',
    path: "/manage-music",
    component: Manage,
    beforeEnter: (to,from,next) => {
      console.log('Mange Route Guard');
      next();
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage',
    redirect: {name: 'manage'},
  },
  {
    path: '/:catchAll(.*)*',
    redirect: {name: 'home'}
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'text-yellow-500'
})

router.beforeEach((to,from,next)=>{
  //console.log(to.meta);

  if(!to.meta.requiresAuth){
    next();
    return;
  }

  const store = useUserStore();

  if(store.userLoggedIn){
    next();
  } else{
    next({name: 'home'})
  }
});

export default router;
