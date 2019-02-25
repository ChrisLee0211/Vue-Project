<template>
    <div class="home">
        <header class="g-header-container">
          <home-header :class="{'header-transition':isHeaderTransition}" ref="header"/>
        </header>
        <me-scroll 
        :data="recommends" 
        pullDown pullUp 
        @pull-down="pullToRefresh" 
        @pull-up="pullToLoadMore"
        @scroll-end="scrollEnd"
        @scroll="scroll"
        @pull-down-transition-end="pullDownTransitionEnd"
        ref="scroll"
        >
          <home-slider ref="slider"/>
          <home-nav/>
          <home-recommend @loaded="getRecommends" ref="recommend"/>
        </me-scroll>
        
        <div class="g-backtop-container">
          <me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
  import MeScroll from 'base/scroll'
  import MeBacktop from 'base/backtop'
  import HomeHeader from './header'
  import HomeSlider from './slider'
  import HomeNav from './nav'
  import HomeRecommend from './recommend'
  import {HEADER_TRANSITION_HEIGHT} from './config'

  export default {
    name: 'home',
    components: {
      'home-header':HomeHeader,
      'home-slider':HomeSlider,
      'me-scroll':MeScroll,
      'home-nav':HomeNav,
      'home-recommend':HomeRecommend,
      'me-backtop':MeBacktop,
    },
    data() {
      return {
        recommends:[],
        isBacktopVisible: false,
        isHeaderTransition:false
        
      }
    },
    methods: {
      updateScroll(){
      },
      getRecommends(recommends){
        this.recommends = recommends;
      },
      pullToRefresh(end){
        // setTimeout(() => {
        //   console.log('下拉刷新');
        //   end()
        // },1000)
        this.$refs.slider.update().then(end)
      },
      pullToLoadMore(end){
        this.$refs.recommend.update().then(end).catch(err => {
          if(err) {
            console.log(arr)
          }
          end();
        })
      },
      scrollEnd(translate, scroll, pulling){
        if(!pulling){
          this.changeHeaderStatus(translate)
        }
        if(translate < 0 && -translate > scroll.height){
          this.isBacktopVisible = true
        }else{
          this.isBacktopVisible = false
        }
        this.changeHeaderStatus(translate)
      },
      backToTop() {
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      },
      changeHeaderStatus(translate) {
        if(translate > 0) {
          this.$refs.header.hide();
          return;
        }
        this.$refs.header.show();
        if(-translate > HEADER_TRANSITION_HEIGHT){
          this.isHeaderTransition = true
        }else{
          this.isHeaderTransition = false
        }
      },
      scroll(translate){
        this.changeHeaderStatus(translate)
      },
      pullDownTransitionEnd(){
        this.$refs.header.show()
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
