<template>
  <div>
    <Navbar :is-logged-in="isLoggedIn" />
    <router-view />
  </div>
</template>

<script>
import { onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Navbar from '@/components/Navbar.vue'
import './assets/global.css'

export default {
  components: {
    Navbar
  },
  setup () {
    const store = useStore()
    const router = useRouter()

    const isLoggedIn = computed(() => store.state.isLoggedIn)

    onBeforeMount(() => {
      if (!isLoggedIn.value) {
        router.push('/login')
      }
    })

    return { isLoggedIn }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
