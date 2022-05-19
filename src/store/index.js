import Vue from 'vue'
import Vuex from 'vuex'
//使用插件
Vue.use(Vuex)
import home from './home/indexHome'
import search from './search/indexSearch'
//对外暴露store类的一个实例
export default new Vuex.Store({
 modules:{
 home,search
 }
})