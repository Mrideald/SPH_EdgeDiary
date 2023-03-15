//配置路由
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search/search";
import Detail from "../pages/Detail"
import AddCartSuccess from "../pages/AddCartSuccess"
import ShopCart from "../pages/ShopCart"
import Trade from "../pages/Trade"
import Pay from "../pages/Pay"
import PaySuccess from "../pages/PaySuccess"
import Center from "../pages/Center"
//引入二级路由
import MyOrder from '../pages/Center/myOrder'
import GroupOrder from '../pages/Center/groupOrder'
export default [
  {
   path:'/center',
   component:Center,
   meta: { showFoot: true },
   //子路由
   children:[
    {
      //二级路由不用带杠
      path:'myorder',
      component:MyOrder,
    },
    {
      //二级路由不用带杠
      path:'grouporder',
      component:GroupOrder,
    },
    {
      //重定向，在项目跑起来的时候访问
      path:'/center',
      redirect:'/center/myorder'
    }
   ]
  },
  {
   path:'/paysuccess',
   name:'paySuccess',
   component:PaySuccess,
   meta: { showFoot: true }
  },
  {
    path:'/pay',
    name:'Pay',
    component:Pay,
    meta: { showFoot: true }
  },
  {
    path:'/trade',
    component:Trade,
    meta: { showFoot: true }
  },
  {
    path:"/shopCart",
    component:ShopCart,
    meta: { showFoot: true },
  },
  {
    path: "/addCartSuccess",
    name:"addCartSuccess",
    component: AddCartSuccess,
    meta: { showFoot: true },
  },
    {
      path: "/detail/:skuid?",
      component: Detail,
      meta: { showFoot: true },
    },
    {
      path: "/home",
      component: Home,
      meta: { showFoot: true },
    },
    {
      path: "/login",
      component: Login,
      meta: { showFoot: false },
    },
    {
      path: "/register",
      component: Register,
      meta: { showFoot: false },
    },
    {
      name: "search",
      path: "/search/:keyword?", //parmers参数占位
      component: Search,
      meta: { showFoot: true },
      props: true,
    },
    //重定向，在项目跑起来的时候访问/，让他立马定向到首页
    {
      path: "/",
      redirect: "/home",
    },
  ]

