<template>
  <div class="containerAllOver">
    <div class="containerUpdate">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-header">
              Hund aktualisieren
            </div>
            <div class="card-body">
              <form @submit="updateData">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input v-model="name" type="text" id="name" class="form-control" :placeholder="name" required>
                </div>
                <div class="form-group">
                  <label for="type">Geburtstag</label>
                  <input v-model="birthdate" type="date" id="type" class="form-control" :placeholder="birthdate" required>
                </div>
                <div class="form-group">
                  <label for="breed">Rasse</label>
                  <input v-model="breed" type="text" id="breed" class="form-control" :placeholder="breed"  required>
                </div>
                <button type="submit" class="btn btn-info">Aktualisieren</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import router from '@/router'
import store from '@/store'

const props = defineProps({
  id: String
})
const name = ref('')
const birthdate = ref('')
const breed = ref('')

async function getData () {
  const endpoint = 'http://localhost:8080' + '/api/v1/dogs/' + props.id
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  try {
    const response = await fetch(endpoint, requestOptions)
    if (response.status === 200) {
      const data = await response.json()
      console.log('Data:', data)
      name.value = data.name
      const date = new Date(data.birthDate)
      console.log('date', date)
      birthdate.value = date.toISOString().split('T')[0]
      breed.value = data.breed
      console.log('birthdate', birthdate.value)
      console.log('birth', new Date(data.birthDate))
    } else {
      console.error('Error:', response.status)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

async function updateData (event) {
  event.preventDefault()

  const dogData = {
    name: name.value,
    birthDate: birthdate.value,
    breed: breed.value,
    ownerId: store.state.userId
  }

  console.log('Data:', dogData)
  const endpoint = 'http://localhost:8080' + '/api/v1/dogs/' + props.id
  const requestOptions = {
    method: 'PUT',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dogData)
  }

  try {
    const response = await fetch(endpoint, requestOptions)
    if (response.status === 200) {
      console.log('Hund aktualisiert.')
      window.alert('Die Daten wurden erfolgreich aktualisiert.')
      router.push('/dog')
    } else {
      console.error('Error:', response.status)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

onMounted(() => {
  getData()
})
</script>

<style scoped>
.containerUpdate {
  margin-top: 40px;
  margin-bottom: 40px;
}
.form-group {
  margin-bottom: 20px;
}
</style>
