import { useRouter } from 'vue-router'


export default function useApi() {

  const router = useRouter();
  async function api(url:string, bodyContent:object|null, method:'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET') {
    try {
      const baseUrl = "https://codinghelp.md-genos.com/"
      console.log(`lets use api for : ${baseUrl}${url} with methode ${method} and body ${bodyContent}`)
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}${url}`, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
       ...( bodyContent ? {  body: JSON.stringify(bodyContent)  } : {})
      })

      if (response.status === 401) {
        router.push('/login')
      }
      if (!response.ok) {
        console.log("response pas ok ")
        const errorData = await response.json().catch(() => ({}));
        throw Object.assign(new Error(errorData.message || response.statusText), { status: response.status });

      }

      return   response

    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(error);
    }
  }
  return {api}
}
