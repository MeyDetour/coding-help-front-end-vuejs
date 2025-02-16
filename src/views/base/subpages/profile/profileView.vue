<script setup lang="ts">
import './profile.css'
import CustomImage from '@/components/CustomImage.vue'
import useApi from '@/composables/useApi.ts'
import { ref } from 'vue'
import ProfileSectionView from '@/views/base/subpages/profile/profileSectionView.vue'


const props = defineProps<{
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()
const { api } = useApi()
const profile = ref({})

const fetchData = async () => {
  try {
    const res = await api('api/profile', null, 'GET')
    const json = await res.json()

    console.log(json)
    profile.value = json

  } catch (err) {
    console.error(err)
  }
}
fetchData()
</script>

<template>
  <div class="section1" v-if="profile">

    <custom-image :link="profile.image"></custom-image>

    <div>
      <span class="lg-bold-text">{{profile.username}}</span>
      <span class="md-text">{{profile.email}}</span>
      <span class="md-text">{{profile.created_at}}</span>
    </div>
  </div>

  <div class="hr"></div>
  <profile-section-view :changeRoute="changeRoute" :profile="profile"></profile-section-view>
</template>
