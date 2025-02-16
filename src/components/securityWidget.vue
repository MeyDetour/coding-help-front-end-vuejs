<script setup lang="ts">
import { useRouter } from 'vue-router'
import useApi from '@/composables/useApi.ts'

const router = useRouter()
const { api } = useApi()

const props = defineProps<{
  requestLink: string
  originLink: string
  message:string
}>()

const removeWidget = function () {
  const existingWidget = document.querySelector('#securityWidgetContainer')
  if (existingWidget) {
    const app = existingWidget.__vue_app__; // Récupère l'instance Vue
    if (app) {
      app.unmount(); // Démonte proprement l'application Vue
    }
    existingWidget.remove() // Supprime l'élément DOM
  }
}

const accept = async function () {
  await api(props.requestLink, null, 'DELETE')
  removeWidget()
  return router.push('/private/dashboard')
}
const cancel = function () {
  removeWidget()
  return router.push(props.originLink)
}
</script>
<template>
  <div class="securityWidget">
    <span>{{message}}</span>
    <div>
      <button @click="cancel" class="button0">Cancel</button>
      <button @click="accept" class="button1">Yes</button>
    </div>
  </div>
</template>
