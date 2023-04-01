<template lang="pug">
div(class="carousel flexitems-center h-[clamp(300px,50vw,600px)] w-full justify-center")
  div(class="relative h-full w-full overflow-hidden")
    image-carousel-item(
      v-for="(slide, index) in slides"
      :key="slide"
      :src="slide"
      :index="index"
      :currSlideIndex="currSlideIndex")
</template>

<script lang="ts" setup>
import { onMounted, PropType, ref } from 'vue'
import ImageCarouselItem from './ImageCarouselItem.vue'

const props = defineProps({
  slides: {
    type: Array as PropType<string[]>,
    required: true
  }
})

const currSlideIndex = ref(0)
const slideInterval = ref(-1)
onMounted(() => {
  slideInterval.value = setInterval(() => {
    currSlideIndex.value = (currSlideIndex.value + 1) % props.slides.length
  }, 3000)
})
</script>
