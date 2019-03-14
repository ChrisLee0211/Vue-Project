<template>
  <transition name="product">
    <div class="product">
        <p-header />
        <div class="main">
         <!-- <me-scroll ref="scroll" @scroll-end="scrollEnd"> -->
        <p-content :productId="itemId"/>
         <!-- </me-scroll> -->
      </div>
      
      <p-footer/>
    </div>
  </transition>
</template>
<script>
// import {getItem} from "api/product"
import MeScroll from "base/scroll";

import productHeader from "./header";
import productFooter from "./footer";
import productContent from "./content"


export default {
  name: "product",
  components: {
    "p-header": productHeader,
    "p-footer": productFooter,
    "p-content": productContent,
    "me-scroll":MeScroll
  },
  data() {
    return {
      itemId: "",
      itemDetail: {},
      isBacktopVisible: false
    };
  },
  created() {
    this.getItemId();

  },
  methods: {
    getItemId() {
      this.itemId = this.$route.params.id;
      toString(this.itemId);
    },
    scrollEnd(translate, scroll, pulling) {
      if (translate < 0 && -translate > scroll.height) {
        this.isBacktopVisible = true;
      } else {
        this.isBacktopVisible = false;
      }
    },
    updateScroll() {
      if (this.$refs.scroll) {
        this.$refs.scroll.update();
      }
    },
    backToTop(speed) {
      this.$refs.scroll && this.$refs.scroll.scrollToTop(speed);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.product {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: $product-z-index;
  width: 100%;
  height: 100%;
  background: $bgc-theme;
}
.product-enter-active,
.product-leave-active {
  transition: all 0.3s;
}

.product-enter,
.product-leave-to {
  transform: translate3d(100%, 0, 0);
}
.g-backtop-container {
  bottom: 10px;
}
.g-content-container {
    display: flex;
    // padding-bottom: 46px;
    // padding-top: 46px
  }

.main{
  height: 100%;
}
</style>
