<template lang="pug">
header-section(ref="headerSection" @updateSize="updateHeroSectionSize")
hero-section(
  :style="{ height: `${heroSectionSize}px` }"
  :updated="hasUpdatedHeroSectionSize")
div(class="block-p flex flex-col place-content-center items-center justify-center")
  heading-bar(class="mb-4" title="最新消息" subTitle="NEWS")
  div(
    class="grid snap-x snap-mandatory auto-cols-[100%] grid-flow-col gap-6 overflow-x-scroll py-6 scrollbar-hide sm:auto-cols-[calc((100%-24px)/2)] xl:auto-cols-[calc((100%-48px)/3)]")
    news-card(class="snap-center")
    news-card(class="snap-center")
    news-card(class="snap-center")
    news-card(class="snap-center")
    news-card(class="snap-center")
    news-card(class="snap-center")
    news-card(class="snap-center")
    news-card(class="snap-center")
    news-card(class="snap-center")
    news-card(class="snap-center")
    news-card(class="snap-center")
  div
    button(
      class="inline-block rounded-md bg-yellow px-14 py-5 text-black transition-colors text-H4 hover:bg-yellow-100") 查看全部
div(class="block-p")
  heading-bar(class="mb-4" title="產品資訊" subTitle="PRODUCT")
image-carousel(:slides="imgSlides")
div(class="block-p flex flex-col justify-center")
  heading-bar(class="mb-16" title="關於天元" subTitle="About US")
  div(class="grid gap-12 md:grid-cols-2")
    img(src="@/assets/img/sign.png")
    div(class="grid grid-rows-[1fr,auto]")
      p(class="mb-4 flex items-center text-P3 md:text-P2") {{ aboutUsContent }}
      div(class="flex justify-center")
        button(
          class="rounded-md bg-yellow px-14 py-5 text-black transition-colors text-H4 hover:bg-yellow-100") 了解更多
footer-section
</template>

<script lang="ts" setup>
import ImageCarousel from '@/components/carousel/ImageCarousel.vue'
import FooterSection from '@/components/FooterSection.vue'
import HeadingBar from '@/components/HeadingBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import NewsCard from '@/components/NewsCard.vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HeaderSection from '@/components/HeaderSection.vue'
import { nextTick, ref } from 'vue'

const headerSection = ref(null)
const heroSectionSize = ref(window.innerHeight)
const hasUpdatedHeroSectionSize = ref(false)
const aboutUsContent =
  '成立於2022年，是一間以中國澳門為根據地的公司，我們專營各類攝影器材, 相機, 鏡頭, 配件及其他數碼產品等。我們致力為專業人士，學校機構，政府機關，提供優質零售及出口批發業務, 如有任何查詢及協助， 歡迎聯絡我們，感謝支持。'

const updateHeroSectionSize = (val: number): void => {
  heroSectionSize.value -= val
  nextTick(() => {
    hasUpdatedHeroSectionSize.value = true
  })
}

const imgSlides = [
  require('@/assets/img/carousel/lg1.png'),
  require('@/assets/img/carousel/lg2.png'),
  require('@/assets/img/carousel/lg3.png')
]
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  position: relative;
  overflow-y: scroll;
}

.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
