<script setup>

import Accordion from '@/components/Accordion.vue'
</script>

<template>
  <div class="lexikon">
    <h1 class="titleLexikon">Lexikon</h1>
  </div>
  <div class="accordiion">
  <Accordion></Accordion>
  </div>
</template>

<style scoped>

.lexikon{
  margin-top: 80px;
}
.accordiion{
  margin: 80px;
}
.titleLexikon{
  color: aliceblue;
}
</style>
