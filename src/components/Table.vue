<template>
  <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">

    <table class="min-w-full">
      <thead class="bg-gray-50">
        <tr>
          <th v-for="(item, index) in props.head" :key="index" scope="col"
            class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
            {{ item.title }}
          </th>
        </tr>
      </thead>
      
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="(item, index) in props.list" :key="index">
          <td v-for="(head, index) in props.head" :key="index" class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
            <slot :name="head.field" :props="item" :index="index">
              {{ item[head.field] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup lang="ts">

interface IHead {
  title: string,
  field: string
}

interface IList {
  [key: string]: any
}

interface IProps {
  head: IHead[],
  list: IList[]
}


const props = withDefaults(defineProps<IProps>(), {
  head: () => [],
  list: () => []
})

</script>