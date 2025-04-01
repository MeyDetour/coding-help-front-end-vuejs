<script setup lang="ts">
import CustomTitle from '@/components/CustomTitle.vue'
import './style.css'
import { marked } from 'marked'
import { reactive, ref, watch } from 'vue'
import ContentTextAreaMarkdown from '@/components/markdown/contentTextAreaMarkdown.vue'
import ResultOfTextAreaMarkdown from '@/components/markdown/resultOfTextAreaMarkdown.vue'
import useApi from '@/composables/useApi.ts'
import type { Theme } from '@/type/Theme.ts'
import { useRouter } from 'vue-router'
import type { Question } from '@/type/Question.ts'

const { api } = useApi()
const router = useRouter()


let displayOwerview = ref(false)
let isMobile = ref(window.innerWidth < 700)

const newTheme = reactive({ name: ''})
const themes = ref<Theme[]>([])
const error = ref<null | string>(null)
const newQuestion = reactive({
  title: 'How do I work?',
  contentHTML: '',
  themes: [],
  content: `# Welcome to CodingHelp!
Here is an example of the Markdown you can write in your question:

[Example of link](https://youtu.be/xvFZjo5PgG0?si=I-iwvAlNFsjmxL3K) — you can just click on this link!

You can also add a code block like this:

~~~~python

def split_lines(s):
  split_lines('50 python snippets')
  return s.split

~~~~
  `,
})

async function getThemes() {
  const response = await api('api/themes', null, 'GET')

  if (response) {
    themes.value = (await response.json()) as Theme[]

    console.log(themes.value)
  }
}
getThemes()


const addBackslashN = function (content :string) {
  return content
    .replace(/\r?\n/g, '\\n') // Ajoute \n pour chaque saut de ligne
    .replace(/\\n\\n/g, '\\n\\n') // Préserve les doubles sauts de ligne
}

const onSubmit = async () => {

  // initialise data to send
  const finalData : {title:string,contentHTML:string,content:string,themes:number[]} = {
    title: newQuestion.title,
    contentHTML: '',
    content: '',
    themes: [],
  }

  // get theme added inexistant
  const newThemeName = newTheme.name.replace(/\s+/g, '')

  /* if no theme provided */
  if (!newThemeName && newQuestion.themes.length == 0) {
    error.value = 'You must associate to the theme'
    return
  }

  /* add themes ids to final data*/
  if (newQuestion.themes.length > 0) {
    const themesToAdd = <number[]>[]
    for (const themeId of newQuestion.themes) {
      themesToAdd.push(parseInt(themeId))
    }
    finalData.themes = themesToAdd
  }

  /* TO CREATE ONE THEME - IF NEEDED*/
  if (newThemeName !== '') {
    try {
      const res = await api('api/theme/new', { name: newThemeName }, 'POST')
      if (res) {
        const theme = await res.json() as Theme
        /* if theme is created add it to themes list */
        finalData.themes.push(theme.id)
      }
    } catch (err) {
      error.value = 'Error while creating theme : ' + err
    }
  }


  // format content : replace all br as \n
  const html :string = document.querySelector('.resultOFTextAreaMarkdown')?.innerHTML || ''
  let markdown : string = newQuestion.content
  if (!markdown) {
    console.log("no markdown")
    console.log(html)
    console.log(markdown)
    return
  }
  markdown = addBackslashN(markdown)
  finalData.content = markdown
  finalData.contentHTML = html



  try {
    const res = await api('api/question/new', finalData, 'POST')
    console.log(res)
    if (res) {
      const question = (await res.json()) as Question
      console.log(question)
      await router.push('/private/question/' + question.id)
    }
  } catch (err) {
    if (err instanceof Error) {
      if ('status' in err && err.status === 409) {
        error.value = 'A question with similar content already exists.'
      } else {
        error.value = 'Error while creating question: ' + (err.message || 'Unknown error')
      }
    } else {
      error.value = 'Error while creating question: Unexpected error occurred'
    }
  }
  }
</script>

<template>
  <div v-if="!isMobile || (isMobile && !displayOwerview)" class="left">
    <img
      class="overviewIcon"
      v-if="isMobile"
      @click="() => (displayOwerview = true)"
      src="../../../../assets/icon/eye.svg"
      alt=""
    />
    <form @submit.prevent="onSubmit" class="basicForm">
      <span v-if="error" class="error">{{ error }}</span>

      <label>
        Title
        <input type="text" name="title" v-model="newQuestion.title" />
      </label>

      <label>
        Content
        <content-text-area-markdown v-model="newQuestion.content"></content-text-area-markdown>
      </label>

      <fieldset>
        <legend>Choose themes</legend>
        <div v-for="theme of themes" :key="theme.id" class="oneChoice">
          <input
            type="checkbox"
            :id="theme.id.toString()"
            name="themes"
            :value="theme.id"
            v-model="newQuestion.themes"
          />

          <span>{{ theme.name }}</span>
        </div>
        <span v-if="themes.length === 0">No themes created</span>
      </fieldset>
      <label>
        Other theme
        <input type="text" name="newTheme" v-model="newTheme.name" />
      </label>

      <button type="submit" class="button1" value="Submit">Create</button>
    </form>
  </div>
  <!--  if question has content and title and themes request is sucess -->
  <!--   for mobile : if left is close -->
  <div
    class="right"
    v-if="
      (newQuestion.content || newQuestion.title !== '') &&
      (!isMobile || (isMobile && displayOwerview))
    "
  >
    <h3 v-if="newQuestion.title !== ''">{{ newQuestion.title }}</h3>
    <img
      v-if="isMobile"
      class="closeOverviewIcon"
      @click="() => (displayOwerview = false)"
      src="../../../../assets/icon/form.svg"
      alt=""
    />

    <result-of-text-area-markdown
      v-if="newQuestion.content"
      :text="newQuestion.content"
      classname=""
    ></result-of-text-area-markdown>
  </div>
</template>
