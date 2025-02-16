<script setup lang="ts">
import useApi from '@/composables/useApi.ts'
import { ref, watch } from 'vue'
import ListOfQuestions from '@/components/listOfQuestions.vue'
import type { Question } from '@/type/Question.ts'
import ListOfUsersView from '@/components/listOfUsersView.vue'
import ListOfResponseView from '@/components/listOfResponseView.vue'



const props = defineProps<{
  profile : object,
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()

let subpageOdProfile = ref('questions')
const { api } = useApi()
let data = ref()
watch(subpageOdProfile, changeSubpage(subpageOdProfile))
changeSubpage(subpageOdProfile)


const changeSubpage = async function (subpageOdProfile) {
  try {
    data.value = []
    const res = await api('api/profile/' + subpageOdProfile, null, 'GET')
    data.value = await res.json()
    subpageOdProfile.value = subpageOdProfile
  } catch (err) {
    console.log('Error while fetching profile data : ' + err.message)
  }
}
</script>

<template>
  <div class="section2"  >
    <ul>
      <li @click="changeSubpage('questions')">
        <span :class="`md-text  ${subpageOdProfile === 'questions' ? 'focus' : ' '}`">Questions</span>
        <span class="lg-text">{{profile.questions_count}}</span>
      </li>
      <li @click="changeSubpage('followings')">
        <span :class="`md-text ${subpageOdProfile === 'followings' ? 'focus' : ' '}`">Followings</span>
        <span class="lg-text">{{ profile.followings_count }}</span>
      </li>
      <li @click="changeSubpage('followers')">
        <span :class="`md-text ${subpageOdProfile === 'followers' ? 'focus' : ' '}`">Followers</span>
        <span class="lg-text">{{ profile.followers_count }}</span>
      </li>
      <li @click="changeSubpage('responses')">
        <span :class="`md-text ${subpageOdProfile === 'responses' ? 'focus' : ' '} `">Responses</span>
        <span class="lg-text">{{ profile.responses_count }}</span>
      </li>
    </ul>

    <list-of-questions v-if="subpageOdProfile =='questions' " :change-route="changeRoute" :listOfQuestions="data as Question[]"></list-of-questions>

    <list-of-users-view  v-if="subpageOdProfile =='followings' "  :change-route="changeRoute"  :listOfUsersData="data"></list-of-users-view>

    <list-of-users-view   v-if="subpageOdProfile =='followers'"  :change-route="changeRoute"  :listOfUsersData="data"></list-of-users-view>

    <list-of-response-view  v-if="subpageOdProfile =='responses'"  :change-route="changeRoute"  :list-of-response="data"></list-of-response-view>

  </div>
</template>
