<script setup lang="ts">
import './style.css'
import CustomImage from '@/components/CustomImage.vue'
import useApi from '@/composables/useApi.ts'
import { ref } from 'vue'
import ProfileSectionView from '@/views/base/subpages/profile/profileSectionView.vue'
import type { User } from '@/type/User.ts'

const props = defineProps<{
  id: number
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()
const { api } = useApi()
const user = ref<User>()
const fetchData = async () => {
  try {
    const res = await api('api/user/' + props.id, null, 'GET')
    user.value = await res.json()

  } catch (err) {
    console.error(err)
  }
}
if (props.id) fetchData()
</script>

<template>
  <div class="section1" v-if="user">
    <custom-image :link="user.image"></custom-image>

    <div>
      <span class="lg-bold-text">{{ user.username }}</span>
      <span class="md-text">{{ user.email }}</span>
      <span class="md-text">{{ user.created_at }}</span>
    </div>
  </div>

  <div class="hr"></div>
  <profile-section-view
    v-if="user"
    :changeRoute="changeRoute"
    :profile="user"
    type="otherUser"
  ></profile-section-view>
</template>
