<template lang="pug">
div(
  ref="heroSection"
  class="relative flex h-full w-full items-center justify-center overflow-hidden border-b-2 border-black")
  img(
    ref="logo"
    class="pointer-events-none z-10 h-16 drop-shadow-[4px_4px_0px_white]"
    src="@/assets/img/logo.svg")
  //- transition(name="fade" mode="out-in")
  //-   img(
  //-     v-if="hoveredProductSrc"
  //-     class="pointer-events-none absolute z-10 h-1/2"
  //-     :src="hoveredProductSrc")
  div(class="test bg-gray" :style="testRectStyle")
  template(v-if="heroSection && heroSectionWidth && heroSectionHeight")
    floating-product(
      v-for="(product, index) in products"
      :key="product.src"
      ref="productRefs"
      :index="index"
      :product="product"
      :container="heroSection"
      :containerWidth="heroSectionWidth"
      :containerHeight="heroSectionHeight"
      :productWidth="productWidth"
      :degree="(index / products.length) * 360"
      :updated="updated"
      :isHovered="hoveredProductSrc !== ''"
      @update:hoveredProductSrc="updateHoveredProductSrc")
</template>

<script lang="ts" setup>
import useMath from '@/composables/useMath'
import { IProduct } from '@/interface'
import { useElementBounding, useElementSize } from '@vueuse/core'
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import FloatingProduct from './FloatingProduct.vue'
defineProps({
  updated: {
    type: Boolean,
    default: false
  }
})
const VECTOR_NUM = 2
const productRefs = ref<HTMLElement[]>(null as unknown as HTMLElement[])
const heroSection = ref<HTMLElement | undefined>(undefined)
const heroSectionBounding = useElementBounding(heroSection)
const logo = ref<HTMLElement>(undefined as unknown as HTMLElement)
const logoBounding = useElementBounding(logo)
const testRectStyle = computed(() => {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${logoBounding.width.value}px`,
    height: `${logoBounding.height.value}px`,
    transform: `translate(${logoProps.value.x}px, ${logoProps.value.y}px)`
  }
})
const logoProps = computed(() => {
  return {
    x: logoBounding.left.value - heroSectionBounding.left.value,
    y: logoBounding.top.value - heroSectionBounding.top.value,
    width: logoBounding.width.value,
    height: logoBounding.height.value,
    aspectRatio: logoBounding.width.value / logoBounding.height.value
  }
})
const { width: heroSectionWidth, height: heroSectionHeight } =
  useElementSize(heroSection)
const hoveredProductSrc = ref('')
const productWidth = computed(() => {
  return heroSectionWidth.value > 1024
    ? 180
    : heroSectionWidth.value > 768
    ? 120
    : 80
})

function updateHoveredProductSrc(productSrc: string) {
  hoveredProductSrc.value = productSrc
}

const calcProductInitPos = (degree: number) => {
  const x = heroSectionWidth.value / 2
  /**
   * the 25 is the padding between the product and the container
   */
  const y = productWidth.value / 2 + 25
  const containerAspectRatio = heroSectionWidth.value / heroSectionHeight.value

  const rotatedPoints = getRotatedPoint(
    degree % 360,
    containerOrigin.value,
    {
      x,
      y
    },
    containerAspectRatio
  )

  return {
    x: rotatedPoints.x - productWidth.value / 2,
    y: rotatedPoints.y - productWidth.value / 2
  }
}
const srcInfo = [
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
  }
]
const products: Array<IProduct> = reactive([])

// new logic
const { getRotatedPoint } = useMath()

const containerOrigin = computed(() => {
  return {
    x: heroSectionWidth.value / 2,
    y: heroSectionHeight.value / 2
  }
})

function updatePos(product: IProduct) {
  product.x += product.vectorX
  product.y += product.vectorY
  if (product.x > heroSectionWidth.value - productWidth.value) {
    product.vectorX = -VECTOR_NUM
  }
  if (product.x < 0) {
    product.vectorX = VECTOR_NUM
  }
  if (product.y > heroSectionHeight.value - productWidth.value) {
    product.vectorY = -VECTOR_NUM
  }
  if (product.y < 0) {
    product.vectorY = VECTOR_NUM
  }
}

function updateAllProductPos() {
  products.forEach((product) => {
    updatePos(product)
  })
}

function checkCollisions() {
  const numProducts = products.length // cache the length of the products array

  for (let i = 0; i < numProducts; i++) {
    // use numProducts - 1 to avoid unnecessary iterations
    const p1 = products[i]

    // check collision with other products
    for (let j = i + 1; j < numProducts; j++) {
      // start from i + 1 to avoid checking pairs twice
      const p2 = products[j]

      if (
        p1.x + p1.width >= p2.x &&
        p1.x <= p2.x + p2.width &&
        p1.y + p1.height >= p2.y &&
        p1.y <= p2.y + p2.height
      ) {
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y

        if (Math.abs(dx) > Math.abs(dy)) {
          // collision is on the left or right side
          const sign = Math.sign(dx) // use Math.sign instead of conditional operator
          p1.vectorX = sign * VECTOR_NUM
          p2.vectorX = -sign * VECTOR_NUM
        } else {
          // collision is on the top or bottom side
          const sign = Math.sign(dy)
          p1.vectorY = sign * VECTOR_NUM
          p2.vectorY = -sign * VECTOR_NUM
        }
      }
    }

    // check collision with logo
    if (
      p1.x + p1.width >= logoProps.value.x &&
      p1.x <= logoProps.value.x + logoProps.value.width &&
      p1.y + p1.height >= logoProps.value.y &&
      p1.y <= logoProps.value.y + logoProps.value.height
    ) {
      const dx = p1.x - logoProps.value.x
      const dy = (p1.y - logoProps.value.y) * logoProps.value.aspectRatio

      // const sign = Math.sign(dx)
      // p1.vectorX = sign * VECTOR_NUM
      // const signY = Math.sign(dy)
      // p1.vectorY = signY * VECTOR_NUM
      if (Math.abs(dx) > Math.abs(dy)) {
        const sign = Math.sign(dx)
        p1.vectorX = sign * VECTOR_NUM
      } else {
        const sign = Math.sign(dy)
        p1.vectorY = sign * VECTOR_NUM
      }
    }
  }
}

watch(
  () => heroSectionWidth.value,
  () => {
    products.push(
      ...srcInfo.map(
        (
          initData: { src: string; hoverImgSrc: string; link: string },
          index
        ) => {
          const { src, hoverImgSrc, link } = initData
          const deg = Math.random() * 360
          return {
            src,
            hoverImgSrc,
            link,
            ...calcProductInitPos((index / srcInfo.length) * 360),
            width: productWidth.value,
            height: productWidth.value,
            vectorX: VECTOR_NUM * Math.cos(deg),
            vectorY: VECTOR_NUM * Math.sin(deg)
          }
        }
      )
    )

    timerId = setInterval(() => {
      checkCollisions()
      updateAllProductPos()
    }, 1000 / 60)
  }
)

let timerId = -1

onBeforeUnmount(() => {
  clearInterval(timerId)
})
</script>
