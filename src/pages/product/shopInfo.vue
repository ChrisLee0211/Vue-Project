<template>
  <div class="shop-info">
    <div class="shop-info-main">
      <div class="shop-info-main-desc">
        <img :src="picUrl" alt>
        <div class="shop-name">
          <div class="name">{{shopName}}</div>
          <img :src="shopTagUrl" alt class="shop-tag">
        </div>
      </div>
      <div class="shop-info-main-tag">
        <div class="tag" v-for="(item, index) in tagList" :key="index">{{item.title}}&nbsp;{{item.score}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProductDetail } from "api/product";

export default {
  props: {
    productId: Number,
    default: 0
  },
  data() {
    return {
      picUrl: "",
      shopTagUrl:"",
      shopName:"",
      tagList:[]
    };
  },
  created(){
      return this.getShopInfo()
  },
  methods: {
      getShopInfo(){
          return getProductDetail(this.productId).then(
              data => {
                  let seller = data.data.seller;
                  this.picUrl = seller.shopIcon;
                  this.shopTagUrl = seller.creditLevelIcon;
                  this.shopName = seller.shopName;
                  this.tagList = seller.evaluates
              }
          )
      }
  }
};
</script>
<style lang="scss" scoped>
    
    .shop-info{
        width: 100%;
        height: 150px;
        background: white;
        &-main{
          width: 100%;
          height: 100%;
          padding: 10px 10px;
          display: flex;
          flex-flow: column;
          justify-content: flex-start;
          align-items: flex-start;
          &-desc img{
            display: block;
            width: 80px;
            height: 80px;
          }

           &-desc {
            height: 100px;
            display: flex;
            justify-content: center;
            .shop-name{
              height: 80px;
              display: flex;
              flex-flow: column;
              justify-content: flex-start;
              margin: 20px 20px;
              .name {
                font-size: 13px;
              }
              .shop-tag {
                display: block;
                width: 50px;
                height: auto;
                margin: 10px 0;
              }
            }
          }

          &-tag{
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: space-around;
            .tag {
              font-size: 15px;
              color: black
            }
          }
        }
    }
</style>