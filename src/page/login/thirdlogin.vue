<template>
  <div class="thirdparty-container">
    <div class="box"
         @click="handleClick('WX')">
      <span class="container"
            :style="{backgroundColor:'#6ba2d6'}">
        <i icon-class="wechat"
           class="iconfont icon-weixin"></i>
      </span>
      <p class="title">微信</p>
    </div>
    <div class="box"
         @click="handleClick('QQ')">
      <span class="container"
            :style="{backgroundColor:'#8dc349'}">
        <i icon-class="qq"
           class="iconfont icon-qq"></i>
      </span>
      <p class="title">QQ</p>
    </div>
  </div>
</template>

<script>
  import {openWindow} from '@/util/util'
  import { wxAppId,qqClientId } from '@/config/env'

  export default {
    name: 'thirdparty-login',
    methods: {
      handleClick(thirdpart) {
        let url
        const redirect_uri = encodeURIComponent(window.location.origin + '/#/authredirect')
        if (thirdpart === 'WX') {
          const appid = wxAppId
          url = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&state=WX_LOGIN&response_type=code&scope=snsapi_login#wechat_redirect`
        } else if (thirdpart === 'QQ') {
          const client_id = qqClientId
          url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ_LOGIN&client_id=${client_id}&redirect_uri=${redirect_uri}`
        }
        openWindow(url, thirdpart, 540, 540)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .thirdparty-container {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .box {
      cursor: pointer;
    }

    .iconfont {
      color: #fff;
      font-size: 30px;
    }

    .container {
      $height: 50px;
      display: inline-block;
      width: $height;
      height: $height;
      line-height: $height;
      text-align: center;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .title {
      text-align: center;
    }
  }
</style>
