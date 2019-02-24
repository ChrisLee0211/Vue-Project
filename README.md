# my_project

> A Vue.js project


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
