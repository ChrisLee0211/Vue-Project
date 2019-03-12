<template>
  <div class="banner">
    <me-loading v-if="!sliders.length"></me-loading>
    <me-slider
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      :data="sliders"
      v-else
    >
      <swiper-slide v-for="item in sliders" :key="item.id">
        <img :src="item" alt class="slider-img">
      </swiper-slide>
    </me-slider>
  </div>
</template>
<script>
import MeSlider from "base/slider";
import MeLoading from "base/loading";
import { swiperSlide } from "vue-awesome-swiper";
import { sliderOptions } from "./config";
import { getProductDetail } from "api/product";

export default {
  name: "p-banner",
  data() {
    return {
      itemId: "",
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      interval: sliderOptions.interval,
      pagination: sliderOptions.pagination,
      sliders: []
    };
  },
  props: {
    productId: Number,
    default: ""
  },
  components: {
    "me-slider": MeSlider,
    "me-loading": MeSlider,
    swiperSlide
  },
  created() {
    this.$nextTick(()=>{
      return this.getPic()
    })

  },
  methods: {
    update(){
      this.sliders = []
    },
    getPic() {
      this.itemId = this.productId;
      return getProductDetail(this.itemId).then(
        data => {
          this.sliders = data.data.item.images
        },
        err => {
          console.log("获取数据失败");
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.banner {
  height: 400px;
}
.slider-img {
  width: 100%;
  height: 100%;
}
</style>