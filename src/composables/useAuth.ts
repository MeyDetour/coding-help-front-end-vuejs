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
      const response = await api('login', userData, 'POST')
      const jsonResponse = (await response.json()) as { access?: string; refresh?: string }
      if (jsonResponse.access) {
        localStorage.setItem('token', jsonResponse.access)
        await router.push('/private/dashboard')
        return {}
      }
    } catch (e) {
      return { error: (e as Error).message }
    }
  }

  async function register(userData: { email: string; password: string; username: string }) {
    console.log("let's register ")
    try {
      const response = await api('register', userData, 'POST')
      const jsonResponse = (await response.json()) as { message?: string }
      console.log(response)
      if (jsonResponse.message === 'ok') {
        await router.push('/login')
        return {}
      }
    } catch (e) {
      return { error: (e as Error).message }
    }
  }

  async function logout() {
    localStorage.removeItem('token')
    await router.push('/')
  }

  return { login, logout, register }
}
