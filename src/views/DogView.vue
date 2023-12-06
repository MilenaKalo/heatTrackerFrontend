<template>
  <div class="dog">
    <h1 class="titleDogView">Deine Hunde</h1>
    <router-link to="/addDog">
      <button class="btn btn-primary btn-lg">Hinzufügen</button>
    </router-link>
  </div>
    <div v-if="dogs.length > 0" class="cards-container">
      <div class="card" v-for="dog in dogs" :key="dog.id">
        <Card
          :id="dog.id.toString()"
          :name="dog.name"
          :birthdate="dog.birthdate"
          :breed="dog.breed"
          :button-link="`/dogDetails/${dog.id}`"
        />
      </div>
    </div>
<div v-else>
  <h3 class="noDogsAvaible">Keine Hunde vorhanden</h3>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Card from '@/components/Card.vue'
import store from '@/store'
const dogs = ref([])

onMounted(async () => {
  try {
    const userId = store.state.userId
    const response = await fetch(`http://localhost:8080/api/v1/users/${userId}/dogs`)
    if (response.ok) {
      const data = await response.json()
      dogs.value = data
    } else {
      console.error('Fehler beim Abrufen der Hunde:', response.status)
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Hunde:', error)
  }
})

</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 80px;
}
.dog{
  display: flex;
  justify-content: space-between;
  margin: 80px;
}
.noDogsAvaible{
  margin: 80px;
  color: aliceblue;
}
.titleDogView{
  color: aliceblue;
}
</style>
