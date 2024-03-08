<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      :onClickFavorite="() => addToFavorite(item)"
      :on-click-add="
        () => {
          addToCard(item)
        }
      "
    />
  </div>
</template>

<script setup>
import Card from './Card.vue'
import { inject } from 'vue'
const addToFavorite = inject('addToFavorite')
const addToCard = inject('add-to-card')

defineProps({
  items: Array
})
</script>
