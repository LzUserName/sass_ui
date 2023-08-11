<template>
  <div style="width: 100%;text-align: center;background-color: white">
    <el-alert
      title="nacos后台已在新窗口打开（为演示方便，跳转地址为我们服务器，开发时换成自己实际IP地址即可），以下为内容截图"
      type="warning"
      center
      show-icon
      :closable="false">
    </el-alert>
    <p><el-image src="https://joolun-blog.oss-cn-zhangjiakou.aliyuncs.com/git/20210319202452.png" style="width: 80%"></el-image></p>
  </div>
</template>
<script>
export default {
  name: "nacos",
  data() {
    return {
    };
  },
  created() {
    let url = 'http://39.98.167.222:8848/nacos/index.html'
    window.open(url, '_blank')
  },
  mounted: function() {

  }
};
</script>
