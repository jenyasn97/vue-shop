<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="true"
      :is-favorite="true"
      :onClickAdd="onClickAdd"
      :onFavoriteAdd="onFavoriteAdd"
    />
  </div>
</template>

<script setup>
import Card from './Card.vue'

const onClickAdd = () => {
  alert('Add')
}
const onFavoriteAdd = () => {
  alert('Favorite')
}

defineProps({
  items: Array
})
</script>
