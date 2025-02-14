<script setup lang="ts">
import "./home.css"
import { RouterLink } from 'vue-router'


</script>

<template>
  <div class="homePage">

  <div class="header">
    <img src="../../assets/logo.svg" alt="logo coding help"/>
    <div>

      <RouterLink class="button0"  to="/login">Login</RouterLink>
      <RouterLink class="button1" to="/register">Register</RouterLink>
    </div>
  </div>


  <p>
    <span class="titleSpan1 fs-60">Coding</span>
    <span class="titleSpan2 fs-60">Help</span>
    is a collaborative platform where developers ask, share, and solve coding challenges
    <span class="greyText">—like Stack Overflow, but tailored for an even more engaging community experience.</span>
  </p>


  <div class="descriptionContainer">
    <div class="oneTechno" id="reactSection">
      <div class="logoBackground">
        <img src="../../assets/icon/react.svg" alt="ractIcon"/>
      </div>
      <span>React</span>
      <p>React.js is used for the frontend, ensuring modularity and seamless interaction with the
        Django backend via APIs. Read the documentation</p>
    </div>
    <div class="oneTechno" id="djangoSection">
      <div class="logoBackground">
        <img src="../../assets/icon/django.svg" alt="djangoIcon"/>
      </div>
      <span>Django</span>
      <p>Django with PostgreSQL creates a reliable, scalable backend, while Django REST builds
        flexible APIs for seamless communication in modern web applications.</p>
    </div>
    <div class="oneTechno" id="postgresqlSection">
      <div class="logoBackground">
        <img src="../../assets/icon/postgresql.svg" alt="postgresqlIcon"/>
      </div>
      <span>PostgreSQL</span>
      <p>PostgreSQL powers the database, providing a robust and reliable foundation for managing data
        with Django backend support.</p>
    </div>

  </div>

</div>
</template>
