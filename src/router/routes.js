//配置路由 全部使用懒加载 按需引入
// import Home from "../pages/Home";
//import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Search from "../pages/Search/search";
// import Detail from "../pages/Detail";
// import AddCartSuccess from "../pages/AddCartSuccess";
// import ShopCart from "../pages/ShopCart";
// import Trade from "../pages/Trade";
// import Pay from "../pages/Pay"
// import PaySuccess from "../pages/PaySuccess"
// import Center from "../pages/Center"
// //引入二级路由
// import MyOrder from '../pages/Center/myOrder'
// import GroupOrder from '../pages/Center/groupOrder'

export default [
  {
    path: "/center",
    component: () => import("../pages/Center"),
    meta: { showFoot: true },
    //子路由
    children: [
      {
        //二级路由不用带杠
        path: "myorder",
        component: import("../pages/Center/myOrder"),
      },
      {
        //二级路由不用带杠
        path: "grouporder",
        component: () => import("../pages/Center/groupOrder"),
      },
      {
        //重定向，在项目跑起来的时候访问
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "/paysuccess",
    name: "paySuccess",
    component: () => import("../pages/PaySuccess"),
    meta: { showFoot: true },
  },
  {
    path: "/pay",
    name: "Pay",
    component: () => import("../pages/Pay"),
    meta: { showFoot: true },
    beforeEnter: (to, from, next) => {
      //去支付页面只能从交易页面去 从其他地方去的返回原地方
      if (from.path == "/trade") {
        next(); //如果是从shopcart来的 就放行
      } else {
        //中断当前导航 如果游览器url改变了 会回到from的地址从哪来回哪去
        next(false);
      }
    },
  },
  {
    path: "/trade",
    component: () => import("../pages/Trade"),
    meta: { showFoot: true },
    beforeEnter: (to, from, next) => {
      //去交易页面只能从购物车去 从其他地方去的返回原地方
      if (from.path == "/shopCart") {
        next(); //如果是从shopcart来的 就放行
      } else {
        //中断当前导航 如果游览器url改变了 会回到from的地址从哪来回哪去
        next(false);
      }
    },
  },
  {
    path: "/shopCart",
    component: () => import("../pages/ShopCart"),
    meta: { showFoot: true },
  },
  {
    path: "/addCartSuccess",
    name: "addCartSuccess",
    component: () => import("../pages/AddCartSuccess"),
    meta: { showFoot: true },
  },
  {
    path: "/detail/:skuid?",
    component: () => import("../pages/Detail"),
    meta: { showFoot: true },
  },
  {
    path: "/home",
    component: () => import("../pages/Home"),
    meta: { showFoot: true },
  },
  {
    path: "/login",
    component: () => import("../pages/Login"),
    meta: { showFoot: false },
  },
  {
    path: "/register",
    component: () => import("../pages/Register"),
    meta: { showFoot: false },
  },
  {
    name: "search",
    path: "/search/:keyword?", //parmers参数占位
    component: () => import("../pages/Search/search"),
    meta: { showFoot: true },
    props: true,
  },
  //重定向，在项目跑起来的时候访问/，让他立马定向到首页
  {
    path: "/",
    redirect: "/home",
  },
];
