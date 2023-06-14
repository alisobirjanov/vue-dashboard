<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import DashboardLayout from './layouts/DashboardLayout.vue'
import EmptyLayout from './layouts/EmptyLayout.vue'

const route = useRoute()

const layout = computed(() => route.meta.layout === 'empty' ? EmptyLayout : DashboardLayout)
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
