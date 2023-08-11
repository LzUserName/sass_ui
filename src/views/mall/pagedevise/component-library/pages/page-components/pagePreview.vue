<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div>
    <basic-container>
      <div class="div-page-index">
        <div class="content flex_between">
          <div class="preview">
            <div>
              <div style="border-radius: 50px 50px 0 0; height: 66px;width: 375px;margin-left: 15px;"
                   :class="'bg-'+thememobile.backgroundColor">
                <div style="display: flex;justify-content: center;height: 20px;width: 375px;">
                  <div class="notch"></div>
                </div>
                <div style="position: relative;">
                  <div class="pageTopBlock" :class="'bg-'+thememobile.backgroundColor"
                       style="color: #ffffff;font-size: 16px;display: flex;align-items: center;">
                    <img
                      v-if="initPageData.pageComponent.topNavComponent&&initPageData.pageComponent.topNavComponent.leftImageShow==1"
                      :src="initPageData.pageComponent.topNavComponent.leftImageUrl?initPageData.pageComponent.topNavComponent.leftImageUrl:noPic"
                      :style="{
                            width: `${initPageData.pageComponent.topNavComponent.leftImageWidth}px`,
                            height: `${initPageData.pageComponent.topNavComponent.leftImageHeight}px`,
                            marginLeft: `${initPageData.pageComponent.topNavComponent.leftImageMarginLeft}px`,
                         }"
                    />
                    <p class="title"
                       :style="{color: initPageData.pageComponent.topNavComponent&&initPageData.pageComponent.topNavComponent.titleColor?initPageData.pageComponent.topNavComponent.titleColor:''}">
                      {{
                        initPageData.pageComponent.topNavComponent ? initPageData.pageComponent.topNavComponent.title || '首页' : '首页'
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="pageContent">
                <div class="componentsList">
                  <div>
                    <transition-group>
                      <!-- <div v-for="(item,index) in componentsList" :key="item.id" class="drag-item" @mouseenter="mouseEnter($event, index, item.componentName)"> -->
                      <div v-for="(item) in componentsList" :key="item.id" class="drag-item ">
                        <component :is="item.componentName" :setData="item.data" :config="item.config"
                                   :cId="item.id" :thememobile="thememobile" :theme="thememobile"></component>
                      </div>
                    </transition-group>
                  </div>
                  <div class="cu-load bg-gray over"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>

import {getObj2} from '@/api/mall/thememobile'

// 组件
import bargainComponent from "../../components/bargain.vue";
import couponComponent from "../../components/coupon.vue";
import goodsComponent from "../../components/goods.vue";
import goodsCategoryComponent from "../../components/goodsCategory.vue";
import goodsNewComponent from "../../components/goodsNew.vue";
import goodsRowComponent from "../../components/goodsRow";
import grouponComponent from "../../components/groupon";
import imageComponent from "../../components/image.vue";
import imageMultiComponent from "../../components/imageMulti.vue";
import navButtonComponent from "../../components/navButton.vue";
import noticeComponent from "../../components/notice.vue";
import searchComponent from "../../components/search.vue";
import seckillComponent from "../../components/seckill.vue";
import shopComponent from "../../components/shop";
import swiperComponent from "../../components/swiper.vue";
import titleTextComponent from "../../components/titleText.vue";

export default {
  components: {
    bargainComponent,
    searchComponent,
    imageComponent,
    swiperComponent,
    navButtonComponent,
    noticeComponent,
    titleTextComponent,
    goodsComponent,
    shopComponent,
    goodsRowComponent,
    goodsCategoryComponent,
    seckillComponent,
    imageMultiComponent,
    goodsNewComponent,
    grouponComponent,
    couponComponent,
  },
  props: {
    initPageData: {
      type: Object,
      default: function () {
        return {
          pageComponent: {}
        }
      }
    },
    componentsList: {
      type: Array
    }
  },
  data() {
    return {
      thememobile: {
        backgroundColor: ''
      },
    };
  },
  computed: {},
  created() {
    getObj2().then(response => {
      this.thememobile = response.data.data
    });
  },
  mounted() {

  },
  methods: {
    // 设置主题样式
    setThemeStyle() {

    }
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {
  },
  watch: {
    componentsList() {
    }
  },
}
</script>
<style lang="less" scoped>
@import '../../pagedevise.less';
@import '../divpage.less';
@import '../../colorui/main.css';
</style>
