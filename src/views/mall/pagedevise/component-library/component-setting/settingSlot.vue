<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class='settingSlot'>
    <div class="flex_between_v title">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col>
          <slot name="dialogTitle">标题</slot>
        </el-col>
        <el-col>
          <!--                <i class="icon el-icon-close" style="float:right;" @click="$emit('cancel')"></i>-->
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <div class="hintTxt">
        <slot name="hint"></slot>
      </div>
      <div style="padding-top: 10px;">
        <slot name="mainContent"></slot>
      </div>
    </div>
    <div class="footerBtns">
      <slot name="btns">
        <!--                <el-button size="small" @click="$emit('cancel')">关 闭</el-button>-->
        <!--                <el-button size="small" type="primary" @click="$emit('confirm')">确 定</el-button>-->
        <el-button v-show="showReset" size="mini" plain type="primary" @click="$emit('reset')">重 置</el-button>
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    showReset: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {

  },
  mounted() {

  },
  methods: {},
  watch: {},
}
</script>
<style lang='less' scoped>
.settingSlot {
  padding: 12px 0px;
  min-width: 390px;
  width: 440px;
  max-width: 450px;
  box-shadow: 0 0 20px #CCCCCC;

  .title {
    padding-bottom: 10px;
    font-size: 16px;
    height: 40px;
    line-height: 30px;
    padding-left: 20px;
    color: #606266;
    font-weight: 500;
    border-bottom: 1px solid #E4E7ED;
    .icon {
      cursor: pointer;

      &:hover {
        color: #165dff;
      }
    }
  }

  .content {
    padding-left: 15px;
    padding-right: 15px;
    height: 635px;
    overflow-y: auto;

    &::-webkit-scrollbar { /*滚动条整体样式*/
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: #d6d6d6;
    }

    .hintTxt {
      font-size: 14px;
      color: #606266;

      p {
        line-height: 18px;
      }
    }
  }

  .footerBtns {
    text-align: right;
    padding-top: 10px;
    padding-right: 15px;
  }
}
</style>
