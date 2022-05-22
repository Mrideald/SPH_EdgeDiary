<template>
  <div >
  <Header></Header>
<router-view></router-view>
<!-- footer在登录和注册的时候不显示 -->
  <Footer v-show="$route.meta.showFoot"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/HeaderContainer.vue'
import Footer from './components/Footer/FooterContainer.vue'
export default {
  name: 'App',
  components: {
     Header,Footer
  },
  mounted(){
    //获取三级联动二级列表数据
     //组件挂载完毕可以向服务器发请求避免重复发请求
    this.$store.dispatch("home/categroyList");
  }
}
</script>

<style>

</style>
