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
    <div class="cu-bar justify-center padding-tb-sm" style="min-height: 40px;" v-if="setData.showTitle!='gone'">
      <div class="action text-bold" :style="{color: `${setData.titleColor}`}" style="font-size: 13px;">
        <div class="cuIcon-move"></div>
        <div style="margin: 0 5px;" :class="setData.titleIcon"></div>
        {{ setData.title }}
        <div class="cuIcon-move"></div>
      </div>
    </div>
    <div style="margin-top: -10px;padding:5px;">
      <div v-if="setData.showType=='row'" class=" cu-list grid col-2">
        <div class="  padding-sm " v-for="(item, index) in goodsList" :key="index">
          <div class="goods-item solid padding-sm">
            <div class="flex padding-sm padding-bottom  align-center">
              <img :src="item.picUrls[0] ? item.picUrls[0] : noPic" mode="aspectFill" class="row-img flex-sub ">
              <div class="flex-treble margin-left-xl">
                <div class="text-black  overflow-2 text-left goods-name">{{ item.name }}</div>
                <div class="text-gray text-sm margin-top-sm overflow-1 text-left">{{ item.sellPoint }}</div>
                <div class="flex margin-top-sm">
                  <div class="cu-tag bg-red radius sm" v-if="item.freightTemplat&&item.freightTemplat.type == '2'">包邮
                  </div>
                  <div class="cu-tag bg-orange radius sm" v-if="item.pointsGiveSwitch == '1'">积分</div>
                  <div class="text-gray text-sm padding-lr-sm">已售{{ item.saleNum }}</div>
                </div>
                <div class="flex justify-between margin-tb-sm">
                  <div class="text-price text-bold text-lg text-red">{{ item.priceDown }}</div>
                  <div class="round buy text-sm " :class="'bg-red'">
                    <div>立即购买</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="setData.showType=='card'" class="goods-container flex justify-center padding-lr-xs">
        <div class="flex  grid">
          <div class="goods-box margin-tb-xs col-5 margin-lr-xs" v-for="(item, index) in goodsList" :key="index">
            <div>
              <div class="img-box">
                <img :src="item.picUrls[0] ? item.picUrls[0] : noPic" mode="aspectFill" class="card-img">
              </div>
              <div class="text-black margin-top-xs padding-lr-sm overflow-1">{{ item.name }}</div>
              <div class="text-df text-gray margin-top-xs padding-lr-sm overflow-2" style="min-height: 34px;">{{item.sellPoint}}</div>
              <div class="flex justify-between margin-top-sm align-center">
                <div class="text-price text-bold text-red text-lg padding-lr-sm">{{ item.priceDown }}</div>
                <div class="cu-tag bg-red radius sm" v-if="item.freightTemplat&&item.freightTemplat.type == '2'">包邮</div>
                <div class="text-gray text-sm padding-lr-sm">已售{{ item.saleNum }}</div>
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
  width: 100%;

  .goods-item {
    background-color: #FFFFFF;
    border-radius: 10px;
  }

  .goods-name {
    height: 38px;
  }

  .row-img {
    margin-top: 13px;
    margin-left: 0px;
    margin-right: 10px;
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
  }

  .goods-box {
    width: 228px;
    height: 320px;
    font-weight: 300;
    background-color: #f9f9f9;
    overflow: hidden;
  }

  .goods-box .img-box {
    width: 180px;
    height: 180px;
    margin: 15px auto;
    overflow: hidden;
  }

  .goods-box .img-box img {
    width: 190px;
    height: 180px;
    background: #FFFFFF;

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
