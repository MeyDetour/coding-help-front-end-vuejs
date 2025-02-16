<script setup lang="ts">
defineProps({
  link: String,
})
const baseUrl = "https://codinghelp.md-genos.com/"
</script>

<template>
  <img :src="link ? baseUrl +link : '../../src/assets/defaultImage.png'" alt=""/>
</template>

<style scoped>

</style>
