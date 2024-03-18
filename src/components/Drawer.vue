<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70"></div>
  <div class="bg-white p-8 fixed top-0 right-0 w-96 h-full z-20 flex flex-col">
    <DrawerHeade />
    <div v-if="!totalPrice" class="flex h-full items-center">
      <infoBlock
        title="Корзина пустая"
        description="Добавьте хотя бы один товар, чтобы сделать заказ"
        imageUrl="/package-icon.png"
      />
    </div>
    <div v-else></div>
    <CartItemList v-if="totalPrice" />

    <div v-if="totalPrice" class="flex flex-col gap-4 mt-auto">
      <div class="flex gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>
          {{ vatPrice.toFixed(2) }}
          р.</b
        >
      </div>
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>
          {{ totalPrice }}
          р.</b
        >
      </div>

      <button
        :disabled="buttonDisabled"
        @click="emit('createOrder')"
        class="w-full bg-lime-500 py-3 rounded-xl mt-4 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 transition cursor-pointer"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<script setup>
import DrawerHeade from './DrawerHeade.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const emit = defineEmits(['createOrder'])

defineProps({
  cartArr: Array,
  totalPrice: Number,
  vatPrice: Number,
  buttonDisabled: Boolean
})
</script>
