<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70"></div>
  <div class="bg-white p-8 fixed top-0 right-0 w-96 h-full z-20 flex flex-col">
    <DrawerHeade />

    <div v-if="!props.totalPrice || orderId" class="flex h-full items-center">
      <infoBlock
        v-if="!props.totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы один товар, чтобы сделать заказ"
        imageUrl="/package-icon.png"
      />
      <infoBlock
        v-if="orderId"
        title="Заказ оформлен"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
        imageUrl="/order-success-icon.png"
      />
    </div>

    <div v-else class="h-full flex flex-col">
      <CartItemList />

      <div class="flex flex-col gap-4 mt-auto">
        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>
            {{ props.vatPrice.toFixed(2) }}
            р.</b
          >
        </div>
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>
            {{ props.totalPrice }}
            р.</b
          >
        </div>

        <button
          :disabled="buttonDisabled"
          @click="createOrder"
          class="w-full bg-lime-500 py-3 rounded-xl mt-4 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 transition cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import DrawerHeade from './DrawerHeade.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'
import axios from 'axios'
import { inject, ref, computed } from 'vue'

const { cart } = inject('cart')

const props = defineProps({
  totalPrice: Number,
  cartArr: Array,
  vatPrice: Number
})
const isCreating = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post('https://50e3fbb143621017.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })

    cart.value = []
    orderId.value = data.id
  } catch (error) {
    console.log(error)
  } finally {
    isCreating.value = false
  }
}
const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>
