<script setup lang="ts">
import useApi from '@/composables/useApi.ts'
import { ref, watch } from 'vue'
import ListOfQuestions from '@/components/listOfQuestions.vue'
import type { Question } from '@/type/Question.ts'
import ListOfUsersView from '@/components/listOfUsersView.vue'
import ListOfResponseView from '@/components/listOfResponseView.vue'
import type { User } from '@/type/User.ts'
import type { ApiResponse } from '@/type/ApiResponse.ts'



const props = defineProps<{
  profile : User,
  type : string, // "ownUser" for own user or  "otherUser"
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()
const { api } = useApi()

const data = ref<Question[] | User[] | ApiResponse[]>([])
let subpageOfProfile = ref('questions')


const changeSubpage = async function (subpage: string) {
  try {
    console.log("charge data for ",subpage)
    data.value = []
    let res;
    if (props.type=="otherUser") {
       res = await api('api/user/'+props.profile.id+'/' + subpage, null, 'GET')
    } else{
       res = await api('api/profile/' + subpage, null, 'GET')
    }
    data.value = await res.json()

    subpageOfProfile.value = subpage
    console.log(data.value)
  } catch (err) {
    console.log('Error while fetching profile data : ' + err)
  }
}

changeSubpage(subpageOfProfile.value)
</script>

<template>
  <div class="profileSectionDetails"  >
    <ul>
      <li @click="changeSubpage('questions')">
        <span :class="`md-text  ${subpageOfProfile === 'questions' ? 'focus' : ' '}`">Questions</span>
        <span class="lg-text">{{profile.questions_count}}</span>
      </li>
      <li @click="changeSubpage('followings')">
        <span :class="`md-text ${subpageOfProfile === 'followings' ? 'focus' : ' '}`">Followings</span>
        <span class="lg-text">{{ profile.followings_count }}</span>
      </li>
      <li @click="changeSubpage('followers')">
        <span :class="`md-text ${subpageOfProfile === 'followers' ? 'focus' : ' '}`">Followers</span>
        <span class="lg-text">{{ profile.followers_count }}</span>
      </li>
      <li @click="changeSubpage('responses')">
        <span :class="`md-text ${subpageOfProfile === 'responses' ? 'focus' : ' '} `">Responses</span>
        <span class="lg-text">{{ profile.responses_count }}</span>
      </li>
    </ul>

    <list-of-questions v-if="subpageOfProfile =='questions'   && data" :change-route="changeRoute" questionShape="questionInProfile" :listOfQuestions="data as Question[]"></list-of-questions>

    <list-of-users-view  v-if="subpageOfProfile =='followings'  && data "  :change-route="changeRoute" :own-id="profile.id"  :listOfUsersData="data as User[]" user-type="followings" ></list-of-users-view>

    <list-of-users-view   v-if="subpageOfProfile =='followers'  && data "  :change-route="changeRoute" :own-id="profile.id" :listOfUsersData="data as User[]" user-type="followers"></list-of-users-view>

    <list-of-response-view  v-if="subpageOfProfile =='responses'  && data"  :change-route="changeRoute"  :listOfResponse="data as ApiResponse[] "></list-of-response-view>

  </div>
</template>
