import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import WishlistView from '@/views/WishlistView.vue'
import CartView from '@/views/CartView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.init()

  if (to.name !== 'login' && authStore.user === null) next({ name: 'login' })
  else if (to.name === 'login' && authStore.user !== null) next({ name: 'home' })
  else next()
})

export default router
