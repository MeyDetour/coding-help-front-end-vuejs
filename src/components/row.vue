<script setup lang="ts">
defineProps({
  name: String,
  number1: Number,
  number2: Number,
  type: String,
  isQuestionValidate : Boolean,
})
</script>

<template>
    <div class="rowForList">
  <span>{{name}}}</span>
  <div class="icons">
    <div>
      <img src="../assets/icon/people.svg" alt="contributor icon"/>
      <span>{{number1}}</span>
    </div>

    <div>
      <img v-if="type=='themes'" src="../assets/icon/question.svg" alt="question icon"/>}
      <img v-if="type=='question'" src="../assets/icon/clue.svg" alt="question responses"/>}
      <span>{{number2}}</span>
    </div>

    <img v-if="isQuestionValidate" src="../assets/icon/good.svg" alt="icon true"/>
    <img v-if="!isQuestionValidate" src="../assets/icon/bad.svg" alt="icon false"/>

  </div>

  </div>
</template>

<style scoped>

</style>
