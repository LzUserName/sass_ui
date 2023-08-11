<template>
  <div style="width: 100%;text-align: center;background-color: white">
    <el-alert
      title="druid后台已在新窗口打开（为演示方便，跳转地址为我们服务器，开发时换成自己实际IP地址即可），以下为内容截图"
      type="warning"
      center
      show-icon
      :closable="false">
    </el-alert>
    <p><el-image src="https://joolun-blog.oss-cn-zhangjiakou.aliyuncs.com/git/20210120132503.png" style="width: 80%"></el-image></p>
    <p><el-image src="https://joolun-blog.oss-cn-zhangjiakou.aliyuncs.com/git/20210120132612.png" style="width: 80%"></el-image></p>
  </div>
</template>
<script>
export default {
  name: "Druid",
  data() {
    return {
    };
  },
  created() {
    let url = 'http://39.103.149.201:7001/druid/login.html'
    window.open(url, '_blank')
  },
  mounted: function() {

  }
};
</script>
