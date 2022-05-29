<script lang="ts" setup>
import { Disclosure} from '@headlessui/vue'
import { BellIcon, PlusIcon } from '@heroicons/vue/outline'
import {useLazyFetch, useState} from "#app";
import RoutineCreator from "~/components/RoutineCreator.vue";

const {pending, data, refresh} = useLazyFetch('/api/routines')

const navigation = [
  { name: 'Dashboard', href: '#', current: false },
  { name: 'Routines', href: '#', current: true }
]

const actionButtons = [
  { name: 'New Routine', method: () => currentComponent.value = "creator" },
  // { name: 'New Task', method: () => console.log("created task") }
]

const currentComponent = useState('currentComponent', () => "listing")
const toListing = () => {
  currentComponent.value = 'listing'
  refresh()
}
</script>

<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </Disclosure>

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ navigation.find(page => page.current).name }}
          <span v-if="currentComponent !== 'listing'" class="font-light">{{ ' / ' + currentComponent }}</span>
        </h1>
      </div>
    </header>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

        <div class="mt-5 flex gap-3 lg:mt-0 lg:ml-4">
            <span :class="{ 'invisible': currentComponent !== 'listing' }" class="hidden sm:block" v-for="(action, index) in actionButtons" :key="index">
              <button @click="action.method" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusIcon class="ml-1 mr-2 h-5 w-5 text-gray-500"/>
                {{ action.name }}
              </button>
            </span>
          </div>

        <div class="px-4 py-6 sm:px-0">
          <div>
              <div v-if="pending">
                Loading..
              </div>
              <div v-else-if="currentComponent === 'creator'">
                <RoutineCreator @close="toListing()"/>
              </div>
              <div v-else class="flex flex-col gap-2">
                <routine class="w-full" v-for="(routine, index) in data" :key="index" :data="routine" :compact="true" @refresh="() => refresh()"/>
              </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped></style>
