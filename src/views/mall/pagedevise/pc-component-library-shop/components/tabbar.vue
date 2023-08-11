<template>
  <!-- tabbar 组件 -->
  <div class="right-tabbar">
    <div class="text-center padding-tb-xs " data-cur="1"
         :class="'bg-'+thememobile.themeColor">
      <div class='text-xl'>
        <span class="cuIcon-shop text-xl"></span>
      </div>
      <div class="text-df">首页</div>
    </div>
    <div class="text-center padding-tb-xs text-gray" data-cur="2">
      <div class=' text-xl'>
        <span class="cuIcon-goods text-xl"></span>
      </div>
      <div class="text-df ">商品</div>
    </div>
    <div class="text-center padding-tb-xs text-gray" data-cur="3">
      <div class='text-xl'>
        <span class="cuIcon-sort lg"></span>
      </div>
      <div class="text-df">分类</div>
    </div>
    <div class="text-center padding-tb-xs text-gray" data-cur="4">
      <div class='text-xl'>
        <span class="cuIcon-service lg"></span>
      </div>
      <div class="text-df">客服</div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  props: {
    thememobile: {type: Object | Array},
  },
}
</script>

<style scoped lang="scss">
.right-tabbar {
  right: 0;
  height: 100vh;
  background-color: #333;
  width: 48px;
  padding-top: 300px;
}
</style>
