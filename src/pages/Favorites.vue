<template>
  <div class="flex justify-between items-center mb-8">
    <h2 class="text-3xl font-bold">Закладки</h2>
    <div class="flex gap-4"></div>
  </div>
  <CardList :items="favorites" is-favorites />
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardList from '../components/CardList.vue'

const favorites = ref([])
onMounted(async () => {
  try {
    const { data } = await axios.get('https://50e3fbb143621017.mokky.dev/favorites')
    favorites.value = data.map((el) => {
      return el.item
    })
  } catch (err) {
    console.log(err)
  }
})
</script>
