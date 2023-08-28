<script setup>
import { useProductStore } from '@/stores/product'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import IconCart from '@/components/icons/IconCart.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconHeartSolid from '@/components/icons/IconHeartSolid.vue'

const productStore = useProductStore()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

productStore.init()
wishlistStore.init()
cartStore.init()
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4 py-6">
    <h6 class="font-bold dark:text-white mb-6 text-xl text-center">Featured Products</h6>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(item, idx) in productStore.items"
        :key="idx"
        class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="relative">
          <img
            class="w-full rounded-t-lg h-64 object-cover"
            :src="item.image"
            alt="product image"
          />
          <div class="p-2 top-2 right-2 absolute rounded-md z-10 bg-white cursor-pointer">
            <IconHeart
              v-show="
                wishlistStore.items.findIndex(
                  (wishlistItem) => wishlistItem.product_id == item.id
                ) == -1
              "
              @click="wishlistStore.addItem(item.id)"
              classes="w-6 h-6 text-pink-500"
            />
            <IconHeartSolid
              v-show="
                wishlistStore.items.findIndex(
                  (wishlistItem) => wishlistItem.product_id == item.id
                ) != -1
              "
              @click="wishlistStore.deleteItem(item.id)"
              classes="w-6 h-6 text-pink-500"
            />
          </div>
        </div>
        <div class="p-4">
          <h5 class="font-semibold tracking-tight text-gray-900 dark:text-white">
            {{ item.name }}
          </h5>
          <div class="mt-2 flex items-center justify-between">
            <span class="text-xl font-bold text-gray-900 dark:text-white">${{ item.price }}</span>
            <button
              @click="cartStore.manageItem(item.id, 'increase')"
              class="flex items-center gap-2 text-white text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <IconCart classes="w-6 h-6" />
              <span class="-mt-px">Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
