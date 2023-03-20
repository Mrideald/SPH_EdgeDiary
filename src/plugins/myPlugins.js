//随便写的原理 了解vue.use(插件,{})可以配置参数传值 了解插件如何操作dom
//Vue插件一定暴露一个对象
let myPlugins={

}
//option占位 给用户写的
myPlugins.install=function(Vue,options){
    Vue.directive('MyPlugins', (a)=>{
    });
}


export default myPlugins