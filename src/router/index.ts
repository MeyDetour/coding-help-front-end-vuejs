import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/login/loginView.vue'
import BaseView from '../views/base/baseView.vue'
import RegisterView from '@/views/register/registerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },   {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },   {
      path: '/private/:subpage/:catchAll(.*)*',
      name: 'codinghelp',
      component: BaseView,
    },
  ],
})

export default router
