<template>

    <div id="app" class="g-container">
      <div class="g-view-container">
        <keep-alive>
           <router-view v-if="isRouterAlive"></router-view>
        </keep-alive>
        
      </div>
      <div class="g-footer-container">
        <c-tabbar></c-tabbar>
      </div>
    </div>

</template>

<script>
  import CTabbar from 'components/tabbar';
  export default {
    provide(){
      return{
        reload:this.reload
      }
    },
    data() {
      return {
        isRouterAlive:true
      }
    },
    methods: {
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      }
    },
    components: {
      'c-tabbar': CTabbar
    }
  };
</script>
