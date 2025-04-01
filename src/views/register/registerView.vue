<script setup lang="ts">
import { reactive, ref } from 'vue'
import './register.css'
import useAuth from '@/composables/useAuth.ts'

const { register } = useAuth()
const error = ref('')
const state = reactive({
  email: 'mey@meydeeetour.com',
  password: 'meymey',
  username: 'meymey',
  last_name: '',
  first_name: '',
  profession: '',
  phone_number: '',
})

function validEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return regex.test(email)
}

async function onSubmit() {
  if (!validEmail(state.email)) {
    error.value = 'Invalid email address'
    return
  }
  if (state.password == '') {
    error.value = 'Please enter password'
    return
  }
  console.log(state)
  const res = await register(state)
  if (res.error) {
    error.value = res.error
  }
}
</script>
<template>
  <form @submit.prevent="onSubmit" class="loginPage basicForm">
    <h1>
      <img src="../../assets/logo.svg" alt="" />
      <span class="titleSpan1">Coding</span>
      <span class="titleSpan2">Help</span>
    </h1>
    <p class="md-text">Welcome to coding help - let’s log in your account !</p>
    <span v-if="error" class="error md-text">{{ error }}</span>
    <label>
      <input placeholder="Your username" v-model="state.username" name="username" />
    </label>
    <label>
      <input placeholder="Your email" v-model="state.email" name="email" />
    </label>

    <label>
      <input placeholder="Your password" type="password" v-model="state.password" />
    </label>

    <button type="submit" class="button1" value="Submit">Register</button>
    <RouterLink to="/login" class="xsm-text">You already have account ? Login</RouterLink>
  </form>
</template>
