<script setup>
import router from '@/router'
import { defineProps } from 'vue'

const props = defineProps({
  id: String
})
async function deleteDog () {
  const modal = document.getElementById('exampleModalLabel')
  console.log('id', props.id)
  try {
    const response = await fetch('http://localhost:8080/api/v1/dogs/' + props.id, {
      method: 'DELETE'
    })

    if (response.ok) {
      console.log('Hund gelöscht')
      modal.remove()
      document.body.classList.remove('modal-open')
      document.querySelector('.modal-backdrop').remove()
      window.alert('Hund wurde erfolgreich gelöscht')
      router.push('/home')
    } else {
      console.error('Fehler beim Löschen des Hundes')
    }
  } catch (error) {
    console.error('Fehler beim Löschen des Hundes:', error)
  }
}

</script>

<template>
  <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Hund löschen
  </button>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Hund löschen ?</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Bist du dir sicher ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          <button type="button" @click="deleteDog" class="btn btn-outline-danger">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
