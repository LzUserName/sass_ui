<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
    <div class="noticeComponent" :style="{marginBottom: `${setData.pageSpacing}px`}">
      <div v-if="setData.noticeList" >
        <el-carousel height="40px" indicator-position="none" :interval="setData.interval" style="background: #fff">
          <div style="height: 100%;line-height: 40px;" :style="{color: `${setData.textColor}`}" >
<!--            <i class="el-icon-bell" style="margin-left: 10px;color: red;"></i>-->

            <el-carousel-item v-for="(item,index) in setData.noticeList" :key="index" style="width: 100%;padding-left: 10px;">
              <div class="flex align-center ">
                <div class="margin-lr-xs flex align-center">
                  <img v-show="item.imageUrl" class="notice-image" :src="item.imageUrl">
                </div>
                <div style="font-size: 14px;">
                  <span>{{item.content}}</span>
                </div>
              </div>
            </el-carousel-item>
          </div>
        </el-carousel>
      </div>
      <placeholderImg v-else ></placeholderImg>
    </div>
</template>

<script>
import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';
import placeholderImg from "../pages/page-components/placeholderImg";

export default {
    data() {
        return {};
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
  .el-carousel__item--card{

  }
  .noticeComponent {
    position: relative;
    display: block;
    width: 100%;
    height: 40px;
    .notice-icon{
      width: 60px;
      height: 40px;
    }
    .notice-image{
      width: 40px;
      height: 24px;
    }

  }
</style>
