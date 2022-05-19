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
  }
}
</script>

<style>

</style>
