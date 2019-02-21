# my_project

> 关于Vue的实践项目，参照各电商移动端的通用特点，编写的一个移动端项目。

# 技术栈：
> - Vue全家桶（vuex暂时没用上） 
> - vue-awesome-swiper(用于构建通用式轮播组件) 
> - axios（借用了慕课网暴露的api做数据测试）
> - jsonp（解决跨域）
> - Scss（比css3提供更多的样式编写想象空间）

# 开发日志
## 2019.02.20：
已完成项：
- 完成了首页中**头部**和**底部**的固定框组件编写
- 完成了轮播组件编写
- 完成了`loading`组件（用于资源加载时显示的替换内容）
- 完成了可视区内的滚动条开发(运用了Swiper)

开发踩坑：  
（一）在运用`swiper`做垂直滚动条时，及时内容超出了可视区的范围也无法上下滚动和显示滚动条；  
原因：只有当内容远远多于可视区域才有滚动的空间，因此将子容器的高度用内容撑开，父容器设置了固定高度；

（二）测试中曾出现远程后台数据获取失败，然后整个页面报错；  
原因：`axios`的`get`方法本质上返回的是`Promise对象`，应该在里面主动捕获错误，定义`catch`方法来处理异常

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
