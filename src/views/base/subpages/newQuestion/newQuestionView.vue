<script setup lang="ts">
import CustomTitle from '@/components/CustomTitle.vue'
import './style.css'
import { marked } from 'marked'
import { reactive, ref } from 'vue'
import ContentTextAreaMarkdown from '@/components/markdown/contentTextAreaMarkdown.vue'
import ResultOfTextAreaMarkdown from '@/components/markdown/resultOfTextAreaMarkdown.vue'
import useApi from '@/composables/useApi.ts'
import type { Theme } from '@/type/Theme.ts'
import { useRouter } from 'vue-router'

const { api } = useApi()
const router = useRouter()
const error = ref<null | string>(null)
const newQuestion = reactive({
  title: 'How do I work?',
  contentHTML: '',
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
  themes: [],
})
const newTheme = reactive({
  name: '',
})
const themes = ref<Theme[]>([])
let displayOwerview = ref(false)
let isMobile = ref(window.innerWidth < 700)



getThemes()

async function getThemes() {
  const response = await api('api/themes', null, 'GET')
  if (response) {
    themes.value = (await response.json()) as Theme[]
    console.log(themes.value)
  }
}

const addBackslashN = function (content) {
  return content
    .replace(/\r?\n/g, '\\n') // Ajoute \n pour chaque saut de ligne
    .replace(/\\n\\n/g, '\\n\\n') // Préserve les doubles sauts de ligne
}

const onSubmit = async () => {
  console.log(newQuestion)
  console.log(newTheme)
  let finalData ={
    'title': newQuestion.title,
    'contentHTML': '',
    'content': '',
    'themes': [],
  }
  let newThemeName = newTheme.name.replace(/\s+/g, '')


  /* if no theme provided */
  if (!newThemeName && newQuestion.themes.length == 0) {
    error.value = 'You must associate to the theme'
    return
  }

  /* get theme id as int not string*/
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
      let res = await api('api/theme/new', { name: newThemeName } ,'POST')
      if (res){
        res = await res.json()

        finalData.themes.push( res.id )

      }

    } catch (err) {
     error.value ='Error while creating theme : ' + err
    }
  }

  /* if theme is found add it to themes list */


  //replace all br as \n
  let html = document.querySelector('.resultOFTextAreaMarkdown')?.innerHTML || ''
  let markdown = document.querySelector('.contentTextAreaMarkdown textarea')?.value || ''
  markdown = addBackslashN(markdown)

  finalData.content = markdown
  finalData.contentHTML = html

    console.log(finalData)

  try {
    let res = await api('api/question/new', finalData, 'POST')
    console.log(res)
    if(res){

      res = await res.json()
      console.log(res)
      return  router.push('/private/question/' + res.id)
    }
  } catch (err) {
    if (err instanceof Error) {
      // Vérifie si l'erreur est un objet de type `Response` (provenant du fetch)
      if ('status' in err && err.status === 409) {
        error.value = "A question with similar content already exists.";
      } else {
        error.value = 'Error while creating question: ' + (err.message || 'Unknown error');
      }
    } else {
      error.value = 'Error while creating question: Unexpected error occurred';
    }}
  console.log('===========================================================')
}

</script>

<template>
  <div v-if="themes.length > 0 && (!isMobile ||  (isMobile && !displayOwerview) )" class="left">
    <img class="overviewIcon" @click="()=>displayOwerview=true" src="../../../../assets/icon/eye.svg" alt="">
    <form @submit.prevent="onSubmit" class="basicForm">
      <span v-if="error" class="error">{{ error }}</span>

      <label>
        Title
        <input type="text" name="title" v-model="newQuestion.title" />
      </label>

      <label>
        Content
        <content-text-area-markdown
          v-model="newQuestion.content"
        ></content-text-area-markdown>
      </label>

      <fieldset>
        <legend>Choose themes</legend>
        <div v-for="theme of themes" :key="theme.id" class="oneChoice">
          <input
            type="checkbox"
            :id="theme.id"
            name="themes"
            :value="theme.id"
            v-model="newQuestion.themes"
          />

          <span>{{ theme.name }}</span>
        </div>
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
  <div class="right" v-if="(newQuestion.content || (newQuestion.title !== ''  ))&& themes.length > 0 && (!isMobile ||  (isMobile && displayOwerview) )">

    <h3 v-if="newQuestion.title !== ''">{{newQuestion.title}}</h3>
    <img class="closeOverviewIcon" @click="()=>displayOwerview=false" src="../../../../assets/icon/form.svg" alt="">

    <result-of-text-area-markdown
      v-if="newQuestion.content"
      :text="newQuestion.content"
      classname=""
    ></result-of-text-area-markdown>
  </div>
</template>
