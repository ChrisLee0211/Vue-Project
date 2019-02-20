<template>
    <div class="mine-navbar">
        <div class="mine-navbar-left" v-if="$slots.left">
            <slot name="left"></slot>
        </div>
        <div class="mine-navbar-center" v-if="$slots.center">
            <slot name="center"></slot>
        </div>
        <div class="mine-navbar-right" v-if="$slots.right">
            <slot name="right"></slot>
        </div>
        <h1 class="mine-navbar-title" v-if="title" >
            <span class="mine-navbar-text" v-text="title"></span>
        </h1>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type:String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "~assets/scss/mixins";

    .mine-navbar {
        position: relative;
        @include flex-between();
        height: 50px;
        background:  #fff;

        &-left {
            margin-left: 10px;

            // 如果有left、center组件时，最右就取消绝对定位
            ~ .mine-navbar-right {
                position: static
            }
        }

        &-center {
            margin: 0 10px;
            flex:1;

             ~ .mine-navbar-right {
                position: static
            }
        }

        &-right {
            position: absolute;
            right: 0;
            @include flex-center();
            height: 100%;
            margin-right: 10px;
        }

        &-title {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20%;
            right: 20%;
            @include flex-center();
            text-align: center;

            &-text {
                font-size: 18px;
                @include ellipsis();
                width: 100%;
                line-height: 1.5;
            }
        }


        
    }
</style>