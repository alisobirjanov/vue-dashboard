<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">
      Orders
    </h3>

    <div class="flex justify-end mt-4">
      <button
        class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
        @click="$router.push({ name: 'create-order' })">
        Create
      </button>
    </div>

    <div class="mt-8">
      <Table :head="head" :list="orderStore.getOrders">
        <template #client="{ props }">
          <h4>{{ clientStore.getClient(props.client)?.fullName }}</h4>
        </template>

        <template #amount="{ props }">
          <h4>{{ props.amount }}$</h4>
        </template>

        <template #products_count="{ props }">
          <h4>{{ props.products.length }}</h4>
        </template>

        <template #actions="{ props }">
          <div class="text-sm font-medium">
            <a href="#" class="text-red-600 hover:text-red-900 mr-2" @click="orderStore.deleteOrder(props.id)">Delete</a>
            <RouterLink :to="{ name: 'edit-order', params: { id: props.id } }"
              class="text-indigo-600 hover:text-indigo-900">Edit</RouterLink>
          </div>
        </template>
      </Table>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Table } from '@/components'
import { useOrdersStore } from '@/stores/useOrdersStore'
import { useClientsStore } from '@/stores/useClientsStore'

const orderStore = useOrdersStore()
const clientStore = useClientsStore()


const head = [
  {
    title: 'Client',
    field: 'client'
  },
  {
    title: 'Products count',
    field: 'products_count'
  },
  {
    title: 'Amount',
    field: 'amount'
  },
  {
    title: 'Date',
    field: 'date'
  },
  {
    title: 'Actions',
    field: 'actions'
  },
]
</script>