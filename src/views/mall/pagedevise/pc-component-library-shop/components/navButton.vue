<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="navButtonComponent" :style="{paddingBottom: `${setData.pageSpacing}px`}">
    <!--      导航-->
    <div  style="background:#ffffff">
      <div class="cu-list grid no-border nav-button" :class="'col-'+setData.rowNum" >
        <div class="cu-item " v-for="(item,index) in setData.navButtons" :key="index">
          <div >
            <img :src="item.imageUrl ? item.imageUrl : defaultImage" class="nav-bt-img radius"/>
            <div style="font-weight: 300;"  :style="{color: `${setData.textColor}`}" >{{item.navName}}</div>
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
      defaultImage: require('../assets/images/icon/img_pic@2x.png')
    };
  },
  components: { placeholderImg },
  props: {
    theme : { type: Object | Array },
    setData : { type: Object | Array },
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
.navButtonComponent {

  .cu-list.grid.no-border {
    padding-bottom: 10px;
  }
  .nav-bt-img{
    width: 230px !important;
    height: 120px !important;

  }

  .nav-button{
    padding: 4px  !important;
  }

}

</style>
