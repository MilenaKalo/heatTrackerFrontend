<template>
    <form class="was-validated" @submit.prevent="submitHealthData">
        <div class="mb-3">
            <label for="startDate" class="form-label">Startdatum</label>
            <input v-model="startDate" type="date" class="form-control" id="startDate" required @change="setMinEndDate">
            <div class="invalid-feedback">
                Bitte geben Sie das Startdatum an.
            </div>
        </div>

        <div class="mb-3">
            <label for="endDate" class="form-label">Enddatum</label>
            <input v-model="endDate" type="date" class="form-control" id="endDate" :min="startDate" required>
            <div class="invalid-feedback">
                Bitte geben Sie das Enddatum an.
            </div>
        </div>

        <div class="mb-3">
            <label for="symptom" class="form-label">Symptom</label>
            <input v-model="symptom" type="text" class="form-control" id="symptom" required>
            <div class="invalid-feedback">
                Bitte geben Sie das Symptom an.
            </div>
        </div>

        <div class="mb-3">
            <label for="note" class="form-label">Notiz</label>
            <textarea v-model="note" class="form-control" id="note"></textarea>
            <div>
                Bitte geben Sie eine Notiz an.
            </div>
        </div>

        <div class="mb-3">
            <button class="btn btn-primary" type="submit">Speichern</button>
        </div>
    </form>
</template>

<script setup>

import { ref, onMounted, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
const emit = defineEmits(['healthDataSubmitted'])
const route = useRoute()

const startDate = ref('')
const endDate = ref('')
const symptom = ref('')
const note = ref('')
const dogId = ref(route.params.id)

onMounted(() => {
  // Log the dogId for testing
  console.log('Dog ID:', dogId.value)
})
function setMinEndDate () {
  const startDateInput = new Date(startDate.value)
  const endDateInput = document.getElementById('endDate')

  if (!isNaN(startDateInput.getTime())) {
    endDateInput.min = startDate.value
  } else {
    endDateInput.min = '' // Reset min date if start date is invalid
  }
}

async function submitHealthData () {
  event.preventDefault()

  const healthData = {
    startDate: startDate.value,
    endDate: endDate.value,
    symptom: symptom.value,
    note: note.value,
    dogId: dogId.value
  }

  console.log('Gesundheitsdaten:', healthData)

  const endpoint = 'http://localhost:8080' + '/api/v1/healthrecords'
  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(healthData)
  }

  try {
    const response = await fetch(endpoint, requestOptions)
    console.log('response', response.status)
    if (response.status === 201) {
      console.log('Gesundheitsdaten erfolgreich übermittelt.')
      emit('healthDataSubmitted')
    } else {
      console.error('Fehler beim Übermitteln der Gesundheitsdaten:', response.status)
    }
  } catch (error) {
    console.error('Fehler beim Übermitteln der Gesundheitsdaten:', error)
  }
}
</script>

<style scoped>

</style>
