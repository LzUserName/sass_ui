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
    <div class="wrapper-list goods-row-bg"
         :style="{'background-image': setData.backgroundImg?`url(${setData.backgroundImg})`:'' }">
      <div class="margin-tb-sm">
        <div class="flex align-center justify-between" :style="{color: `${setData.titleColor}`}">
          <span class="text-lg">{{ setData.title }}</span>
           <div class="text-sm" :style="{color: `${setData.titleColor}`}">查看更多></div>
        </div>
      </div>
      <div class="shop-detail" style="overflow-x:auto;padding: 8px 0;position: relative;display:flex;"
           v-if="goodsList&&goodsList.length > 0">
        <div v-for="(item, index) in goodsList" :key="index" style="float: left;margin-right: 2px;">
          <div class="item  radius goods-card" v-if="item">
            <div class="img-box">
              <img :src="item.picUrls[0] ? item.picUrls[0] : noPic" mode="aspectFill" class="card-img">
            </div>
            <div class="text-black margin-top-xs  text-cut" style="padding: 0 5px;">{{ item.name }}</div>
            <div class="flex justify-center align-center ">
              <div class="text-price text-bold text-red text-lg text-center">{{ item.priceDown }}</div>
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
      componentsList: state => state.divpage.componentsList,
    }),
  },
  created() {
  },
  mounted() {
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
  width: 98%;
  margin: auto;
  background: #ffffff;

  .goods-row-bg {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
  }

  .goods-row-bg .item {
    display: inline-block;
    width: 90px;
    height: 130px;
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
    background-color: #fff;
  }

  .goods-row-bg .item .img-box {
    width: 100%;
    height: 80px;
  }

  .goods-row-bg .item .img-box image {
    width: 100%;
    height: 100%;
    border-radius: 2px 2px 0 0;
  }

  .goods-box {
    overflow: hidden;
  }

  .wrapper-list {
    padding: 0 15px;
  }

  .goods-item {
    margin: auto !important;
    margin-top: 10px !important;
  }

  .row-img {
    margin-top: 13px;
    margin-left: -10px;
    width: 120px !important;
    height: 120px !important;
    border-radius: 5px
  }

  .card-img {
    width: 100% !important;
    height: 100% !important;
    border-radius: 5px
  }

  .buy {
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
    box-shadow: 0px 0px 30px #e5e5e5;
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
