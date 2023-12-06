<script setup>

</script>

<template>
  <div class="error">
    <h1>404</h1>
    <p>Die Seite konnte nicht gefunden werden.</p>
    <img src="../assets/error.png" class="card-img-top" alt="placeholder">
  </div>
</template>

<style scoped>
img{
  width: 50%;
  height: 50%;
  border-radius: 10%;
  border: 1px solid black;
}
h1{
  font-size: 100px;
  color: red;
}
p{
  font-size: 30px;
  color: white;
}
.error{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}
</style>
