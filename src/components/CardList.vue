<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские кроссовки Nike Blazer Mid Suede"
      :price="12990"
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
</script>
