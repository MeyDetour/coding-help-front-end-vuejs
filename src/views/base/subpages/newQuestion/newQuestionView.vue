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
return s.split
split_lines('50 python snippets')

~~~~
  `,
  themes: [],
})
const newTheme = reactive({
  name: '',
})
const themes = ref<Theme[]>([])


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

const getMarkdownHTML = (content) => {
  let codeBlock = [...content.matchAll(/~~~~(\w+)?\s([\s\S]*?)~~~~/g)]

  codeBlock.forEach((matchedTitle) => {
    content = content.replace(
      matchedTitle[0],
      `<pre class="resultOFTextAreaMarkdown_pre language-${matchedTitle[1]}" ><span class="language">${matchedTitle[1]}</span> <code>${matchedTitle[2]}</code></pre>`,
    )
  })

  let preBlocks = [
    ...content.matchAll(/<pre class="resultOFTextAreaMarkdown_pre.*?">([\s\S]*?)<\/pre>/g),
  ]
  preBlocks.forEach((block, index) => {
    content = content.replace(block[0], `{{PRE_BLOCK_${index}}}`)
  })

  let html = marked(content)
  let titles1 = [...html.matchAll(/#\s+([^\n]+)/g)]
  titles1.forEach((matchedTitle) => {
    html = html.replace(matchedTitle[0], `<h1>${matchedTitle[1]}</h1>`)
  })
  let titles2 = [...html.matchAll(/##\s+([^\n]+)/g)]
  titles2.forEach((matchedTitle) => {
    html = html.replace(matchedTitle[0], `<h2>${matchedTitle[1]}</h2>`)
  })
  let titles3 = [...html.matchAll(/###\s+([^\n]+)/g)]
  titles3.forEach((matchedTitle) => {
    html = html.replace(matchedTitle[0], `<h3>${matchedTitle[1]}</h3>`)
  })
  preBlocks.forEach((block, index) => {
    html = html.replace(`{{PRE_BLOCK_${index}}}`, block[0])
  })

  return html
}
</script>

<template>
  <div v-if="themes.length > 0" class="left">
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
          :valueText="`# Welcome to CodingHelp!

          Here is an example of the Markdown you can write in your question:

          [Example of link](https://youtu.be/xvFZjo5PgG0?si=I-iwvAlNFsjmxL3K) — you can just click on this link!

        You can also add a code block like this:

        ~~~~python

        def split_lines(s):
        return s.split
        split_lines('50 python snippets')

        ~~~~
        `"
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

          <span :for="theme.id">{{ theme.name }}</span>
        </div>
      </fieldset>
      <label>
        Other theme
        <input type="text" name="newTheme" v-model="newTheme.name" />
      </label>

      <button type="submit" class="button1" value="Submit">Create</button>
    </form>
  </div>
  <div class="right" v-if="(newQuestion.content || (newQuestion.title !== ''  ) && themes.length > 0)">
    <h3 v-if="newQuestion.title !== ''">{{newQuestion.title}}</h3>

    <result-of-text-area-markdown
      v-if="newQuestion.content"
      :text="getMarkdownHTML(newQuestion.content)"
      classname=""
    ></result-of-text-area-markdown>
  </div>
</template>
