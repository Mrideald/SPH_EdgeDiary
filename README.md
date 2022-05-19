# 项目笔记

## day1

> 进入页面默认访问哪一个路由（重定向）
>
> ```
> 在router的index.js页面配置路由时写上
> //重定向，在项目跑起来的时候访问/，让他立马定向到首页
> {
> path:'/',
> redirect:'/路径'(就是默认访问的那个路由的path)
> }
> ```

**路由的跳转**

1. 声明时导航router-link ，可以进行路由的跳转
2. 编程式导航push|replace ，可以进行路由的跳转

编程式导航：声明式导航能做的，编程式导航都能做，但是编程式导航除了可以进行路由的跳转，还可以做一些别的业务

没其他复杂的业务只需要跳转的话就用声明式导航，必须配置to

## 路由元信息配置

当页面在登录或者注册的时候footer组件不显示

可以通过在footer标签里面写v-show=“$route.path==xxx”来判断什么显示什么不显示

第二种就是配置路由元信息

```
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
    path:'/search',
    component:Search,
    meta:{showFoot:true}
},

然后配置v-show
<Footer v-show="$route.meta.showFoot"></Footer>
```

## 三种路由传参

1. 字符串形式

   ```
   this.$router.push("/search/"+this.keyword+"?k="+this.keyword.toUpperCase())
   ```

2. 模板字符串形式

   ```
   this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
   ```

    

3. 对象形式

   ```
   this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
   ```

   

## 面试题

1. 如有传递参数（对象写法）path是否可以结合params参数一起使用

   答：不能，params结合name使用，不然会出现问题

2. 如何指定params参数可穿可不穿

   答：比如你在路由配置的时候使用了占位符（params参数），但是路由跳转的时候就不传递

   路径：http://localhost:8080/#/?k=123 无法显示路由以及params参数

   解决：在占位符后面加个?号 path:'/search/:keyword?',

3. params参数可以传递也可以不传递，但是如果传递的是空串如何解决?

   undefined解决

   `` this.$router.push({name:'search',params:{keyword:''||undefined},query:{k:this.keyword.toUpperCase()}})``

4. 路由组件能不能传递props数据，是可以的

   解释在路由笔记里面写了的有三种方法，官方推荐写props:true

## 重写push和replace

当你使用编程式路由跳转时，一直重复跳转会报错

因为vue-router3.5.3 最新的vue-router引入了promise

**解决：**

①在跳转后面添加跳转成功和失败的回调，不返回东西就好了(治标不治本)

```
 this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{}
 )
```

②

```vue
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
//函数的this指向call的第一个参数,这边第一个参数this是vuerouter的实例
     originRouter.call(this,location,resolve,reject)
 }else{
     originRouter.call(this,location,()=>{},()=>{})
 }
}
//重写replace
VueRouter.prototype.replace=function(location,resolve,reject){
//如果有成功或者失败的回调就调用这个
    if(resolve||reject){
        originReplace.call(this,location,resolve,reject)
    }else{
//没有成功或者失败的回调就调用这个
        originReplace.call(this,location,()=>{},()=>{})
    }
}
```

## 三级联动，全局组件

*//三级联动组件--全局组件，再使用的时候就可以直接使用，不用注册*

import TypeNav from '../src/pages/Home/TypeNav/TypeNav.vue'

*//三级联动，全局组件，第一个参数是组件的名字name，第二个参数是哪一个组件*

Vue.component(TypeNav.name,TypeNav)

## axios二次封装

1. 向服务器发请求的几种方式

   XMLHttpRequest,fetch,JQ,axios(常用)

2. 为什么需要二次封装axios

   请求拦截器，响应拦截器

   请求拦截器：可以在请求发起之前处理一些业务

   响应拦截器：可以在服务器数据返回以后处理一些事情

   ```js
   //对axios进行二次封装
   import axios from 'axios'
   
   //1. 利用axios对象的方法create创建一个axios实例
   //2. requests就是axios，只不过稍微配置一下
   
   const requests =axios.create({
       //配置对象
       //基础路径，发请求的时候路径会出现一个/api
       baseURL:'/api',
       //代表请求超时的时间5s
       timeout:5000
   });
   
   //请求拦截器 可以在请求发起之前处理一些业务
   requests.interceptors.request.use((config)=>{
       //config  配置对象，对象里面有个属性很重要，headers请求头
       return config;
   })
   
   //响应拦截器
   requests.interceptors.response.use((res)=>{
       //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到可以做一些事情
      return res.data
   },
   (error)=>{
       //响应失败的回调函数
       return Promise.reject(error)
   }
   )
   export default requests;
   ```

