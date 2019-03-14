<template>
    <me-navbar class="header">
        <me-search-box 
        slot="center"
        fake
        @query="getQuery"
        @click.native = "goToSearch"
        placeholder="减价又打折，好货有逼格"
        />
        <i class="iconfont icon-msg" slot="right"></i>
    </me-navbar>
</template>
<script>
import MeNavbar from 'base/navbar'
import MeSearch from 'base/search-box'

export default {
    name:'CategoryHeader',
    components:{
        'me-navbar':MeNavbar,
        'me-search-box':MeSearch
    },
    methods: {
      getQuery(query){
        return
      },
      goToSearch(){
        this.$router.push('/search')
      }
    }
}
</script>
<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header {
    &.mine-navbar {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>