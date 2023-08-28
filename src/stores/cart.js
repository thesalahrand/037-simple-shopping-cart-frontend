import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export const useCartStore = defineStore('cart', () => {
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
      const res = await fetch('/api/read-cart-items.php', {
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

  // async function removeProduct(productId) {
  //   try {
  //     const res = await fetch('/api/toggle-from-wishlist.php', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: authUser.value.jwt,
  //         Accept: 'application/json'
  //       },
  //       body: JSON.stringify({ productId })
  //     })
  //     const resData = await res.json()
  //     if (!res.ok) throw new Error(resData.message)

  //     products.value = products.value.filter((product) => {
  //       return product.id != resData.singleWishlistItem.product_id
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // async function removeProduct(productId) {
  //   try {
  //     const res = await fetch('/api/toggle-from-wishlist.php', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: authUser.value.jwt,
  //         Accept: 'application/json'
  //       },
  //       body: JSON.stringify({ productId })
  //     })
  //     const resData = await res.json()
  //     if (!res.ok) throw new Error(resData.message)

  //     products.value = products.value.filter((product) => {
  //       return product.id != resData.singleWishlistItem.product_id
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  async function manageItem(productId, type) {
    try {
      const res = await fetch('/api/manage-cart-item.php', {
        method: 'POST',
        headers: {
          Authorization: authUser.value.jwt,
          Accept: 'application/json'
        },
        body: JSON.stringify({ productId, type })
      })
      const resData = await res.json()
      console.log(resData)
      if (!res.ok) throw new Error(resData.message)

      switch (resData.actualOperationType) {
        case 'created':
          items.unshift(resData.singleCartItem)
          break
        case 'updated': {
          const updatedItem = items.find(
            (item) => item.cart_item_id == resData.singleCartItem.cart_item_id
          )
          updatedItem.quantity = resData.singleCartItem.product_quantity
          break
        }
        case 'deleted': {
          const deletedItemIdx = items.findIndex(
            (item) => item.cart_item_id == resData.singleCartItem.cart_item_id
          )
          items.splice(deletedItemIdx, 1)
          break
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return { init, items, manageItem }
})
