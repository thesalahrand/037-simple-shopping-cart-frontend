import { reactive, ref } from 'vue'
import router from '@/router'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const errors = reactive({
    login: ''
  })

  function init() {
    user.value = JSON.parse(localStorage.getItem('user')) || null
  }

  async function login(username) {
    try {
      const res = await fetch('/api/login.php', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ username })
      })
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.message)

      user.value = resData
      localStorage.setItem('user', JSON.stringify(resData))
      errors.login = ''
      router.push({ name: 'home' })
    } catch (err) {
      console.log(err)
      errors.login = err
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, errors, init, login, logout }
})
