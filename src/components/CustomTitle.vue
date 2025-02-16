<script setup lang="ts">
defineProps({
  backgroundWord: String,
  mainWord: String,
})
</script>

<template>
  <div class="customTitle">
    <h1>{{backgroundWord}}</h1>
    <h2>{{mainWord}}</h2>
  </div>
</template>

<style scoped>

</style>
