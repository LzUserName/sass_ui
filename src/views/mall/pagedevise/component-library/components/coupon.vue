<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!-- 优惠券组件 -->
<template>
    <div class="pageComponent" :style="{ backgroundColor: setData.background, marginBottom: `${setData.pageSpacing}px`}">
      <div class="flex" :style="{backgroundColor: setData.background}"
           :class="setData.background && setData.background.indexOf('bg-') != -1 ? setData.background : '' ">
        <div class="flex-sub" style="padding: 5px;">
          <div  class="cu-item radius coupons-image"
                :style="{'background-image': setData.couponImage1?`url(${setData.couponImage1})`:'',backgroundColor: setData.themeColor, }"
                :class="!setData.couponImage1&&setData.themeColor&&setData.themeColor.indexOf('bg-') != -1 ? setData.themeColor : ''" >
            <div class="flex text-white electronic-coupons">
              <div class="flex-twice padding-lr-xs" :style="{color: setData.textColor1}">
                <!-- 如果是单店铺版，那么去掉店铺名显示 -->
                <div v-if="thememobile.showType!='2'" class="margin-top-xs text-xs text-center overflow-1 coupons-shop-name">{{'店铺名称'}}</div>
                <div v-else style="height: 12px;"></div>
                <div class="text-center">
                  <span class="text-price text-xl"></span>
                  <span class="number text-bold">{{'5折'}}</span>
                </div>
                <div class="text-center">
                  <div class="text-xs">满300元可用</div>
                </div>
              </div>
              <div class=" shadow-blur radius text-center t1-l"   :style="{'borderLeft':setData.couponImage1?'':'1px dashed rgb(255, 255, 255, 0.3)','color':setData.textColor1}">
                <div class=" already  ">
                  <span  :style="{color: setData.textColor1}">领取</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-sub " style="padding: 5px 0;">
          <div  class="cu-item radius coupons-image"
                :style="{'background-image': setData.couponImage2?`url(${setData.couponImage2})`:'',backgroundColor: setData.themeColor2, }"
                :class="!setData.couponImage2&&setData.themeColor2&&setData.themeColor2.indexOf('bg-') != -1 ? setData.themeColor2 : ''" >
            <div class="flex text-white electronic-coupons">
              <div class="flex-twice padding-lr-xs" :style="{color: setData.textColor2}">
                <div  v-if="thememobile.showType!='2'" class="margin-top-xs text-xs text-center overflow-1 coupons-shop-name">{{'华为旗舰店'}}</div>
                <div v-else style="height: 15px;"></div>
                <div class="text-center">
                  <span class="text-price text-xl"></span>
                  <span class="number text-bold">{{'500'}}</span>
                </div>
                <div class="text-center">
                  <div class="text-xs">满10000元可用</div>
                </div>
              </div>
              <div class="text-center t1-l"  :style="{'borderLeft':setData.couponImage2?'':'1px dashed rgb(255, 255, 255, 0.3)','color':setData.textColor2}" >
                <div class=" received  ">
                  <span  :style="`color:${setData.textColor2};`">已领取</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="writing-mode:vertical-rl;border: red solid 1px;margin:5px;text-align: center;color: red;border-radius: 4px;font-size: 12px;">
          领取更多
        </div>
      </div>
    </div>
</template>

<script>
import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';

export default {
    data() {
        return {};
    },
    components: {  },
    props: {
        thememobile : { type: Object | Array },
        setData : { type: Object | Array },
        cId     : { type: Number }
    },
    computed: {
        ...mapState({
            componentsList: state => state.divpage.componentsList,
        }),
    },
    created() {},
    mounted() {},
    methods: {
        ...mapMutations([
            'updateData'
        ]),
    },
    watch:{
        componentsList(newVal, oldVal){          //添加的时候触发（解决没有移动的时候不emit数据）
            let that = this;
            that.updateData({componentsList: that.componentsList})
        }
    }
};
</script>
<style lang='less' scoped>

  @import '../colorui/main.css';
  @import '../colorui/icon.css';
  .pageComponent{
    .electronic-coupons {
      height: 70px;
    }
    .already {
      writing-mode: vertical-lr;
      font-size: 10px;
      text-align: center;
      padding: 0px 5px;
      height: 100%;
      letter-spacing: 7.5px;
      margin-top: 2px;
      color: #f92713;
    }

    .received {
      writing-mode: vertical-lr;
      font-size: 10px;
      text-align: center;
      padding: 0px 5px;
      letter-spacing: 2.5px;
      margin-top: 12px;
      color: rgba(#f92713,  .3);
      opacity: 0.7;
    }
    .t1-r {
      background-size: 100% 60%;
      background-repeat: no-repeat;
    }

    .t1-l {
      background-size: 100% 60%;
      background-repeat: no-repeat;
      border-left: 1px dashed rgba(255, 255, 255, .3);
    }

    .store{
      margin-top: -10px;
    }

    .number{
      font-size: 18px;
    }

    .t2-r {
      background: radial-gradient(circle at top right, transparent 5px, #39b54a 0) top right, radial-gradient(circle at bottom right, transparent 5px, #39b54a 0) bottom right;
      background-size: 100% 60%;
      background-repeat: no-repeat;
    }

    .t2-l {
      background: radial-gradient(circle at top left, transparent 5px, #39b54a 0) top left, radial-gradient(circle at bottom left, transparent 5px, #39b54a 0) bottom left;
      background-size: 100% 60%;
      background-repeat: no-repeat;
      border-left: 1px dashed rgba(255, 255, 255, .3);
    }

    .overflow-1 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .coupons-image{
      background-size: 100% 69px;
    }

    .coupons-image2{
      background-size: 100% 64px;
    }

  }
</style>
