<template>
    
        <me-navbar class="header" v-show="visible">
            <i class="iconfont icon-scan" slot="left"></i>
            <me-search-box
                placeholder="减价又打折，好货有逼格"
                slot="center"
                @query = "getQuery"
                fake
                @click.native="goToSearch"
            />
            <i class="iconfont icon-msg" slot="right"></i>
        </me-navbar>
    
</template>

<script>
import MeNavbar from 'base/navbar'
import MeSearch from 'base/search-box'

export default {
    name:'HomeHeader',
    components: {
        'me-navbar':MeNavbar,
        'me-search-box':MeSearch
    },
    data() {
        return {
            visible:true
        }
    },
    methods: {
        show(){this.visible = true},
        hide(){this.visible = false},
        getQuery(query){
            console.log(query)
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
            background-color: transparent;
            transition: background-color .5s;
        }

        &.header-transition {
            background-color: $header-bgc-translucent
        }

        .iconfont {
            color: $icon-color-default;
            font-size: $icon-font-size;
        }
    }
</style>