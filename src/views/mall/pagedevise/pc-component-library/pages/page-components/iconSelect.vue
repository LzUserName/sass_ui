<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!-- 图标选择组件 -->
<template>
  <div>

    <el-button type="primary"  plain size="mini" @click="titleIconDialog=true">选择标题图标</el-button>
    <el-dialog title="标题图标" :visible.sync="titleIconDialog" width="70%"  append-to-body>
      <el-row :gutter="20">
        <el-col :span="4" v-for="(item,index) in iconList" :key="index" class="tm-select-bg">
          <div @click="onTitleIcon(item)">
            <div :class="'cuIcon-' + item.name" style="width: 30px;height: 30px;margin: 0 auto;font-size: 20px;"></div>
            <div style="margin-top: 5px;text-align: center;font-size: 14px;">{{item.name}}</div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

  import {icons} from "../../colorui/icon";

  export default {
    components: {},
    data() {
      return {
        iconList: icons,
        titleIconDialog: false,
      };
    },
    props: {
      imgType:{
        type: String,
        default: 'icons'
      }
    },
    computed: {
    },
    created() {

    },
    mounted() {

    },
    methods: {
      onTitleIcon(item){
        this.$emit('onChangeIcon','cuIcon-' + item.name)
        this.titleIconDialog = false
      }
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
  .tm-select-bg {
    text-align: center;
    cursor: pointer;
    padding: 10px 0;
  }

  .tm-select-bg:hover {
    background: #efefef;
  }

</style>
