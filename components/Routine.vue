<script lang="ts" setup>
import Routine from "~/server/model/Routine";
import { BanIcon, PencilAltIcon } from "@heroicons/vue/solid"
import {useFetch} from "#app";

defineProps<{
  data: Routine,
  compact: boolean
}>()
const emit = defineEmits(['refresh'])

const remove = (id) => {
  useFetch('/api/routines', {
    method: 'delete',
    body: {
      _id: id
    }
  })

  emit('refresh')
}
</script>

<template>
  <div v-if="compact" class="mx-auto group shadow-md px-6 py-4 text-2xl flex justify-between hover:bg-gray-50">

    <span>{{ data.contents.title }}</span>
    <span class="flex gap-2 invisible group-hover:visible">
      <span class="hidden sm:block hover:bg-blue-50">
        <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <PencilAltIcon class="ml-1 mr-2 h-5 w-5 text-gray-500"/>
        </button>
      </span>
      <span class="hidden sm:block hover:bg-red-50">
        <button @click="remove(data._id)" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <BanIcon class="ml-1 mr-2 h-5 w-5 text-gray-500"/>
        </button>
      </span>
    </span>

  </div>
  <div v-else class="shadow-lg max-w-5xl border-stone-200 border rounded">

    <div class="border-b-2 border-b-stone-500">
      <p class="text-3xl m-5 mb-0">{{ data.contents.title }}</p>
      <p class="text-stone-400 text-xs m-5 mt-0 ">_id: {{ data._id }}</p>
    </div>
    <div class="m-5">
      <span class="text-neutral-500 pl-1">Description</span>
      <div class="p-3 border rounded border-neutral-500">{{ data.contents.description }}</div>
    </div>

  </div>
</template>

<style scoped></style>
