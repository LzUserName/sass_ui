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
      <div style="padding: 0px 15px;" v-if="setData.shopInfoData&&setData.shopInfoData.length > 0">
        <div class="cu-bar">
          <div class="shop-selection text-df  margin-top-sm margin-bottom flex align-center"  :style="{color: `${setData.titleColor}`}">
            <img v-if="setData.titleImage" class=" margin-right-xs" :src="setData.titleImage" style="width: 110px; height: 21px;">
            <img v-else class=" margin-right-xs" src="../assets/images/icon/ic_shop_title.png" style="width: 110px; height: 21px;">
            <!--            <div class="margin-left-xs" :style="{color: `${setData.titleColor}`}">{{setData.title}}</div>-->
            <div class="margin-left-sm text-xl text-bold" :style="{color: `${setData.titleColor}`}">{{setData.title}}</div>
          </div>
          <div class="bg-white round margin-bottom-sm text-df"
               style="padding: 2px 10px;background: rgba(255,255,255,0.71);margin-right: 18px;">更多<span class="cuIcon-right"></span></div>

        </div>
        <div class="grid no-border col-4 " >
          <div v-for="(item, index) in setData.shopInfoData" :key="index" class="padding-right-sm padding-bottom-sm">
            <div  class="flex solid padding-sm  bg-white">
              <img :src="item.imgUrl" class="flex-sub " style="width: 100px;height: 100px;">
              <div class="flex-treble text-left ">
                <div class="text-black margin-top overflow-1 text-left">{{item.name}}</div>
                <div class="text-gray text-sm margin-top-sm overflow-2">{{item.address}}</div>
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
import MaterialList from '@/components/material/list.vue'


export default {
    data() {
        return {
          noPic: require('../assets/images/icon/img_pic@2x.png')
        };
    },
    components: { placeholderImg, MaterialList },
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
    width: 100%;
    background: #ffffff;
    font-weight: 300;

    .shop-item{
      height: 110px;
      width: 300px;
      .shop-left{
        width: 200px;
        float: left;
        padding: 10px;

      }
      .img-box{
        float: right;
      }
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
