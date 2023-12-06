<template>
  <div class="modal-wrapper" v-if="showModal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">X</span>
      <h2>{{ modalTitle }}</h2>
      <p>{{ modalMessage }}</p>
      <button @click="confirmAction">Bestätigen</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const modalTitle = ref('Modal-Titel')
const modalMessage = ref('Modal-Inhalt')

const closeModal = () => {
  showModal.value = false
}

const confirmAction = () => {
  closeModal()
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}
</style>
