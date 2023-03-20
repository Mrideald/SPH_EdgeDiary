import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router/index'
//引入vuex的store
import store from './store/index'
//三级联动组件--全局组件，再使用的时候就可以直接使用，不用注册
import TypeNav from './components/TypeNav/TypeNav'
//全局轮播图组件  用不了 暂时先放在这
import Carousel from './components/Carousel/CarouselContainer'
//全局分页器组件
import Pagination from './components/Pagination/Pagination.vue'
//引入mockjs模拟数据
import './mock/mockSever'
//引入swiper样式
import 'swiper/css/swiper.css'
//三级联动，全局组件，第一个参数是组件的名字name，第二个参数是哪一个组件

//引入element ui
import ElementUI from 'element-ui';
//引入样式
import 'element-ui/lib/theme-chalk/index.css';

//局部引入elementui
//import {Button,MessageBox,Form,FormItem,Input} from 'element-ui'
//统一api 全部引入 可以直接使用 在后面
import * as API from '@/api/index'
//使用elementui
Vue.use(ElementUI);
//使用局部引入的element ui 第一种注册方式
//Vue.component(Button.name,Button)
//第二种注册方式
//Vue.use(Button,Form,FormItem,Input)
//第三种注册方式 挂在原型上
//Vue.prototype.$msgbox = MessageBox;
//Vue.prototype.$alert = MessageBox.alert;

Vue.component(TypeNav.name,TypeNav)
//轮播图全局组件
Vue.component(Carousel.name, Carousel);
//全局组件使用的时候在外面是用名字
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false

//引入插件懒加载
import VueLazyload from 'vue-lazyload'
//引入加载中的动态图
import xiaoxin from './assets/images/xiaoxin.gif'
//注册插件
//也可以直接注册Vue.use(VueLazyload) 下面这种写法是加点配置
Vue.use(VueLazyload,{
    loading:xiaoxin
})
// import myPlugins from './plugins/myPlugins'
// Vue.use(myPlugins,{
//   name:'appele'
// })


new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate(){
    Vue.prototype.$bus=this//安装全局事件总线
    //统一接口api文件夹里面的全部函数请求
    //统一引入
    //给原型添加一个$api 这个原型上的属性下面的实例也可以使用
    //例如this.$API.reqAddOrUpdateShopCart()
    Vue.prototype.$API=API
    }
}).$mount('#app')