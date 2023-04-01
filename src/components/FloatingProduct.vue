<template lang="pug">
div(
  ref="productRef"
  v-element-hover="onHover"
  class="absolute left-0 top-0"
  :style="styles")
  a(:href="'#'")
    img(:src="product.src")
</template>

<script lang="ts" setup>
import useMath from '@/composables/useMath'
import { IProduct } from '@/interface'
import { vElementHover } from '@vueuse/components'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
  watch
} from 'vue'

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  product: {
    type: Object as PropType<IProduct>,
    required: true
  },
  containerWidth: {
    type: Number,
    required: true
  },
  containerHeight: {
    type: Number,
    required: true
  },
  productWidth: {
    type: Number,
    default: 240
  },
  degree: {
    type: Number,
    required: true
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

const pos = reactive({
  x: 0,
  y: 0
})

const { getRotatedPoint } = useMath()

const containerOrigin = computed(() => {
  return {
    x: props.containerWidth / 2,
    y: props.containerHeight / 2
  }
})

const styles = computed(() => {
  return {
    transform: `translate(${pos.x}px, ${pos.y}px)`,
    width: `${props.productWidth}px`
  }
})

const calcProductInitPos = () => {
  const x = props.containerWidth / 2
  /**
   * the 25 is the padding between the product and the container
   */
  const y = props.productWidth / 2 + 25
  const containerAspectRatio = props.containerWidth / props.containerHeight
  const rotatedPoints = getRotatedPoint(
    props.degree % 360,
    containerOrigin.value,
    {
      x,
      y
    },
    containerAspectRatio
  )

  pos.x = rotatedPoints.x - props.productWidth / 2
  pos.y = rotatedPoints.y - props.productWidth / 2
}

const vertorAngle = Math.random() * 360
const vector = {
  x: 1 * Math.cos(vertorAngle),
  y: 1 * Math.sin(vertorAngle)
}

function updatePos() {
  pos.x += vector.x
  pos.y += vector.y
  if (pos.x > props.containerWidth - props.productWidth) {
    vector.x = -1
  }
  if (pos.x < 0) {
    vector.x = 1
  }
  if (pos.y > props.containerHeight - props.productWidth) {
    vector.y = -1
  }
  if (pos.y < 0) {
    vector.y = 1
  }
}

watch(
  () => props.containerWidth,
  () => {
    calcProductInitPos()
  }
)

let timerId = -1

onMounted(() => {
  calcProductInitPos()
  timerId = setInterval(() => {
    if (!props.isHovered) {
      updatePos()
    }
  }, 1000 / 60)
})

onBeforeUnmount(() => {
  clearInterval(timerId)
})

const onHover = (state: boolean) => {
  emit('update:hoveredProductSrc', state ? props.product.hoverImgSrc : '')
}
</script>
