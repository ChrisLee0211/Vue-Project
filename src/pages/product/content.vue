<template>
   <div class="content-wrapper">
       <me-scroll ref="scroll" @scroll-end="scrollEnd">
        <p-banner :productId="itemId" ref="banner"/>
        <p-info :productId="itemId"/>
        <p-comments :productId="itemId"/>
        <p-shopinfo :productId="itemId"/>
        <div class="filling"></div>
    </me-scroll>
   </div>
</template>
<script>
import MeScroll from "base/scroll";
import MeBacktop from "base/backtop";

import productBanner from "./banner";
import productInfo from "./info";
import productComments from "./comments"
import productShopInfo from "./shopInfo"

export default {
    props: {
    productId: Number,
    default: 0
  },
  data() {
      return {
          itemId:""
      }
  },
    components: {
    "me-scroll": MeScroll,
    "p-banner": productBanner,
    "p-info": productInfo,
    "p-comments":productComments,
    'p-shopinfo':productShopInfo
  },
  created(){
      return this.getItemId()
  },
  methods: {
      getItemId() {
      this.itemId = this.productId;
      toString(this.itemId);
    },
     scrollEnd(translate, scroll, pulling) {
      if (translate < 0 && -translate > scroll.height) {
        this.isBacktopVisible = true;
      } else {
        this.isBacktopVisible = false;
      }
    },
  }
}
</script>
<style lang="scss" scoped>
    @import "~assets/scss/mixins";

.content-wrapper {
  position: relative;
  height: 100%;
}
.filling{
  width:100%;
  height: 100px;
}
</style>