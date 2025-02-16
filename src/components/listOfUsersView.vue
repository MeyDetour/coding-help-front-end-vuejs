<script setup lang="ts">
import CustomImage from '@/components/CustomImage.vue'
import useApi from '@/composables/useApi.ts'
import { ref } from 'vue'

const props = defineProps<{
  listOfUsersData: []
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()
/* instanciate */

const { api } = useApi()
const followingsId = ref([])
const ownId = ref()
const listOfUsers = props.listOfUsersData

const fetchData = async () => {
  try {
    let res = await api('api/profile/followings', null, 'GET')
    res = await res.json()
    for (const following of res) {
      followingsId.value.push(following.id)
    }
    let res2 = await api('api/profile', null, 'GET')
    res2 = await res.json()
    ownId.value(res2.id)
  } catch (err) {
    console.error(err)
  }
}
fetchData()

const follow = async function (id:number) {
  try {
    let res = await api('api/follow/user/' + id, null, 'PATCH')

    /* for dynamic render */
    followingsId.value.push(id)
    listOfUsers.forEach((user, index) => { // ✅ Correction de "inedx" → "index"
      if (user.id == id) {
        listOfUsers[index].followers_count = user.followers_count + 1
      }
    })
  } catch (err) {
    console.error(err)
  }
}
const unfollow = async function (id) {
  try {
    const res3 = await api('api/unfollow/user/' + id, null, 'PATCH')
    followingsId.value = followingsId.value.filter((followingId) => followingId !== id)
    listOfUsers.value = listOfUsers.value.map((user) =>
      user.id === id ? { ...user, followers_count: Math.max(user.followers_count - 1, 0) } : user
    )
  } catch (err) { console.error(err)
  }
}
</script>

<template>
  <div class="usersList" v-if="ownId">
     <div v-for="user of listOfUsers" :key="user.id">
      <RouterLink v-if="user.id !== ownId" to="" @click="changeRoute('/private/user/' + user.id, 'user', user.id)">
        <div class="name">
          <custom-image :link="user.image"></custom-image>
          <span class="md-text">{{ user.username }}</span>
        </div>
        <span class="createdAt">{{ user.created_at }}</span>
        <div class="counters">
          <span class="md-text">Followings</span>
          <span class="lg-text">{{ user.followings_count }}</span>
        </div>
        <div class="counters">
          <span class="md-text">Followers</span>
          <span class="lg-text">{{ user.followers_count }}</span>
        </div>
        <div class="counters">
          <img src="../assets/icon/question.svg" alt="question icon" />
          <span class="md-text">{{ user.questions_count }}</span>
        </div>
        <div class="counters">
          <img src="../assets/icon/clue.svg" alt="clue icon" />
          <span class="md-text">{{ user.responses_count }}</span>
        </div>
      </RouterLink>
      <button v-if="followingsId.includes(user.id)" class="button2 xsm-text" @click="unfollow(user.id)">Unfollow</button>

      <button  v-if="!followingsId.includes(user.id)" class="button2 xsm-text" @click="follow(user.id)">Follow</button>

    </div>
  </div>
</template>
