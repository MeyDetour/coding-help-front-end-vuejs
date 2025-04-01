<script setup lang="ts">
import useAuth from '@/composables/useAuth.ts'
import { computed, ref, watch } from 'vue'
import DashboardView from '@/views/base/subpages/dashboard/dashboardView.vue'
import './base.css'
import ThemesView from '@/views/base/subpages/themes/themesView.vue'
import { useRoute, useRouter } from 'vue-router'
import OneTheme from '@/views/base/subpages/oneTheme/oneTheme.vue'
import OneQuestionView from '@/views/base/subpages/oneQuestion/oneQuestionView.vue'
import NewQuestionView from '@/views/base/subpages/newQuestion/newQuestionView.vue'
import ProfileView from '@/views/base/subpages/profile/profileView.vue'
import UsersView from '@/views/base/subpages/users/usersView.vue'
import { useSecurity } from '@/stores/securityStore.ts'
import SecurityWidgetView from '@/components/securityWidgetView.vue'
import SettingsView from '@/views/base/subpages/settings/settingsView.vue'
import UserView from '@/views/base/subpages/oneUser/userView.vue'
import OneUserView from '@/views/base/subpages/oneUser/oneUserView.vue'

const { logout } = useAuth()
const route = useRoute()
const router = useRouter()
let subpage = ref<string>(route.params.subpage)
let id = ref<number>(parseInt(route.params.catchAll))
const security = useSecurity()
let overlayOpen = ref(false)
let isMobile = ref(window.innerWidth < 700)
console.log('Subpage:', subpage.value)
console.log('ID:', id.value)
const computedClass = computed(() => ({
  content: true,
  dashboardPage: subpage.value === 'dashboard',
  themesPage: subpage.value === 'themes',
  themePage: subpage.value === 'theme',
  questionPage: subpage.value === 'question',
  profilePage: subpage.value === 'profile' || subpage.value === 'user',
  usersPage: subpage.value === 'users',
  settingsPage: subpage.value === 'settings',
  newQuestionPage: subpage.value === 'ask',
}))

function changeRoute(routePath: string, subpageName: string, idNumber: number | null): void {
  overlayOpen.value = false
  router.push(routePath)
  subpage.value = subpageName
  if (idNumber) {
    id.value = idNumber
  }
}

function changeOverlay(value:boolean){
  overlayOpen.value = value
  console.log(overlayOpen.value)
}
</script>

<template>
  <security-widget-view
    v-if="security.isVisible"
    :link="security.requestedLinkAction"
    :originLink="security.originLink"
    :body="security.requestedBody"
    :methode="security.requestedMethode"
    :message="security.message"
  />

  <div class="privatePage">
    <nav v-if="!isMobile || (isMobile && overlayOpen)" class="">
      <img @click="()=>changeOverlay(false)" class="closeSVG" src="../../assets/icon/close.svg" alt="" />
      <div>
        <img src="../../assets/logo.svg" style="width: 56px" />
        <span class="titleSpan1">Coding</span>
        <span class="titleSpan2">Help</span>
      </div>
      <ul>
        <li>
          <span
            @click="changeRoute('/private/ask', 'ask', null)"
            :class="{ focus: subpage === 'ask' }"
            >Ask question
          </span>
        </li>
        <li>
          <span
            @click="changeRoute('/private/dashboard', 'dashboard', null)"
            :class="{ focus: subpage === 'dashboard' }"
            >Dashboard
          </span>
        </li>
        <li>
          <span
            @click="changeRoute('/private/themes', 'themes', null)"
            :class="{
              focus: subpage === 'themes' || subpage === 'theme' || subpage.startsWith('question'),
            }"
          >
            All themes
          </span>
        </li>

        <li>
          <span
            @click="changeRoute('/private/users', 'users', null)"
            :class="{ focus: subpage === 'users' || subpage === 'user' }"
          >
            All users
          </span>
        </li>
        <li>
          <span
            @click="changeRoute('/private/profile', 'profile', null)"
            :class="{ focus: subpage === 'profile' }"
            >You profile
          </span>
        </li>
        <li>
          <span
            @click="changeRoute('/private/settings', 'settings', null)"
            :class="{ focus: subpage === 'settings' }"
            >Settings
          </span>
        </li>
      </ul>

      <span @click="logout">Deconnexion</span>
    </nav>
    <div :class="computedClass" v-if="!overlayOpen">
      <img class="openOverlayIcon" @click="()=>changeOverlay(true)" src="../../assets/icon/menu.svg" v-if="isMobile" alt="">
      <dashboard-view v-if="subpage == 'dashboard'" :changeRoute="changeRoute"></dashboard-view>
      <themes-view :changeRoute="changeRoute" v-if="subpage == 'themes'"></themes-view>
      <one-theme :changeRoute="changeRoute" v-if="subpage == 'theme'" :id="id"></one-theme>
      <one-question-view
        :changeRoute="changeRoute"
        v-if="subpage == 'question'"
        :id="id"
      ></one-question-view>
      <new-question-view v-if="subpage == 'ask'"></new-question-view>
      <profile-view :changeRoute="changeRoute" v-if="subpage == 'profile'"></profile-view>
      <users-view v-if="subpage == 'users'" :changeRoute="changeRoute"></users-view>
      <one-user-view v-if="subpage == 'user'" :changeRoute="changeRoute" :id="id"></one-user-view>
      <settings-view v-if="subpage == 'settings'" :changeRoute="changeRoute"></settings-view>
    </div>
  </div>
</template>

<style scoped></style>
