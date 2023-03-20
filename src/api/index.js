//对api进行统一管理
//这是开发项目的第二步
import requests from "./request";
//引入mock api
import mockRequests from "./mockAjax"

//三级联动接口
//     /api/product/getBaseCategoryList   get请求  无参数

//暴露一个函数发请求
//发请求，因为在axios二次封装里面配置了baseURL 默认地址都含有/api，所以这里地址不用带/api
//axios发请求返回结果promise对象
export const reqCategoryList=()=>{
    return requests.get('/product/getBaseCategoryList')
}
//获取banner数据
export const reqBannerList=()=>{
    return mockRequests.get("/banner")
}
//获取floor数据
export const reqFloorList=()=>{
    return mockRequests.get("/floor")
}
//获取搜索模块数据
// 地址：/api/list 请求方式：post
/*
参数：
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}

*/
//需要带参  给服务器传递的一个参数params 至少是一个空对象
export const reqGetSearchInfo=(params)=>requests({url:'/list',method:'post',data:params})

//商品详情页面数据
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${ skuId }`,method:'get'})
//商品加入购物车,购物车的增加或者更新
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})

//获取购物车列表数据 不需要带参数
export const reqGetCartList=()=>requests({url:"/cart/cartList",method:'get'})

//删除购物车商品
export const reqDeleteCart=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})


//切换商品选中状态
export const reqCheckCart=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//用户注册 /user/passport/register  post
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'post'})

//用户登录 传入数据和get不一样 data：data
export const reqUserLogin=(data)=>requests({url:'/user/passport/login',data:data,method:'post'})

//写获取用户信息的接口 去home里面发起渲染到主页
export const reqGetUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录接口
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:"get"})

//获取商品页信息
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'get'})

// //获取用户地址信息 这边写的是mock地址 为了完整还是使用真正的请求地址
// export const reqAddressInfo=()=>mockRequests.get("/address")

// //获取商品页信息/api/order/auth/trade

// export const reqOrderInfo=()=>mockRequests.get("/order/info")

//提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} method:post
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data:data,method:"post"})

//获取支付信息/api/payment/weixin/createNative/{orderId}
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取订单支付状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取我的订单信息 /api/order/auth/{page}/{limit}
export const reqMyOrder=(page,limit)=>requests({
    url:`/order/auth/${page}/${limit}`,method:'get'
})