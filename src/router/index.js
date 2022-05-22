//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
//配置路由
import Home from '../pages/Home/HomeContainer.vue'
import Login from '../pages/Login/LoginContainer.vue'
import Register from '../pages/Register/RegisterContaier.vue'
import Search from '../pages/Search/SearchContainer.vue'
//先把Vuerouter原型对象上的push和replace复制一份
const originRouter=VueRouter.prototype.push;
const originReplace=VueRouter.prototype.replace;

//第一个参数location:告诉原来的push和replace方法你往哪里跳转
//第二个参数resolve：成功的回调
//第三个参数reject：失败的回调
//call和apply的区别：
//相同点：都可以调用函数一次，都可以篡改函数上下文一次
//不同点：call和apply传递参数：call用逗号隔开，apply方法执行，传递数组
//重写push
VueRouter.prototype.push=function(location,resolve,reject){

 if(resolve||reject){
     originRouter.call(this,location,resolve,reject)
 }else{
     originRouter.call(this,location,()=>{},()=>{})
 }
}
//重写replace
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve||reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
const Router=new VueRouter({
    //配置路由
routes:[
{
    path:'/home',
    component:Home,
    meta:{showFoot:true}
},
{
    path:'/login',
    component:Login,
    meta:{showFoot:false}
},
{
    path:'/register',
    component:Register,
    meta:{showFoot:false}
},
{
    name:'search',
    path:'/search/:keyword?',//parmers参数占位
    component:Search,
    meta:{showFoot:true},
    props:true
},
//重定向，在项目跑起来的时候访问/，让他立马定向到首页
{
    path:'/',
    redirect:'/home'
}
]
})

export default Router