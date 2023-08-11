<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
  screen-swiper
-->
<template>
    <div class="swiperComponent" >
      <div v-if="setData.swiperList" >
<!--        :style="{ backgroundColor: setData.background }"-->
        <div v-show="setData.swiperType=='card-swiper'"
             :style="{height: `${(setData.height/2)+14}px` }"
             :class="setData.background ?  setData.background.indexOf('bg-') !== -1 ? setData.background : '' : 'bg-'+thememobile.backgroundColor ">
          <!-- 去掉背景色设置 -->
          <!-- :style="{ backgroundColor: setData.background ? setData.background.indexOf('bg-') !== -1?'':setData.background:setData.background, height: `${(setData.height/2)+14}px` }"-->
        </div>
        <div v-if="setData.swiperList.length>0"
             :style="{padding: `${setData.swiperType=='card-swiper'?'0 14px 14px 14px':''}`,
              marginTop: `${setData.swiperType=='card-swiper'?'-'+(setData.height/2)+'px':''}`}">
          <img :src="setData.swiperList[0].imageUrl" fit="fill" style="height: 100%;"
                    :style="{height: `${setData.height}px`}">
          <div v-show="setData.dotStyle == 'round-dot'">
            <div class="dot" :style="{bottom: `${setData.swiperType=='card-swiper'?'30px':''}`}">
              <div class="dot-item active"></div>
              <div class="dot-item"></div>
              <div class="dot-item"></div>
            </div>
          </div>
          <div v-show="setData.dotStyle == 'square-dot'">
            <div class="dot line-dot" :style="{bottom: `${setData.swiperType=='card-swiper'?'30px':''}`}">
              <div class="line-dot-item active"></div>
              <div class="line-dot-item"></div>
              <div class="line-dot-item"></div>
            </div>
          </div>
        </div>
        <placeholder-img v-else></placeholder-img>
      </div>
      <placeholderImg v-else ></placeholderImg>
    </div>
</template>

<script>

import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper';
// import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper, /* { default global options } */);

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';
import placeholderImg from "../pages/page-components/placeholderImg";


export default {
    data() {
        return {
          swiperOption: {
            centeredSlides: true,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          }
        };
    },
  components: {
    placeholderImg,
    Swiper,
    SwiperSlide
  },
    props: {
        thememobile : { type: Object | Array },
        setData : { type: Object | Array },
        cId     : { type: Number },
        noEditor: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        ...mapState({
            componentsList: state => state.divpageShop.componentsList,
        }),
    },
    created() {
    },
    mounted() {
    },
    methods: {
        ...mapMutations([
            'updateData'
        ]),
    },
    watch:{
        setData(newVal, oldVal){},
        componentsList(newVal, oldVal){          //添加的时候出发（解决没有移动的时候不emit数据）
            let that = this;
            that.updateData({componentsList: that.componentsList})
        }
    },
    beforeDestroy(){
        // this.$root.Bus.$off('addHotSpot')
    }
};
</script>
<style lang='less' scoped>

  @import '../colorui/main.css';
  .swiperComponent {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;

    .dot{
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dot .dot-item {
      width: 5px;
      height: 5px;
      background: #fff;
      border-radius: 50%;
      margin: 0 3px;
    }
    .dot .dot-item.active {
      background: #aaa;
    }

    .line-dot {
      bottom: 20px;
    }
    .line-dot-item{
      width: 8px;
      height: 2px;
      background: #fff;
      margin: 0 3px;
    }
    .line-dot-item.active {
      background: #aaa;
    }
  }
</style>
