<template>
  <div>
    <label class="text-gray-700" for="username">{{ label }}</label>
    <input :value="modelValue" @input="onChange"
      class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
      :type="type"
    >
    <span class="text-red-600">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { inject, onUnmounted, ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [String, Number],
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  }
})

const error = ref('')

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const form = inject('formInjectionKey', {
  addField: (_: any) => { },
  removeField: (_: any) => { }
})

const field = {
  validate() {
    if (props.required && !props.modelValue) {
      error.value = 'Field is required'
      return false
    }
    error.value = ''
    return true
  }
}

form.addField(field)

onUnmounted(() => {
  form.removeField(field)
})

</script>
