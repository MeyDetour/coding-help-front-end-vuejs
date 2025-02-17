<script setup lang="ts">
import CustomTitle from '@/components/CustomTitle.vue'
import './style.css'
import ListOfUsersView from '@/components/listOfUsersView.vue'
import useApi from '@/composables/useApi.ts'
import type { User } from '@/type/User.ts'
import { ref } from 'vue'

const { api } = useApi()
const users = ref<User[]>([])
const profile = ref<User>()

const props = defineProps<{
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()

async function getUsers() {
  const res = await api('api/users', null, 'GET')
  if (res) {
    console.log(res)
    users.value = await res.json() as User[]

    const res2 = await api('api/profile', null, 'GET')
    if (res2) {
      console.log(res2)
      profile.value =  await res2.json() as User
    }
    console.log(profile.value,users.value)

  }


}

getUsers()
</script>

<template>
  <custom-title backgroundWord="Top" main-word="users"></custom-title>
  <list-of-users-view
    v-if="profile && users.length > 0"
    user-type="users"
    :listOfUsersData="users"
    :changeRoute="props.changeRoute"
    :own-id="profile.id"
  ></list-of-users-view>
</template>
