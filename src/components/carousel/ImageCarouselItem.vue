<template lang="pug">
transition(name="slide-in")
  img(
    v-show="currSlideIndex === index"
    :src="src"
    class="absolute left-0 top-0 h-full w-full object-cover")
</template>

<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  currSlideIndex: {
    type: Number,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>

<style lang="scss">
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.5s;
}

.slide-in-enter-from {
  transform: translateX(100%);
}

.slide-in-leave-to {
  transform: translateX(-100%);
}
</style>
