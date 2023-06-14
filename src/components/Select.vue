<template>
  <div>
    <label class="text-gray-700" for="username">{{ label }}</label>
    <select 
      class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
      @input="onChange"
      :value="value"
    >
      <option disabled value="">Please select one</option>
      <option v-for="(option, index) in options" :value="index">{{ (option as any)[optionLabel] }}</option>
    </select>
    <span class="text-red-600">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { inject, onUnmounted, ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: [String, Number, Object],
  label: {
    type: String,
    default: ''
  },
  optionLabel: {
    type: String,
    default: 'title'
  },
  options: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: false
  },
  reduce: {
    type: Function,
    default: (val: any) => val
  }
})

const error = ref('')

const idx = props.options.findIndex(i => props.reduce(i) === props.modelValue)
const value = ref(idx > -1 ? idx.toString() : '')

function onChange(event: Event) {
  const idx = parseInt((event.target as HTMLInputElement).value)
  const item = props.reduce(props.options[idx])
  value.value = idx.toString()
  emit('update:modelValue', item)
}

const form = inject('formInjectionKey', {
  addField: (_: any) => { },
  removeField: (_: any) => { }
})

const field = {
  validate() {
    if (props.required && !value.value) {
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