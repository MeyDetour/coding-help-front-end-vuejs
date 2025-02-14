

export default function useApi() {
  async function api(url:string, body:object, method:'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET') {
    try {
      const baseUrl = "https://codinghelp.md-genos.com/"
      console.log(`lets use api for : ${baseUrl}${url}`)
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}${url}`, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      console.log(response)

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status} : ${response.statusText}`);

      return await response.json(); // Retourne les données

    } catch (error) {  console.error('Login error:', error);
      return null; // Retourne `null` en cas d'erreur

    }
  }
  return {api}
}
