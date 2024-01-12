<script setup>
import { defineProps } from 'vue'
import router from '@/router'
import store from '@/store'
const props = defineProps({
  firstname: String,
  lastname: String,
  username: String,
  password: String
})
async function deletePerson () {
  const modal = document.getElementById('exampleModalLabel')
  document.querySelector('.btn-outline-danger')

  try {
    const response = await fetch('http://localhost:8080/api/v1/users/' + store.state.userId, {
      method: 'DELETE'
    })

    if (response.ok) {
      console.log('Person gelöscht')
      modal.remove()
      document.body.classList.remove('modal-open')
      document.querySelector('.modal-backdrop').remove()
      window.alert('Profil wurde erfolgreich gelöscht')
      store.commit('setLoggedIn', false)
      router.push('/login')
    } else {
      console.error('Fehler beim Löschen des Hundes')
    }
  } catch (error) {
    console.error('Fehler beim Löschen des Hundes:', error)
  }
}

</script>

<template>
  <h1 class="titleOfPersonView">Benutzerkonto</h1>
  <div class="card mx-auto">
    <img src="../assets/personenplatz.png" class="card-img-top" alt="placeholder">
    <div class="card-body">
      <h5 class="card-title">{{ props.firstname }} {{props.lastname}}</h5>
      <p class="card-text">Profilaktivitäten</p>
      <router-link to="/updateProfile" class="btn btn-primary">Angaben aktualisieren</router-link>
      <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Profil löschen
      </button>

    </div>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Profil löschen ?</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Bist du dir sicher ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" @click="deletePerson" class="btn btn-outline-danger">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card{
  width: 18rem;
  margin: 1rem;
  margin-top: 10rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.titleOfPersonView{
  margin-top: 5rem;
  text-align: center;
  color: aliceblue;
}
</style>
