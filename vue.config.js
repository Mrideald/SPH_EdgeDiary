const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  //关闭eslint校验功能关闭
   lintOnSave:false,

   devServer: {
    proxy: {
      '/api': {
        target:'http://gmall-h5-api.atguigu.cn',
         changeOrigin: true
      },
    }
  }
})
