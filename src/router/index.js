//配置路由
import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);
import routes from "./routes"
//先把Vuerouter原型对象上的push和replace复制一份
const originRouter = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

//第一个参数location:跳转的参数
//第二个参数resolve：成功的回调
//第三个参数reject：失败的回调
//call和apply的区别：
//相同点：都可以调用函数一次，都可以篡改函数上下文一次
//不同点：call和apply传递参数：call用逗号隔开，apply方法执行，传递数组
//重写push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve || reject) {
    originRouter.call(this, location, resolve, reject);
  } else {
    originRouter.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写replace
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve || reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
// 对外暴露vuerouter类的实例
const Router = new VueRouter({
  //配置路由
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
});

//全局守卫：前置守卫(在路由跳转之间进行判断
Router.beforeEach(async(to,from,next)=>{
  //to:可以获取你要跳转到哪的路由信息
  //from ：可以获取到你从那个路由而来的信息
  //next 放行函数 next（）放行
  //获取token和用户信息 userinfo永远是空对象 一直是真
  const token=store.state.user.token
  const userInfo=store.state.user.userInfo
  //已登录的情况
  if(token){
  //如果你登录了还想去login 那么就跳转home
   if(to.path=='/login'||to.path=='/register'){
    next('/home')
   }else{
    //如果有用户信息直接放行
    if(userInfo.name){
       next()
    }else{
      try {
        //如果没有用户信息 先向服务器发请求 再放行
       await store.dispatch('getUserInfo')
        next()
      } catch (error) {
       //如果上面的也获取不到 那应该是token失效了 token失效，从新登录 一般时间很久没登陆了会失效
       //清除token
      await store.dispatch('logOutInfo')  //退出登录
       next('/login')
      }
    }
   }
  }
  //未登录的情况 待开发
  else{
    next()
  }
})


export default Router;
