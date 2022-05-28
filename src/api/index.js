//对api进行统一管理
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
export const reqBannerList=()=>{
    return mockRequests.get("/banner")
}
export const reqFloorList=()=>{
    return mockRequests.get("/floor")
}
