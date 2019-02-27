<template>
  <div class="result">
    <div class="loading-container" v-show="loading">
      <me-loading/>
    </div>
    <ul class="g-list" v-show="!loading && results.length">
      <!-- <li class="class="g-list-item""> -->
      <li class="g-list-item" v-for="(item, index) in results" :key="index" @click="$_selectItem(item[0])">
        <span class="g-list-text">{{item[0]}}</span>
      </li>
    </ul>
    <div class="no-result" v-show="!loading && !results.length">没有结果</div>
  </div>
</template>

<script>
  import MeLoading from 'base/loading';
  import {getSearchResult} from 'api/search';
  import {searchMixin} from 'assets/js/mixins';
  export default {
    name: 'SearchResult',
    components: {
      MeLoading
    },
    props:{
      query:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        results:[],
        loading:false
      }
    },
    mixins:[searchMixin],
   watch:{
     query(query){
       this.getResult(query)
     }
   },
    methods: {
      getResult(keyword){
        if(!keyword){return}
        this.loading = true
        getSearchResult(keyword).then(data => {
          data.forEach(da => {
           da[0] = da[0].replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g,'')
          });
          this.results = data
          this.loading = false
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
