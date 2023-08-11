<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
    <div class="searchComponent" :style="{ backgroundColor: setData.background }">
      <div class="cu-bar search top-home fixed"

        :class="setData.background && setData.background.indexOf('bg-') != -1 ? setData.background : '' ">
        <div class="search-form round" :style="{backgroundColor: setData.color, borderRadius: `${setData.radius}px`,color: `${setData.textColor}`,'text-align':setData.textPosition == 'center'?'center':'left'}">
          <i class="el-icon-search" style="font-size: 16px;margin-left: 10px;"></i>
          <div class="response" :style="{marginLeft: setData.textPosition == 'center'?'':'30px'}">
            <span style="margin-left: -10px">{{setData.placeholder}}</span>
          </div>
        </div>
        <div class="collection round margin-right-sm text-sm text-center"
             :style="{color: `${setData.collectionTextColor}`}">
          <span class="cuIcon-like text-white" :style="{color: `${setData.collectionTextColor}`}"></span> 收藏
        </div>
      </div>
    </div>
</template>

<script>
import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';

export default {
    data() {
        return {
        };
    },
    components: {  },
    props: {
      thememobile : { type: Object | Array },
        setData : { type: Object | Array },
        cId     : { type: Number }
    },
    computed: {
        ...mapState({
            componentsList: state => state.divpageShop.componentsList,
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
.searchComponent{

  position: relative;
  display: block;
  width: 100%;
  .cu-bar{
    display: flex;
    position: relative;
    align-items: center;
    min-height: 50px;
    justify-content: space-between;
  }
  .search{
    top: unset !important;
  }
  .cu-bar.fixed{
    width: 100%;
    top: 0;
    /*z-index: 1024;*/
    z-index: 100;
  }

  .cu-bar .search-form {
    background-color: #f5f5f5;
    line-height: 32px;
    height: 32px;
    font-size: 12px;
    color: #333333;
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 15px;
  }

  .round {
    border-radius: 2500px;
  }

  .response {
    width: 100%;
  }
}
</style>
