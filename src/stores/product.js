import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export const useProductStore = defineStore('product', () => {
  const authUser = ref(null)
  const items = reactive([])

  function init() {
    const authStore = useAuthStore()
    authStore.init()
    authUser.value = authStore.user
    readItems()
  }

  async function readItems() {
    try {
      const res = await fetch('/api/read-products.php', {
        headers: {
          Authorization: authUser.value.jwt,
          Accept: 'application/json'
        }
      })
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.message)

      items.splice(0, items.length)
      items.push(...resData)
    } catch (err) {
      console.log(err)
    }
  }

  return { items, init }
})
