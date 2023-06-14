import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Clients.vue'),
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/views/Clients.vue'),
  },
  {
    path: '/clients/create',
    name: 'create-client',
    component: () => import('@/views/AddEditClient.vue'),
  },
  {
    path: '/clients/:id',
    name: 'edit-client',
    component: () => import('@/views/AddEditClient.vue'),
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/Orders.vue'),
  },
  {
    path: '/orders/create',
    name: 'create-order',
    component: () => import('@/views/AddEditOrder.vue'),
  },
  {
    path: '/orders/:id',
    name: 'edit-order',
    component: () => import('@/views/AddEditOrder.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
