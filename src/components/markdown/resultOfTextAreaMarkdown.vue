<script setup lang="ts">

import { nextTick, watch } from 'vue'
import "./contentTextAreaMarkdown.css"
import { marked } from 'marked'

console.log("renderResult of markdown")
const props = defineProps<{
classname:string,
  text:string
}>()
    /*  MARKDOWN
    *
    *   to italic we had _italic text_
    *   to bold we use ** bold text **
    *   for link [text representation](link)
    *   for code ` code here `
    *   h1 : #
    *   h2 : ##
    *   h3 : ###
    *
    * */


function addLanguageColor(content:string) {
    const language = {
      class: "green",
      return: "purple",
      print: "purple",
      if: "orange",
      def: "orange",
      else: "orange",
      elif: "orange",
      for: "red",
      while: "red",
      break: "darkred",
      continue: "darkred",
      import: "teal",
      from: "teal",
      as: "teal",
      try: "gold",
      except: "gold",
      finally: "gold",
      with: "brown",
      lambda: "pink"
    }
    Object.entries(language).forEach(([key, color]) => {
      const regex = new RegExp(`\\b${key}\\b(\\s|:|\\()`, 'g');
      content = content.replace(regex, (match) => {
        return `<span class="${color}">${key}</span>${match.slice(key.length)}`;
      });
    });

  return content

}

const getMarkdownHTML =  (content:string) => {
  const codeBlock = [...content.matchAll(/~~~~(\w+)?\s([\s\S]*?)~~~~/g)]

  codeBlock.forEach((matchedTitle) => {
    content = content.replace(
      matchedTitle[0],
      `<pre class="resultOFTextAreaMarkdown_pre language-${matchedTitle[1]}" ><span class="language">${matchedTitle[1]}</span> <code>${matchedTitle[2]}</code></pre>`,
    )
  })

  const preBlocks = [
    ...content.matchAll(/<pre class="resultOFTextAreaMarkdown_pre.*?">([\s\S]*?)<\/pre>/g),
  ]
  preBlocks.forEach((block, index) => {
    content = content.replace(block[0], `{{PRE_BLOCK_${index}}}`)
  })

  let html: string =  marked(content)

  let titles1: RegExpExecArray[] = [...html.matchAll(/#\s+([^\n]+)/g)]
  titles1.forEach((matchedTitle) => {
    html = html.replace(matchedTitle[0], `<h1>${matchedTitle[1]}</h1>`)
  })
  let titles2: RegExpExecArray[] = [...html.matchAll(/##\s+([^\n]+)/g)]
  titles2.forEach((matchedTitle) => {
    html = html.replace(matchedTitle[0], `<h2>${matchedTitle[1]}</h2>`)
  })
  let titles3: RegExpExecArray[] = [...html.matchAll(/###\s+([^\n]+)/g)]
  titles3.forEach((matchedTitle) => {
    html = html.replace(matchedTitle[0], `<h3>${matchedTitle[1]}</h3>`)
  })
  preBlocks.forEach((block, index) => {
    html = html.replace(`{{PRE_BLOCK_${index}}}`, addLanguageColor(block[0]))
  })

  return html
}

</script>
  <template>
        <div :class="'resultOFTextAreaMarkdown ' +classname" v-html="getMarkdownHTML(text)">

        </div>

    </template>
