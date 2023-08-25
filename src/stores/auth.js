import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  function init() {
    user.value = JSON.parse(localStorage.getItem('user')) || null
  }

  function login() {
    const _user = {
      id: 1,
      username: 'thesalahrand',
      created_at: '2023-08-25 00:00:01',
      updated_at: '2023-08-25 00:00:01'
    }
    user.value = _user
    localStorage.setItem('user', JSON.stringify(_user))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, init, login, logout }
})
