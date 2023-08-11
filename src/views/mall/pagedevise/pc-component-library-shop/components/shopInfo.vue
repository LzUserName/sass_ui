<!-- 店铺信息组件 -->
<template>
  <div >
    <div class="cu-item  padding-lr-sm bg-white padding-tb">
      <div class="content shop-detail align-center flex margin-top">
        <img width="60" height="60" :src="shopInfo.imgUrl" />
        <div class="flex justify-between " style="width: 100%;">
          <div class=" margin-left-sm">
            <div class="text-xl text-black text-bold">{{ shopInfo.name }}</div>
            <div class="flex margin-top-sm align-center ">
              <span class="text-df">{{ shopInfo.collectCount }} 人已收藏</span>
              <span class="cu-btn sm margin-left text-bold" >
                <span class="margin-right-xs"
                      :class="'cuIcon-' + (shopInfo.collectId ? 'likefill text-red' : 'like text-red')"></span>
                {{ shopInfo.collectId ? '已收藏' : '收藏' }}
              </span>
              <span class="cu-btn sm margin-left text-bold" >
                <span class="cuIcon-ticket text-green margin-right-xs"></span>
                领券
              </span>
              <span class="cu-btn sm margin-left" >
                <span class="cuIcon-share text-green"></span>
              </span>
              <span class="cu-btn sm margin-left">查看门店</span>
            </div>
          </div>
          <div class="flex shop-search" style="width: 400px;">
            <div class="cu-bar search shop-search" style="width: 400px;margin-right: 0;">
              <div class="search-form radius padding-right-xs" style="height: 40px;">
                <div class="response padding-left-sm text-left">
                  <span >店内搜索</span>
                </div>
                <span class="search-icon-class cuIcon-search btn "></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import placeholderImg from "../pages/page-components/placeholderImg";
import * as shopinfo from "@/api/mall/shopinfo";

export default {
  data() {
    return {
      defaultImage: require('../assets/images/icon/img_pic@2x.png'),
      shopInfo: {}
    };
  },
  components: {placeholderImg},
  props: {
    shopId: {
      type: String
    },
    thememobile: {type: Object | Array},
  },
  computed: {

  },
  created() {

  },
  mounted() {
    shopinfo.getObj(this.shopId).then(response => {
      this.shopInfo = response.data.data;
    })
  },
  methods: {
  },
  watch: {
  },
  beforeDestroy() {
    // this.$root.Bus.$off('addHotSpot')
  }
};
</script>
<style lang='less' scoped>

@import '../colorui/main.css';

.shopInfoComponent {
  font-weight: 300;

  .shopinfo-detail {
    padding: 10px !important;
  }

  .shopinfo-detail img {
    width: 70px !important;
    height: 70px !important;
  }
  .shop-search {
    width: 400px;
  }

  .shop-detail {
    margin: 15px 0;
  }
}

</style>
