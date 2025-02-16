<script setup lang="ts">

import { watch } from 'vue'
import "./contentTextAreaMarkdown.css"

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

watch(props,()=>{addLanguageColor()})

function addLanguageColor(){

  document.querySelectorAll(".language-python code").forEach((pre) => {
    console.log(pre);
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
    Object.entries(language).forEach((elt) => {

      const regex = new RegExp(`${elt[0]}\\s`, "g");
      pre.innerHTML = pre.innerHTML.replaceAll(regex, `<span class='${elt[1]}'>${elt[0]}</span> `);
      const regex2 = new RegExp(`${elt[0]}:`, "g");
      pre.innerHTML = pre.innerHTML.replaceAll(regex2, `<span class='${elt[1]}'>${elt[0]}</span>:`);
      const regex3 = new RegExp(`${elt[0]}\\(`, "g");
      pre.innerHTML = pre.innerHTML.replaceAll(regex3, `<span class='${elt[1]}'>${elt[0]}</span>(`);

    })

  })

}



</script>
  <template>
        <div :class="'resultOFTextAreaMarkdown' +classname" v-html="text">

        </div>

    </template>
