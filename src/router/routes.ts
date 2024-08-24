import { RouteRecordRaw } from 'vue-router'
import axios from 'axios'
import BusStopsMain from '@/pages/BusStopsMain.vue'

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
    path: '',
    name: 'BusStopsMain',
    component: BusStopsMain,
    props: true,
    beforeEnter: async (to, from, next) => {
      try {
        const response = await axios.get('http://localhost:3000/stops')
        to.meta.initialData = response.data
        next()
      } catch (error) {
        console.error(error)
        next(false) // Cancel navigation on error
      }
    }
  },
      { path: 'stops', component: () => import('../pages/StopsPage.vue') }
    ]
  },
  { 
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

export default routes