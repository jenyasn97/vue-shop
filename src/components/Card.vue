<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img src="/like-1.svg" alt="like 1" class="absolute top-8 left-8" />
    <img :src="imageUrl" alt="sneakers-1" />
    <p class="mt-2" v-text="title"></p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>
      <img src="/plus.svg" alt="plus" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number
})
</script>
