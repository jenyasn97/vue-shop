<template>
  <div class="grid grid-cols-4 gap-5">
    <Card image-url="/sneakers/sneakers-1.jpg" title="Мужские кроссовки Nike Blazer Mid Suede" :price="12990"/>
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
  </div>
</template>

<script setup>
import Card from './Card.vue'
</script>
