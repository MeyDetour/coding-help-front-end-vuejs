<script setup lang="ts">
import CustomTitle from '@/components/CustomTitle.vue'
import './style.css'
import useApi from '@/composables/useApi.ts'
import { ref } from 'vue'
import ListOfQuestions from '@/components/listOfQuestions.vue'
import type { Theme } from '@/type/Theme.ts'
import { useRouter } from 'vue-router'

const { api } = useApi()
const router = useRouter()
const props = defineProps<{
  id: number
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()
console.log(props.id)
const theme = ref<Theme | null>(null)
if (props.id) {
  getTheme()
} else {
  router.push('/private/themes')
}

async function getTheme() {
  const response = await api('api/theme/' + props.id, null, 'GET')

  theme.value = (await response.json()) as Theme
}
</script>
<template v-if="theme && props.id">
  <custom-title backgroundWord="Top" :mainWord="theme?.name"></custom-title>

  <div class="filAriane">
    <RouterLink to="/private/themes">Themes</RouterLink>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.1642 2.32947C10.342 2.24036 10.5479 2.22555 10.7367 2.28828C10.9254 2.35101 11.0815 2.48615 11.1707 2.66397L15.6707 11.664C15.7229 11.7683 15.7501 11.8833 15.7501 12C15.7501 12.1166 15.7229 12.2317 15.6707 12.336L11.1707 21.336C11.127 21.4248 11.0662 21.5041 10.9917 21.5693C10.9173 21.6346 10.8307 21.6844 10.7368 21.716C10.643 21.7475 10.5439 21.7602 10.4452 21.7533C10.3464 21.7464 10.25 21.72 10.1615 21.6757C10.0731 21.6313 9.99422 21.5699 9.92958 21.495C9.86494 21.42 9.81578 21.333 9.78492 21.2389C9.75407 21.1449 9.74214 21.0457 9.74982 20.947C9.7575 20.8483 9.78463 20.7521 9.82966 20.664L14.1602 12L9.82966 3.33597C9.74055 3.15814 9.72574 2.9522 9.78847 2.76345C9.8512 2.57469 9.98634 2.41859 10.1642 2.32947Z"
        fill="white"
      />
    </svg>

    <span>{{ theme?.name }}</span>
  </div>
  <list-of-questions
    questionShape="question"
    :change-route="changeRoute"
    v-if="theme?.questions"
    :listOfQuestions="theme?.questions"
  ></list-of-questions>
</template>
