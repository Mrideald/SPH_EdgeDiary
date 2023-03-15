//引入mock
import Mock from 'mockjs'
//引入JSON数据
//JSON数据格式根本没有对外暴露但是可以引入
//webpack默认对外暴露的：图片  JSON数据格式
import banner from './banners.json'
import floor from './floors.json'
// import {getAddress} from './address'
// import {getOrderInfo} from './orderInfo'

//mock数据：第一个是拦截地址，拦截到这个请求后返回数据  第二个参数是请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页大轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor})
// Mock.mock("/mock/address",{code:200,data:getAddress()})
// Mock.mock("/mock/order/info",{code:200,data:getOrderInfo()})