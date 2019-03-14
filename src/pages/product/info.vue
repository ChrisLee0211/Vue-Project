<template>
  
  <div class="item">
    <div class="price-info">
      <div class="price">
        <span>￥</span>
        <div class="num">{{price}}</div>
      </div>
      <div class="already-sell">{{already_sell}}已售</div>
    </div>
    <div class="name-info">{{name}}</div>
    <div class="sell-info">
      <span class="if-post">{{postage}}</span>
      <span class="m-sells">月销量{{m_sells}}</span>
      <span class="area">{{area}}</span>
    </div>
  </div>
</template>
<script>
import MeLoading from "base/loading";
import { getProductDetail } from "api/product";

export default {
  props: {
    productId: Number,
    default: NaN
  },
  data() {
    return {
        price:"",
        already_sell:"",
        name:"",
        postage:"",
        m_sells:"",
        area:"",
        p_id:""
    };
  },
  components:{
      'me-loading':MeLoading
  },
  created(){
      return this.getInfo()
  },
  methods:{
      getInfo(){
          this.p_id = this.productId;
          return getProductDetail(this.p_id).then(
              data => {
                  if(data.ret[0] = "SUCCESS::调用成功"){
                      let mockData = JSON.parse(data.data.apiStack[0].value)
                      this.price = mockData.price.price.priceText;
                      this.already_sell = mockData.item.itemPoint;
                      this.name = mockData.item.title;
                      this.postage = mockData.delivery.postage;
                      this.m_sells = mockData.item.sellCount;
                      this.area = mockData.delivery.from;
                  }
              }
          )
      }
  }
};
</script>
<style lang="scss" scoped>
    .item{
        width: 100%;
        height: 180px;
        display: flex;
        flex-flow: column;
        .price-info {
            width: 100%;
            height: 80px;
            background: linear-gradient(left,rgb(226, 75, 113),deeppink);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price{
                color: white;
                padding: 10px 10px;
                line-height: 40px;
                margin-left: 10px;
                & span{
                   float: left;
                    font-size: 15px;
                }
                .num {
                    float: left;
                    font-size: 30px
                }
            }
            .already-sell {
                // width: 70px;
                // height: 20px;
                padding: 5px 10px;
                background: black;
                opacity: 0.3;
                color:white;
                // text-align: center;
                // line-height: 20px;
                margin-right: 10px;
                border-radius: 5px
            }
        }
        .name-info{
            width: 100%;
            height: 80px;
            box-sizing: border-box;
            background: white;
            font-size: 14px;
            color: black;
            line-height: 20px;
            padding:20px 5px;
        }
        .sell-info{
            width: 100%;
            height: 20px;
            background: white;
            box-sizing: border-box;
            padding: 10px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
        }
    }
</style>