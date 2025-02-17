<script setup lang="ts">
import type { Theme } from '@/type/Theme.ts'

const props = defineProps<{
  name: string
  number1: number
  number2: number
  type: string
  isQuestionValidate: boolean
  themes: Array<Theme>
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()
</script>

<template>
  <div class="rowForList">
    <div v-if="type == 'questionInProfile'">
      <template v-for="theme of themes" :key="theme.id">
        <span @click="changeRoute('private/theme/'+theme.id,'theme',theme.id)" class="badge">{{ theme.name }}</span>
      </template>
      <span> > </span>
      <span>{{ props.name }}</span>
    </div>
    <span v-if="type !== 'questionInProfile'">{{ props.name }}</span>
    <div class="icons">
      <div>
        <img src="../assets/icon/people.svg" alt="contributor icon" />
        <span>{{ props.number1 }}</span>
      </div>

      <div>
        <img v-if="type == 'themes'" src="../assets/icon/question.svg" alt="question icon" />
        <img v-if="type == 'question'" src="../assets/icon/clue.svg" alt="question responses" />
        <span>{{ props.number2 }}</span>
      </div>

      <img v-if="isQuestionValidate" src="../assets/icon/good.svg" alt="icon true" />
      <img v-if="!isQuestionValidate" src="../assets/icon/bad.svg" alt="icon false" />
    </div>
  </div>
</template>

<style scoped></style>
