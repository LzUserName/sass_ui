<!--
  - Copyright (C) 2022-2025
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div id="jl-bigscreen">
    <bigdatamonitoring :isFullScreen="true"></bigdatamonitoring>
  </div>
</template>
<script>
import {reqFullScreen} from "./js/utils";
import bigdatamonitoring from "@/views/bigscreen/bigdatamonitoring";
export default {
  components:{
    bigdatamonitoring
  },
  mounted() {
    this.onFullScreen()
  },
  methods:{
    onFullScreen(){
      reqFullScreen()
    }
  }
}
</script>
