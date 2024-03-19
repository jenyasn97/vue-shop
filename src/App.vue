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
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { computed, provide, ref, watch } from 'vue'
import Header from './components/Header.vue'

import axios from 'axios'
import Drawer from './components/Drawer.vue'

/* Корзина */
const cart = ref([])
const totalPrice = computed(() => Math.round(cart.value.reduce((acc, item) => item.price + acc, 0)))
const vatPrice = computed(() => totalPrice.value * 0.05)
const drawerOpen = ref(false)
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
watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)
provide('cart', {
  cart,
  addToCard,
  closeDrawer,
  openDrawer,
  removeFromCard
})
/* Корзина */
</script>

<style scoped></style>
