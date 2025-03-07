<script setup lang="ts">
import './style.css'
import './response.css'
import useApi from '@/composables/useApi.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Question } from '@/type/Question.ts'
import CustomImage from '@/components/CustomImage.vue'
import ResultOfTextAreaMarkdown from '@/components/markdown/resultOfTextAreaMarkdown.vue'
import NewResponseView from '@/views/base/subpages/oneQuestion/newResponseView.vue'
import type { User } from '@/type/User.ts'
import { useSecurity } from '@/stores/securityStore.ts'

const { api } = useApi()
const router = useRouter()
const security = useSecurity()
const props = defineProps<{
  id: number
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()

//  GET PROFILE
const ownId = ref<User>()
const getProfile = async () => {
  try {
    const res = await api('api/profile', null, 'GET')
    const json = await res.json()

    console.log(json)
    ownId.value = json.id
  } catch (err) {
    console.error(err)
  }
}
getProfile()

// INITILISATION OF VARIABLES
const question = ref<Question | null>(null)
const addResponse = ref(false)
const displayWidgetForQuestion = ref(false)
const displayWidgetForResponseId = ref(0)
if (props.id) {
  getQuestion()
} else {
  router.push('/private/themes')
}

// To add new question
const isMobile = ref(window.innerWidth <= 700)
const deleteQuestion = function () {
  if (!props.id) {
    return
  }
  security(
    'Do you really want to delete this question ? ',
    '/private/question/' + props.id,
    'api/question/' + props.id,
  )
}

async function getQuestion() {
  const response = await api('api/question/' + props.id, null, 'GET')
  question.value = (await response.json()) as Question
  console.log(question.value)
}
</script>
<template>
  <!--     HEADER    -->
  <div v-if="question && props.id" class="titleHeader">
    <span class="md-bold-text">{{ question.title }}</span>
    <div>
      <span class="xsm-text">{{ question.created_at }}</span>
      <div>
        <img src="../../../../assets/icon/people.svg" alt="icon contributor" />
        <span class="sm-text">{{ question.contributor_count }}</span>
      </div>
      <div>
        <img src="../../../../assets/icon/clue.svg" alt="icon contributor" />
        <span class="sm-text">{{ question.responses.length }}</span>
      </div>
      <img v-if="question.isValidate" src="../../../../assets/icon/good.svg" alt="icon true" />
      <img v-if="!question.isValidate" src="../../../../assets/icon/bad.svg" alt="icon false" />

      <!--   TO EDIT AND DELETE QUESTION IF YOUR OWNER    -->
      <div style="position: relative; align-items: center; cursor: pointer" v-if="ownId==question.author" >

        <img @click="()=>{displayWidgetForQuestion = !displayWidgetForQuestion}" src="../../../../assets/icon/settings.svg" alt="icon settings" />
        <div v-if="displayWidgetForQuestion" class="widgetQuestionSettings" >
          <RouterLink to="">Edit</RouterLink>
          <span @click="deleteQuestion">Delete</span>
        </div>
      </div>

     </div>
  </div>

  <div v-if="question && props.id" class="row">


    <!--     QUESTION      -->
    <div v-if="!isMobile || (isMobile && addResponse)" :class="`left ${addResponse ? 'left-open' : ' '}`">
      <!--   Author   -->
      <div class="authorSection">
        <custom-image :link="question.author.image"></custom-image>
        <span class="md-text">{{ question.author.username }}</span>
      </div>


      <div class="questionContent">

        <!--    QUESTION CONTENT    -->
        <result-of-text-area-markdown
          classname=""
          :text="question.contentHTML"
        ></result-of-text-area-markdown>

        <!--    LIST OF RESPONSE    -->
        <template v-for="response in question.responses" :key="response.id">
          <div class="hr"></div>

          <!--    One response     -->
          <details class="oneResponse"  >
            <summary>
              <div>
                <CustomImage :link="response.author_data.image"></CustomImage>
                <span>{{ response.author_data.username }}</span>
              </div>

              <div>
                <span class="xsm-text">{{ response.created_at }}</span>

                <div>
                  <span class="sm-text">{{ response.upvote_count }}</span>
                  <img src="../../../../assets/icon/good.svg" alt="icon true" />
                </div>
                <div>
                  <span class="sm-text">{{ response.downvote_count }}</span>
                  <img src="../../../../assets/icon/bad.svg" alt="icon false" />
                </div>
                <div

                  style="position: relative; align-items: center; cursor: pointer"
                >
                  <img
                    @click="()=>{
                      if(displayWidgetForResponseId == response.id){
                        displayWidgetForResponseId = 0
                      }else{
                      displayWidgetForResponseId = response.id
                      }
                    }"
                    src="../../../../assets/icon/settings.svg"
                    alt="icon settings"
                  />
                  <div v-if="displayWidgetForResponseId == response.id" class="widgetQuestionSettings">
                    <span @click="security.showWidget('Do you really want to delete you question ?','/private/question/'+question.id,'api/response/'+response.id,'DELETE',null)">Delete</span>
                  </div>
                </div>
              </div>
            </summary>
            <div class="responseContent">
              {{ response.content }}
            </div>
          </details>
          <!--     END OF ONE RESPONSES     -->


        </template>
        <!--     END OF LIST OF RESPONSES     -->

        <div class="hr"></div>
        <button @click="addResponse = !addResponse" class="button2">
          {{ addResponse ? 'Close response' : 'New response' }}
        </button>
      </div>
    </div>
    <!--     END OF QUESTION      -->


    <!--        NEW RESPONSE      -->
    <new-response-view
      v-if="question && props.id"
      :classname="`right ${addResponse ? 'd-flex' : 'd-none'}`"
      :id="question.id"
    ></new-response-view>
    <!--     END OF NEW RESPONSE  -->
  </div>
</template>
