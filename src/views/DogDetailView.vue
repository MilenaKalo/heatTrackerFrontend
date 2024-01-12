<template>
  <div>
    <h1 class="titleOfDogView">Detailansicht deines Hundes</h1>
    <div class="row">
      <div class="col-md-6 my-5">
        <UpdateDog :id="dogId" />
        <div class="my-5">
          <delete-dog-button :id="dogId" />
        </div>
      </div>
      <div class="col-md-6 my-5">
        <div class="align-center my-5">
          <VCalendar
              :initial-page="{ month: new Date().getMonth() + 1, year: new Date().getFullYear() }"
              :attributes="attributesArray"
          />
        </div>
  <div v-if="attributesArray.length === 0" class="alert alert-warning alert-dismissible fade show m-3" role="alert">
    <strong>Hinweis!</strong> Du hast noch keine Läufigkeiten angelegt.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <button type="button" class="btn btn-secondary m-1" data-bs-toggle="modal" data-bs-target="#exampleModalH">Hinzufügen</button>
    <div class="modal fade" id="exampleModalH" tabindex="-1" aria-labelledby="exampleModalHLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalHLabel">Daten hinzufügen</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Möchtest du eine Läufigkeit hinzufügen oder Gesundheitsdaten anlegen ?
            <br>
            <button class="btn btn-outline-info m-1" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Läufigkeit</button>
            <button class="btn btn-outline-primary m-1" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal">Gesundheitsdaten</button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Läufigekeit erstellen</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <CycleForm @cycleDataSubmitted="closeModalCycle" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel3">Gesundheitsdaten anlegen</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <HealthRecordForm @healthDataSubmitted="closeModal" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
          </div>
        </div>
      </div>
    </div>
<div class="healthrecordsdata">
    <h3 class="titleHealthRecord">Gesundheitsdaten:</h3>
  <HealthRecordsAccordion :id="dogId"/>
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CycleForm from '@/components/CycleForm.vue'
import HealthRecordForm from '@/components/HealthRecordForm.vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import DeleteDogButton from '@/components/deleteDogButton.vue'
import HealthRecordsAccordion from '@/components/HealthRecordsAccordion.vue'
import UpdateDog from '@/components/UpdateDog.vue'

const closeModal = () => {
  const modal = document.getElementById('exampleModalToggle3')
  modal.remove()
  document.body.classList.remove('modal-open')
  document.querySelector('.modal-backdrop').remove()
  window.alert('Gesundheitsdaten wurden erfolgreich hinzugefügt')
  router.push('/dog')
}
const closeModalCycle = () => {
  const modal = document.getElementById('exampleModalToggle2')
  modal.remove()
  document.body.classList.remove('modal-open')
  document.querySelector('.modal-backdrop').remove()
  window.alert('Läufigkeit wurde erfolgreich hinzugefügt')
  router.push('/dog')
}

const route = useRoute()
const dogId = ref(route.params.id)
console.log('dogId', dogId.value)

const attributesArray = ref([])
onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/dogs/${route.params.id}/cycles`)
    const data = await response.json()

    if (response.ok) {
      console.log(data)

      const updatedAttributes = data.map(item => ({
        highlight: {
          start: { fillMode: 'outline' },
          base: { fillMode: 'light' },
          end: { fillMode: 'outline' }
        },
        dates: {
          start: new Date(item.startdate[0], item.startdate[1] - 1, item.startdate[2]),
          end: new Date(item.enddate[0], item.enddate[1] - 1, item.enddate[2])
        },
        popover: {
          label: item.silentHeat ? 'Stille Läufigkeit' : item.splitHeat ? 'Split Läufigkeit' : 'Läufigkeit'
        }
      }))

      attributesArray.value.push(...updatedAttributes)
    } else {
      console.error('Fehler beim Laden der Zyklen:', response.statusText)
    }
  } catch (error) {
    console.error('Fehler beim Laden der Zyklen:', error)
  }

  try {
    const response2 = await fetch(`http://localhost:8080/api/v1/dogs/${route.params.id}/healthrecords`)
    const data2 = await response2.json()

    if (response2.ok) {
      console.log(data2)
      const updatedAttributes2 = data2.map(item => ({
        content: true,
        dates: {
          start: new Date(item.startDate[0], item.startDate[1] - 1, item.startDate[2]),
          end: new Date(item.endDate[0], item.endDate[1] - 1, item.endDate[2])
        },
        dot: {
          color: 'red'
        },
        popover: {
          label: item.symptom
        }
      }))
      attributesArray.value.push(...updatedAttributes2)
    } else {
      console.error('Fehler beim Laden der GS:', response2.statusText)
    }
  } catch (error) {
    console.error('Fehler beim Laden der Gn:', error)
  }
})
</script>
<style scoped>
.titleHealthRecord{
  margin-top: 40px;
  margin-bottom: 40px;
}
.titleOfDogView{
  margin-top: 40px;
  margin-bottom: 40px;
  color: aliceblue;
}
</style>
