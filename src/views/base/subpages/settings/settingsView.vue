<script setup lang="ts">
import CustomTitle from '@/components/CustomTitle.vue'
import './dashboard.css'

const props = defineProps<{
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()
</script>


<template>
 <custom-title backgroundWord="Top" main-word="Dashboard"></custom-title>
</template>
