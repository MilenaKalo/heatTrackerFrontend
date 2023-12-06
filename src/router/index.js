import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import RegisterView from '../views/Register.vue'
import LexikonView from '@/views/LexikonView.vue'
import DogView from '@/views/DogView.vue'
import AddDogView from '@/views/AddDogView.vue'
import DogDetailView from '@/views/DogDetailView.vue'
import ProfilView from '@/views/ProfilView.vue'
import UpdatePersonView from '@/views/UpdatePersonView.vue'
import ErrorView from '@/views/ErrorView.vue'
const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/lexikon',
    name: 'lexikon',
    component: LexikonView
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/dog',
    name: 'dog',
    component: DogView
  },
  {
    path: '/addDog',
    name: 'addDog',
    component: AddDogView
  },
  {
    path: '/dogDetails/:id',
    name: 'dogDetails',
    component: DogDetailView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilView
  },
  {
    path: '/updateProfile',
    name: 'updateProfile',
    component: UpdatePersonView
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.linkActiveClass = 'active-link'

export default router
