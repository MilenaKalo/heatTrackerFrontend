<template>
  <div class="card">
    <img src="../assets/placeholder.png" class="card-img-top" alt="placeholder">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">{{ breed }}</p>
      <router-link :to="buttonLink" class="btn btn-primary">Zur Detailansicht</router-link>
    </div>
    </div>
</template>

<script setup>
/* eslint-disable */
import router from '@/router'
const props = defineProps({
  id: String,
  name: String,
  birthdate: String,
  breed: String,
  buttonLink: String
})

</script>

<style scoped>
.card{
  width: 20rem;
}

</style>
