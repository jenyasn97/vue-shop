<template>
  <!-- <Drawer /> -->

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header />

    <div class="p-10">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>

        <div class="flex gap-4">
          <select
            @change="onChengeSelect"
            class="py-2 px-3 border border-slate-200 rounded-md outline-none"
          >
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" alt="search" />
            <input
              @input="onChengeSearchInput"
              class="border rounded-md pl-11 py-2 pr-4 outline-none focus:border-slate-400"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>
      <CardList :items="items" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import axios from 'axios'
/* import Drawer from './components/Drawer.vue'
 */

let items = ref([])

const filters = ref({ sortBy: 'title', searchQuery: '' })
const onChengeSelect = (event) => {
  filters.value.sortBy = event.target.value
}

const onChengeSearchInput = (event) => {
  filters.value.searchQuery = event.target.value
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.value.sortBy
    }
    if (filters.value.searchQuery) {
      params.title = `*${filters.value.searchQuery}*`
    }

    const { data } = await axios.get('https://50e3fbb143621017.mokky.dev/items', {
      params
    })
    items.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchItems)
/*   fetch('https://50e3fbb143621017.mokky.dev/items')
    .then((res) => res.json())
    .then((res) => items.value.push(...res)) */
/* axios.get('https://50e3fbb143621017.mokky.dev/items').then((res) => items.value.push(...res.data)) */

watch(filters.value, fetchItems)
</script>

<style scoped></style>
