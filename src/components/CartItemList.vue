<template>
  <CartItem
    v-for="item in cart"
    :key="item.id"
    :item="item"
    @on-click-remove="() => removeFromCard(item)"
  />
</template>

<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeFromCard } = inject('cart')
</script>
