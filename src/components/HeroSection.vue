<template lang="pug">
div(
  ref="heroSection"
  class="relative flex h-full w-full items-center justify-center overflow-hidden border-b-2 border-black")
  img(
    class="pointer-events-none z-10 h-16 drop-shadow-[4px_4px_0px_white]"
    src="@/assets/img/logo.svg")
  //- transition(name="fade" mode="out-in")
  //-   img(
  //-     v-if="hoveredProductSrc"
  //-     class="pointer-events-none absolute z-10 h-1/2"
  //-     :src="hoveredProductSrc")
  template(v-if="heroSection && width && height")
    floating-product(
      v-for="(product, index) in products"
      :key="product.src"
      :index="index"
      :product="product"
      :container="heroSection"
      :containerWidth="width"
      :containerHeight="height"
      :productWidth="productWidth"
      :degree="(index / products.length) * 360"
      :updated="updated"
      :isHovered="hoveredProductSrc !== ''"
      @update:hoveredProductSrc="updateHoveredProductSrc")
</template>

<script lang="ts" setup>
import { IProduct } from '@/interface'
import { useElementSize } from '@vueuse/core'
import { computed, ref } from 'vue'
import FloatingProduct from './FloatingProduct.vue'
defineProps({
  updated: {
    type: Boolean,
    default: false
  }
})

const heroSection = ref<HTMLElement | undefined>(undefined)
const { width, height } = useElementSize(heroSection)
const hoveredProductSrc = ref('')
const productWidth = computed(() => {
  return width.value > 1024 ? 240 : width.value > 768 ? 180 : 120
})

function updateHoveredProductSrc(productSrc: string) {
  hoveredProductSrc.value = productSrc
}
const products: IProduct[] = [
  {
    src: require('@/assets/img/product/product-1.png'),
    hoverImgSrc: require('@/assets/img/demo-1.png'),
    link: '#'
  },
  {
    src: require('@/assets/img/product/product-2.png'),
    hoverImgSrc: require('@/assets/img/demo-1.png'),
    link: '#'
  },
  {
    src: require('@/assets/img/product/product-3.png'),
    hoverImgSrc: require('@/assets/img/demo-1.png'),
    link: '#'
  },
  {
    src: require('@/assets/img/product/product-4.png'),
    hoverImgSrc: require('@/assets/img/demo-1.png'),
    link: '#'
  },
  {
    src: require('@/assets/img/product/product-2.png'),
    hoverImgSrc: require('@/assets/img/demo-1.png'),
    link: '#'
  },
  {
    src: require('@/assets/img/product/product-4.png'),
    hoverImgSrc: require('@/assets/img/demo-1.png'),
    link: '#'
  },
  {
    src: require('@/assets/img/product/product-4.png'),
    hoverImgSrc: require('@/assets/img/demo-1.png'),
    link: '#'
  },
  {
    src: require('@/assets/img/product/product-4.png'),
    hoverImgSrc: require('@/assets/img/demo-1.png'),
    link: '#'
  }
]
</script>
