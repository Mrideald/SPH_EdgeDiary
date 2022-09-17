import Vue from 'vue'
import Vuex from 'vuex'
//使用插件
Vue.use(Vuex)
import home from './home/indexHome'
import search from './search/indexSearch'
import detail from './detail/indexDetail'
import shopCart from './shopCart/shopCart'
import user from './user/user'
//对外暴露store类的一个实例
export default new Vuex.Store({
 modules:{
 home,search,detail,shopCart,user
 }
})