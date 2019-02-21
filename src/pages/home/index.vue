<template>
    <div class="home">
        <header class="g-header-container">
          <home-header></home-header>
        </header>
        <me-scroll :data="recommends" pullDown @pull-down="pullToRefresh">
          <home-slider/>
          <home-nav/>
          <home-recommend @loaded="getRecommends"/>
        </me-scroll>
        
        <div class="g-backtop-container"></div>
        <router-view></router-view>
    </div>
</template>
<script>
  import MeScroll from 'base/scroll'
  import HomeHeader from './header'
  import HomeSlider from './slider'
  import HomeNav from './nav'
  import HomeRecommend from './recommend'

  export default {
    name: 'home',
    components: {
      'home-header':HomeHeader,
      'home-slider':HomeSlider,
      'me-scroll':MeScroll,
      'home-nav':HomeNav,
      'home-recommend':HomeRecommend
    },
    data() {
      return {
        recommends:[]
      }
    },
    methods: {
      updateScroll(){

      },
      getRecommends(recommends){
        this.recommends = recommends;
      },
      pullToRefresh(end){
        setTimeout(() => {
          console.log('下拉刷新');
          end()
        },1000)
      }
    }
  };
</script>
<style lang="scss" scoped>
    @import "~assets/scss/mixins";

    .home {
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: $bgc-theme
    }
</style>
