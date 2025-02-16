<script setup lang="ts">
import './style.css'
import useApi from '@/composables/useApi.ts'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useSecurityWidget from '@/composables/useSecurityWidget.ts'
import ContentTextAreaMarkdown from '@/components/markdown/contentTextAreaMarkdown.vue'

const { api } = useApi()
const router = useRouter()
const security = useSecurityWidget()
const props = defineProps<{
  classname: string;
  id: number;
}>()

const error = ref()
const response = reactive({
  content: '',
  question: 0,
})



const toggleWidget = function() {
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
const deleteQuestion = function() {
  if (!props.id) {
    return
  }
  security('Do you really want to delete this question ? ', '/private/question/' + props.id, 'api/question/' + props.id)
}

const onSubmit = async () => {
  response.value.question = props.id
  try {
    const res3 = await api('api/response/new', response.value, 'POST')

  } catch (err) {
    console.log(err)
  }
}

</script>
<template>
  <div
    :class="props.classname"
  >
    <form action="" @submit.prevent="onSubmit" class="basicForm">

      <span v-if="error" class="error">{{error}}</span>

      <label>
        Your response
        <content-text-area-markdown register={register}></content-text-area-markdown>
        <button type="submit" class="button1" value="Submit">Create</button>

      </label>
    </form>


  </div>
</template>
