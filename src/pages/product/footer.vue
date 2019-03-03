<template>
    <div class="footer">
        <div class="footerItem">
            <img src="../../assets/img/dianpu.png" alt="" class="icon">
            <div class="desc">店铺</div>
        </div>
        <div class="footerItem">
            <img src="../../assets/img/kefu.png" alt="" class="icon">
            <div class="desc">客服</div>
        </div>
        <div class="footerItem">
            <img src="../../assets/img/shoucang.png" alt="" class="icon">
            <div class="desc">收藏</div>
        </div>
        <div class="addToCart">加入购物车</div>
        <div class="getNow">马上抢</div>
    </div>
</template>
<script>
export default {
    name:'p-footer'
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

    .footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 60px;
        background-color:white;
        display: flex;
        box-shadow:0px -2px 5px #dddddd;
        .footerItem{
            flex: 1;
            box-sizing: border-box;
            padding: 10px 10px;
            display: flex;
            flex-flow: column;
            justify-content: space-between;
            align-items: center;
            .icon{
                width: 80%;
                margin-bottom: 2px
            }
            .desc{
                font-size: 13px
            }
        }
        .addToCart{
            flex: 3.0;
            text-align: center;
            line-height: 60px;
            background: rgb(255, 157, 0)
        }
        .getNow{
            flex: 2.5;
            text-align: center;
            line-height: 60px;
            background:$header-bgc-translucent;
        }
        .addToCart, .getNow{
            font-size: 15px;
            color: white
        }
    }
</style>