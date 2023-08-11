<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="goodsComponent" :style="{marginBottom: `${setData.pageSpacing}px`}">
    <div :style="{'background-image': setData.backgroundImg?`url(${setData.backgroundImg})`:'' }"
         class="wrapper-list wrapper-list-goods goods-row-bg">
      <div class="flex justify-between padding-top-sm" :class="setData.backgroundImg?'padding-top-xs':''">
        <div class="text-xxl text-bold " :style="{color: `${setData.titleColor}`}">{{setData.title}}</div>
        <div class="text-lg text-white margin-right text-right" :style="{color: `${setData.titleColor}`}">更多好物<span class="cuIcon-right"></span></div>
      </div>
      <div class="cu-list grid col-5 " :class="setData.backgroundImg?'padding-top-sm':''" style=" background-color:transparent;" >
        <div v-for="(item, index) in goodsList" :key="index">
          <div class="item goods-box" v-if="item">
            <div class="img-box">
              <img :src="item&&item.picUrls&&item.picUrls[0] ? item.picUrls[0] : noPic">
            </div>
            <div class="text-cut goods-name margin-top text-lg padding-left-sm">{{item.name}}</div>
            <div class="text-price text-red margin-left-sm margin-top text-xl text-bold">{{item.priceDown}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import placeholderImg from "../pages/page-components/placeholderImg";
import {getListByIds} from "@/api/mall/goodsspu";


export default {
  data() {
    return {
      noPic: require('../assets/images/icon/img_pic@2x.png'),
      goodsList: [],
      initData: true
    };
  },
  components: {placeholderImg},
  props: {
    theme: {type: Object | Array},
    setData: {type: Object | Array},
    cId: {type: Number},
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
  },mounted() {
    this.getGoodsListByIds()//初次加载数据根据ids获取商品
  },
  methods: {
    ...mapMutations([
      'updateData'
    ]),
    getGoodsListByIds() {//根据ids获取商品
      if(this.setData.goodsIds){
        getListByIds(this.setData.goodsIds).then(response => {
          //如果之前的商品被删除了，那么需要自动删掉处理
          let hasGoodsIds = response.data.data.map(item=>item.id)
          let goodsIds = JSON.parse(JSON.stringify(this.setData.goodsIds))
          goodsIds.map((item,index)=>{
            let hasIndex = hasGoodsIds.indexOf(item);
            if(hasIndex===-1){
              this.setData.goodsIds.splice(index,1)
            }
          })
          let goods = new Array(this.setData.goodsIds.length)
          response.data.data.map(item => {
            let index = this.setData.goodsIds.indexOf(item.id);
            goods[index] = item
          })
          this.goodsList = goods
        })
      }else{
        this.goodsList = this.setData.goodsList
      }
    },
  },
  watch: {
    'setData.goodsList': {
      handler(newVal, oldVal) {
        if (this.initData) { // setData.goodsList 初次加载的数据是缓存数据，需要舍弃掉
          this.initData = false
        } else {
          this.goodsList = this.setData.goodsList || []
        }
      }
    },
    componentsList(newVal, oldVal) {          //添加的时候出发（解决没有移动的时候不emit数据）
      let that = this;
      that.updateData({componentsList: that.componentsList})
    }
  },
  beforeDestroy() {
    // this.$root.Bus.$off('addHotSpot')
  }
};
</script>
<style lang='less' scoped>

@import '../colorui/main.css';
@import '../colorui/icon.css';

.goodsComponent {
  position: relative;
  display: block;
  width: 100%;
  background: #ffffff;

  .wrapper-list {
    padding: 0 15px;
  }

  .goods-row-bg {
    white-space: nowrap;
    background-size: 100% 688px;
    background-repeat: no-repeat;
  }

  .goods-box .img-box {
    width: 228px;
    height: 190px;
    overflow: hidden;
  }

  .goods-box .img-box img {
    width: 190px !important;
    height: 190px !important;
    margin: 10px auto;
  }

  .wrapper-list-goods .item {
    display: inline-block;
    width: 228px;
    height: 300px;
  }

  .wrapper-list-goods .item .img-box {
    width: 228px !important;
  }

  .wrapper-list-goods .item .img-box img {
    width: 190px !important;
    height: 190px !important;
    margin: 10px auto;
  }
}

</style>
