import { ref } from 'vue'
import useApi from '@/composables/useApi.ts'
import { useRouter } from 'vue-router'

export default function useAuth() {
  const { api } = useApi()
  const user = ref(null)
  const router = useRouter()

  async function login(userData: { email: string; password: string }) {
    console.log("let's login ")
    try {
      let response = await api('login', userData, 'POST')
      response = await response.json()
      console.log(response)
      if (response.access) {
        console.log('get access')
        localStorage.setItem('token', response.access)
        await router.push('/private/dashboard')
        return {}
      }
    } catch (e) {
      return { error: e.message }
    }
  }

  async function register(userData: { email: string; password: string; username: string }) {
    console.log("let's register ")
    try {
      let response = await api('register', userData, 'POST')
      response = await response.json()
      console.log(response)
      if (response.message === "ok") {
        await router.push('/login')
        return {}
      }
    } catch (e) {
      return { error: e.message }
    }
  }

  async function logout() {
    localStorage.removeItem('token')
    await router.push('/')
  }

  return { login, logout, register }
}
