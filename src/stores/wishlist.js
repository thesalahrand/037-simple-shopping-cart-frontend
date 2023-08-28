import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export const useWishlistStore = defineStore('wishlist', () => {
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
      const res = await fetch('/api/read-wishlist-items.php', {
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

  async function addItem(productId) {
    try {
      const res = await fetch('/api/create-wishlist-item.php', {
        method: 'POST',
        headers: {
          Authorization: authUser.value.jwt,
          Accept: 'application/json'
        },
        body: JSON.stringify({ productId })
      })
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.message)

      items.unshift(resData)
    } catch (err) {
      console.log(err)
    }
  }

  async function deleteItem(productId) {
    try {
      const res = await fetch('/api/delete-wishlist-item.php', {
        method: 'POST',
        headers: {
          Authorization: authUser.value.jwt,
          Accept: 'application/json'
        },
        body: JSON.stringify({ productId })
      })
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.message)

      const deleteItemIdx = items.findIndex(
        (item) => item.wishlist_item_id == resData.wishlist_item_id
      )
      items.splice(deleteItemIdx, 1)
    } catch (err) {
      console.log(err)
    }
  }

  return { items, init, addItem, deleteItem }
})
