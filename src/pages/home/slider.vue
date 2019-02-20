<template>
  <div class="slider-wrapper">
    <me-loading v-if="!sliders.length"></me-loading>
    <me-slider :direction="direction" :loop="loop" :interval="interval" :pagination="pagination" v-else>
      <swiper-slide v-for="(item, index) in sliders" :key="index">
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" alt class="slider-img">
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>
<script>
import MeSlider from "base/slider";
import { swiperSlide } from "vue-awesome-swiper";
import {sliderOptions} from './config'
import {getHomeSlider} from 'api/home'
import MeLoading from 'base/loading'

export default {
  components: {
    "me-slider": MeSlider,
    "swiper-slide": swiperSlide,
    "me-loading":MeLoading
  },
  data() {
    return {
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      interval: sliderOptions.interval,
      pagination: sliderOptions.pagination,
      sliders: [
        // {
        //   linkUrl: "https://www.imooc.com",
        //   picUrl: require("./1.jpg")
        // },
        // {
        //   linkUrl: "https://www.imooc.com",
        //   picUrl: require("./2.jpg")
        // },
        // {
        //   linkUrl: "https://www.imooc.com",
        //   picUrl: require("./3.jpg")
        // },
        // {
        //   linkUrl: "https://www.imooc.com",
        //   picUrl: require("./4.jpg")
        // }
      ]
    };
  },
  methods:{
      getSliders(){
          getHomeSlider().then(data => {
              this.sliders = data
          })
      }
  },
  created(){
      this.getSliders()
  }

};
</script>
<style lang="scss" scoped>
    .slider-wrapper{
        height: 183px
    }
    .slider-link{
        display: block
    }
    .slider-link,.slider-img{
        width: 100%;
        height: 100%;
    }
</style>