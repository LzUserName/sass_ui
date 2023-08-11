<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!-- 优惠券 -->
<template>
  <div class="pageComponent flex bg-white "
       :style="{ backgroundColor: setData.background,marginBottom: `${setData.pageSpacing}px` }">
    <div class="flex padding-sm"  style="max-width: 100%;width: 100%;" :style="{ backgroundColor: setData.background }"
         :class="setData.background && setData.background.indexOf('bg-') != -1 ? setData.background : '' ">
      <div class="flex  " style="margin-right: 8px;" v-for="(item, index) in couponInfoList" :key="index">
        <div class="item flex ">
          <div class="cu-item radius coupons-image"
                :style="{'background-image': setData.couponImage1?'url('+setData.couponImage1+')':'',backgroundColor: setData.themeColor1, }"
                :class="!setData.couponImage1&&setData.themeColor&&setData.themeColor.indexOf('bg-') != -1 ? setData.themeColor : ''"
                v-if="item.type == '1'">
            <div class="flex text-white electronic-coupons">
              <div class="flex-twice " style="color: #f92713;"
                    :style="{color: setData.textColor1}">
                <div class="margin-top-xs text-xs text-center overflow-1 coupons-shop-name">
                  {{item.shopInfo ? item.shopInfo.name : '店铺名称'}}
                </div>
                <div class="text-center">
                  <span class="text-price text-xl"></span>
                  <span class="number text-bold">{{item.reduceAmount}}</span>
                </div>
                <div class="text-center">
                  <div class="text-xs">满{{item.premiseAmount}}元可用</div>
                </div>
              </div>
              <div class="   text-center t1-l"
                   :style="{'borderLeft':setData.couponImage1?'':'1px dashed rgb(255, 255, 255, 0.3)','color':setData.textColor1}">
                <!-- <div class="text-xs margin-top-sm">代金券</div> -->
                <div v-if="!item.couponUser" @tap="couponUserSave(item)" class=" already btn">
                  <span>领取</span></div>
                <div v-if="item.couponUser" class="margin-top-sm received" style="">已领取</div>
              </div>
            </div>
          </div>
          <div v-else-if="item.type == '2'&&setData.themeColor2" class="cu-item radius coupons-image2"
                :style="{'background-image': setData.couponImage2?'url('+setData.couponImage2+')':'',backgroundColor: setData.themeColor2, }"
                :class="!setData.couponImage2&&setData.themeColor2&&setData.themeColor2.indexOf('bg-') != -1 ? setData.themeColor2 : ''">
            <div class="flex text-white electronic-coupons">
              <div class="flex-twice padding-lr-xs" style="color: #f92713;"
                    :style="{color: setData.textColor2}">
                <div class="margin-top-xs text-xs overflow-1 text-center coupons-shop-name">
                  {{item.shopInfo?item.shopInfo.name:'店铺名称'}}</div>
                <div class="text-center">
                  <span class="number text-bold">{{item.discount}}折</span>
                </div>
                <div class="text-center">
                  <div class="text-xs">满{{item.premiseAmount}}元可用</div>
                </div>
              </div>
              <div class="   text-center t1-l"
                   :style="{'borderLeft':setData.couponImage2?'':'1px dashed rgb(255, 255, 255, 0.3)','color':setData.textColor2}">
                <!-- <div class="text-xs margin-top-sm">折扣券</div> -->
                <div v-if="!item.couponUser" @tap="couponUserSave(item)"
                      class="margin-top-sm already btn">领取</div>
                <div v-if="item.couponUser" class="margin-top-sm received">已领取</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="writing-mode:vertical-rl;border: red solid 1px;text-align: center;
        color: red;border-radius: 4px;font-size: 12px;right: 0;position: absolute;padding: 12px 2px;">
        领取更多
      </div>
    </div>
  </div>
</template>

<script>

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

import {getPage} from '@/api/mall/couponinfo'

export default {
  data() {
    return {
      couponInfoList: []
    };
  },
  components: {},
  props: {
    thememobile: {type: Object | Array},
    setData: {type: Object | Array},
    cId: {type: Number}
  },
  computed: {
    ...mapState({
      componentsList: state => state.divpage.componentsList,
    }),
  },
  created() {
  },
  mounted() {
    if (this.setData.loadNumber) {
      this.loadData()
    }
  },
  methods: {
    ...mapMutations([
      'updateData'
    ]),
    loadData() {
      getPage(Object.assign({
        current: 0,
        size: this.setData.loadNumber,
        descs: '',
        ascs: 'sort',
      })).then(response => {
        this.couponInfoList = response.data.data.records

      }).catch(() => {
      })
    }
  },
  watch: {
    componentsList(newVal, oldVal) {          //添加的时候触发（解决没有移动的时候不emit数据）
      let that = this;
      that.updateData({componentsList: that.componentsList})

    },
    setData(newVal) {
      this.loadData()
    }
  }
};
</script>
<style lang='less' scoped>

@import '../colorui/main.css';
@import '../colorui/icon.css';

.pageComponent {

  .electronic-coupons {
    height: 74px;
  }

  .already {
    writing-mode: vertical-lr;
    font-size: 10px;
    text-align: center;
    padding: 0px 5px;
    height: 100%;
    letter-spacing: 7.5px;
    margin-top: 2px;
  }

  .received {
    writing-mode: vertical-lr;
    font-size: 10px;
    text-align: center;
    padding: 0px 5px;
    letter-spacing: 2.5px;
    margin-top: 12px;
    color: rgba(#f92713, .3);
    opacity: 0.7;
  }

  .t1-r {
    background-size: 100% 60%;
    background-repeat: no-repeat;
  }

  .t1-l {
    background-size: 100% 60%;
    background-repeat: no-repeat;
    margin-right: 4px;
  }

  .store {
    margin-top: -10px;
  }

  .number {
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

  .coupons-image {
    background-size: 190px 74px;
    background-repeat: no-repeat;
  }

  .coupons-image2 {
    background-size: 190px 74px;
    background-repeat: no-repeat;
  }

  .electronic-coupons {
    height: 74px;
    width: 190px;
  }

}
</style>
