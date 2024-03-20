<template>
  <div v-auto-animate class="d-block">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :item="item"
      @on-click-remove="() => removeFromCard(item)"
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeFromCard } = inject('cart')
</script>
