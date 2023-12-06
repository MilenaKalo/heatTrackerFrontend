<template>
  <div>
    <h2>Aktualisieren Sie Ihre Angaben</h2>
    <p>Hier können Sie Ihre Benutzerdaten aktualisieren.</p>
    <hr>
    <div class="containerUpdate">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="card">
            <div class="card-header">
              Profil aktualisieren
            </div>
            <div class="card-body">
              <form @submit="updateProfile">
                <div class="form-group">
                  <label for="firstName">Vorname</label>
                  <input v-model="firstName" type="text" id="firstName" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="lastName">Nachname</label>
                  <input v-model="lastName" type="text" id="lastName" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="email">E-Mail</label>
                  <input v-model="email" type="email" id="email" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="password">Neues Passwort</label>
                  <input v-model="password" type="password" id="password" class="form-control" required>
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
import { ref } from 'vue'
import store from '@/store'
import router from '@/router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

async function updateProfile (event) {
  event.preventDefault()

  const userData = {
    firstname: firstName.value,
    lastname: lastName.value,
    username: email.value,
    password: password.value
  }

  console.log('Profilaktualisierung:', userData)
  const endpoint = 'http://localhost:8080' + '/api/v1/users/' + store.state.userId
  const requestOptions = {
    method: 'PUT',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }

  try {
    const response = await fetch(endpoint, requestOptions)
    if (response.status === 200) {
      console.log('Profilaktualisierung erfolgreich.')
      window.alert('Profilaktualisierung erfolgreich.')
      router.push('/profile')
    } else {
      console.error('Fehler bei der Aktualisierung:', response.status)
    }
  } catch (error) {
    console.error('Fehler bei der Aktualisierung:', error)
  }
}
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
