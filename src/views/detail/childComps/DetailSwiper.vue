<template>
    <swiper class="swiper">
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper"


export default {
  name: "DetailSwipper",
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
  .swiper {
    height: 300px;
  }
  /*.swiper img {*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*}*/
</style>
