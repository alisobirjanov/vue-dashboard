<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">
      Clients
    </h3>
    
    <div class="flex justify-end mt-4">
      <button
        class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
        @click="$router.push({ name: 'create-client' })">
        Create
      </button>
    </div>

    <div class="mt-8">
     <Table :head="head" :list="store.getClients">
        <template #actions="{ props }">
          <div class="text-sm font-medium">
            <a href="#" class="text-red-600 hover:text-red-900 mr-2" @click="store.deleteClient(props.id)">Delete</a>
            <RouterLink 
              :to="{ name: 'edit-client', 
                params: { id: props.id }
              }"
              class="text-indigo-600 hover:text-indigo-900"
            >
              Edit
            </RouterLink>
          </div>
        </template>
      </Table>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Table } from '@/components'
import { useClientsStore } from '@/stores/useClientsStore'

const store = useClientsStore()


const head = [
  {
    title: 'Full name',
    field: 'fullName'
  },
  {
    title: 'Date of birth',
    field: 'dateOfBirth'
  },
  {
    title: 'Address',
    field: 'address'
  },
  {
    title: 'Phone',
    field: 'phone'
  },
  {
    title: 'Actions',
    field: 'actions'
  },
]
</script>
