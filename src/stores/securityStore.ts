import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSecurity = defineStore('counter', () => {
  const message = ref<string>()
  const requestedLinkAction = ref<string>()
  const requestedMethode = ref<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>()
  const requestedBody = ref<object>()
  const originLink = ref<string>('')
  const isVisible = ref<boolean>(false)

  function showWidget(messageData:string,originLinkData:string,requestedLinkActionData:string,requestedMethodeData:'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',requestedBodyData:object|null) {
    message.value = messageData;
    originLink.value = originLinkData;
    requestedLinkAction.value = requestedLinkActionData;
    requestedMethode.value = requestedMethodeData;
    if (requestedBodyData){
      requestedBody.value = requestedBodyData;
    }
    isVisible.value = true;
  }
  function hideWidget() {
    isVisible.value = false;
  }

  return {message,requestedLinkAction,requestedBody,requestedMethode,originLink,isVisible,showWidget,hideWidget}
})
