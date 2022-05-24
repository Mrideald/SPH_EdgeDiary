import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router/index'
//引入vuex的store
import store from './store/index'
//三级联动组件--全局组件，再使用的时候就可以直接使用，不用注册
import TypeNav from './components/TypeNav/TypeNav'
//引入mockjs模拟数据
import './mock/mockSever'
//三级联动，全局组件，第一个参数是组件的名字name，第二个参数是哪一个组件
Vue.component(TypeNav.name,TypeNav)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')