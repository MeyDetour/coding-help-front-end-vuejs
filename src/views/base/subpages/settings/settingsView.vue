<script setup lang="ts">
import CustomTitle from '@/components/CustomTitle.vue'
import './style.css'
import { ref } from 'vue'
import useAuth from '@/composables/useAuth.ts'

const { logout } = useAuth()
const props = defineProps<{
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()

const subpageSettings = ref('account')
const changeSubpage = (subpageSettingsName: string): void => {
  subpageSettings.value = subpageSettingsName
}
</script>

<template>
  <custom-title backgroundWord="Top" main-word="Settings"></custom-title>

  <div class="section1">
    <ul>
      <li @click="changeSubpage('account')">
        <span :class="`md-text ${subpageSettings === 'account' ? 'focus' : ' '}`">Account</span>
      </li>
      <li @click="changeSubpage('appearance')">
        <span :class="`md-text  ${subpageSettings === 'appearance' ? 'focus' : ' '}`"
          >Appearence</span
        >
      </li>
    </ul>
    <div class="hr"></div>
    <div v-if="subpageSettings === 'account'">
      <div class="settingsSubSection">
        <span>Authentification</span>
        <div class="row">
          <span class="button2" @click="logout">Deconnexion</span>
          <span class="button2" @click="logout">Delete Account</span>
        </div>

      </div>

    </div>
  </div>
</template>
