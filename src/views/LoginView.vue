<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const authStore = useAuthStore()

function loginHandler() {
  authStore.login()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4">
    <div
      class="w-full max-w-sm mx-auto mt-16 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form class="space-y-6" @submit.prevent="loginHandler()">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform!</h5>
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your username</label
          >
          <input
            type="text"
            name="username"
            id="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="johndoe"
            minlength="3"
            maxlength="12"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
