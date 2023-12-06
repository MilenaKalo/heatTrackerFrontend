<template>
  <form class="was-validated" @submit.prevent="submitCycleData">
    <div class="mb-3">
      <label for="startDate" class="form-label">Startdatum</label>
      <input v-model="startDate" type="date" class="form-control" id="startDate" @change="setMinEndDate" required>
      <div class="invalid-feedback">
        Bitte geben Sie das Startdatum an.
      </div>
    </div>

    <div class="mb-3">
      <label for="endDate" class="form-label">Enddatum</label>
      <input v-model="endDate" type="date" class="form-control" id="endDate"  :min="startDate" required>
      <div class="invalid-feedback">
        Bitte geben Sie das Enddatum an.
      </div>
    </div>

    <div class="form-check mb-3">
      <input v-model="silentHeat" type="checkbox" class="form-check-input" id="silentHeat" :checked="silentHeat">
      <label class="form-check-label" for="silentHeat">Stille Läufigkeit</label>
    </div>

    <div class="form-check mb-3">
      <input v-model="splitHeat"  type="checkbox" class="form-check-input" id="splitHeat" :checked="splitHeat">
      <label class="form-check-label" for="splitHeat">Split Läufigkeit</label>
    </div>

    <div class="mb-3">
      <button class="btn btn-primary" type="submit">Speichern</button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const emit = defineEmits(['cycleDataSubmitted'])
const route = useRoute()
const startDate = ref('')
const endDate = ref('')
const splitHeat = ref('')
const silentHeat = ref('')
function setMinEndDate () {
  const startDateInput = new Date(startDate.value)
  const endDateInput = document.getElementById('endDate')

  if (!isNaN(startDateInput.getTime())) {
    endDateInput.min = startDate.value
  } else {
    endDateInput.min = '' // Reset min date if start date is invalid
  }
}
async function submitCycleData () {
  event.preventDefault()

  const cycleData = {
    startdate: startDate.value,
    enddate: endDate.value,
    splitHeat: splitHeat.value,
    silentHeat: silentHeat.value,
    dogId: route.params.id
  }

  console.log('Zyklusdaten:', cycleData)

  const endpoint = 'http://localhost:8080' + '/api/v1/cycles'
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cycleData)
  }

  try {
    const response = await fetch(endpoint, requestOptions)

    if (response.ok) {
      console.log('Zyklusdaten erfolgreich übermittelt.')
      emit('cycleDataSubmitted')
    } else {
      console.error('Fehler beim Speichern der Zyklusdaten:', response.status)
    }
  } catch (error) {
    console.error('Fehler beim Speichern der Zyklusdaten:', error)
  }
}
</script>
<style scoped>

</style>
