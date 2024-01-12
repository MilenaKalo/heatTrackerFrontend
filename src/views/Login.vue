<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useStore } from 'vuex'
const username = ref('')
const password = ref('')
const store = useStore()
async function login (event) {
  event.preventDefault()

  const userData = {
    username: username.value,
    password: password.value
  }

  console.log('Anmeldung:', userData)
  const endpoint = 'http://localhost:8080' + '/api/v1/users/login'
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
    console.log('Antwort:', response)
    if (response.status === 200) {
      const user = await response.json()
      const userId = user.id
      console.log('Anmeldung erfolgreich. Benutzer-ID:', userId)
      console.log(response)
      store.dispatch('login', userId)
      router.push('/home')
    } else {
      console.error('Fehler bei der Anmeldung:', response.status)
    }
  } catch (error) {
    console.error('Fehler bei der Anmeldung:', error)
  }
}

</script>

<template>
  <div class="logoContainer"><img class="logo" alt="logo" src="../assets/LogoWuff.png"> </div>

  <div class="container">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <div class="card">
          <div class="card-header">
            Login
          </div>
          <div class="card-body">
            <form @submit="login">
              <div class="mb-3">
                <label for="username" class="form-label">Benutzername</label>
                <input v-model="username" type="email" class="form-control" id="username" placeholder="name@example.com" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Passwort</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Passwort" required>
              </div>
              <button type="submit" class="btn btn-info m-1">Login</button>
              <button type="button" class="btn btn-secondary m-1">
                <router-link class="registerLink" to="/register">Registrieren</router-link></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 40px;
  margin-bottom: 40px;
}
.btn-info {
  margin-right: 10px;
}
.logoContainer{
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
  border-radius: 50%;
}

.logo{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid black;
}

.registerLink{
  text-decoration: none;
  color: white;
}

</style>
