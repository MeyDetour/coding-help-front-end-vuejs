<script setup lang="ts">
import CustomItle from '@/components/customItle.vue'
import './themes.css'
import useApi from '@/composables/useApi.ts'
import Row from '@/components/row.vue'
const { api } = useApi()

let themes = api('api/themes', {}, 'GET')
</script>
<template>
  <custom-itle backgroundWord="Top" main-word="Themes"></custom-itle>
  <div>
    <RouterLink to="" v-for="theme in themes" :key="theme.id">
        <row :name="theme.name" type="themes" :number1="theme.contributor_count"
             :number2="theme.questions_count"></row>
    </RouterLink>
  </div>
</template>
