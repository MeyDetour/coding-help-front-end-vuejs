import { ref } from 'vue'
import useApi from '@/composables/useApi.ts'
import { useRouter } from 'vue-router'

export default function useAuth() {
  const { api } = useApi()
  const user = ref(null)
  const router = useRouter()

  async function login(userData: { email: string; password: string }) {
    console.log("let's login ")
    const response = await api('login', userData, 'POST')
    if (response) {
      localStorage.setItem('token', response.access)
      router.push('/dashboard')
    }
  }

  return { login }
}
