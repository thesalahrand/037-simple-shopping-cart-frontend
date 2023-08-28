<script setup>
import { useWishlistStore } from '@/stores/wishlist'
// import { useCartStore } from '@/stores/cart'
import IconCart from '@/components/icons/IconCart.vue'
import IconXMark from '@/components/icons/IconXMark.vue'

const wishlistStore = useWishlistStore()
// const cartStore = useCartStore()
wishlistStore.init()
// cartStore.init()
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4 py-6">
    <h6 class="font-bold dark:text-white mb-6 text-xl text-center">My Wishlist</h6>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(item, idx) in wishlistStore.items"
        :key="idx"
        class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="relative">
          <img
            class="w-full rounded-t-lg h-64 object-cover"
            :src="item.product_image"
            alt="product image"
          />
          <div
            class="p-2 top-2 right-2 absolute z-10 bg-white cursor-pointer rounded-full"
            @click="wishlistStore.deleteItem(item.product_id)"
          >
            <IconXMark classes="w-6 h-6 text-gray-800" />
          </div>
        </div>
        <div class="p-4">
          <a href="#">
            <h5 class="font-semibold tracking-tight text-gray-900 dark:text-white">
              {{ item.product_name }}
            </h5>
          </a>
          <div class="mt-2 flex items-center justify-between">
            <span class="text-xl font-bold text-gray-900 dark:text-white"
              >${{ item.product_price }}</span
            >
            <button
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
