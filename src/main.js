import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router/index'
//引入vuex的store
import store from './store/index'
//三级联动组件--全局组件，再使用的时候就可以直接使用，不用注册
import TypeNav from './components/TypeNav/TypeNav'
//全局轮播图组件  用不了 暂时先放在这
//import Carousel from './components/Carousel/CarouselContainer'
//引入mockjs模拟数据
import './mock/mockSever'
//引入swiper样式
import 'swiper/css/swiper.css'
//三级联动，全局组件，第一个参数是组件的名字name，第二个参数是哪一个组件
Vue.component(TypeNav.name,TypeNav)
//轮播图全局组件  不知道为啥用不了，暂时先放在这
//Vue.component(Carousel.name, Carousel);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')