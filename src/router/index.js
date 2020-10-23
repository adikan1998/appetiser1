import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  onlyGuest,
  gate,
  onlyAuthorize
} from '../routeMiddleware'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: gate
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    beforeEnter: onlyGuest
  },
  {
    path: '/verify',
    name: 'Verification',
    component: () => import('../views/Verification'),
    beforeEnter: onlyGuest
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register'),
    beforeEnter: onlyGuest
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import('../views/Success'),
    beforeEnter: onlyAuthorize
  }
]

const router = new VueRouter({
  routes
})

export default router
