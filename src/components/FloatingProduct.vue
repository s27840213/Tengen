<template lang="pug">
div(
  ref="productRef"
  v-element-hover="onHover"
  class="absolute left-0 top-0"
  :style="styles")
  a(:href="'#'")
    img(class="pulse" :style="imgStyles" :src="product.src")
</template>

<script lang="ts" setup>
import { IProduct } from '@/interface'
import { vElementHover } from '@vueuse/components'
import { computed, PropType, reactive, ref } from 'vue'

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  product: {
    type: Object as PropType<IProduct>,
    required: true
  },
  productWidth: {
    type: Number,
    default: 240
  },
  updated: {
    type: Boolean,
    required: false
  },
  isHovered: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:hoveredProductSrc'])

const productRef = ref<HTMLElement | null>(null)

const styles = computed(() => {
  return {
    transform: `translate(${props.product.x}px, ${props.product.y}px)`,
    width: `${props.productWidth}px`
  }
})

const onHover = (state: boolean) => {
  emit('update:hoveredProductSrc', state ? props.product.hoverImgSrc : '')
}

const imgStyles = reactive({
  animationDelay: `${Math.random() * 4}s`
})
</script>

<style lang="scss" scoped>
.pulse {
  animation: pulse 4s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  25% {
    transform: scale(1.3);
    opacity: 0.9;
  }
  45% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
