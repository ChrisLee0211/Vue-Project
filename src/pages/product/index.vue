<template>
  <div class="product">
    <p-header @backToHome="updateBanner"/>
    <p-banner :productId="itemId" ref="banner"/>
    <p-footer/>
  </div>
    
</template>
<script>
// import {getItem} from "api/product"
import productHeader from './header'
import productFooter from './footer'
import productBanner from './banner'

  export default {
    
    name: 'product',
    components: {
      'p-header':productHeader,
      'p-footer':productFooter,
      'p-banner':productBanner
    },
    data() {
      return {
        itemId:'',
        itemDetail:{}
      }
    },
    created(){
      this.getItemId();
      // this.updateBanner()
    },
    methods: {
      updateBanner(){
        
        this.$refs.banner.update()
      },
      getItemId(){
        this.itemId = this.$route.params.id
        parseInt(this.itemId)
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
    background: $bgc-theme
  }
</style>
