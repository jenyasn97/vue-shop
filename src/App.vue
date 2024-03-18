<template>
  <Drawer
    v-if="drawerOpen"
    :cart-arr="cart"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    @create-order="createOrder"
    :button-disabled="cartButtonDisabled"
  />

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" :cart-arr="cart" />

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
      <CardList :items="items" @add-to-card="addToCard" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from 'vue'
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import axios from 'axios'
import Drawer from './components/Drawer.vue'

let items = ref([])
const drawerOpen = ref(false)

const cart = ref([])
const totalPrice = computed(() => Math.round(cart.value.reduce((acc, item) => item.price + acc, 0)))
const vatPrice = computed(() => totalPrice.value * 0.05)
const isCreatingOrder = ref(false)

const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCard = (item) => {
  cart.value.push(item)
  item.isAdded = true
}
const removeFromCard = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
  console.log('click')
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://50e3fbb143621017.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    })

    cart.value = []
    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCard(item)
  } else {
    removeFromCard(item)
  }
}

const filters = ref({ sortBy: 'title', searchQuery: '' })
const onChengeSelect = (event) => {
  filters.value.sortBy = event.target.value
}

const onChengeSearchInput = (event) => {
  filters.value.searchQuery = event.target.value
}

const fetchFavotits = async () => {
  try {
    const { data: favorites } = await axios.get('https://50e3fbb143621017.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)
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

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
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

watch(filters.value, fetchItems)
watch(cart, () => {
  items.value = items.value.map((item) => ({ ...item, isAdded: false }))
})

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)
provide('addToFavorite', addToFavorite)
provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  removeFromCard
})
provide('add-to-card', onClickAddPlus)
</script>

<style scoped></style>
