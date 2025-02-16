<script setup lang="ts">
import './themes.css'
import useApi from '@/composables/useApi.ts'
import Row from '@/components/row.vue'
import {ref} from "vue"
import CustomTitle from '@/components/CustomTitle.vue'
import type { Theme } from '@/type/Theme.ts'
const { api } = useApi()

const themes = ref<Theme[]>([])
const props = defineProps<{
  changeRoute: (routePath: string, subpageName: string, idNumber: number|null) => void
}>()

getThemes()

async function getThemes(){
  const response = await api('api/themes', null, 'GET')
  console.log(response)
  themes.value = await response.json() as Theme[]
}

</script>
<template>
  <custom-title backgroundWord="Top" main-word="Themes"></custom-title>
  <div>
    <RouterLink @click="props.changeRoute('/private/theme/'+theme.id,'theme',theme.id)" to=""   v-for="theme in themes" :key="theme.id">
        <row :name="theme.name" type="themes" :number1="theme.contributor_count"
             :number2="theme.questions_count"></row>
    </RouterLink>
  </div>
</template>
