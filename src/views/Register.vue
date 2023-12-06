<template>
  <div>
    <h2>Registrieren</h2>
    <p>Bitte füllen Sie das Formular aus, um sich zu registrieren.</p>
    <p>Wenn Sie bereits ein Konto haben, können Sie sich <router-link to="/login">hier</router-link> anmelden.</p>
    <hr>
    <div class="containerRegister">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="card">
            <div class="card-header">
              Registrierung
            </div>
            <div class="card-body">
              <form @submit="register">
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
                  <input v-model="email" type="email" id="email" class="form-control" placeholder="name@example.com" required>
                </div>
                <div class="form-group">
                  <label for="password">Passwort</label>
                  <input v-model="password" type="password" id="password" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-info">Registrieren</button>
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

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
async function register (event) {
  event.preventDefault()

  const userData = {
    firstname: firstName.value,
    lastname: lastName.value,
    username: email.value,
    password: password.value
  }

  console.log('Registrierung:', userData)
  const endpoint = 'http://localhost:8080' + '/api/v1/users'
  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }

  try {
    const response = await fetch(endpoint, requestOptions)
    if (response.status === 201) {
      console.log('Registrierung erfolgreich.')
      window.alert('Registrierung erfolgreich. Sie können sich jetzt anmelden.')
      router.push('/login')
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
