<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue'

const props = defineProps(['id', 'month'])
const healthRecords = ref([])
const selectedYear = ref('')
const availableYears = reactive([2023, 2024, 2025])

onMounted(async () => {
  await updateHealthRecords()
})

const updateHealthRecords = async () => {
  try {
    const response2 = await fetch(`http://localhost:8080/api/v1/dogs/${props.id}/healthrecords`)
    const data2 = await response2.json()

    if (response2.ok) {
      console.log(data2)
      healthRecords.value = data2.filter(record => {
        const recordYear = record.startDate[0]
        return recordYear === selectedYear.value
      })
    } else {
      console.error('Fehler beim Laden der GS:', response2.statusText)
    }
  } catch (error) {
    console.error('Fehler beim Laden der Gn:', error)
  }
}

const formatDate = (dateArray) => {
  const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
  return dateObject.toLocaleDateString()
}
</script>

<template>
  <div>
    <div class="selectContainer">
      <select class="form-select" v-model="selectedYear" @change="updateHealthRecords" aria-label="Default select example">
        <option disabled value="">Wähle ein Jahr aus:</option>
        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
      </select></div>
    <div class="accordion" id="healthRecordsAccordion">
      <div class="accordion-item" v-for="record in healthRecords" :key="record.id">
        <h2 class="accordion-header" :id="'heading_' + record.id">
          <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#collapse_' + record.id"
              aria-expanded="true"
              :aria-controls="'collapse_' + record.id"
          >
            {{ record.symptom }}
          </button>
        </h2>
        <div
            :id="'collapse_' + record.id"
            class="accordion-collapse collapse show"
            :aria-labelledby="'heading_' + record.id"
            data-bs-parent="#healthRecordsAccordion"
        >
          <div class="accordion-body">
            Von {{ formatDate(record.startDate) }} bis {{ formatDate(record.endDate) }} <br>
           <p v-if="record.note">Notizen: {{ record.note }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion{
  width: 80%;
  margin: 0 auto;
}
.selectContainer{
  width: 80%;
  margin: 0 auto 2rem;
}
</style>
