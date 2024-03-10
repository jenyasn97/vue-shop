<template>
  <div class="flex justify-between gap-4 border border-slate-200 rounded-xl p-4 mt-4 items-center">
    <img class="w-16 h-16" :src="item.imageUrl" :alt="item.title" />

    <div class="flex justify-between flex-col">
      <p class="mb-1">{{ item.title }}</p>
      <div class="flex justify-between items-center">
        <b> {{ item.price }} руб.</b>
        <img
          @click="onClickRemove"
          class="cursor-pointer opacity-30 hover:opacity-100 transition"
          src="/close.svg"
          alt="close"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object
})
const emit = defineEmits(['on-click-remove'])
const onClickRemove = () => {
  emit('on-click-remove')
}
</script>
