<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="seckillComponent" :style="{marginBottom: `${setData.pageSpacing}px`}" style="width: 96%;margin:auto;">
    <div class="wrapper-list">
      <img v-if="setData.backgroundImg" :src="setData.backgroundImg" style="width: 100%;height:100%;position: absolute;">
      <div class="cu-bar"  style="margin-left: 18px;">
        <div class="shop-selection text-df" >
          <div class=" flex align-center">
<!--            <div v-show="setData.title" class="margin-left-xs" :style="{color: `${setData.titleColor}`}">{{setData.title}}</div>-->
            <img v-if="setData.titleImage" class=" margin-right-xs" :src="setData.titleImage" style="width: 82px; height: 14px;">
            <img v-else class=" margin-right-xs" src="../assets/images/icon/ic_seckill_title.png" style="width: 82px; height: 14px;">
            <div class="seckill-time flex margin-left-sm align-center"
                 :style="{'background-image': setData.seckillTimeImage?`url(${setData.seckillTimeImage})`:'',}">
              <div class="text-xs text-white" style="margin-left: 6px;">{{'12'}}点</div>
              <div  class="text-xs text-red margin-left-sm padding-right padding-left-sm">
                <span>00:00</span>
              </div>
            </div>
          </div>
          <div>
            <div class="text-sm text-red margin-top-xs">{{setData.subtitle}}</div>
          </div>
          <!--          <div class="margin-left-xs" :style="{color: `${setData.titleColor}`}">{{setData.title}}</div>-->
          <!--          <div class="margin-left-xs text-sm" :style="{color: `${setData.subtitleColor}`}">{{setData.subtitle}}</div>-->
        </div>

        <div class="bg-white round  "
             :class="'bg-'+theme.backgroundColor" style="font-size: 6px;padding: 2px 10px;margin-right: 8px;">更多</div>
      </div>
      <div class=" shop-detfdail" style="overflow-x:scroll;padding:  0 0 10px 0;position: relative;display:flex;margin-top: -5px;margin-left: 10px;">
        <div v-for="(item, index) in 5" :key="index" style="float: left;margin-right: 8px;">
          <div class="item   goods-card" style="height: auto;margin-bottom: 0;border: none; width: 100px;">
            <div class="img-box" style="margin: 5px;">
              <img :src="item.picUrl ? item.picUrl : noPic" mode="aspectFill"  class="card-img">
            </div>
          </div>
          <div class="margin-left-sm margin-right-sm">
            <div class="text-center text-red text-lg text-bold margin-top-xs"><span class="text-price">{{'999'}}</span></div>
            <div class="text-gray text-center margin-top-xs text-sm text-decorat"><span class="text-price">{{'1999'}}</span></div>
            <div class="flex justify-center margin-top-xs">
              <div class="cu-progress round xs bg-progress  " >
                <div :class="'bg-'+theme.backgroundColor" :style="[{ width:'10%'}]"></div>
              </div>
            </div>
            <div class="text-center margin-top-xs"><span class="text-gray text-sm">已售{{'88'}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';
  import placeholderImg from "../pages/page-components/placeholderImg";


  export default {
    data() {
      return {
        noPic: require('../assets/images/icon/img_pic@2x.png'),
        goodsList: []
      };
    },
    components: { placeholderImg },
    props: {
      theme : { type: Object | Array },
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
  @import '../colorui/icon.css';
  .seckillComponent {
    position: relative;
    display: block;
    width: 100%;
    background: #ffffff;

    .wrapper-list{
      padding: 0px;
    }
    .goods-item{
      margin: auto !important;
      margin-top: 10px !important;
    }

    .row-img {
      margin-top: 13px;
      margin-left: -10px;
      width: 120px !important;
      height: 120px !important;
      border-radius: 5px
    }
    .card-img {
      width: 100% !important;
      height: 100% !important;
      border-radius: 5px
    }

    .buy{
      padding: 3px 10px 5px 10px;
    }

    .goods-container {
      justify-content: space-between;
      flex-wrap: wrap;
      box-sizing: content-box;
      padding: 10px;
    }

    .goods-box {
      width: 175px;
      height: 235px;
      background-color: #fff;
      overflow: hidden;
      margin-bottom: 10px;
      border-radius: 5px;
      box-shadow: 0 10px 10px #e5e5e5;
    }

    .goods-box .img-box {
      width: 100%;
      height: 145px;
      overflow: hidden;
    }

    .goods-box .img-box image {
      width: 100%;
      height: 235px;
    }
    .seckill-time {
      background-image: url('../assets/images/icon/ic_seckill_time.png');
      background-size: 144px 14px;
      background-repeat: round;
    }
  }

  .overflow-1 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .overflow-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .text-decorat{
    text-decoration:line-through;
  }
</style>
