<script setup>
import { useCartStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconMinus from '@/components/icons/IconMinus.vue'

const cartStore = useCartStore()

cartStore.init()
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4 py-6">
    <h6 class="font-bold dark:text-white mb-6 text-xl text-center">My Cart</h6>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Image</span>
            </th>
            <th scope="col" class="px-6 py-3">Product</th>
            <th scope="col" class="px-6 py-3">Qty</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, idx) in cartStore.items"
            :key="idx"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="w-32 p-4">
              <img :src="item.product_image" :alt="item.product_name" />
            </td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {{ item.product_name }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center space-x-3">
                <button
                  class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                  @click="cartStore.manageItem(item.product_id, 'decrease')"
                >
                  <span class="sr-only">Quantity button</span>
                  <IconMinus classes="w-6 h-6 text-gray-800" />
                </button>
                <div>
                  <input
                    type="number"
                    class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :value="item.product_quantity"
                    readonly
                  />
                </div>
                <button
                  class="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                  @click="cartStore.manageItem(item.product_id, 'increase')"
                >
                  <span class="sr-only">Quantity button</span>
                  <IconPlus classes="w-6 h-6 text-gray-800" />
                </button>
              </div>
            </td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              ${{ (item.product_price * item.product_quantity).toFixed(2) }}
            </td>
            <td class="px-6 py-4">
              <a
                href="#"
                @click.prevent="cartStore.deleteItem(item.product_id)"
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
                >Remove</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="max-w-sm p-6 ml-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        class="flex items-center justify-between font-semibold tracking-tight text-gray-900 dark:text-white"
      >
        <h5>Subtotal</h5>
        <h5>${{ cartStore.subtotal.toFixed(2) }}</h5>
      </div>
      <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Shipping and taxes calculated at checkout.
      </p>
      <button
        class="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
      >
        Checkout
      </button>
      <p class="mt-4 text-center text-sm">
        <span class="text-gray-500 dark:text-gray-400 mr-1">or,</span>
        <RouterLink class="font-medium text-indigo-600 hover:text-indigo-500" :to="{ name: 'home' }"
          >Continue Shipping</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<style scoped></style>
