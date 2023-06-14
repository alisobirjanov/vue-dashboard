<template>
  <form @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide } from 'vue'

const emit = defineEmits(['submit'])

let fields: any[] = []

provide('formInjectionKey', { 
  addField(field: any) {
    fields.push(field)
  },
  removeField(field: any) {
    fields = fields.filter(i => field !== i)
  }
})

function onSubmit(event: Event) {
  let isValid = true
  fields.forEach(field => {
    if (!field.validate()) {
      isValid = false
    }
  })
  if(isValid) {
    emit('submit', event)
  }
}
</script>
