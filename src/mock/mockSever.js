//引入mock
import Mock from 'mockjs'
//引入JSON数据
//JSON数据格式根本没有对外暴露但是可以引入
//webpack默认对外暴露的：图片  JSON数据格式
import banner from './banners.json'
import floor from './floors.json'

//mock数据：第一个参数是请求地址  第二个参数是请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页大轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor})