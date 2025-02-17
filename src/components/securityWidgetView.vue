<script setup lang="ts">
import { useRouter } from 'vue-router'
import useApi from '@/composables/useApi.ts'
import { useSecurity } from '@/stores/securityStore.ts'

const router = useRouter()
const { api } = useApi()
const security=  useSecurity()

const props = defineProps<{
  link: string
  originLink: string
  body: object|null
  methode: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  message:string
}>()



const accept = async function () {
  await api(props.link, props.body, props.methode)
  security.hideWidget()
  return router.push('/private/dashboard')
}
const cancel = function () {
  security.hideWidget()
  return router.push(props.originLink)
}
</script>
<template>
  <div id="securityWidgetContainer">
    <div class="securityWidget">
      <span>{{message}}</span>
      <div>
        <button @click="cancel" class="button0">Cancel</button>
        <button @click="accept" class="button1">Yes</button>
      </div>
    </div>
  </div>

</template>
