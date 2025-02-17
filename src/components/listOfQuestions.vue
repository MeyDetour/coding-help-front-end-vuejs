<script setup lang="ts">
import Row from '@/components/row.vue'
import type { Question } from '@/type/Question.ts'

defineProps<{
  listOfQuestions: Question[];
  questionShape :string;
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void;
}>();

</script>

<template>
  <div class="questionsList">
    <RouterLink
      @click =" changeRoute('/private/question/'+ question.id,'question',question.id)"
      v-for="question of listOfQuestions"
      :key="question.id"
      to=""
    >
      <Row v-if="question.themes"
        :name="question.title"
        :type="questionShape"
        :number1="question.contributor_count"
        :number2="question.responses_count"
        :isQuestionValidate="question.isValidate"
        :themes="question.themes"
        :changeRoute = "changeRoute"
      ></Row>
    </RouterLink>
  </div>
</template>

<style scoped></style>
