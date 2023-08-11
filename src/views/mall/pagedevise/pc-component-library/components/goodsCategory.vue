<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!-- 商品分类组件 -->
<template>
    <div class="pageComponent" :style="{ backgroundColor: setData.background }">
      <div class="cu-bar   " style="min-height: 30px;"
           :class="setData.background && setData.background.indexOf('bg-') != -1 ? setData.background : '' ">
        <div class="" style="width: 90%;">
          <div class="nav text-white text-sm"  style="overflow-x:scroll;position: relative;display:flex;">
            <div class="cu-item" :class="index==TabCur ? 'cur text-bold text-white text-lg' : ''" v-for="(item,index) in categoryData" :key="index"
                 :data-index="index" >
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="action">
          <div class="cuIcon-moreandroid text-white"></div>
        </div>
      </div>
    </div>
</template>

<script>
import {getPage} from '@/api/mall/goodscategory'
import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';

export default {
    data() {
        return {
          TabCur: 0,
          firstCategoryData:[],
          secondCategoryData:[],
          categoryData: [{
            id: '-1',
            name: '首页'
          }]
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
            componentsList: state => state.divpage.componentsList,
        }),
    },
    created() {
      this.getPage()
    },
    mounted() {},
    methods: {
        ...mapMutations([
            'updateData'
        ]),
      getPage() {
        getPage({
          current: 1,
          size: 4,
          ascs: 'sort',
          parentId: '0',
          enable: '1'
        }).then(response => {
          this.categoryData = [...this.categoryData, ...response.data.data.records]
        }).catch(() => {

        })
      },
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

  @import '../colorui/main.css';
  @import '../colorui/icon.css';
  .pageComponent{
    .img-category{
      width: 50px;
      height: 50px;
    }
    .more{
      margin-top: 30px;
    }
    .img-category-banner{
      width: 100%;
      height: 90px;
    }
  }
</style>
