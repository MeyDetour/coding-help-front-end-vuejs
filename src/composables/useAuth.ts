import { ref } from 'vue'
import useApi from '@/composables/useApi.ts'
import { useRouter } from 'vue-router'

export default function useAuth() {
  const { api } = useApi()
  const user = ref(null)
  const router = useRouter()

  async function login(userData: { email: string; password: string }) {
    console.log("let's login ")
    let response = await api('login', userData, 'POST')
    response = await response.json()
    if (response) {
      localStorage.setItem('token', response.access)
      await router.push('/private/dashboard')
    }
  }

  async function register(userData: { email: string; password: string , username : string }) {
    console.log("let's register ")
    let response = await api('register', userData, 'POST')
    response = await response.json()
    if (response) {
      localStorage.setItem('token', response.access)
      await router.push('/private/dashboard')
    }
  }
  async function logout() {
   localStorage.removeItem("token")
  }

  return { login,logout,register }
}
