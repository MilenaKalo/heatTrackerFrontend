<template>
  <div>
    <h2>Hunde hinzufügen</h2>
    <p>Bitte füllen Sie das Formular aus, um einen Hund anzulegen.</p>
    <hr>
    <div class="containerRegister">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="card">
            <div class="card-header">
              Hund hinzufügen
            </div>
            <div class="card-body">
              <form @submit="register">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input v-model="name" type="text" id="name" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="birthdate">Geburtsdatum</label>
                  <input v-model="birthdate" type="date" id="birthdate" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="breed">Rasse</label>
                  <input v-model="breed" type="text" id="breed" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-info">Hund anlegen</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import store from '@/store'
const name = ref('')
const birthdate = ref('')
const breed = ref('')

const userId = store.state.userId

async function register (event) {
  event.preventDefault()

  const dogData = {
    name: name.value,
    birthDate: birthdate.value,
    breed: breed.value,
    ownerId: userId
  }

  console.log('Registrierung:', dogData)
  const endpoint = 'http://localhost:8080' + '/api/v1/dogs'
  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dogData)
  }

  try {
    const response = await fetch(endpoint, requestOptions)
    if (response.status === 201) {
      console.log('Registrierung erfolgreich.')
      router.push('/dog')
    } else {
      console.error('Fehler bei der Registrierung:', response.status)
    }
  } catch (error) {
    console.error('Fehler bei der Registrierung:', error)
  }
}
</script>

<style scoped>
.containerRegister{
  margin-top: 40px;
  margin-bottom: 40px;
}
.form-group {
  margin-bottom: 20px;
}
</style>
