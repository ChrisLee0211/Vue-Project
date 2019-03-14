<template>
  <div class="content">
    <div class="loading-container" v-if="load_err">
      <div class="loading-wrapper">
        <me-loading/>
      </div>
    </div>
    
    <div class="total">商品评价 ({{content_nums}})</div>
    <div class="tag-list">
      <div class="tag" v-for="(item, index) in tagList" :key="index">{{item.word}}({{item.count}})</div>
    </div>
    <div class="content-body">
      <div class="avatar">
        <img :src="avatarURL" alt class="user-avatar">
        <span class="user">{{user}}</span>
      </div>
      <article class="aricle">{{article}}</article>
      <div class="item-info">{{dateTime}}&nbsp;&nbsp;{{itemInfo}}</div>
    </div>
  </div>
</template>
<script>
import { getProductDetail } from "api/product";
import MeLoading from "base/loading";

export default {
  data() {
    return {
      content_nums: "",
      tagList: [],
      article: "",
      avatarURL: "",
      user: "",
      itemInfo: "",
      dateTime: "",
      load_err:false
    };
  },
  props: {
    productId: Number,
    default: 0
  },
  components:{
    "me-loading":MeLoading
  },
  created() {
    return this.getContent();
  },
  methods: {
    getContent() {
      return getProductDetail(this.productId).then(data => {
        if(data.ret[0] == "FAIL_SYS_USER_VALIDATE"){
          this.load_err = true;
          return
        }
        let rate = data.data.rate;
        console.log(rate);
        this.content_nums = rate.totalCount;
        this.tagList = rate.keywords;
        this.article = rate.rateList[0].content;
        this.avatarURL = rate.rateList[0].headPic;
        this.user = rate.rateList[0].userName;
        this.itemInfo = rate.rateList[0].skuInfo;
        this.dateTime = rate.rateList[0].dateTime;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: $category-popup-z-index;
  @include flex-center();
  width: 100%;
  height: 100%;
  /*background-color: $modal-bgc;*/

  .mine-loading {
    color: #fff;
    font-size: 14px;
  }
}
.loading-wrapper {
  width: 50%;
  padding: 30px 0;
  background-color: $modal-bgc;
  border-radius: 4px;
}
.content {
  width: 100%;
  // box-sizing: border-box;
  padding-bottom: 10px;
  margin: 15px 0;
  background: white;
  display: flex;
  flex-flow: column;
  .total {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-indent: 5px;
    font-size: 16px;
    color: gray;
  }
  .tag-list {
    width: 100%;
    height: 85px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    align-content: space-around;
    .tag {
      box-sizing: border-box;
      padding: 10px 10px;
      border-radius: 15px;
      background: rgb(250, 219, 206);
      color: black;
      font-size: 10px;
      margin: 0 5px;
    }
  }
  .content-body {
    box-sizing: border-box;
    padding: 10px 10px;
    display: flex;
    flex-flow: column;
    .avatar {
      padding: 2px 2px;
      display: flex;
      align-items: center;
      .user-avatar {
        display: block;
        width: 40px;
        height: 40px;
        float: left;
        border-radius: 50%;
      }
      .user {
        display: block;
        float: left;
        font-size: 14px;
        margin: 0 5px;
      }
    }
    .aricle {
      color: black;
      font-size: 13px;
      line-height: 20px;
    }
    .item-info {
      margin:5px 0;
      line-height: 17px
    }
  }
}
</style>