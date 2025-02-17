<script setup lang="ts">
import CustomImage from '@/components/CustomImage.vue'
import useApi from '@/composables/useApi.ts'
import { ref } from 'vue'
import type { User } from '@/type/User.ts'

const props = defineProps<{
  listOfUsersData: User[],
  ownId : number,
  userType:string,
  changeRoute: (routePath: string, subpageName: string, idNumber: number | null) => void
}>()
/* instanciate */

const { api } = useApi()
const followingsId = ref<number[]>([])
const listOfUsers  = ref<User[]>( props.listOfUsersData)

const fetchData = async () => {
  try {
    let res = await api('api/profile/followings', null, 'GET')
    console.log("res1",res)
    if (res) {
      res = await res.json()
      for (const following of res) {
        followingsId.value.push(following.id)
      }

    }
  } catch (err) {
    console.error(err)
  }
}
if (props.userType !== 'followings') {
  fetchData()
}else{
  followingsId.value = listOfUsers.value.map((user)=>(user.id))
}

const follow = async function (id: number) {
  try {
    console.log("follow ",id)
    let res = await api('api/follow/user/' + id, null, 'PATCH')
    console.log(res)

    followingsId.value.push(id)

    listOfUsers.value = listOfUsers.value.map((user) =>
      user.id === id ? { ...user, followers_count:  user.followers_count +1  } : user,
    )
  } catch (err) {
    console.error(err)
  }
}
const unfollow = async function (id) {
  try {

    console.log("unfollow ",id)
    const res3 = await api('api/unfollow/user/' + id, null, 'PATCH')
    followingsId.value = followingsId.value.filter((followingId) => followingId !== id)
    listOfUsers.value = listOfUsers.value.map((user) =>
      user.id === id ? { ...user, followers_count: Math.max(user.followers_count - 1, 0) } : user,
    )
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="usersList" v-if="props.ownId">
    <div
          v-for="user of listOfUsers" :key="user.id"    >
      <RouterLink
        v-if="user.id !== props.ownId"
        to=""
        @click="changeRoute('/private/user/' + user.id, 'user', user.id)"
      >
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
      <button
        v-if="followingsId.includes(user.id) && user.id !== props.ownId"
        class="button2 xsm-text"
        @click="unfollow(user.id)"
      >
        Unfollow
      </button>

      <button
        v-if="!followingsId.includes(user.id)  && user.id !== props.ownId"
        class="button2 xsm-text"
        @click="follow(user.id)"
      >
        Follow
      </button>
    </div>
  </div>
</template>
