<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
    <div class="shopComponent" :style="{marginBottom: `${setData.pageSpacing}px`}">
      <div style="white-space: nowrap;padding: 0px 15px;" v-if="setData.shopInfoData&&setData.shopInfoData.length > 0">
        <div class="cu-bar">
          <div class="shop-selection text-df margin-left flex align-center" :style="{color: `${setData.titleColor}`}">
<!--            <span class=" text-bold" :class="setData.titleIcon"></span>-->
            <img v-show="setData.titleImage" class="shop-title-image margin-right-xs" :src="setData.titleImage">
            <span >{{setData.title}}</span>
          </div>
          <div class="shop-more text-sm margin-right">更多大牌<span class="cuIcon-right"></span></div>
        </div>
        <div class=" shop-detail" style="overflow-x:scroll;padding: 8px 0;position: relative;display:flex;">
          <div v-for="(item, index) in setData.shopInfoData" :key="index" style="float: left;margin-right: 8px;">
            <div class="item  shop-box radius  justify-center">
              <div class="flex shop-image radius justify-center">
                <img :src="item.imgUrl" class="radius flex justify-center">
              </div>
              <div class="text-center text-sm margin-top-xs overflow-1  text-black ">{{item.name}}</div>
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
        setData : { type: Object | Array },
        cId     : { type: Number },
        noEditor: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        ...mapState({
            componentsList: state => state.divpage.componentsList,
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
  .shopComponent {
    position: relative;
    display: block;
    width: 100%;
    background: #ffffff;
    .shop-title-image {
      width: 80px;
      height: 15px;
    }
    .shop-box {
      height: 71px !important;
      width: 72px !important;
    }

    .shop-more {
      margin-right: 0 !important;
      color: #666666;
    }

    .shop-image {
      width: 54px;
      height: 54px !important;
      margin: auto;
    }

    .shop-image img {
      height: 54px !important;
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
</style>
