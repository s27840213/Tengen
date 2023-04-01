<template lang="pug">
div(
  class="box-border grid justify-center gap-8 bg-black px-7 py-20 md:grid-cols-2 md:px-[clamp(0px,15vw,288px)] md:py-40")
  div(class="flex flex-col text-white text-P3")
    span(class="mb-6 text-H3") 器材分類
    div(class="flex flex-col gap-2")
      div(v-for="item in equipmentTypes" :key="item")
        a(class="highlight" href="#") {{ item }}
  div(class="flex flex-col text-white text-P3")
    img(
      class="mb-4 w-72 self-center object-contain md:self-start"
      src="@/assets/img/brand.png")
    span(class="mb-4 text-H3") 聯絡我們
    span(class="text-P4") '地址：澳門提督馬路祐適工業大廈9樓萬利文創A座1號
    span(class="text-P4") 電話預約：66526672
    span(class="text-P4") 營業時間：週一至週六 13:00pm ~ 19:30pm（預約限定）
    span(class="text-P4") Email: Tengen91010@gmail.com'
</template>

<script lang="ts" setup>
const equipmentTypes = [
  '> 相機',
  '> 燈光',
  '> 其他',
  '> 鏡頭',
  '> 收音',
  '> 腳架',
  '> 穩定器 & 承架系統'
]
</script>
