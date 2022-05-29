<script lang="ts" setup>
import {useFetch, useState} from "#app";

const emit = defineEmits(['close'])
const form = useState('routineForm', () => {
  return {
    contents: {
      title: null,
      description: null
    }
  }
})

const createRoutine = () => {
  useFetch('/api/routines', {
    method: 'post',
    body: {
      contents: {
        title: form.value.contents.title,
        description: form.value.contents.description
      }
    }
  })

  emit('close')
}
</script>

<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="mt-5 md:mt-0 md:col-span-2">

      <form @submit.prevent="createRoutine">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label for="routine-title" class="pl-1.5 block text-sm font-medium text-gray-700"> Title </label>
                <input v-model="form.contents.title" type="text" name="routine-title" id="routine-creator-title" class="p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
              </div>
            </div>

            <div>
              <label for="description" class="pl-1.5 block text-sm font-medium text-gray-700"> Description </label>
              <div class="mt-1">
                <textarea v-model="form.contents.description" id="routine-creator-description" name="description" rows="3" class="p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
              </div>
              <p class="mt-2 text-sm text-gray-500">Brief describe this routine.</p>
            </div>

          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
          </div>
        </div>
      </form>

    </div>
  </div>
<!--  <div>-->
<!--    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">-->

<!--      <div class="col-span-3 sm:col-span-2">-->
<!--        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>-->
<!--        <input type="text" name="title" id="routine-creator-title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />-->
<!--      </div>-->

<!--      <div>-->
<!--        <label for="description" class="block text-sm font-medium text-gray-700"> Description </label>-->
<!--        <div class="mt-1">-->
<!--          <textarea id="routine-creator-description" name="description" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />-->
<!--        </div>-->
<!--        <p class="mt-2 text-sm text-gray-500">Brief description for this routine.</p>-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
</template>