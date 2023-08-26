import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export const useProductStore = defineStore('product', () => {
  const authUser = ref(null)
  const products = ref(null)

  function init() {
    const authStore = useAuthStore()
    authStore.init()
    authUser.value = authStore.user
  }

  async function readAll() {
    try {
      const res = await fetch('/api/read-all-products.php', {
        headers: {
          Authorization: authUser.value.jwt,
          Accept: 'application/json'
        }
      })
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.message)

      products.value = resData
    } catch (err) {
      console.log(err)
    }
  }

  return { init, products, readAll }
})
