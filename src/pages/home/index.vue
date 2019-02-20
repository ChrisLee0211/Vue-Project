<template>
    <div class="home">
        <header class="g-header-container">
          <home-header></home-header>
        </header>
        <me-scroll>
          <home-slider></home-slider>
          <home-nav></home-nav>
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

  export default {
    name: 'home',
    components: {
      'home-header':HomeHeader,
      'home-slider':HomeSlider,
      'me-scroll':MeScroll,
      'home-nav':HomeNav
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
