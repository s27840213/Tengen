<template lang="pug">
div(class="flex w-full flex-col border-b-2 border-b-gray py-3")
  span(class="mb-1 text-H4--400") {{ uppercaseSubTitle }}
  span(class="text-H1") {{ uppercaseTitle }}
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'title'
  },
  subTitle: {
    type: String,
    default: 'subTitle'
  }
})
const uppercaseSubTitle = computed(() => {
  return props.subTitle.toUpperCase()
})

const uppercaseTitle = computed(() => {
  return props.title.toUpperCase()
})
</script>