## 对 api 统一管理

```
对 index.js 的配置
//对api进行统一管理
import requests from "./request";

//三级联动接口
//     /api/product/getBaseCategoryList   get请求  无参数

//暴露一个函数发请求
//发请求，因为在axios二次封装里面配置了baseURL 默认地址都含有/api，所以这里地址不用带/api
//axios发请求返回结果promise对象
export const reqCategoryList=()=>{
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}


在main.js
//引入api
import {reqCategoryList} from './api/index'
reqCategoryList();
```

## nprogress进度条的使用

```
npm i nprogress
```

**在对axios二次封装的request.js文件里面配置**

```
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css"

start（）进度条开始  done()进度条结束

在请求拦截器配置开始，在响应拦截器配置结束
 //start 进度条开始
   nprogress.start();
 //done 进度条结束
   nprogress.done();
```

## Vuex 使用

如果项目很大组件很多就需要用这个来管理项目共用的数据

### 模块化vuex

```
//大仓库
import Vue from 'vue'
import Vuex from 'vuex'
//使用插件
Vue.use(Vuex)
import home from './home/indexHome'
import search from './search/indexSearch'
//对外暴露store类的一个实例
export default new Vuex.Store({
 modules:{
 home,search//模块化
 }
})

//Home小仓库
//home区
import {reqCategoryList} from '/src/api/index'  //引入api
const actions={
//async和await是cp，必须是成对出现的,详细的去看csdn吧
async categroyList(context){
  const result =await reqCategoryList();
  if(result.code==200){
  context.commit('CATEGROYLIST',result.data)
  }
 }
}
const mutations={
    CATEGROYLIST(state,categroyList){
    state.categroyList=categroyList,
    //这边只需16个，数组里面多了个东西，用pop弹出去
    categroyList=categroyList.pop()
    }
}
const state={
    categroyList:[]
}
const getters={

}
export default{
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}


//Search小仓库
//Search区
const action={

}
const mutations={

}
const state={

}
const getters={

}

export default{
namespaced:true,//记得添加命名空间
action,
mutations,
state,
getters
}
```

```vue
后面需要向vuex传数据的时候记得要写  小仓库(文件夹名字)/函数

//组件挂载完毕可以向服务器发请求
  mounted(){
   this.$store.dispatch('home/categroyList')
  }
```

**补充async和await**

- await关键字必须位于async函数内部
- await关键字后面需要一个promise对象（不是的话就调用resolve转换它）
- await关键字的返回结果就是其后面Promise执行的结果，可能是resolved或者
- rejected的值，注意最后执行完的是个值。
- 不能在普通箭头函数中使用await关键字，需要在箭头函数前面添加async
- await用来串行的执行异步操作，现实现并行可以考虑promise.all

**promise**

什么是Promise
所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。



Promise的作用
Promise的出现主要是解决地狱回调的问题，比如你需要结果需要请求很多个接口，这些接口的参数需要另外那个的接口返回的数据作为依赖，这样就需要我们一层嵌套一层，但是有了Promise 我们就无需嵌套



Promise的本质
我认为Promise的本质就是分离了异步数据获取和业务逻辑

### 形成动态三级联动

```vue
computed:{
   ...mapState({
     //对象写法：右侧需要的是一个函数，当使用这个计算属性的时候右侧函数会执行一次
     //下面这个state即为大仓库里的state
     categroyList:state=>state.home.categroyList,
   })
},
//获取到上面得到的接口数据


//配置三级联动
<div class="item" v-for="c1 in categroyList" :key="c1.categoryId">
<h3>
<a href="">{{c1.categoryName}}</a>
</h3>
<div class="item-list clearfix">
<div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
<dl class="fore">
<dt>
<a href="">{{c2.categoryName}}</a>
</dt>
<dd >
<em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
<a href="">{{c3.categoryName}}</a>
</em>
</dd>
</dl>
</div>
</div>
</div>
```

