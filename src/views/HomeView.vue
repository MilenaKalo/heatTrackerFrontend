<template>
  <div class="home">
    <img alt="Wooflogo" src="../assets/LogoWuff.png">
    <h1>Willkommen bei WoofWatcher</h1>
  </div>
  <Carousel/>
</template>

<script setup>
import Carousel from '@/components/Carousel.vue'
</script>

<style scoped>
.home{
  margin-top: 80px;
}
img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid black;
}
h1 {
  margin-top: 40px;
  margin-bottom: 40px;
  color: aliceblue;
}
</style>
