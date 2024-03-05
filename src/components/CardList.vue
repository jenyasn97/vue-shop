<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      :onClickAdd="onClickAdd"
      :onFavoriteAdd="onFavoriteAdd"
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import Card from './Card.vue'

const onClickAdd = () => {
  alert('Add')
}
const onFavoriteAdd = () => {
  alert('Favorite')
  addToFavorite()
}

defineProps({
  items: Array
})

inject('addToFavorite')
</script>
