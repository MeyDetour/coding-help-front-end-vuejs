<script setup lang="ts">

import "./contentTextAreaMarkdown.css"
defineProps({
  link: String,
  valueText: String,
})
const model = defineModel<string>()

/*  MARKDOWN
*
*   to italic we had _italic text_
*   to bold we use ** bold text **
*   for link [text representation](link)
*   for code ` code here `
*   h1 : #
*   h2 : ##
*   h3pm : ###
*
* */


const addMarkdown = function (markStyle:string) {
  const textarea = document.querySelector(".contentTextAreaMarkdown textarea");

  if (!textarea) {
    console.error("Textarea not found!");
    return;
  }

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;

  /* if start!=end we have selection text */
  console.log(start, end, text);

  let formattedText = ""
  if (start == end) {
    if (markStyle === "bold") {
      formattedText = `**You text**`
    } else if (markStyle === "italic") {
      formattedText = `_your text_`
    } else if (markStyle === "hyperlink") {
      formattedText = `[your text](url)`

    } else if (markStyle === "code") {
      formattedText = `~~~~Language\nType your code here\n~~~~`
    } else if (markStyle === "title1") {
      formattedText = `# title`
    }else if (markStyle === "title2") {
      formattedText = `## title`
    }else if (markStyle === "title3") {
      formattedText = `### title3`
    }
  } else {
    if (markStyle === "bold") {
      formattedText = `**${text.slice(start, end)}**`
    } else if (markStyle === "italic") {
      formattedText = `_${text.slice(start, end)}_`
    } else if (markStyle === "hyperlink") {
      formattedText = `[${text.slice(start, end)}](url)`
    } else if (markStyle === "code") {

      formattedText = `~~~~Language\n${text.slice(start, end)}\n~~~~`
    } else if (markStyle === "title1") {
      formattedText = `# ${text.slice(start, end)}`
    } else if (markStyle === "title2") {
      formattedText = `## ${text.slice(start, end)}`
    } else if (markStyle === "title3") {
      formattedText = `### ${text.slice(start, end)}`
    }
  }


  const updatedText = text.slice(0, start) + formattedText + text.slice(end)
  textarea.value = updatedText
  textarea.setSelectionRange(start, start + formattedText.length);
  textarea.focus();
  setValue(name, updatedText);

}





</script>

<template>
  <div class="contentTextAreaMarkdown xsm-text">
  <textarea
    class="class"
    v-model="model"
  ></textarea>
    <ul class="listOFOptions">
      <li @click="() => addMarkdown('bold')">
        <span class="toBold md-bold-text">B</span>
      </li>
      <li @click="() => addMarkdown('italic')">
        <span class="toItalic md-text">I</span>
      </li>
      <li @click="() => addMarkdown('title1')">
        <span class="title md-text">h1</span>
      </li>   <li @click="() => addMarkdown('title2')">
      <span class="title md-text">h2</span>
    </li>  <li @click="() => addMarkdown('title3')">
      <span class="title md-text">h3</span>
    </li>
      <li @click="() => addMarkdown('hyperlink')">
        <img src="../../assets/icon/link-dark.svg" class="hyperlink" alt="">
    </li>
    <li @click="() => addMarkdown('code')"><img src="../../assets/icon/code-dark.svg" class="toCode" alt="">
    </li>
  </ul>

  </div>
</template>

