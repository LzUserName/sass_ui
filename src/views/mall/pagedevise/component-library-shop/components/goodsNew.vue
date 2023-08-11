<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>

  <div class="goodsNewComponent " :style="{marginBottom: `${setData.pageSpacing}px`}">
    <div class="flex" v-if="setData.goodsItem1">
      <div class="flex-sub bg-white padding-xs radius margin-right-xs margin-left-xs goods-new-bg"
           :style="{backgroundColor: setData.goodsItem1.titleBg}">
        <div class="flex">
					<span class="text-bold text-xl" :style="{color: `${setData.goodsItem1.titleColor}`,
                  fontSize: `${setData.goodsItem1.titleSize}px`,}">{{setData.goodsItem1.title}}</span>
          <div class="margin-left-xs text-sm round" style="padding: 2px 6px;" :style="{
                  color: `${setData.goodsItem1.subtitleColor}`,
                  fontSize: `${setData.goodsItem1.subtitleSize}px`,
                  backgroundColor: setData.goodsItem1.subtitleBg,}">{{setData.goodsItem1.subtitle}}</div>
        </div>
        <div class="flex margin-top-xs">
          <div :pageUrl="setData.goodsItem1.goodsList[0].pageUrl" class="flex-sub text-center">
            <img :src="setData.goodsItem1.goodsList[0].imageUrl ? setData.goodsItem1.goodsList[0].imageUrl : noPic"
                 class="goods-new-img">
            <div class="text-black text-sm">
							<span class="text-xl overflow-1"
                    :style="{color: `${setData.goodsItem1.goodsList[0].color}`,fontSize: `${setData.goodsItem1.goodsList[0].size}px`}">{{setData.goodsItem1.goodsList[0].name}}</span>
            </div>
          </div>
          <div :pageUrl="setData.goodsItem1.goodsList[1].pageUrl" class="flex-sub text-center">
            <img :src="setData.goodsItem1.goodsList[1].imageUrl ? setData.goodsItem1.goodsList[1].imageUrl : noPic"
                 class="goods-new-img">
            <div class="text-black text-sm">
							<span class="text-xl overflow-1"
                    :style="{color: `${setData.goodsItem1.goodsList[1].color}`,fontSize: `${setData.goodsItem1.goodsList[1].size}px`}">{{setData.goodsItem1.goodsList[1].name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-sub bg-white padding-xs radius goods-new-bg margin-right-xs" :style="{backgroundColor: setData.goodsItem2.titleBg}">
        <div class="flex">
					<span class="text-bold text-xl" :style="{color: `${setData.goodsItem2.titleColor}`,
                  fontSize: `${setData.goodsItem2.titleSize}px`,}">{{setData.goodsItem2.title}}</span>
          <div class="margin-left-xs text-sm round" style="padding: 2px 6px;" :style="{
                  color: `${setData.goodsItem2.subtitleColor}`,
                  fontSize: `${setData.goodsItem2.subtitleSize}px`,
                  backgroundColor: setData.goodsItem2.subtitleBg,}">{{setData.goodsItem2.subtitle}}</div>
        </div>
        <div class="flex margin-top-xs">
          <div :pageUrl="setData.goodsItem2.goodsList[0].pageUrl" class="flex-sub text-center">
            <img :src="setData.goodsItem2.goodsList[0].imageUrl ? setData.goodsItem2.goodsList[0].imageUrl : noPic"
                 class="goods-new-img ">
            <div class="text-black text-sm">
							<span class="text-xl overflow-1"
                    :style="{color: `${setData.goodsItem2.goodsList[0].color}`,fontSize: `${setData.goodsItem2.goodsList[0].size}px`}">{{setData.goodsItem2.goodsList[0].name}}</span>
            </div>
          </div>
          <div :pageUrl="setData.goodsItem2.goodsList[1].pageUrl" class="flex-sub text-center">
            <img :src="setData.goodsItem2.goodsList[1].imageUrl ? setData.goodsItem2.goodsList[1].imageUrl : noPic"
                 class="goods-new-img">
            <div class="text-black text-sm">
							<span class="text-xl overflow-1"
                    :style="{color: `${setData.goodsItem2.goodsList[1].color}`,fontSize: `${setData.goodsItem2.goodsList[1].size}px`}">{{setData.goodsItem2.goodsList[1].name}}</span>
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


export default {
  data() {
    return {
      noPic: require('../assets/images/icon/img_pic@2x.png')
    };
  },
  components: { placeholderImg },
  props: {
    theme : { type: Object | Array },
    setData : {
      type: Object,
      default: () => {
        return {
          goodsItem1:{
            goodsList: []
          },
          goodsItem2:{
            goodsList: []
          },
        };
      }
    },
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
.goods-new-bg {
  background-image: linear-gradIEnt(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8));
}

.goodsNewComponent {
  position: relative;
  display: block;
  width: 100%;
  background: #ffffff;

  .wrapper-list{
    padding: 0 15px;
  }
  .goods-item{
    margin: auto !important;
    margin-top: 10px !important;
  }

  .goods-new-img {
    width:70px !important;
    height: 70px !important;
    border-radius: 5px;

  }
  .card-img {
    width: 100% !important;
    height: 100% !important;
    border-radius: 5px
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
    box-shadow:0px 0px 30px #e5e5e5;
  }

  .goods-box .img-box {
    width: 100%;
    height: 175px;
    overflow: hidden;
  }

  .goods-box .img-box image {
    width: 100%;
    height: 265px;
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
