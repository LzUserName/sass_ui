<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="pageComponent" :style="{marginBottom: `${setData.pageSpacing}px`}" style="width: 96%;margin:auto;">
    <div class="wrapper-list">
      <img v-if="setData.backgroundImg" :src="setData.backgroundImg" style="width: 100%;height:100%;position: absolute;">
      <div class="cu-bar"  style="margin-left: 10px;">
        <div class="shop-selection text-df flex align-center" >
            <img v-if="setData.titleImage" class=" margin-right-xs" :src="setData.titleImage" style="width: 82px; height: 14px;">
            <img v-else class=" margin-right-xs" src="../assets/images/icon/ic_groupon_title.png" style="width: 82px; height: 14px;">
            <div class="margin-left-xs text-sm" :style="{color: `${setData.subtitleColor}`}">{{setData.subtitle}}</div>
<!--          <div class="margin-left-xs" :style="{color: `${setData.titleColor}`}">{{setData.title}}</div>-->
<!--          <div class="margin-left-xs text-sm" :style="{color: `${setData.subtitleColor}`}">{{setData.subtitle}}</div>-->
        </div>
        <div class="bg-white round  "
             :class="'bg-'+theme.backgroundColor" style="font-size: 6px;padding: 2px 10px;margin-right: 8px;">更多</div>
      </div>
      <div  v-if="setData.goodsList&&setData.goodsList.length > 0" class=" shop-detail"
            style="overflow-x:scroll;padding: 8px 0;position: relative;display:flex;margin-left: 10px;">
        <div v-for="(item, index) in setData.goodsList" :key="index" style="float: left;margin-right: 5px;">
          <div class="item goods-card" style="height: 100px;border: none;width: 100px;">
            <div class="img-box">
              <img :src="item.picUrl ? item.picUrl : noPic" mode="aspectFill"  class="card-img">
            </div>
          </div>
          <div class="text-black margin-top-xs  text-cut text-sm" style="width: 100px;">{{item.name}}</div>

          <div class="flex  align-center" style="padding: 5px 0;">
            <div class="  cu-tag radius"
                 :class="'bg-'+theme.backgroundColor" style="height: 20px; padding: 5px;margin: 5px;">{{item.grouponNum?item.grouponNum:1}}人团</div>
            <span  class="text-sm text-black ">已有{{item.launchNum?item.launchNum:0}}人参与</span>
          </div>
          <div >
            <div class="text-price text-bold text-red " style="padding-left: 5px;">{{item.grouponPrice}}</div>
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
        noPic: require('../assets/images/icon/img_pic@2x.png')
      };
    },
    components: { placeholderImg },
    props: {
      theme : { type: Object | Array },
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
  @import '../colorui/icon.css';
  .pageComponent {
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
      height: 265px;
      background-color: #fff;
      overflow: hidden;
      margin-bottom: 10px;
      border-radius: 5px;
      box-shadow: 0 10px 10px #e5e5e5;
    }

    .goods-box .img-box {
      width: 100%;
      height: 175px;
      overflow: hidden;
    }

    .goods-box .img-box image {
      width: 100%;
      height: 265px;
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
