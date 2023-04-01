<template lang="pug">
div(
  class="flex w-full min-w-[33.33%] flex-col shadow-yellow transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[4px_4px_0px_theme(colors.yellow)]")
  img(src="@/assets/img/demo-1.png")
  div(
    class="box-border flex flex-col justify-center gap-3 border-2 border-t-[12px] border-yellow bg-white px-6 py-8 md:px-9 md:py-12")
    span(class="text-H4") {{ title }}
    span(class="text-gray text-P3") {{ dateInfo }}
    p(class="line-clamp-5 text-gray text-P3") {{ content }}
    div
      span(class="highlight cursor-pointer text-H6") Read More...
</template>

<script lang="ts" setup>
defineProps({
  imgSrc: {
    type: String,
    default: '@/assets/img/demo-1.png'
  },
  title: {
    type: String,
    default: '天元《畢製NO NG》 租賃計劃正式上線！'
  },
  dateInfo: {
    type: String,
    default: '13 March，2023 / By Admin , No Comment'
  },
  content: {
    type: String,
    default:
      '活動時間：2023.02.20 - 2023.09.30💫參與對象：本澳各高中、大專院校（含研究所） 應屆畢業生與其他需以拍攝影片作為畢製之學生💫活動內容：凡申請天元《畢製NO NG》租賃計劃活動通過者，享以下優惠'
  }
})
</script>
