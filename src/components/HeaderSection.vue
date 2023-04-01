<template lang="pug">
div(ref="decoration" class="z-50 h-6 w-full bg-yellow md:h-10")
header(
  ref="headerSection"
  class="header-section sticky left-0 top-0 z-50 flex h-20 w-full items-center justify-center bg-black md:gap-12 lg:gap-36")
  img(class="h-14" src="@/assets/img/brand.png")
  div(class="hidden h-[60%] w-0.5 bg-yellow md:block")
  div(class="hidden items-center gap-11 md:flex")
    div(v-for="item in headerItems" :key="item.name")
      a(class="highlight text-white" :href="item.link") {{ item.name }}
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
const emit = defineEmits(['updateSize'])
const decoration = ref<HTMLElement | null>(null)
const headerSection = ref<HTMLElement | null>(null)

const headerSize = ref(0)

const headerItems = reactive([
  { name: '首頁', link: '/' },
  { name: '快速預約及器材報價', link: '/about' },
  { name: '最新資訊', link: '/contact' },
  { name: '關於我們', link: '/contact' },
  { name: '課程活動', link: '/contact' }
])

onMounted(() => {
  headerSize.value =
    (decoration.value as HTMLElement).clientHeight +
    (headerSection.value as HTMLElement).clientHeight
  emit('updateSize', headerSize.value)
})
</script>
