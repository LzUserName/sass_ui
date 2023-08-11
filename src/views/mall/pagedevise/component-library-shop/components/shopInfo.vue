<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!-- 店铺名 -->
<template>
    <div class="shopInfoComponent fixed" :style="{paddingBottom: `${setData.pageSpacing}px`}">
      <div class="cu-card no-card article ">
        <div class="cu-item" :style="{ backgroundColor: setData.background }">
          <div class="content "
               :class="setData.background && setData.background.indexOf('bg-') != -1 ? setData.background : '' ">
            <img style="width:70px;height:70px;background-color: #ffffff;"
                 :src="shopInfo.imgUrl?shopInfo.imgUrl:defaultImage">
            <div class="shop-text "
                 :style="{color: `${setData.textColor}`}">
              <div class="cuIcon-locationfill overflow-1 location margin-top-xs">
                <span class="address text-sm margin-left-xs ">{{shopInfo.address}}</span></div>
              <div class="flex collect overflow-1 margin-top-xs" :hover-stop-propagation="true">
                <span class="cuIcon-mobilefill"></span><span class="phone text-sm margin-left-xs">{{shopInfo.phone}}</span></div>
              <div class="flex justify-between margin-top-xs" v-if="shopInfo">
                <span class="margin-left-xs text-sm">{{shopInfo.collectCount}} 人已收藏</span>
                <div class="flex shop-share padding-right-xs">
                  <span class="cuIcon-share "></span>
                  <span class="bg-white margin-lr-xs padding-lr-xs text-sm radius">查看门店</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';
import placeholderImg from "../pages/page-components/placeholderImg";
import * as shopinfo from "@/api/mall/shopinfo";

export default {
    data() {
        return {
          defaultImage: require('../assets/images/icon/img_pic@2x.png'),
          shopInfo: {}
        };
    },
    components: { placeholderImg },
    props: {
        shopId: {
          type: String
        },
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
      if(this.shopId){
        shopinfo.getObj(this.shopId).then(response => {
          this.shopInfo = response.data.data;
        })
      }
    },
    mounted() {
      if(this.shopId){
        shopinfo.getObj(this.shopId).then(response => {
          this.shopInfo = response.data.data;
        })
      }
    },
    methods: {
        ...mapMutations([
            'updateData'
        ]),
    },
    watch:{
        shopId(newVal, oldVal){
          if(newVal){
            shopinfo.getObj(newVal).then(response => {
              this.shopInfo = response.data.data;
            })
          }
        },
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
  .shopInfoComponent {
    font-weight: 300;

    .shopinfo-detail{
      padding: 10px!important;
    }
    .shopinfo-detail img {
      width: 70px !important;
      height: 70px !important;
    }
    .shop-information {
      //height: 80px;
    }
    .shop-text {
      width: 100%;
      margin-left: 10px;
    }
    .cu-card.article>.cu-item{
      padding-bottom: 0px;
    }
    .cu-card.article>.cu-item .content{
      padding: 10px;
    }

    .overflow-1 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

</style>
