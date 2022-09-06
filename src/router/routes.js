//配置路由
import Home from "../pages/Home/HomeContainer.vue";
import Login from "../pages/Login/LoginContainer.vue";
import Register from "../pages/Register/RegisterContaier.vue";
import Search from "../pages/Search/search/index.vue";
import Detail from "../pages/Detail"
import AddCartSuccess from "../pages/AddCartSuccess/index.vue"
import ShopCart from "../pages/ShopCart/index.vue"
export default [
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

