

## 尚品汇项目笔记

## 补充知识

### javascript中的原型和原型链

 #### 一. 原型

> 每一个javascript对象(除null外)创建的时候，都会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型中“继承”属性。

![img](https://img-blog.csdnimg.cn/20200508150814540.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0NjQ1NDEy,size_16,color_FFFFFF,t_70)

#### 二. prototype

>  在JavaScript中，每个函数都有一个prototype属性，这个属性指向函数的原型对象。（ps：函数其实也是一个对象，所以与上述一、中的例子不冲突）

![img](https://img-blog.csdnimg.cn/2020050815162482.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0NjQ1NDEy,size_16,color_FFFFFF,t_70)

#### 三、__proto__

这是每个对象(除null外)都会有的属性，叫做__proto__，这个属性会指向该对象的原型。

![img](https://img-blog.csdnimg.cn/20200509144802431.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0NjQ1NDEy,size_16,color_FFFFFF,t_70)

#### 四、constructor

每个原型都有一个constructor属性，指向该关联的构造函数。

```javascript
  function Animal(weight) {



     this.weight = weight



  }



  Animal.prototype.height = 10



  var cat1 = new Animal()



  var cat2 = new Animal()



 console.log('cat1.__proto__ === Animal.prototype',cat1.__proto__ === Animal.prototype)



 console.log('Animal===Animal.prototype.constructor',Animal===Animal.prototype.constructor)



// 获取原型对象



 console.log('Object.getPrototypeOf(cat1) === Animal.prototype',Object.getPrototypeOf(cat1) === Animal.prototype)
```

![img](https://img-blog.csdnimg.cn/20200509150521695.png)

更新关系图

![img](https://img-blog.csdnimg.cn/20200509151054426.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0NjQ1NDEy,size_16,color_FFFFFF,t_70)

cat1.__proto__ === Animal.prototype

Animal === Animal.prototype.constructor

那么cat1.constructor === Animal为true 吗？答案是true,因为每一个对象都会从原型中“继承”属性，cat1中并没有属性constructor ，但是它的原型cat1.__proto__ 指向的是Animal.prototype，然而Animal.prototype原型中是有属性constructor的，于是cat1的constructor属性继承与原型中的constructor属性。这里便能看出一点点[原型链](https://so.csdn.net/so/search?q=原型链&spm=1001.2101.3001.7020)的影子了，我们接着看

因此cat1.constructor === Animal 也是 true

#### 五、实例与原型

 当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。这样就形成了原型链

```javascript
function Animal(weight) {



   this.weight = weight



}



 Animal.prototype.name = 'animal'



 var cat1 = new Animal()



 cat1.name = 'littleCat'



 console.log('cat1.name',cat1.name)



 delete cat1.name;



 console.log('cat1.name',cat1.name)
```

![img](https://img-blog.csdnimg.cn/20200509161327694.png)

可以看见，删除属性前，那么是littleCat，删除那么属性后，该实例没有了name属性，找不到name属性的时候，它就会去 它的对象原型中去找也就是去cat1.__proto__中也就是Animal.prototype中去寻找，而Animal.prototype中的name属性的值是animal，所以删除name属性后的值变成了原型中属性name的值animal

那么接着来看，如果cat1的原型中也没有name属性呢？会怎么办？去原型的原型中找？那么原型的原型是什么？

#### 六、原型的原型

我们说原型是对象创建的时候关联的另一个对象，那么原型也是一个对象，既然是对象那么原型也应该关联一个对象是原型的原型

那么原型对象创建的时候也会关联一个对象

```typescript
var obj = new Object();
```

看关系图

![img](https://img-blog.csdnimg.cn/20200509163925513.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0NjQ1NDEy,size_16,color_FFFFFF,t_70)

那么Object.prototype的原型呢？

也就是 Object.prototype.__proto__是什么呢

```typescript
console.log('Object.prototype.__proto__ === null',Object.prototype.__proto__ === null)
```

可以看到结果![img](https://img-blog.csdnimg.cn/2020050916430933.png)

也就说Object.prototype.__proto__ 的值为 null 即 Object.prototype 没有原型，所以可以想象在原型链中，当属性找到顶层原型都没有属性那就是没有这个属性

![img](https://img-blog.csdnimg.cn/20200509164641871.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0NjQ1NDEy,size_16,color_FFFFFF,t_70)

#### 七、原型链

综上所述 ，将原型的实例赋值给另一个对象，另一个对象再赋值给其他的对象，在实际的代码中对对象不同的赋值，就会形成一条原型链。这样说可能很抽象，我们来看个例子

```javascript
 function Animal(weight) {
     this.weight = weight
 }
 Animal.prototype.name = 'animal'
 var cat1 = new Animal()
 var pinkCat = cat1
 console.log('pinkCat.name',pinkCat.name)
 console.log('pinkCat.__proto__ === cat1.__proto__ == Animal.prototype',pinkCat.__proto__ === cat1.__proto__ == Animal.prototype)
 var samllPinkCat = pinkCat
 console.log('samllPinkCat.name',samllPinkCat.name)
 console.log(samllPinkCat.__proto__ == pinkCat.__proto__ === cat1.__proto__ == Animal.prototype)
```

![img](https://img-blog.csdnimg.cn/20200509170631339.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0NjQ1NDEy,size_16,color_FFFFFF,t_70)

以上就是原型链一层一层链接上去形成一条链条就是所谓的原型链；以上cat1实例化了Animal,cat1赋值给了pinkCat,pinkCat又赋值给了samllPinkCat，就形成看原型链，从samllPinkCat，pinkCat到cat1最后到Animal



### Promise

 [CSDN关于这一节链接](https://blog.csdn.net/weixin_58032613/article/details/123068953?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166228048016782391888710%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166228048016782391888710&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-1-123068953-null-null.142^v46^pc_rank_34_2&utm_term=%E5%9B%9E%E8%B0%83%E5%9C%B0%E7%8B%B1%E6%80%8E%E4%B9%88%E4%BA%A7%E7%94%9F&spm=1018.2226.3001.4187)

#### 1. 回调函数

> 当一个函数作为参数传入另一个参数中，并且它不会立即执行，只有当满足一定条件后该函数才可以执行，这种函数就称为回调函数。我们熟悉的定时器和[Ajax](https://so.csdn.net/so/search?q=Ajax&spm=1001.2101.3001.7020)中就存在有回调函数。

```js
setTimeout(function(){   //function(){console.log('执行了回调函数')}就是回调函数，它只有在3秒后才会执行
	console.log('执行了回调函数');
},3000)  //3000毫秒
123
```

这里的回调函数是function(){console.log(‘执行了回调函数’)}，在满足时间3秒后执行。

```js
//1.创建异步对象
	var xhr=new XMLHttpRequest();
//2.绑定监听事件(接收请求)
	xhr.onreadystatechange=function(){
	//此方法会被调用4次
	//最后一次，readyState==4
	//并且响应状态码为200时，才是我们要的响应结果 xhr.status==200
	if(xhr.readyState==4 && xhr.status==200){
	//把响应数据存储到变量result中
					var result=xhr.responseText;
					console.log(result);
				}
			};
 //3.打开链接（创建请求）
	xhr.open("get","/demo/ajaxDemo",true);
//4.发送请求
	xhr.send();
1234567891011121314151617
```

这里的回调函数是xhr.onreadystatechange绑定的函数，在xhr.send()发送请求并拿到响应后执行。

#### 2. 异步任务

> 与之相对应的概念是“同步任务”，同步任务在主线程上排队执行，只有前一个任务执行完毕，才能执行下一个任务。异步任务不进入主线程，而是进入异步队列，前一个任务是否执行完毕不影响下一个任务的执行。同样，还拿定时器作为异步任务举例。

```js
  setTimeout(function(){
            console.log('执行了回调函数');
        },3000)
        console.log('111');
1234
```

如果按照代码编写的顺序，应该先输出“执行了回调函数”，再输出“111”。但实际输出为：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201212210523379.png#pic_center)
不阻塞后面任务执行的任务就叫做异步任务。
接下来让我们看看什么是回调地狱。

#### 一、回调地狱是什么？

根据前面我们可以得出一个结论：存在异步任务的代码，不能保证能按照顺序执行，那如果我们非要代码顺序执行呢？

比如我要说一句话，语序必须是下面这样的：武林要以和为贵，要讲武德，不要搞窝里斗。
我必须要这样操作，才能保证顺序正确。

```js
 setTimeout(function () {  //第一层
            console.log('武林要以和为贵');
            setTimeout(function () {  //第二程
                console.log('要讲武德');
                setTimeout(function () {   //第三层
                    console.log('不要搞窝里斗');
                }, 1000)
            }, 2000)
        }, 3000)
123456789
```

输出的结果为：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201212214033667.png#pic_center)
可以看到，代码中的回调函数套回调函数，居然套了3层，这种回调函数中嵌套回调函数的情况就叫做回调地狱。

**总结：回调地狱就是为是实现代码顺序执行而出现的一种操作，它会造成我们的代码可读性非常差，后期不好维护。**

那该如何解决回调地狱呢？

#### 二、如何解决回调地狱

##### 2.1 Promise

Promise是js中的一个原生对象，是一种异步编程的解决方案，可以替换掉传统的回调函数解决方案。

1. Promise构造函数接收一个函数作为参数，我们需要处理的异步任务就卸载该函数体内，该函数的两个参数是resolve，reject。异步任务执行成功时调用resolve函数返回结果，反之调用reject。
2. Promise对象的then方法用来接收处理成功时响应的数据，catch方法用来接收处理失败时相应的数据。
3. Promise的链式编程可以保证代码的执行顺序，前提是每一次在than做完处理后，一定要return一个Promise对象，这样才能在下一次then时接收到数据。

```js
        function fn(str){
            var p=new Promise(function(resolve,reject){
                //处理异步任务
                var flag=true;
                setTimeout(function(){
                    if(flag){
                        resolve(str)
                    }
                    else{
                        reject('操作失败')
                    }
                })
            })
            return p;
        }

        fn('武林要以和为贵')
        .then((data)=>{
            console.log(data);
            return fn('要讲武德');
        })
        .then((data)=>{
            console.log(data);
            return fn('不要搞窝里斗')
        })
        .then((data)=>{
            console.log(data);
        })
        .catch((data)=>{
            console.log(data);
        })

但是Promise最大的问题就是代码冗余，原来的异步任务被Promise封装一下，不管什么操作都用than，就会导致一眼看过去全是then…then…then…,这样也是不利于代码维护的。
```

所以下面的async/await 可以时代码看起来更像同步代码。

##### 2.2 async/await

首先我们看async关键字，他作为一个关键字放到声明函数前面，表示该函数为一个异步任务，不会阻塞后面函数的执行。

```js
    async function fn(){
            return '不讲武德';
        }
        console.log(fn());
打印结果是一个Promise对象
可以看到async函数返回数据时自动封装为一个Promise对象。
```

和Promise对象一样，处理异步任务时也可以按照成功和失败来返回不同的数据，处理成功时用then方法来接收，失败时用catch方法来接收数据。

```javascript
     async function fn() {
            var flag = true;
            if (flag) {
                return '不讲武德';
            }
            else{
                throw '处理失败'
            }
        }
        fn()
        .then(data=>{
            console.log(data);
        })
        .catch(data=>{
            console.log(data);
        })

        console.log('先执行我，表明async声明的函数是异步的');
123456789101112131415161718
当把flag设置为false是，执行结果为：
![在这里插入图片描述](https://img-blog.csdnimg.cn/258e9f0e10d14278918474ffdae64d7d.png)
async关键字说完了，我们看看awai关键字
```

1. await关键字只能在使用async定义的函数中使用
2. await后面可以直接跟一个 Promise实例对象（可以跟任何表达式，更多的是跟一个返回Promise对象的表达式）
3. await函数不能单独使用
4. await可以直接拿到Promise中resolve中的数据。

```js
  //封装一个返回promise的异步任务
        function fn(str) {
            var p = new Promise(function (resolve, reject) {
                var flag = true;
                setTimeout(function () {
                    if (flag) {
                        resolve(str)
                    } else {
                        reject('处理失败')
                    }
                })
            })
            return p;
        }

        //封装一个执行上述异步任务的async函数
        async function test(){
            var res1=await fn('武林要以和为贵');  //await直接拿到fn()返回的promise的数据，并且赋值给res
            var res2=await fn('要讲武德');
            var res3=await fn('不要搞窝里斗');
            console.log(res1,res2,res3);
        }
        //执行函数
        test();
123456789101112131415161718192021222324
```

结果为:
![在这里插入图片描述](https://img-blog.csdnimg.cn/6e4146410b0c4ec5b060aeda6d0ee13d.png)
为什么叫await等待呢，因为当代码执行到async函数中的await时，代码就在此处等待不继续往下执行，知道await拿到Promise对象中resolve的数据，才继续往下执行，这样就保证了代码的执行顺序，而且使异步代码看起来更像同步代码。

##### 总结：

当我们写代码遇到异步回调时，我们想让异步代码按照我们想要的顺序执行，如果按照传统的嵌套方式，就会出现回调地狱，这样的代码不利于维护，我们可以通过Promise对象进行链式编程来解决，这样尽管可以解决问题，但是ES7给我们提供了更加舒适的async/await语法糖，可以使得异步代码看起来更像是同步代码。

### promise.all()

Promise.all() 方法接收一个 promise 的 iterable 类型（注：Array，Map，Set 都属于 ES6 的 iterable 类型）的输入，并且只返回一个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)实例， 那个输入的所有 promise 的 resolve 回调的结果是一个数组。这个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)的 resolve 回调执行是在所有输入的 promise 的 resolve 回调都结束，或者输入的 iterable 里没有 promise 了的时候。它的 reject 回调执行是，只要任何一个输入的 promise 的 reject 回调执行或者输入不合法的 promise 就会立即抛出错误，并且 reject 的是第一个抛出的错误信息。

> **Promise.all()** 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

~~~js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
~~~

const p = Promise.all([p1, p2, p3]);

上面代码中，**Promise.all()**方法接受一个数组作为参数，**p1、p2、**`**p3**`都是 Promise 实例，如果不是，就会先调用 `**Promise.resolve**`方法，将参数转为 Promise 实例，再进一步处理。另外，**Promise.all()**方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

### vuex里的context(上下文)

> 可以理解为小仓库，api有commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】,state【当前仓库数据】 可以在action中调用



## 一些陌生且常用的api

`@change=""`

> 当用户更改<input> <select> <textarea>元素的值并提交这个更改时，`change` 事件在这些元素上触发。对于一些元素，包括 `<input type="text">`，`change` 事件在控件失去焦点前都不会触发。

`parseInt()`

> 该函数可以解析一个字符串返回一个整数，向下取整

`array.every`

> **every()** 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

~~~js
const isBelowThreshold = (currentValue) => currentValue < 40;
const array1 = [1, 30, 39, 29, 10, 13];
console.log(array1.every(isBelowThreshold));
// expected output: true,有一个不小于40都是false
~~~



**assets下的是所有组件共用的静态资源**



## 开发一个项目基本

+ 静态组件
+ 发请求 写api文件
+ vuex
+ 动态展示组件

## day1

> 进入页面默认访问哪一个路由（重定向）
>
> ```
> 在router的index.js页面配置路由时写上
> //重定向，在项目跑起来的时候访问/，让他立马定向到首页
> {
> path:'/',
> redirect:'/路径'(就是默认访问的那个路由的path)
> }
> ```

**路由的跳转**

1. 声明时导航router-link ，可以进行路由的跳转

   ~~~
   <router-link class="logo" title="尚品汇" to="/home">
   <img src="./images/logo.png" alt="">
   </router-link>
   ~~~

2. 编程式导航push|replace ，可以进行路由的跳转

   ~~~js
   <button @click="getSearch" >搜索</button>
   一般是配置一个方法然后写方法
   getSearch(){
   let loction={name:'search',params:{keyword:this.keyword}}
   //如果有query参数也要一并传递过去
   if(this.$route.query){
   loction.query=this.$route.query
   }
   this.$router.push(loction)  路由跳转
   }
   ~~~

   

编程式导航：声明式导航能做的，编程式导航都能做，但是编程式导航除了可以进行路由的跳转，还可以做一些别的业务

没其他复杂的业务只需要跳转的话就用声明式导航，必须配置to

## 路由元信息配置

当页面在登录或者注册的时候footer组件不显示

可以通过在footer标签里面写v-show=“$route.path==xxx”来判断什么显示什么不显示

第二种就是配置路由元信息

```vue
routes:[
{
    path:'/home',
    component:Home,
    meta:{showFoot:true}
},
{
    path:'/login',
    component:Login,
    meta:{showFoot:false}
},
{
    path:'/register',
    component:Register,
    meta:{showFoot:false}
},
{
    path:'/search',
    component:Search,
    meta:{showFoot:true}
},

然后配置v-show
<Footer v-show="$route.meta.showFoot"></Footer>
```

## 三种路由传参

1. 字符串形式

   ```
   this.$router.push("/search/"+this.keyword+"?k="+this.keyword.toUpperCase())
   ```

2. 模板字符串形式

   ```
   this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
   ```

    

3. 对象形式

   ```
   this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
   ```

   

## 面试题

1. 如有传递参数（对象写法）path是否可以结合params参数一起使用

   答：不能，params结合name使用，不然会出现问题

2. 如何指定params参数可穿可不穿

   答：比如你在路由配置的时候使用了占位符（params参数），但是路由跳转的时候就不传递

   路径：http://localhost:8080/#/?k=123 无法显示路由以及params参数

   解决：在占位符后面加个?号 path:'/search/:keyword?',

3. params参数可以传递也可以不传递，但是如果传递的是空串如何解决?

   undefined解决

   `` this.$router.push({name:'search',params:{keyword:''||undefined},query:{k:this.keyword.toUpperCase()}})``

4. 路由组件能不能传递props数据，是可以的

   解释在路由笔记里面写了的有三种方法，官方推荐写props:true

## 重写push和replace

当你使用编程式路由跳转时，一直重复跳转会报错

因为vue-router3.5.3 最新的vue-router引入了promise

**解决：**

①在跳转后面添加跳转成功和失败的回调，不返回东西就好了(治标不治本)

```
 this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{}
 )
```

②

```vue
//先把Vuerouter原型对象上的push和replace复制一份
const originRouter=VueRouter.prototype.push;
const originReplace=VueRouter.prototype.replace;

//第一个参数location:告诉原来的push和replace方法你往哪里跳转
//第二个参数resolve：成功的回调
//第三个参数reject：失败的回调
//call和apply的区别：
//相同点：都可以调用函数一次，都可以篡改函数上下文一次
//不同点：call和apply传递参数：call用逗号隔开，apply方法执行，传递数组
//重写push
VueRouter.prototype.push=function(location,resolve,reject){
 if(resolve||reject){
//函数的this指向call的第一个参数,这边第一个参数this是vuerouter的实例
     originRouter.call(this,location,resolve,reject)
 }else{
     originRouter.call(this,location,()=>{},()=>{})
 }
}
//重写replace
VueRouter.prototype.replace=function(location,resolve,reject){
//如果有成功或者失败的回调就调用这个
    if(resolve||reject){
        originReplace.call(this,location,resolve,reject)
    }else{
//没有成功或者失败的回调就调用这个
        originReplace.call(this,location,()=>{},()=>{})
    }
}
```

## 三级联动，全局组件

*//三级联动组件--全局组件，再使用的时候就可以直接使用，不用注册*

import TypeNav from '../src/pages/Home/TypeNav/TypeNav.vue'

*//三级联动，全局组件，第一个参数是组件的名字name，第二个参数是哪一个组件*

Vue.component(TypeNav.name,TypeNav)

//在外面用的时候标签用的是名字name 

## axios二次封装

1. 向服务器发请求的几种方式

   XMLHttpRequest,fetch,JQ,axios(常用)

2. 为什么需要二次封装axios

   请求拦截器，响应拦截器

   请求拦截器：可以在请求发起之前处理一些业务

   响应拦截器：可以在服务器数据返回以后处理一些事情

   ```js
   //对axios进行二次封装
   import axios from 'axios'
   
   //1. 利用axios对象的方法create创建一个axios实例
   //2. requests就是axios，只不过稍微配置一下
   
   const requests =axios.create({
       //配置对象
       //基础路径，发请求的时候路径会出现一个/api
       baseURL:'/api',
       //代表请求超时的时间5s
       timeout:5000
   });
   
   //请求拦截器 可以在请求发起之前处理一些业务
   requests.interceptors.request.use((config)=>{
       //config  配置对象，对象里面有个属性很重要，headers请求头
       return config;
   })
   
   //响应拦截器
   requests.interceptors.response.use((res)=>{
       //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到可以做一些事情
      return res.data
   },
   (error)=>{
       //响应失败的回调函数
       return Promise.reject(error)
   }
   )
   export default requests;
   ```

## 对 api 统一管理

```
对 index.js 的配置
//对api进行统一管理
import requests from "./request";

//三级联动接口
//     /api/product/getBaseCategoryList   get请求  无参数

//暴露一个函数发请求
//发请求，因为在axios二次封装里面配置了baseURL 默认地址都含有/api，所以这里地址不用带/api
//axios发请求返回结果promise对象
export const reqCategoryList=()=>{
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}


在main.js
//引入api
import {reqCategoryList} from './api/index'
reqCategoryList();
```

## nprogress进度条的使用

```
npm i nprogress
```

**在对axios二次封装的request.js文件里面配置**

```
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css"

start（）进度条开始  done()进度条结束

在请求拦截器配置开始，在响应拦截器配置结束
 //start 进度条开始
   nprogress.start();
 //done 进度条结束
   nprogress.done();
```

## Vuex 使用

如果项目很大组件很多就需要用这个来管理项目共用的数据

### 模块化vuex

```javascript
//大仓库
import Vue from 'vue'
import Vuex from 'vuex'
//使用插件
Vue.use(Vuex)
import home from './home/indexHome'
import search from './search/indexSearch'
//对外暴露store类的一个实例
export default new Vuex.Store({
 modules:{
 home,search//模块化
 }
})

//Home小仓库
//home区
import {reqCategoryList} from '/src/api/index'  //引入api
const actions={
//async和await是cp，必须是成对出现的,详细的去看csdn吧
async categroyList(context){
  const result =await reqCategoryList();
  if(result.code==200){
  context.commit('CATEGROYLIST',result.data)
  }
 }
}
const mutations={
    CATEGROYLIST(state,categroyList){
    state.categroyList=categroyList,
    //这边只需16个，数组里面多了个东西，用pop弹出去
    categroyList=categroyList.pop()
    }
}
const state={
    categroyList:[]
}
const getters={

}
export default{
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}


//Search小仓库
//Search区
const action={

}
const mutations={

}
const state={

}
const getters={

}

export default{
namespaced:true,//记得添加命名空间
action,
mutations,
state,
getters
}
```

```vue
后面需要向vuex传数据的时候记得要写  小仓库(文件夹名字)/函数

//组件挂载完毕可以向服务器发请求
  mounted(){
   this.$store.dispatch('home/categroyList')
  }
```

**补充async和await**

- await关键字必须位于async函数内部
- await关键字后面需要一个promise对象（不是的话就调用resolve转换它）
- await关键字的返回结果就是其后面Promise执行的结果，可能是resolved或者
- rejected的值，注意最后执行完的是个值。
- 不能在普通箭头函数中使用await关键字，需要在箭头函数前面添加async
- await用来串行的执行异步操作，现实现并行可以考虑promise.all

**promise**

什么是Promise
所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。



Promise的作用
Promise的出现主要是解决地狱回调的问题，比如你需要结果需要请求很多个接口，这些接口的参数需要另外那个的接口返回的数据作为依赖，这样就需要我们一层嵌套一层，但是有了Promise 我们就无需嵌套



Promise的本质
我认为Promise的本质就是分离了异步数据获取和业务逻辑

### 形成动态三级联动

```vue
computed:{
   ...mapState({
     //对象写法：右侧需要的是一个函数，当使用这个计算属性的时候右侧函数会执行一次
     //下面这个state即为大仓库里的state
     categroyList:state=>state.home.categroyList,
   })
},
//获取到上面得到的接口数据


//配置三级联动
<div class="item" v-for="c1 in categroyList" :key="c1.categoryId">
<h3>
<a href="">{{c1.categoryName}}</a>
</h3>
<div class="item-list clearfix">
<div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
<dl class="fore">
<dt>
<a href="">{{c2.categoryName}}</a>
</dt>
<dd >
<em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
<a href="">{{c3.categoryName}}</a>
</em>
</dd>
</dl>
</div>
</div>
</div>
```

## 防抖和节流

用防抖和节流在lodash里的函数

防抖：前面所有的触发都被取消，最后一次执行在规定时间之后才会触发，也就是说快速连续的触发只会执行一次

节流：在规定的时间内不会重复触发回调，只有大于这个时间才会触发回调，把频繁触发变为少量触发

先引入  (Vue脚手架依赖里面默认有lodash直接引入就好了)

~~~
全部引入就是 import _ from 'lodash'
~~~

部分引入

~~~
import throttle from 'lodash/throttle'（这是引入节流）
~~~

后面使用

~~~
changeIndex:throttle(function(){console.log("66")  },50),
把事件写成对象形式，传参可以在后面function里面跟的  
~~~

## 三级联动跳转配置

+ 节点有一个属性dataset属性，可以获取节点的自定义属性和属性值

+ 自定义属性的时候在前面加上data-才能被dataset函数获取

  ~~~
  DOMStringMap {vC0fac93a: '', categroyname: '服饰内衣', categroy1id: '9'}
  ~~~

+ ~~~javascript
  getSearch(event){
    //获取到当前节点
    let element=event.target
    //解构对象//注意dataset里面都是小写 所以这边解构赋值都是小写
    let {categroyname,categroy1id,categroy2id,categroy3id} =element.dataset
    //如果你有这个属性，就接着下面的的操作
    if(categroyname){
      //传递参数
      let location={name:'search'}
      let query={categroyName:categroyname}//获取categroy
      if(categroy1id){
        //获取id
        query.categroy1Id=categroy1id
      }else if(categroy2id){
        query.categroy2Id=categroy2id
      }else if(categroy3id){
        query.categroy3Id=categroy3id
      }
      //传参
      location.query=query
      this.$router.push(location)
  }
  }
  ~~~

## 过渡动画

【Vue】transition让你的v-if和v-show有个美美的过渡与动画(有v-show和v-if才可以使用过渡动画)

> ~~~
> <transition name="sort">
> <div class="sort" v-show="show">
> </div>
> </transition>
>  
> //过渡动画样式
> .sort-enter{
> height: 0;
> }
> .sort-enter-to {
> height: 461px;
> }
> .sort-enter-active{
> overflow: hidden;
> transition:all 0.5s linear;
> }
> ~~~

## 合并参数

~~~javascript
getSearch(){
let loction={name:'search',params:{keyword:this.keyword}}
//如果有query参数也要一并传递过去
if(this.$route.query){
 loction.query=this.$route.query
}
this.$router.push(loction)
}



//如果路由跳转的时候有params参数也要一并带走过去
if(this.$route.params){
  location.params=this.$route.params
this.$router.push(location);
}
~~~

## mock.js模拟数据

下载`npm i mockjs`(注意没有.)

1. 在项目中src文件夹中创建mock文件夹
2. 第二步准备JSON数据（mock文件夹中创建相应的JSON文件）–格式化一下别留有空格不然跑不起来
3. 把mock数据需要的图片放置到public文件夹中(写一个images文件夹)，public文件夹在打包的时候，会把相应的资源原封不动的打包到dist
4. 第四步开始mock，通过mock.js模块实现
5. mockSever.js文件在入口文件中引入（至少需要执行一次，才能模拟数据）

2..json

~~~json
创建一个.json文件 写一些数据
banner.json文件：：
[
  {
    "id": "1",
    "imgUrl": "/images/banner1.jpg"
  },
  {
    "id": "2",
    "imgUrl": "/images/banner2.jpg"
  },
  {
    "id": "3",
    "imgUrl": "/images/banner3.jpg"
  },
  {
    "id": "4",
    "imgUrl": "/images/banner4.jpg"
  }
]
~~~

4.mockSever.js

~~~
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
~~~

5.

~~~
//引入mockjs模拟数据
import './mock/mockSever'
~~~



### 写api

1. 把之前写的axios二次封装复制一边  改下名字

2. 把基础路径改为`baseURL:'/mock'`

3. 写请求函数（在index.js）

   ~~~javascript
   //引入mock api
   import mockRequests from "./mockAjax"
   
   export const reqBannerList=()=>{
       return mockRequests.get("/banner")
   }
   ~~~

   

### 再去像之前那样通过vuex发请求好了

## 实现Banner的轮播图（swiper的使用）

swiper使用:

1. 下载 npm i swiper
2. 引包（相应的js和css）
3. 页面中结构务必要有
4. new swiper实例
5.  [swiper使用指南](https://www.swiper.com.cn/usage/index.html)

### 在Vue使用

> 哪要用就在那引入，多个要用且样式一致可以在main.js引入

## 轮播图问题

轮播图数据是用Ajax请求向服务器获取的，获取途中会有一系列操作

首先如果把轮播图swiper放在mounted里面的话，组件挂载完毕后执行顺序是

首先执行mounted  其次再向服务器获取数据 然后初始化swiper  再修改仓库中服务器带来的数据

这种情况下仓库数据没更新之前swiper已经初始化，但是要使swiper有效果必须已经有了**相应的数据以及结构**才会有效果，所以这边会有一个差值



解决方法：swiper实例代码可以写在update（）里面

第二个就是写在mounted里面然后写个定时器写swiper实例代码

**但是这俩个都有问题**

>  最好的解决方法：watch+$nextTick

**为什么单单用watch不行**:因为watch监听到数据以及发生变化了但是还没有渲染到结构上（v-for（渲染轮播图照片）不知道执行没有），所以数据结构还是不完整

~~~javascript
watch: {
    bannerList: {
      handler() {
        this.$nextTick(() => {
        //注意：从Swiper7开始，容器默认类名由'.swiper-container'变更为'.swiper'。
        //这边使用的是swiper5，所以容器默认类名还是.swiper-container
          new Swiper(".swiper-container", {
            //循环
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点小点可以实现切换
              clickable :true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
~~~

## 组件间通信的方式有哪些

1. props：用于父子组件通信
2. 自定义事件：@on @emit 可以实现子给父通信
3. 全局事件总线：$bus 全能
4. 插槽
5. vuex
6. pubsub-js:vue当中几乎不用

## 实现floor的轮播图并且数据展示

​    <FloorContainer v-for="floor in floorList" :key="floor.id" :list="floor" />

父组件直接用props给子组件传数据

~~~javascript
//因为此处参数父组件已经传过来了不会再是异步获取了，所以不必使用watch监听和$nextTick
  mounted() {
    new Swiper(".swiper-container", {
      //循环
      loop: true,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        //点小点可以实现切换
        clickable: true,
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // 如果需要滚动条
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  },
  props: ["list"],
~~~

## 共用组件

> 把首页中的轮播图拆分为一个共用的全局组件

**以后在开发项目时如果看到某一个组件在很多地方使用，你把它变成全局组件，注册一次可以在任意地方使用，共用的组件||非路由组件放到component文件夹中**

## Search模块开发

1. 先静态页面+静态组件拆分出来
2. 发请求（api）
3. vuex三连环
4. 组件获取仓库信息并且动态展示数据

**2.发请求**

vuex三连环（这边补充计算属性简写）

~~~javascript
const actions = {
  async getSearchList(context, params = {}) {
    //当reqGetSearchInfo函数在获取服务器数据时至少要传一个参数（空对象）
    //params形参：当用户派发action的时候第二个参数传过来的，至少是一个空对象
    const result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      context.commit("GETSEARCHLIST", result.data);
    }
  },
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const state = {
  searchList: [],
};
~~~

~~~javascript
//getters计算属性简写
//项目当中getters主要作用是：简化仓库中的数据（简化数据而生）
//可以把我们将来要在组件中要使用的数据简化一下，将来用的时候就会很方便
const getters = {
  //如果服务器数据回来了没问题就是一个数组
  //但是如果有网络问题，或者没网，那么这边返回的数据应该是undefined
  //计算新的属性的属性值至少给人家来一个数组
  goodsList(state){
    return state.searchList.goodsList||[]
  },
  attrsList(state){
    return state.searchList.attrsList||[]
  },
  trademarkList(state){
    return state.searchList.trademarkList||[]
  }
};
~~~

//使用

~~~javascript
computed:{
...mapGetters('search',['goodsList'])
},
~~~

4. 动态展示和之前一样写个v-for就好了

## Search根据不同的参数获取数据展示

~~~
beforeMount(){
    //复杂的写法 （传递的数据是什么）
    // this.searchParams.category1Id=this.$route.query.category1Id
    // this.searchParams.category2Id=this.$route.query.category2Id
    // this.searchParams.category3Id=this.$route.query.category3Id
    // this.searchParams.categoryName=this.$route.query.categoryName
    // this.searchParams.keyword=this.$route.params.keyword
    //简写
    Object.assign(this.searchParams,this.$route.query,this.$route.params);
  },
  //组件挂载完毕执行一次（仅仅执行一次，但我们需要的是每次搜索都像服务器发请求）
  mounted() {
    //在发请求之前带给服务器参数【searchParams参数发生变化有数值带给服务器】，然后服务器给你准备数据然后展示
    this.getData();
  },
  methods: {
    //向服务器发请求获取search模块数据（根据"参数不同"返回不同的数据进行展示）
    //把这次请求封装成一个函数，当你需要的时候调用
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
  },
~~~

## Object.assign

是[ES6](https://so.csdn.net/so/search?q=ES6&spm=1001.2101.3001.7020)新添加的接口，主要的用途是用来合并多个JavaScript的对象。

Object.assign()接口可以接收多个参数，**第一个参数是目标对象，后面的都是源对象**，assign方法将多个原对象的属性和方法都合并到了目标对象上面，如果在这个过程中出现同名的属性（方法），后合并的属性（方法）会覆盖之前的同名属性（方法）。

assign的基本用法如下：Object.assign(this.searchParams,this.$route.query,this.$route.params);

## 监听路由变化再发请求获取数据

~~~javascript
watch: {
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newValue, oldValue) {
      //每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3
      //再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发起ajax请求
      this.getData();
      //分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会给他赋予新的数据
      //下一次发请求时重置categoryid数据
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
~~~

# 面包屑的操作（平台售卖属性）

展示面包屑

~~~vue
<!-- 平台售卖属性展示 -->
<li
  class="with-x"
  v-for="(attrValue, index) in searchParams.props"
  :key="index"
>
  {{ attrValue.split(":")[1] }}//从：处截断分成几个部分，选出第二个展示
  <i @click="removeAttr">×</i>//定义删除事件
~~~

删除面包屑(这边用的是过滤操作，易懂一点)

~~~javascript
//removeAttr删除售卖的属性
removeAttr() {
//再次整理参数
this.searchParams.props=this.searchParams.props.filter(()=>{
return this.attrValue=!this.attrValue//过滤条件
})
//再次发请求
this.getData();
},
~~~

# 排序操作

**升降序操作**

> 上下图标用到了element ui

~~~vue
<!-- 排序的解构-->
<ul class="sui-nav">
<!-- 判断排序参数内是否含有1 若是含有1才显示这个样式 -->
<!-- 等于-1是不包含1，不等于-1是包含1 -->
<li :class="{ active:isOne}" @click="changeOrder('1')">
<a href="#">综合<span :class="{'el-icon-top':isAsc,'el-icon-bottom':isDesc}" v-show="isOne"></span></a>
</li>
<li :class="{active:isTwo}" @click="changeOrder('2')">
<a href="#">价格<span :class="{'el-icon-top':isAsc,'el-icon-bottom':isDesc}" v-show="isTwo"></span></a>
</li>
</ul>
~~~

~~~js
//排序升序降序业务
changeOrder(flag){
//flag形参，他是一个标记，代表用户点击的是综合（1），价格（2）
let originOrder=this.searchParams.order;
//获取一些初始状态
let originFlag=this.searchParams.order.split(':')[0];
let originSort=this.searchParams.order.split(':')[1];
//准备一个新的order
let newOrder="";
//如果点击的是综合
if(flag==originOrder){
newOrder=`${originFlag}:${originSort=="desc"? "asc":"desc"}`;
}
//如果点击的是价格
else{
newOrder=`${flag}:${originSort=="desc"? "asc":"desc"}`;
}
//将新的order赋予searchparams
this.searchParams.order=newOrder;
//再次发请求
this.getData();
}
~~~

# 分页器功能（重要）

>  分页器展示需要那些条件（数据）？ 
>
> 需要知道的当前是第几个：PageNo字段代表当前页数
>
> 需要知道每一个需要展示多少条数据：pageSize字段进行代表
>
> 需要知道整个分页器一共有多少条数据：total字段进行代表—【获取另一条消息：一共多少页面】
>
> 需要知道分页器连续页码的个数：5/7【奇数】 因为奇数对称好看
>
> 总结 ：对于分页器而言，自定义前提是需要知道四个前提条件

PageNo 当前第几个

pageSize：代表每一页展示多少条数据

total： 代表整个分页一共要展示多少条数据

continues：代表分页连续页码个数

> 自定义分页器，在开发的时候先自己传递假的数据进行调试，调试成功后在用服务器数据

> 对于分页器而言，很重要的一个地方即为 算出页面起始数字和结束数字

## 连续页码的起始数字和结束数字

~~~js
startNumAndEndNum() {
      const { continues, totalPage, pageNo } = this;
      let start = 0;
      let end = 0;
      //不正常现象，连续页码大于总页码
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        //正常现象
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues; //end等于连续页码数
        } else if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    }
~~~

## 分页器动态展示

~~~vue
<div class="pagination">
<button>上一页</button>
<button v-show="startNumAndEndNum.start>1">1</button>
<button v-show="startNumAndEndNum.start>2">...</button>

<button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-show="page>=startNumAndEndNum.start">{{page}}</button>

<button v-show="startNumAndEndNum.end < this.totalPage-1">...</button>
<button v-show="startNumAndEndNum.end<this.totalPage">{{ totalPage }}</button>
<button>下一页</button>
<button style="margin-left: 30px">共{{ total }}条</button>
<h1>{{ startNumAndEndNum }}---{{ pageNo }}</h1>
</div>
~~~

## 分页器跳转（自定义事件）

~~~vue
<PaginationSpace
:pageNo="searchParams.pageNo"
:pageSize="searchParams.pageSize"
:total="total"
:continues="5"
@getPageNo="getPageNo"
/>
~~~

先在分页器标签绑定自定义事件getPageNo 获取当前页

绑定回调事件

~~~js
//自定义事件获取当前页
getPageNo(pageNo){
this.searchParams.pageNo=pageNo;
this.getData();
}
~~~

在分页器内写上调用

~~~vue
1. 在methods里调用
//自定义事件获取当前页数 写俩个在这 其他的再到上面写
getLastPage() {
this.$emit("getPageNo", this.pageNo - 1);
},
getOnePage() {
this.$emit("getPageNo", 1);
},

2.直接在标签内调用
<button v-show="startNumAndEndNum.end < this.totalPage" @click="$emit('getPageNo',totalPage)">
{{ totalPage }}
</button>
<button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
~~~

:disabled=“布尔值” 当什么的时候不能点

## 加个点击背景

~~~vue
<button
v-for="(page, index) in startNumAndEndNum.end"
:key="index"
v-show="page >= startNumAndEndNum.start"
@click="$emit('getPageNo',page)"
:class="{active:pageNo==page}"
>
{{ page }}
</button>
只需要在中间写class就行了 很巧妙 当前页等于点击页就显示
.active{
background:skyblue;
}
~~~

# 滚动行为

> 这是vuerouter里的，router3和router4的文档不一样
>
> 跳转之后页面处于哪 如设置return{y:0} 页面始终跳转后处于顶部

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 `vue-router` 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

**注意: 这个功能只在支持 history.pushState 的浏览器中可用。**

当创建一个 Router 实例，你可以提供一个 `scrollBehavior` 方法：

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```

`scrollBehavior` 方法接收 `to` 和 `from` 路由对象。第三个参数 `savedPosition` 当且仅当 `popstate` 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

这个方法返回滚动位置的对象信息，长这样：

- `{ x: number, y: number }`
- `{ selector: string, offset? : { x: number, y: number }}` 

# Detail 页面开发

- 静态组件
- 发请求 写api文件
- vuex
- 动态展示组件

>  发请求

~~~
//商品详情页面数据
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${ skuId }`,method:'get'})
~~~

这边是带参的，参数skuId

> vuex 这边一些东西都是固定的

记得要写发请求的 那需要数据在哪写,第一个参数是调用的函数,第二个是所带的参数

~~~js
mounted(){
  this.$store.dispatch('getGoodInfo',this.$route.params.skuid)
}
要是有命名空间的话要注明在哪个模块写的
getData() {
  this.$store.dispatch("search/getSearchList", this.searchParams);
},
~~~

~~~js
import { reqGoodsInfo } from "/src/api/index";
const actions={
 async getGoodInfo(context,skuId){
    let result =await reqGoodsInfo(skuId)
    if(result.code==200){
        context.commit("GETGOODINFO",result.data)
    }
 }
}

const mutations={
    GETGOODINFO(state,goodInfo){
  state.goodInfo=goodInfo
    }
}
const state={
    goodInfo:{}
}
const getters={
    categoryView(){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(){
        return state.goodInfo.skuInfo||{}
    }
}
export default {
    //问题 这边一写命名空间就报错
    actions,
    mutations,
    state,
    getters,
  };

~~~

写好以上就可以去看看有没有vuex数据了

> 动态展示组件

用mapaction获取数据或者用mapgetters写好之后获取数据展示

~~~
computed:{
 ...mapGetters(['categoryView','skuInfo'])
},
~~~

最后渲染在页面上就可以了

# 产品售卖属性值的排他操作

![1662016627951](C:\Users\做你的宇航员\AppData\Roaming\Typora\typora-user-images\1662016627951.png)

要使点击的属性值为高亮的操作

~~~js
先在属性标签绑定点击事件
<dd
//通过isChecked变为0或者1判断是否是高亮
:class="{ active: skuSaleAttrValue.isChecked== 1 }"
v-for="skuSaleAttrValue in skuSaleAttrValueList":key="skuSaleAttrValue.id"
//传值，第一个值为当前当前点击的那个值，第二个为遍历的总数组
@click="changeActive(skuSaleAttrValue,skuSaleAttrValueList)"
>
{{ skuSaleAttrValue.saleAttrValueName }}
</dd>

//产品售卖属性值变为高亮
changeActive(saleAttrValue,arr){
 //遍历全部售卖属性值isChecked为零没有高亮了
 arr.forEach((item)=>{
  item.isChecked='0'
 })
 //点击的那个售卖属性值为高亮
 saleAttrValue.isChecked='1'
}
~~~

# 放大镜操作

固定模式

~~~vue
<template>
  <div class="spec-preview">
    <img :src="skuImageList[currentIndex].imgUrl" />
     //绑定事件
    <div class="event" @mousemove="handler"></div>
     //放大的大图
    <div class="big">
      <img :src="skuImageList[currentIndex].imgUrl" ref="big" />
    </div>
    <!-- 绿布遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "ZoomContainer",
  data() {
    return {
      currentIndex: "0",
    };
  },
  props: ["skuImageList"],
  methods: {
    getCurrentIndex(index) {
      this.currentIndex = index;
    },
      //主要代码
    handler(event) {
      //event是mousemove事件的默认参数，里面包含移动的每一个位置 可以打印看看
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      //约束范围
      if (left <= 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top <= 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      //修改元素的left和top值
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
  mounted() {
    this.$bus.$on("getCurrentIndex", this.getCurrentIndex);
  },
};
</script>

~~~

# NaN科普

> **NaN**（*Not a Number*，非数字）是计算机科学中**数值数据类型的一类值**，表示未定义或不可表示的值。
> 虽然 NaN 是“Not a Number”，但是它的类型还是数值类型

~~~
console.log(typeof NaN === "number");  //true
~~~

> NaN和任何数字都不想等，即便是他本身

~~~
console.log(NaN === NaN);  //false
~~~

~~~
 var str = '666';
 const obj = {age:18};
 console.log(isNaN('str'));//flase;
 console.log(isNaN('666'));//false;
 console.log(isNaN(obj));//true;
~~~

isNaN()会先将参数转为Number 类型，（Number()，非parseInt()或Math.floor()），再判断是否为NaN ，所以在类型转换失败或运算错误时值为NaN，返回true，其他全为false)

就是说如果是非数字就会返回true 其他都是false 非数字都转化为NaN了

![1662194749044](C:\Users\做你的宇航员\AppData\Roaming\Typora\typora-user-images\1662194749044.png)

这边用到*1思想  非数字*1等于NaN

# 商品挑选个数问题（涉及输入非法）

非法的有：文字，字母，小数 负数

![1662203047997](C:\Users\做你的宇航员\AppData\Roaming\Typora\typora-user-images\1662203047997.png)

~~~vue
<!-- 搞清楚@change 在上面 -->
<input autocomplete="off" class="itxt" v-model="skuNum" @change="changeSkuNum" />
<a href="javascript:" class="plus" @click="skuNum++">+</a>
<a href="javascript:" class="mins" @click="skuNum>0? skuNum--:skuNum=0">-</a>
~~~

~~~js
changeSkuNum(event){
//让用户输入的数据*1 若是非法 乘以1后会变为NaN 像字母 文字*1之后都会变成NaN
let value=event.target.value*1
//如果用户输入数据非法,出现NaN或者小于1
if(isNaN(value)||this.skuNum<1){
 this.skuNum="1"
}
//排除有小数的情况，返回一个整数，向下取整
else{
this.skuNum=parseInt(value)
}
}
~~~

# 加入购物车成功与失败的判断（Promise,async,await）

~~~js
async AddOrUpdateShopCart(context,{skuId,skuNum}){
    //加入购物车返回的解构
    //加入购物车以后（发请求），前台将参数带给服务器
    //服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
    //因为服务器没有返回其余的数据，因此咱们不需要三连环存储数据
        let result =await reqAddOrUpdateShopCart(skuId,skuNum);
        //代表服务器写入数据成功
        if(result.code==200){
            return "ok"
        }else{
            //代表加入购物车失败,返回一个错误
         return Promise.reject(new Error('faile'))

        }
    }
~~~

~~~js
async addShopCar() {
      //1：发请求---将产品加入到数据库（通知服务器）
      try {
        await this.$store.dispatch("AddOrUpdateShopCart", {
          skuId: this.$route.params.skuid,
          skuNum: this.skuNum,
        });
      } catch (error) {
        alert(error.message);
      }
      //2:服务器存储成功---进行路由跳转传递参数
      //3:失败给用户提示
    },
~~~

# 本地存储和会话存储

> **JSON.stringify()** 方法将一个 JavaScript 对象或值转换为 JSON 字符串，如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的 replacer 是数组，则可选择性地仅包含数组指定的属性。

> **JSON.parse()** 方法用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象。提供可选的 **reviver** 函数用以在返回之前对所得到的对象执行变换 (操作)。JSON.parse(sesssionStorage.getItem(“SKUINFO”))

大概理解就是存对象的时候用JSON.stringify()，读的时候让他返回成一个对象用JSON.parse() *本地存储|会话存储，一般存储的是字符串,可以通过JSON转换对象*

**会话存储**

sessionStorage.setItem("SKUINFO",JSON.stringify(this.skuInfo))

sessionStorage.getItem(“SKUINFO”)

sessionStorage.removeItem(“SKUINFO”)

sessionStorage.clear()清空所有

**本地存储**

和上面一样，session换成local

# uuid游客身份获取购物车数据

> 创建一个utils文件夹专门封装一些功能文件

~~~js
生成uuid
import { v4 as uuidv4 } from 'uuid';
export const getUUID=()=>{
    //先从本地存储获取uuid()看看里面是否有uuid
    let uuid_token=localStorage.getItem('UUIDTOKEN')
    //如果没有
    if(!uuid_token){
        //生成游客身份
       uuid_token=uuidv4();
       //本次存储一次
       localStorage.setItem("UUIDTOKEN",uuid_token)
    }
    return uuid_token;
}

~~~

**引入**

~~~
import {getUUID} from '/src/utils/uuid_token'
存到vuex里的state里面
uuid_token:getUUID()
~~~

**修改头文件 让id参数信息带给服务器**

**api/request请求拦截器里面**

~~~
//给请求头添加一个字段 userTempId是后端给的
config.headers.userTempId=store.state.detail.uuid_token
~~~

写完这些再去三连环就可以获取到数据了

# 修改产品个数

这边需要用到节流，防止用户点击过快

~~~js
 //修改某一个产品的个数
    handler(type, disNum, cart) {
      //type:为了区分这三种元素
      //disNum形参：+变化量(1) -变化量(-1) input最终的个数(并不是变化量)
      //cart：哪一个产品[身上有id]
      switch (type) {
        case "add":
          //带给服务器变化的量
          disNum = 1;
          break;
        case "minus":
          //判断产品的个数是否大于1
          //如果出现产品个数小于等于1，那么传递给服务器的数据原封不动
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
          //如果输入的字符带给服务器是非法的
        case "change":
          if(isNaN(disNum)||disNum<1){
            disNum=0
          }else{
            //disNum是变化量,带给服务器的数字应该是输入的数字减去原来的数字
            disNum=parseInt(disNum)-cart.skuNum
          }
          break;
          //也可以简化的，但为了方便读代码
          //disNum=isNaN(disNum)||disNum<1? 0:parseInt(disNum)-cart.skuNum
      }
      //派发action
      try {
        //代表数据修改成功，向服务器发请求更新数据
        this.$store.dispatch("AddOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        //更新数据
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },
~~~

~~~js
节流操作
 handler:throttle(async function(type, disNum, cart){
 //type:为了区分这三种元素
      //disNum形参：+变化量(1) -变化量(-1) input最终的个数(并不是变化量)
      //cart：哪一个产品[身上有id]
      switch (type) {
        case "add":
          //带给服务器变化的量
          disNum = 1;
          break;
        case "minus":
          //判断产品的个数是否大于1
          //如果出现产品个数小于等于1，那么传递给服务器的数据原封不动
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        //如果输入的字符带给服务器是非法的
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            //disNum是变化量,带给服务器的数字应该是输入的数字减去原来的数字
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
        //也可以简化的，但为了方便读代码
        //disNum=isNaN(disNum)||disNum<1? 0:parseInt(disNum)-cart.skuNum
      }
      //派发action
      try {
        //代表数据修改成功，向服务器发请求更新数据
      await  this.$store.dispatch("AddOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        //更新数据
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },1500),
~~~





# 对于不需要返回数据的api接口三连环写法

~~~js
async deleteCart(context,skuId){
 let result=await reqDeleteCart(skuId);
 if(result.code==200){
  return "ok"
 }else{
  return Promise.reject(new Error('faile'))
 }
}
成功了返回ok 失败了返回
~~~

~~~js
 async deleteCart(cart) {
      try {
        //如果删除成功再次发请求
        await this.$store.dispatch("deleteCart", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
~~~

//两边都要用promise封装

# 删除全选商品和全选商品

Promise.all()

> 将多个promise对象封装成一个

删除全选商品

使用删除一个商品的api 写一个方法删除全部商品，需要在这个方法调用删除一个商品的，在methods里面调用不了，去vuex里面actions里写一个方法调用那个api，用context.dispatch，遍历有几个商品，context.dispatch得到多个promise对象，用promise.all（）封装成一个promise对象并且返回

~~~js
async deleteAllCheckedCart(){
try {
await  this.$store.dispatch("deleteAllCheckedCart")
this.getData()
} catch (error) {
 alert(error.message)
}
}
~~~

~~~js
 //删除选中所有商品
deleteAllCheckedCart(context){
let promiseAll=[]
context.getters.cartList.cartInfoList.forEach(item=>{
let promiseCart=item.isChecked==1? context.dispatch("deleteCart",item.skuId):''
promiseAll.push(promiseCart)
})
return Promise.all(promiseAll)
}
~~~

全选商品

~~~js
 //全选所有商品
   async  allCheckedCart(event){
      try {
      let isChecked=event.target.checked? "1":"0"
       await this.$store.dispatch("allCheckedCart",isChecked)
       this.getData()
      } catch (error) {
          alert(error.message)
      }
    }
~~~

~~~js
 //全选所有商品，调用上面的方法
  allCheckedCart(context,isChecked){
    let promiseAll=[];
    context.getters.cartList.cartInfoList.forEach(item=>{
      let promise=context.dispatch("checkCart",{skuId:item.skuId,isChecked})
      promiseAll.push(promise)
    })
    return  Promise.all(promiseAll)
  }
~~~

# 登陆注册业务

这边服务器请求都有问题

~~~js
 //用户注册
  async getUserRegister(context, user) {
    //这里有错误，一直显示参数格式不对
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("注册参数错误"));
    }
  },
  //用户登录 服务器返回不了东西
  async userLogin(context, user) {
    let result = await reqUserLogin(user);
    if(result.code==200){
      console.log("用户登录这请求成功了")
    }else{
      Promise.reject(new Error('用户登录这服务器有问题，返回不了token'))
    }
  },
};
~~~

~~~js
  //获取验证码
   async getCode(){
    //简单判断一下
     try {
       const {phone} =this
       phone&& (await this.$store.dispatch("getCode",phone))
       //将code属性值变为仓库中的验证码
       this.code=this.$store.state.user.code
     } catch (error) {
       alert(error.message)
     }
    },
    //用户注册
    async userRegister(){
      //这边202提示参数错误，暂时不清楚什么情况,zanshi写个如果成功失败都跳
      try {
        const {phone,code,password,password1}=this;
       (phone&&code&&password==password1) &&await this.$store.dispatch("getUserRegister",{phone,code,password})
       this.$router.push('./login')
      } catch (error) {
        this.$router.push('./login')
        console.error(error.message)
      }

    }
~~~

~~~js
 async userLogin(){
       try {
        const {phone,password}=this;
           //&&的断路
        (phone&&password)&&await this.$store.dispatch("userLogin",{phone,password})
        this.$router.push('./home')
       } catch (error) {
        this.$router.push('./home')
        console.error(error.message)
       }

      }
~~~

