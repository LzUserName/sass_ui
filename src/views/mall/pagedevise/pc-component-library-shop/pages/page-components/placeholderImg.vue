<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class='placeholderImg' :style="{height: imgType=='dialogForm'?'100px':height+'px'}">
        <img :src="imgUrl" width="100">
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {

        };
    },
    props: {
        imgType:{
            type: String,
            default: 'singleImg'
        },
      height:{
        type: String|Number,
        default: 300
      }
    },
    computed: {
        imgUrl(){
            let that = this;
            switch (that.imgType) {
                case 'singleImg':
                    return require('../../assets/images/icon/img_pic@2x.png')
                    break;
                default:
                    return ''
                    break;
            }
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() {},
    watch: {},
}
</script>
<style lang='less' scoped>
    .placeholderImg{
        position: relative;
        width: 100%;
        text-align: center;
        img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>
