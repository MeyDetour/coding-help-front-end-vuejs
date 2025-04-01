<script setup lang="ts">
import type { ApiResponse } from '@/type/ApiResponse.ts'


defineProps<{
  listOfResponse: ApiResponse[]
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()
</script>

<template>
  <div class="listOfResponsesInProfile">
    <RouterLink
      v-for="response of listOfResponse"
      :key="response.id"
      to=""
      @click="changeRoute('/private/question' + response.question, 'question', response.question)"
    >
      <div v-if="response.question_data">
        <div class="decoration"></div>
        <span>{{ response?.question_data.title }}</span>
      </div>
      <div>
        <span class="xsm-text">{{ response.created_at }}</span>

        <div>
          <span class="sm-text">{{ response.upvote_count }}</span>
          <img src="../assets/icon/good.svg" alt="icon true" />
        </div>
        <div>
          <span class="sm-text">{{ response.downvote_count }}</span>
          <img src="../assets/icon/bad.svg" alt="icon false" />
        </div>
      </div>
    </RouterLink>
  </div>
</template>
