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


## 2019.02.23：
已完成项：
- 完成了上拉加载更多商品功能
- 完成了顶部下拉刷新重新加载轮播功能

开发踩坑记录：  
（一）下拉刷新轮播组件时，头尾切换出现了刷新前图片占位的bug；  
原因：使用swiper做的无缝滚动轮播实际上是在每次渲染一组图片前把第一张复制多了一份放在最后，因此下拉刷新时不仅要更新`ajax`获取的数据，更加重新加载`dom元素`把之前额外复制的图片去除掉；  


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
