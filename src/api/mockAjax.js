//对axios进行二次封装
import axios from 'axios'

//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css"
//1. 利用axios对象的方法create创建一个axios实例
//2. requests就是axios，只不过稍微配置一下

const requests =axios.create({
    //配置对象
    //基础路径，发请求的时候路径会出现一个/mock
    baseURL:'/mock',
    //代表请求超时的时间5s
    timeout:5000
});

//请求拦截器 可以在请求发起之前处理一些业务
requests.interceptors.request.use((config)=>{
    //config  配置对象，对象里面有个属性很重要，headers请求头

    //start 进度条开始
    nprogress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //done 进度条结束
   nprogress.done();

    //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到可以做一些事情
   return res.data
},
(error)=>{
    //响应失败的回调函数
    return Promise.reject(error)
}
)
//对外暴露
export default requests;