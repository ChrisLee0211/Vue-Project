<template>
  <me-navbar class="header" v-show="visible">
    <i class="iconfont icon-back" slot="left" @click="goBack"></i>
    <div class="page-title" slot="center">商品详情</div>
    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
</template>
<script>
import MeNavbar from "base/navbar";

export default {
  
  components: {
    "me-navbar": MeNavbar
  },
  data() {
    return {
      visible: true
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    goBack() {
      
      this.$emit('backToHome')
      this.$router.push({path:'/home'})
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

.header {
 &.mine-navbar {
      background-color: $header-bgc-translucent;
    }

  &.header-transition {
    background-color: $header-bgc-translucent;
  }

  .iconfont {
    color: $icon-color-default;
    font-size: $icon-font-size;
  }
  .page-title{
      color:white;
      font-size: 13px;
      text-align: center
  }
}
</style>
