<template>
  <div>

    <h3 class="text-3xl font-semibold text-gray-700">
      Forms
    </h3>

    <div class="p-6 bg-white rounded-md shadow-md mt-8">
      <Form @submit="onSubmit">
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <Input label="Full name" v-model="client.fullName" required />
          <Input label="Date of birth" type="date" v-model="client.dateOfBirth" required />
          <Input label="Address" v-model="client.address" required />
          <Input label="Phone number" v-model="client.phone" required />
        </div>

        <div class="flex justify-end mt-4">
          <Button type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { Form, Input, Button } from '@/components'
import { useClientsStore } from '@/stores/useClientsStore'


const store = useClientsStore()
const router = useRouter()
const route = useRoute()

const id = route.params.id

const client = ref({
  fullName: '',
  dateOfBirth: '',
  address: '',
  phone: ''
})

if (id) {
  //@ts-ignore
  client.value = JSON.parse(JSON.stringify(store.getClient(parseInt(id))))
}

function onSubmit() {
  if(id) {
    //@ts-ignore
    store.editClient({ id, ...client.value })
  } else {
    store.addClient({ id: Date.now(), ...client.value })
  }
  router.push({name: 'clients'})
}

</script>
