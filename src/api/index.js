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