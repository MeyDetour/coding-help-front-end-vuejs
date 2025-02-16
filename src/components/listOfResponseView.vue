<script setup lang="ts">

defineProps<{
  listOfResponse: [];
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void;
}>();
</script>

<template>
  <div class="listOfResponsesInProfile">
    <RouterLink v-for="response of listOfResponse" :key="response.id" to="" @click="changeRoute('/private/question'+response.questionId,'question',response.questionId)" }>
      <div>
        <div class="decoration"></div>
        <span>{{ item.question_data.title }}</span>
      </div>
      <div>
        <span class="xsm-text">{{ item.created_at }}</span>

        <div>
          <span class="sm-text">{{ item.upvote_count }}</span>
          <img src="../assets/icon/good.svg" alt="icon true"/>
        </div>
        <div>
          <span class="sm-text">{{ item.downvote_count }}</span>
          <img src="../assets/icon/bad.svg" alt="icon false"/>
        </div>
      </div>
    </RouterLink>

  </div>
</template>
