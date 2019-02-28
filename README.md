# my_project

> 关于Vue的实践项目，参照各电商移动端的通用特点，编写的一个移动端项目。

# 技术栈：
> - Vue全家桶（vuex暂时没用上） 
> - vue-awesome-swiper(用于构建通用式轮播组件) 
> - axios（借用了慕课网暴露的api做数据测试）
> - jsonp（解决跨域）
> - Scss（比css3提供更多的样式编写想象空间）
> - vue-lazyload（02.22新增用于懒加载）

# 开发日志
## 2019.02.20：
已完成项：
- 完成了首页中**头部**和**底部**的固定框组件编写
- 完成了轮播组件编写
- 完成了`loading`组件（用于资源加载时显示的替换内容）
- 完成了可视区内的滚动条开发(运用了Swiper)

开发踩坑记录：  
（一）在运用`swiper`做垂直滚动条时，及时内容超出了可视区的范围也无法上下滚动和显示滚动条；  
原因：只有当内容远远多于可视区域才有滚动的空间，因此将子容器的高度用内容撑开，父容器设置了固定高度；

（二）测试中曾出现远程后台数据获取失败，然后整个页面报错；  
原因：`axios`的`get`方法本质上返回的是`Promise对象`，应该在里面主动捕获错误，定义`catch`方法来处理异常

## 2019.02.22：
已完成项：
- 完成了热门推荐商品展示组件
- 完成了图片懒加载模块编写
- 完成了下拉刷新模块

开发踩坑记录：  
（一）商品展示用的是'聚划算'的API，在使用`jsonp`获取时，数量固定在20条，下滑也无法继续加载；  
原因：在渲染时，因为自己定义了一个数组来装载图片，每次渲染时数组并没有改变，因此需要不断累加拼接数据，用了`concat`方法把每次请求来的商品数组拼接到原来的数组中，解决了问题。  

（二）编写顶部的下拉刷新逻辑时，预想着下拉高度大于100时改变"加载中"的文字内容，结果页面一下拉就报错；  
原因：因为这个行为存在着**子组件改变父组件数据**的逻辑，从**vue2.0**之后就禁止了这种行为，因此只能把`loading组件`中的文字接口关闭，改为暴露一个`setText()`方法，自身改变文字内容。

## 2019.02.24：
已完成项：
- 完成了回到顶部组件编写
- 完成了向下滚动加载更多商品列表功能
- 解决头部显示效果BUG

开发踩坑记录：  
（一）下拉刷新的时候，滚动条无法自动根据内容长度而变化，导致页面无法滑动；  
原因：Swiper的滚动组件只用了`mounted`钩子函数来加载渲染，因此计算高度时只能计算第一次获取商品jsonp的总数量高度，为了每次下拉加载都能改变滚动条长度，需要在`loading组件`中自定义一个接口来重新初始化`Swiper`滚动条。  

## 2019.02.26：
已完成项：
- 完成了分类页侧边栏开发
- 完成了首页搜索栏组件开发
- 分类页数据增加`LocalStorage`缓存功能

开发踩坑记录：  
（一）分类页的侧边栏每次点击都会发送一次ajax，快速多次点击的时候，显示的内容并不是当前点击的分类栏内容；  
原因：**快速点击时，上一次请求还没返回，下一次又开始，于是获取到的只能是上一次的数据。** 解决办法是在`axios`里调用它的`cancel`方法，当这次ajax换了请求地址时，主动终止，只请求最后点击的数据。  

（二）分类页即使用了`LocalStorage`，从首页跳转过去时依然会重新请求后台;  
原因：整个app都是用`vue-router`提供的`<router-view>`做为路由组件渲染的，因此每次从一个跳转都会发生路由地址改变，因此会重新渲染。解决办法是在<router-view>的外层包裹一层`<keep-alive>`去保存组件

## 2019.02.28：
已完成项：
- 完成了搜索页开发
- 完成了历史搜索词组件
- 完成了搜索建议功能组件
- 完成了清楚搜索功能组件

开发踩坑记录：  
（一）搜索建议中部分关联词带有`<br>`标签；  
原因：因为数据是借调了第三方的后台数据，服务器端没有对数据做过滤，同时也是自己没有对字符串做处理的缘故，于是在返回的数据中配合正则进行了过滤。  

（二）搜索建议的功能发送请求过于频繁不利于性能优化;  
原因：原理上是在搜索框用`v-model`绑定了一个`query`的数据，然后监听它，一旦发生改变就向后台请求，但是每次输入都发请求显然不合理，应该等词语输入完成才发送，于是加入了**函数节流** ，如下：

```javascript
//通过延迟执行，每次执行前清除上一次定时的方法保证等所有字符串输入完成才触发函数
export const debounce = (func, delay = 200) => {
    let timer = null;

    return function(...args) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this,args);
        },delay)
    };
};

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
