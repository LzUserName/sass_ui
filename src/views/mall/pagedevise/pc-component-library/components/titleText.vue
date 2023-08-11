<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
    <div class="textComponent" :style="{marginBottom: `${setData.pageSpacing}px`}">
      <div style="width: 100%;text-align: center;"
           :style="{height: `${setData.height}px`,lineHeight: `${setData.height}px`,color: `${setData.color}`,fontSize: `${setData.fontSize}px`}">{{setData.title}}</div>
    </div>
</template>

<script>
import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';
import placeholderImg from "../pages/page-components/placeholderImg";

export default {
    data() {
        return {};
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
            componentsList: state => state.divpage.componentsList,
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
  .el-carousel__item--card{

  }
  .textComponent {
    position: relative;
    display: block;
    width: 100%;
    background: #ffffff;
  }
</style>
