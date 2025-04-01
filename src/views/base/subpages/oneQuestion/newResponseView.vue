<script setup lang="ts">
import './style.css'
import useApi from '@/composables/useApi.ts'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import ContentTextAreaMarkdown from '@/components/markdown/contentTextAreaMarkdown.vue'
import ResultOfTextAreaMarkdown from '@/components/markdown/resultOfTextAreaMarkdown.vue'
import type { Question } from '@/type/Question.ts'

const { api } = useApi()
const router = useRouter()
const props = defineProps<{
  classname: string
  id: number
  changeAddResponse:()=>void
}>()

const error = ref()
const response = reactive({
  content: `
## Please respond to this question with precision.

To provide a thorough answer, make sure to address all aspects of the question clearly.

- Include any relevant code snippets** to illustrate your point, if applicable.
- Structure your response** in a logical way, breaking it down into sections if necessary for better clarity.
- Feel free to add **examples** or **explanations** to make your answer more comprehensive.

Thank you for your detailed response!
`,
  question: 0,
})

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

const onSubmit = async () => {
  response.question = props.id
  response.contentHTML = document.querySelector('.resultOFTextAreaMarkdown')?.innerHTML || ''

  try {
    console.log(response)

    const res3 = await api('api/response/new', response, 'POST')
    console.log(await res3.json())
    props.changeAddResponse()
  } catch (err) {
    console.log(err)
  }
}
</script>
<template>
  <div :class="props.classname">
    <form action="" @submit.prevent="onSubmit" class="basicForm">
      <span v-if="error" class="error">{{ error }}</span>

      <label>
        Your response
        <content-text-area-markdown v-model="response.content"></content-text-area-markdown>
      </label>
      <span>How it will appear : </span>
      <ResultOfTextAreaMarkdown classname="" :text="response.content"></ResultOfTextAreaMarkdown>

      <button type="submit" class="button1" value="Submit">Create</button>
    </form>
  </div>
</template>
