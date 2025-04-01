<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import './app.css'
</script>

<template>
  <RouterView :key="$route.fullPath"></RouterView>
</template>
