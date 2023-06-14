<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">
      Create order
    </h3>

    <div class="p-6 bg-white rounded-md shadow-md mt-8">
      <Form @submit="onSubmit">

        <Select 
          label="Client"
          option-label="fullName"
          required v-model="client"
          :options="clientStore.getClients"
          :reduce="(val: any) => val.id" 
        />

        <div>
          <h2 class="pt-4 font-medium text-lg">
            Products
          </h2>
        </div>

        <div 
          class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-7" 
          v-for="(_, index) in products" 
          :key="index"
        >
          <Input label="Name" class="col-span-4" v-model="products[index].name" required />
          <Input label="Price" type="number" v-model="products[index].price" required />
          <Input label="Quantity" type="number" v-model="products[index].quantity" required />

          <div class="mt-8">
            <Button
              @click="removeProduct(index)"
            >
              Delete
            </Button>
          </div>
        </div>

        <div class="mt-4 flex justify-between">
          <Button
            @click="addProduct"
          >
            Add product
          </Button>

          <h2 class="pt-4 font-medium text-lg">
            Total amount: {{ amount }}$
          </h2>
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
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { Form, Input, Select, Button } from '@/components'
import { useClientsStore } from '@/stores/useClientsStore'
import { useOrdersStore } from '@/stores/useOrdersStore'


const clientStore = useClientsStore()
const orderStore = useOrdersStore()
const router = useRouter()
const route = useRoute()

const id = route.params.id

const client = ref('')



const products = ref([
  {
    name: '',
    price: 0,
    quantity: 0
  }
])

let order: any = null

if (id) {
  // @ts-ignore
  order = JSON.parse(JSON.stringify(orderStore.getOrder(parseInt(id))))
  if(order) {
    products.value = order.products
    client.value = order.client
  }
}


const amount = computed(() => {
  return products.value.reduce((acc, product) => {
    acc += product.price * product.quantity
    return acc
  }, 0)
})

function addProduct() {
  products.value.push({
    name: '',
    price: 0,
    quantity: 0
  })
}

function removeProduct(index: number) {
  if (products.value.length === 1) {
    return
  }
  products.value.splice(index, 1)
}


function onSubmit() {
  const orderDate = {
    client: parseInt(client.value),
    products: products.value,
    amount: amount.value,
  }
  if (order) {
    orderStore.editOrder({ ...order, ...orderDate })
  } else {
    orderStore.addOrder({
      ...orderDate, 
      date: new Date().toLocaleDateString("en-US"),
      id: Date.now()
    })
  }
  router.push({ name: 'orders' })
}

</script>
