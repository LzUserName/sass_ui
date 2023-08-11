<!--
  - Copyright (C) 2018-2021
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!-- 多种样式图片展示 -->

<template>
  <div class="imageMultiComponent" >
    <div :style="{ marginBottom: `${setData.pageSpacing}px`, height: `${setData.height}px`, }">
      <div class="image-m-bg" :style="{background: setData.backgroundImg?`url(${setData.backgroundImg}) round`:''}">
        <div class="flex justify-center align-center">
          <div  style="width: 265px; height: 408px;"  :style="{ height: `${setData.height}px`, }">
            <div style="width: 265px;height: 408px;" :style="{ height: `${setData.height}px`, }"></div>
          </div>
          <div class=" cu-list grid col-5 margin-right-sm" style="background: transparent!important;">
            <div v-for="(item, index) in setData.imageItems" :key="index" >
              <div>
                <img  class="image-box"  :style="{ height: `${setData.imageHeight}px`, }" :src="item.imageUrl ? item.imageUrl : defaultImage"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import placeholderImg from "../pages/page-components/placeholderImg";

export default {
  data() {
    return {
      defaultImage: require('../assets/images/icon/img_pic@2x.png')
    };
  },
  components: {placeholderImg},
  props: {
    theme: {type: Object | Array},
    setData: {
      type: Object,
      default: () => {
        return {
          imageItems: [{
            id: Math.random(),
            imageUrl: '',
            pageUrl: '',
          }, {
            id: Math.random(),
            imageUrl: '',
            pageUrl: '',
          }, {
            id: Math.random(),
            imageUrl: '',
            pageUrl: '',
          }, {
            id: Math.random(),
            imageUrl: '',
            pageUrl: '',
          }, {
            id: Math.random(),
            imageUrl: '',
            pageUrl: '',
          },]
        };
      }
    },
    cId: {type: Number},
    noEditor: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapState({
      componentsList: state => state.divpageShop.componentsList,
    })
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
  watch: {
    componentsList(newVal, oldVal) {          //添加的时候触发（解决没有移动的时候不emit数据）
      let that = this;
      that.updateData({componentsList: that.componentsList})
    },
    setData() {
    }
  }
};
</script>
<style lang='less' scoped>
@import '../colorui/main.css';
@import '../colorui/icon.css';

.imageMultiComponent {
  position: relative;

  .image-box{
    width: 180px;
    height: 180px;
    margin: 2px 4px;
    border-radius: 10px;

  }


  .image-m-bg{
    background: url("../assets/images/icon/img_pic@2x.png") round;
  }
}
</style>
