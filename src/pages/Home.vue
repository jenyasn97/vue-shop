<template>
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
  <CardList :items="items" @add-to-card="addToCard" />
</template>

<script setup>
import { inject, ref, watch, onMounted, provide } from 'vue'
import CardList from '../components/CardList.vue'
import axios from 'axios'

const { addToCard, removeFromCard, cart } = inject('cart')

const filters = ref({ sortBy: 'title', searchQuery: '' })
const items = ref([])

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCard(item)
  } else {
    removeFromCard(item)
  }
}

const onChengeSelect = (event) => {
  filters.value.sortBy = event.target.value
}

const onChengeSearchInput = (event) => {
  filters.value.searchQuery = event.target.value
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id,
        item
      }
      item.isFavorite = true
      const { data } = await axios.post('https://50e3fbb143621017.mokky.dev/favorites', obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://50e3fbb143621017.mokky.dev/favorites/${+item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}
const fetchFavotits = async () => {
  try {
    const { data: favorites } = await axios.get('https://50e3fbb143621017.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)
      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.log(error)
  }
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
    items.value = data.map((item) => ({
      ...item,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  await fetchFavotits()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
/*   fetch('https://50e3fbb143621017.mokky.dev/items')
    .then((res) => res.json())
    .then((res) => items.value.push(...res)) */
/* axios.get('https://50e3fbb143621017.mokky.dev/items').then((res) => items.value.push(...res.data)) */

watch(cart, () => {
  items.value = items.value.map((item) => ({ ...item, isAdded: false }))
})
watch(filters.value, fetchItems)

provide('addToFavorite', addToFavorite)
provide('add-to-card', onClickAddPlus)
</script>
