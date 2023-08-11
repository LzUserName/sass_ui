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
          <div class="showContent" style="background-color: #FFFFFF">
            <div class="pageContent" >
              <div class="pageTopBlock " :class="'bg-'+thememobile.backgroundColor" style="color: #ffffff;font-size: 16px;">
                <p class="title">首页</p>
              </div>
              <div class="componentsList" ref="componentsDiv">
                <transition-group>
                  <!-- <div v-for="(item,index) in componentsList" :key="item.id" class="drag-item" @mouseenter="mouseEnter($event, index, item.componentName)"> -->
                  <div v-for="(item,index) in componentsList" :key="item.id" class="drag-item" :ref="'drag-item-'+item.id"
                       @click="showSetting(index, item.id, item.componentName)">
                    <component :is="item.componentName" :setData="item.data" :config="item.config" :cId="item.id"></component>
                  </div>
                </transition-group>
              </div>
              <!-- 弹框遮罩 -->
              <!--                    <div class="modal" v-if="showModal"></div>-->
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
  import searchComponent from "../../components/search.vue";
  import swiperComponent from "../../components/swiper.vue";
  import imageComponent from "../../components/image.vue";
  import navButtonComponent from "../../components/navButton.vue";
  import noticeComponent from "../../components/notice.vue";
  import titleTextComponent from "../../components/titleText.vue";
  import goodsComponent from "../../components/goods.vue";
  import shopComponent from "../../components/shop";
  import goodsRowComponent from "../../components/goodsRow";
  import goodsCategoryComponent from "../../components/goodsCategory.vue";

  export default {
    components: {
      searchComponent, imageComponent, swiperComponent, navButtonComponent, noticeComponent, titleTextComponent,goodsComponent,shopComponent,goodsRowComponent,goodsCategoryComponent,
    },
    data() {
      return {
        thememobile: {
          backgroundColor: ''
        },
      };
    },
    props: {
      componentsList:{
        type: Array
      }
    },
    computed: {

    },
    created() {
      getObj2().then(response => {
        this.thememobile = response.data.data
      });
    },
    mounted() {

    },
    methods: {

    },
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() {},
    watch: {
      componentsList(){}
    },
  }
</script>
<style lang="less" scoped>
  @import '../../pagedevise.less';
  @import '../divpage.less';
  @import '../../colorui/main.css';
</style>
