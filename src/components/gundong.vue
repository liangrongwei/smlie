<template>
  <div >
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
           Slide {{item}} 
           的黄瓜发苦合适的疯狂华盛顿峰会上的付加工费的话就赶快了丰厚的奖励赶快回家
           的黄瓜发苦合适的疯狂华盛顿峰会上的付加工费的话就赶快了丰厚的奖励赶快回家
           的黄瓜发苦合适的疯狂华盛顿峰会上的付加工费的话就赶快了丰厚的奖励赶快回家
           的黄瓜发苦合适的疯狂华盛顿峰会上的付加工费的话就赶快了丰厚的奖励赶快回家

           的黄瓜发苦合适的疯狂华盛顿峰会上的付加工费的话就赶快了丰厚的奖励赶快回家
           的黄瓜发苦合适的疯狂华盛顿峰会上的付加工费的话就赶快了丰厚的奖励赶快回家
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>
 
<script>
    import 'swiper/dist/css/swiper.css' 
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                slide: [1,2,3,4,5,6],
                swiperOption:{
                    direction:'vertical',//设置竖排显示
                    loop:true,//无限循环滚动
                    mousewheel:true,//开启鼠标滚轮控制Swiper切换
                    freeMode:true,
                    pagination:{
                        clickable:true,//让分页器可以自由选择
                        el:'.swiper-pagination'//小圆点
                    }
                }
            }
        },
        components:{swiper,swiperSlide}
    }
</script>
 
<style scoped>
  .swiper-slide{
      height: 4rem;
      text-align: center;
      line-height: 4rem;
  }
  .swiper{
      height: 7rem;
      border-top:1px solid #ccc;
      border-bottom:1px solid #ccc;
  }
</style>