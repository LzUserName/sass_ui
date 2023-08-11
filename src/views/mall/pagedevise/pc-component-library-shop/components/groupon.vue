<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!--拼团-->
<template>
  <div class="pageComponent" :style="{marginBottom: `${setData.pageSpacing}px`}" style="width: 100%;margin:auto;">
    <div class="wrapper-list"
         :style="{backgroundColor: setData.background, }"
         :class="setData.background&&setData.background.indexOf('bg-') != -1 ? setData.background : '' " >
      <div class="cu-bar"  style="margin-left: 10px;">
        <div class="shop-selection text-df  margin-top-sm margin-bottom flex align-center" >
          <img v-if="setData.titleImage" class=" margin-right-xs" :src="setData.titleImage" style="width: 110px; height: 21px;">
          <img v-else class=" margin-right-xs" src="../assets/images/icon/ic_groupon_title.png" style="width: 110px; height: 21px;">
          <!--            <div class="margin-left-xs" :style="{color: `${setData.titleColor}`}">{{setData.title}}</div>-->
          <div class="margin-left-xs text-lg" :style="{color: `${setData.subtitleColor}`}">{{setData.subtitle}}</div>
        </div>
        <div class="bg-white round margin-bottom-sm text-df"
             style="padding: 2px 10px;background: rgba(255,255,255,0.71);margin-right: 18px;">更多<span class="cuIcon-right"></span></div>
      </div>
      <div  class="cu-list  grid  col-5" style="width: 1226px;padding: 0 10px">
        <div>
          <img v-if="setData.backgroundImg" :src="setData.backgroundImg" class="marking-img-box  ">
        </div>
        <div v-for="(item, index) in setData.goodsList" :key="index" class=" ">
          <div class="item   " >
            <div class="img-box margin-top-xl">
              <img :src="item.picUrl ? item.picUrl : noPic" mode="aspectFill"  class="card-img">
            </div>
            <div class="margin-top-xl padding-lr-xs padding-bottom-xs font-weight-300">
              <div class="margin-top-sm overflow-1 text-df " >{{item.name}}</div>
              <div class="flex justify-between align-center margin-top-xs">
                <div class="cu-tag line-orange margin-right-sm "
                     style="height: 20px; padding: 5px;margin: 5px 0;">{{item.grouponNum?item.grouponNum:1}}人团</div>
                <span :style="{color: `${setData.titleColor}`}" class="text-sm">已有{{item.launchNum?item.launchNum:0}}人参与</span>
              </div>
              <div class="flex text-xl text-red justify-center"><span class="text-price text-bold">{{item.grouponPrice}}</span></div>
            </div>
          </div>

        </div>
        <div v-if="setData.goodsList==0" class="text-center  flex-twice">
          暂无商品信息
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

  .card-img{
    border: 0px;
  }
  .wrapper-list{
    padding: 0px;
  }

  .wrapper-list .item {
    height: 200px;
    border: 0px;

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
  .groupon-item {
    margin-bottom: 10px;
    border: #f5efef solid 1px;
    border-radius: 5px;
  }

  .goods-box .img-box img {
    width: 190px;
    height: 265px;
  }
  .marking-img-box{

    width: 236px;
    height: 360px;
  }

  .goods-card{
    background-color: #f9f9f9 !important;
  }

  .wrapper-list .item{
    display: inline-block;
    width: 236px;
    height: 360px;
    border: 0px solid #eee!important;

    background-color: #f9f9f9 !important;
  }
  .wrapper-list .item .img-box  {
    text-align: center;
    width: 236px !important;

  }
  .wrapper-list .item .img-box img {
    width: 190px !important;
    height: 190px !important;
    background-color: #FFF !important;
  }

  .font-weight-300{
    font-weight: 300;
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
