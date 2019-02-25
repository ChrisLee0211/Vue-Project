<template>
  <div class="mine-search-box-wrapper">
    <i class="iconfont icon-search"></i>    
    <input
      class="mine-search-box"
      type="text"
      title="搜索框" 
      :placeholder="placeholder" 
      ref="input"    
      v-model="query"     
    >
    <i
      class="iconfont icon-close" 
      v-show="query"  
      @click="reset"   
    ></i>
  </div>
</template>

<script>

  export default {
    name: 'MeSearchBox',
    props:{
      placeholder:{
        type:String,
        default:'请输入搜索内容'
      },
    },
    data() {
      return {
        query:''
      }
    },
    methods: {
      focus(){
        this.$refs.input && this.$refs.input.focus()
      },
      clear(){
        this.query = ''
      },
      reset(){
        this.clear();
        this.focus()
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  $search-box-height: 30px;

  .mine-search-box-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: $search-box-height;
    padding: 0 7px;
    background-color: #fff;
    border-radius: $search-box-height / 2;
  }

  .iconfont {
    color: $icon-color;
    font-size: $icon-font-size-sm;
    font-weight: bold;
  }

  .mine-search-box {
    flex: 1;
    background: none;
    border: none;
    margin: 0 6px;
    color: #666;
    line-height: 1.5;
  }
</style>
