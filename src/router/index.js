import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import MyNotes from '@/views/MyNotes.vue'
import AllNotes from '@/views/AllNotes.vue'
import CreateNote from '@/views/CreateNote.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'base',
      component: MyNotes
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/notes',
      name: 'notes',
      component: MyNotes,
      children: [
        {
          path: 'allNotes',
          component: AllNotes
        },
        {
          path: 'createNote',
          component: CreateNote
        }
      ]
    }
  ]
})

export default router
