<script setup>

import store from '@/store'
import router from '@/router'

const logout = () => {
  store.commit('setLoggedIn', false)
  router.push('/login')
}

</script>

<template>
  <nav class="navbar bg-body-info fixed-top" v-if="store.state.isLoggedIn">
    <div class="container-fluid">
      <div class="logoAndBrand">
        <div class="logo-container">
          <img class="logo" alt="logo" src="../assets/LogoWuff.png">
        </div>
        <h1 class="navbar-brand">WoofWatcher</h1>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menü</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <router-link to="/home" class="nav-link active" active-class="active-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/lexikon" class="nav-link" active-class="active-link">Lexikon</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dog" active-class="active-link">
                Hunde
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile" active-class="active-link">
                Profil
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/error" active-class="active-link">
                Error
              </router-link>
            </li>
          </ul>
          <button type="button" @click="logout" class="btn btn-secondary position-absolute bottom-0 end-0 m-2" data-bs-dismiss="offcanvas">
          Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
img{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid black;
}
.active-link{
  font-weight: bold;
  text-decoration: underline;
}
.logoAndBrand {
  display: flex;
  align-items: center;
}

.logo-container {
  margin-right: 10px;
}
</style>
