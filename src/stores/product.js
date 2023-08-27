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

  async function toggleFromWishlist(productId) {
    try {
      const res = await fetch('/api/toggle-from-wishlist.php', {
        method: 'POST',
        headers: {
          Authorization: authUser.value.jwt,
          Accept: 'application/json'
        },
        body: JSON.stringify({ productId })
      })
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.message)

      products.value = products.value.map((product) => {
        return product.id == resData.singleWishlistItem.product_id
          ? { ...product, added_to_cart: resData.toggleType == 'add' ? 1 : 0 }
          : product
      })
    } catch (err) {
      console.log(err)
    }
  }

  return { init, products, readAll, toggleFromWishlist }
})
