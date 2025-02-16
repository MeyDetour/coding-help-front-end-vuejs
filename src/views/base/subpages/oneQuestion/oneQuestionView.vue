<script setup lang="ts">
import './style.css'
import './response.css'
import useApi from '@/composables/useApi.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Question } from '@/type/Question.ts'
import CustomImage from '@/components/CustomImage.vue'
import useSecurityWidget from '@/composables/useSecurityWidget.ts'
import ResultOfTextAreaMarkdown from '@/components/markdown/resultOfTextAreaMarkdown.vue'
import NewResponseView from '@/views/base/subpages/oneQuestion/newResponseView.vue'

const { api } = useApi()
const router = useRouter()
const security = useSecurityWidget()
const props = defineProps<{
  id: number
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()
console.log(props)

const question = ref<Question | null>(null)
const addResponse = ref(false)

if (props.id) {
  getQuestion()
} else {
  router.push('/private/themes')
}

const toggleWidget = function () {
  const widget = document.querySelector('.questionPage .widgetQuestionSettings')
  if (!widget) {
    return
  }
  if (widget.style.display === 'flex') {
    widget.style.display = 'none'
  } else {
    widget.style.display = 'flex'
  }
}
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
<template >
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
      <div style="position: relative; align-items: center; cursor: pointer">
        <img @click="toggleWidget" src="../../../../assets/icon/settings.svg" alt="icon settings" />
        <div class="widgetQuestionSettings">
          <RouterLink to="">Edit</RouterLink>
          <span @click="deleteQuestion">Delete</span>
        </div>
      </div>

      <img v-if="question.isValidate" src="../../../../assets/icon/good.svg" alt="icon true" />
      <img v-if="!question.isValidate" src="../../../../assets/icon/bad.svg" alt="icon false" />
    </div>
  </div>

  <div v-if="question && props.id" class="row">
    <div :class="`left ${ addResponse ? 'left-open' : ' '}`">
      <div class="authorSection">
        <custom-image :link="question.author.image"></custom-image>

        <span class="md-text">{{ question.author.username }}</span>
      </div>
      <div class="questionContent">
        <result-of-text-area-markdown
          classname=""
          :text="question.contentHTML"
        ></result-of-text-area-markdown>

        <template v-for="response in question.responses" :key="response.id">

        <div class="hr"></div>

          <details class="oneResponse" :id="response.id">
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
              </div>
            </summary>
            <div class="responseContent">
              {{ response.content }}
            </div>
          </details>


        </template>

        <div class="hr"></div>
        <button
          @click="addResponse = !addResponse"
          class="button2"
        >
          {{addResponse ?  'Close response' : 'New response'}}

        </button>
      </div>
    </div>

    <new-response-view v-if="question && props.id"
      :classname="`right ${addResponse ? 'd-flex' : 'd-none'}`"
      :id="question.id"
    ></new-response-view>
  </div>
</template>
