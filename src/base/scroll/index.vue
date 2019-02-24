<template>
  <div>
    <swiper :options="swiperOption" ref="swiper">
      <div class="mine-scroll-pull-down" v-if="pullDown">
        <me-loading :text="pullDownText" inline  ref="pullDownLoading" />
      </div>
      <swiper-slide>
        <slot></slot>
      </swiper-slide>
      <div class="mine-scroll-pull-up" v-if="pullUp">
        <me-loading :text="pullUpText" inline  ref="pullUpLoading" />
      </div>
      <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import MeLoading from "base/loading";

import {
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END,
  PULL_UP_HEIGHT,
  PULL_UP_TEXT_INIT,
  PULL_UP_TEXT_START,
  PULL_UP_TEXT_ING,
  PULL_UP_TEXT_END
} from "./config";

export default {
  components: {
    swiper,
    swiperSlide,
    MeLoading
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    data: {
      type: [Array, Object]
    },
    pullDown: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type:Boolean,
      default:false
    }
  },
 
  watch: {
    data() {
      this.update();
    }
  },
  created(){
    this.init()
  },
  methods: {
    update() {
      if (this.$refs.swiper) {
        this.$refs.swiper.swiper.update();
      }
    },

    scrollToTop(speed, runCallbacks){
       if (this.$refs.swiper) {
        this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks);
      }
    },

    init(){
      this.pulling = false, //用于判断已经在下拉更新等待中，是否又被下拉了，默认为false
      this.pullDownText = PULL_DOWN_TEXT_INIT,
      this.pullUpText =  PULL_UP_TEXT_INIT,
      this.swiperOption = {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        setWrapperSize: true,
        scrollbar: {
          el: this.scrollbar ? ".swiper-scrollbar" : null,
          hide: true
        },
        on: {
          sliderMove: this.scroll,
          touchEnd:this.touchEnd,
          transitionEnd:this.scrollEnd
        }
      }
    },

    scroll(){
      const swiper = this.$refs.swiper.swiper;

      this.$emit('scroll',swiper.translate,this.$refs.swiper.swiper)

      if(this.pulling){return}

      if(swiper.translate > 0){ //只有当下拉距离大于0时，才表示发生下拉动作
        if(!this.pullDown){ //如果没触发pullDown，说明没有拉到显示文字的距离，那就直接返回
          return
        }
        if(swiper.translate > PULL_DOWN_HEIGHT){
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
        }else{
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
        }
      }else if (swiper.isEnd) { // 上拉
          if (!this.pullUp) {
            return;
          }

          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));

          if (isPullUp) {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
          } else {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
          }
        }
    },
    scrollEnd(){
      this.$emit('scroll-end', this.$refs.swiper.swiper.translate,this.$refs.swiper.swiper,this.pulling)
    },
    touchEnd(){
      if(this.pulling){return}
      const swiper = this.$refs.swiper.swiper;


      if(swiper.translate > PULL_DOWN_HEIGHT){ //当下拉距离超过100才表示要刷新
        if(!this.pullDown) {
          return
        }

        this.pulling = true
        swiper.allowTouchMove = false; //swiper实例中的配置参数：禁止触摸
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(PULL_DOWN_HEIGHT) //通过swiper自带的方法回弹到100的高度
        swiper.params.virtualTranslate = true; //定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING)
        this.$emit('pull-down',this.pullDownEnd)
      }else if (swiper.isEnd) { // 底部
          const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;

          if (isPullUp) { // 上拉
            if (!this.pullUp) {
              return;
            }
            this.pulling = true;
            swiper.allowTouchMove = false; // 禁止触摸
            swiper.setTransition(swiper.params.speed);
            swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
            swiper.params.virtualTranslate = true; // 定住不给回弹
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
            this.$emit('pull-up', this.pullUpEnd);
          }
        }
    },
    pullDownEnd(){
      const swiper = this.$refs.swiper.swiper;

      this.pulling = false;
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END)
      swiper.params.virtualTranslate = false;
      swiper.allowTouchMove = true;
      swiper.setTransition(swiper.params.speed);
      swiper.setTranslate(0) ;
      setTimeout(()=>{
        this.$emit('pull-down-transition-end')
      },swiper.params.speed)
    },
    pullUpEnd() {
        const swiper = this.$refs.swiper.swiper;
        this.pulling = false;
        this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
      }
  }
};
</script>
<style lang="scss" scoped>
.swiper-container {
    overflow: hidden;
    width: 100%;
    height: 100vh;
  };

  .swiper-slide {
    height: auto;
  }
  .mine-scroll-pull-up,
  .mine-scroll-pull-down {
    position: absolute;
    left: 0;
    width: 100%;
  }
  .mine-scroll-pull-down {
    bottom: 100%;
    height: 80px;
  }

  .mine-scroll-pull-up {
    top: 100%;
    height: 30px;
  }
</style>