/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/index.scss";`
      }
    }
  }
})
