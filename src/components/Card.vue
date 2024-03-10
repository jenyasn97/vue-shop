<template>
  <div
    class="flex flex-col justify-between relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img
      @click="onClickFavorite"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="like"
      class="absolute top-8 left-8"
    />
    <img class="w-26 h-26" :src="imageUrl" alt="sneakers-1" />
    <p class="mt-2 mb-5" v-text="title"></p>
    <div class="flex justify-between mt-5 mt-auto">
      <div class="flex flex-col w-full">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>
      <img
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        :alt="isAdded ? 'plus' : 'checked'"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>
