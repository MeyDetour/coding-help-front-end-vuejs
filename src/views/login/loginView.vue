<script setup lang="ts">
import { reactive, ref } from 'vue'
import './login.css'
import useAuth from '@/composables/useAuth.ts'
const {login} = useAuth()
const error = ref('')
const state = reactive({
  email: 'mey@meydeeetour.com',
  password: 'meymey',
})

function validEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return regex.test(email)
}

function onSubmit() {
  if (!validEmail(state.email)) {
    error.value = "Invalid email address"
    return
  }if (state.password==""){
    error.value = "Please enter password"
    return
  }
  console.log(state)
  login(state)
}
</script>
<template>
  <form @submit.prevent="onSubmit" class="loginPage basicForm">
    <span>email : {{ state.email }}</span>
    <span>password : {{ state.password }}</span>
    <h1>
      <img src="../../assets/logo.svg" alt="" />
      <span class="titleSpan1">Coding</span>
      <span class="titleSpan2">Help</span>
    </h1>
    <p class="md-text">Welcome to coding help - let’s log in your account !</p>
    <span v-if="error" class="error md-text">{{ error }}</span>
    <label>
      <input
        placeholder="Your email"
        v-model="state.email"
        name="email"
      />
    </label>

    <label>
      <input
        placeholder="Your password"
        type="password"
        v-model="state.password"
      />
    </label>

    <button type="submit" class="button1" value="Submit">Login</button>
    <RouterLink to="/register" class="xsm-text">You don't have account ? Register</RouterLink>
  </form>
</template>
