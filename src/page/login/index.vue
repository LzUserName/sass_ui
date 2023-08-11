<template>
  <div class="login-container pull-height">
    <div class="login-weaper">
      <div class="login-info-title">
        <div class="login-logo" onclick="window.open('http://www.joolun.com','_self')">
          <img src="/svg/logo.svg">
        </div>
      </div>
      <div class="login-left animated fadeInLeft">
        <div class="login-info-title">JooLun微信快速开发平台-uniapp多店版</div>
        <div class="login-info">
          <ul class="login-info-list">
            <li class="login-info-item">
              SpringCloud微服务，采用Nacos注册和配置中心，前后端分离框架；
            </li>
            <li class="login-info-item">
              常用方法专用封装，开发中实现灵活调用，杜绝重复造轮子，让实际开发更容易；
            </li>
            <li class="login-info-item">
              多商城多店铺多公众号多小程序多账号管理，部署一套就能同时运营多个相互独立的商城；
            </li>
            <li class="login-info-item">
              uni-app一套代码多端发布，可编译成小程序、H5、APP（android/ios端）、PC等主流终端；
            </li>
            <li class="login-info-item">
              自定义拖拽div装修，随心所欲装修自己的商城和店铺；OpenIM客服系统；
            </li>
            <li class="login-info-item">
              微信、支付宝服务商收款；分销、拼团、砍价、秒杀、优惠券、积分、直播丰富的营销功能；
            </li>
            <li class="login-info-item">
              代码简洁，架构清晰，restful接口规范，完善的部署教程和文档，适合实际项目、毕设、学习等使用；
            </li>
            <li class="login-info-item">
              提供全部源码，采用私服GIT管理，终身免费升级更新，专为二开准备。<el-link type="primary" target="_blank"
                href="https://www.joolun.com/uniappddb.html">了解更多</el-link>
            </li>
          </ul>
          <div class="demo-account">
            <div>演示账号</div>
            <div class="demo-account-2">为便于理解故划分了以下演示账号，实际账号权限可根据自己实际情况自由分配</div>
          </div>
          <el-row :gutter="5">
            <div style="display: flex;">
              <div :span="6">
                <div class="account-card">
                  <div slot="header" class="clearfix">
                    <span>系统管理员</span>
                  </div>
                  <div class="account">
                    账号：system
                  </div>
                  <div class="password">
                    密码：123456
                  </div>
                  <div class="el-timeline-item__timestamp is-bottom">
                    系统最高权限，可通过切换租户来管理所有租户（商城）的数据
                  </div>
                </div>
              </div>
              <div :span="6">
                <div class="account-card">
                  <div slot="header" class="clearfix">
                    <span>商城管理员</span>
                  </div>
                  <div class="account">
                    账号：mall
                  </div>
                  <div class="password">
                    密码：123456
                  </div>
                  <div class="el-timeline-item__timestamp is-bottom">
                    管理【JooLun多店版演示商城】的所有功能
                  </div>
                </div>
              </div>
            </div>
            <div style="display: flex;">
              <div :span="6">
                <div class="account-card">
                  <div slot="header" class="clearfix">
                    <span>店铺管理员</span>
                  </div>
                  <div class="account">
                    账号：huawei
                  </div>
                  <div class="password">
                    密码：123456
                  </div>
                  <div class="el-timeline-item__timestamp is-bottom">
                    管理【JooLun多店版演示商城】里的【华为长沙分店】店铺
                  </div>
                </div>
              </div>
            </div>
          </el-row>
        </div>
      </div>

      <div class="login-border animated fadeInRight">
        <el-card class="login-main box-card">
          <div class="login-title2">Joolun后台管理系统登录</div>
          <userLogin v-if="activeName==='user'"></userLogin>
          <codeLogin style="margin-top: 20px;" v-else-if="activeName==='code'"></codeLogin>
          <thirdLogin style="margin-top: 20px;" v-else-if="activeName==='third'"></thirdLogin>
          <!--<register v-else-if="activeName==='register'"></register>-->
          <div class="login-menu">
            <a href="#" @click.stop="activeName='user'">账号登录</a>
            <a href="#" @click.stop="activeName='code'">手机号登录</a>
            <a href="#" @click.stop="activeName='third'">第三方登录</a>
            <a href="#" @click="toShopApply">店铺入驻申请</a>
            <!--<a href="#"-->
            <!--@click.stop="activeName='register'">免费注册</a>-->
          </div>
        </el-card>

      </div>
    </div>

    <div class="login-page-footer"><div onclick="window.open('http://www.joolun.com','_self')">www.joolun.com</div></div>
  </div>
</template>
<script>
  import userLogin from "./userlogin";
  import codeLogin from "./codelogin";
  import thirdLogin from "./thirdlogin";
  import register from "./register";
  import {
    mapGetters
  } from "vuex";
  import {
    getStore,
    setStore
  } from "@/util/store";
  import {
    dateFormat
  } from "@/util/date";
  import {
    validatenull
  } from "@/util/validate";
  import topColor from "@/page/index/top/top-color";

  export default {
    name: "login",
    components: {
      userLogin,
      codeLogin,
      thirdLogin,
      register,
      topColor
    },
    data() {
      return {
        time: "",
        activeName: this.$route.meta.activeName,
        thirdPartyForm: {}
      };
    },
    watch: {
      $route: {
        handler() {
          const params = this.$route.query
          if (validatenull(params.type) && validatenull(params.code)) return
          this.thirdPartyForm.type = params.type
          this.thirdPartyForm.code = params.code
          this.thirdPartyForm.redirectUri = params.redirectUri
          this.$store.dispatch('LoginByThirdParty', this.thirdPartyForm).then(() => {
            this.$store.commit("SET_TOP_MENU_INDEX", 0)
            this.$router.push({
              path: this.tagWel.value
            })
          }).catch(() => {

          })
        },
        immediate: true
      }
    },
    created() {
      this.getTime();
      setInterval(() => {
        this.getTime();
      }, 1000);
    },
    mounted() {},
    computed: {
      ...mapGetters(["website", 'tagWel'])
    },
    props: [],
    methods: {
      getTime() {
        this.time = dateFormat(new Date());
      },
      toShopApply() {
        window.open('#/upms/tenant/index-outside', '_blank')
      }
    }
  };
</script>

<style lang="scss" scoped >
.clearfix {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}
</style>
<style lang="scss" >
  .account-card {
    margin: 0 20px 20px 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 00px 30px #ddd;
    font-size: 14px;
    width: 240px;
    height: 120px;
    padding: 10px;
  }

  .demo-account{
    color: red;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .demo-account-2{
    font-size: 14px;
    margin-top: 10px;
  }

  .account {
    margin-top: 10px;
  }

  .is-bottom {
    line-height: 1.6;
    font-size: 12px;
  }

  .login-container {
    width: 100%;
    margin: 0 auto;
  }

  .login-weaper {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
  }

  .login-container::before {
    z-index: -1024;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("/img/bg/login.png");
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .login-left {
    float: left;
    width: 50%;
    position: relative;
  }

  .login-logo {
    margin: 0;
    padding: 0;
    margin-bottom: 20px;
  }

  .login-info {
    margin-top: 20px;
    margin-left: 140px;
  }

  .login-info-title {
    margin-left: 140px;
    font-size: 28px;
    font-weight: 600;
    color: #0981f7;
  }

  .login-info-item {
    font-size: 14px;
    line-height: 2;
    color: rgb(33, 37, 41);
  }

  .login-info-list {
    /*margin-top: 20px;*/
  }

  .login-account {
    margin-top: 30px;
    width: 100%;
  }


  .login-border {
    margin-top: 120px;
    width: 50%;
    float: left;
    box-sizing: border-box;
  }

  .login-main {
    margin: 0 auto;
    width: 50%;
    box-sizing: border-box;
  }

  .login-main>h3 {
    margin-bottom: 20px;
  }

  .login-main>p {
    color: #76838f;
  }

  .login-title {
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 22px;
    text-align: center;
    letter-spacing: 4px;
  }

  .login-menu {
    width: 100%;
    text-align: center;

    a {
      color: rgb(153, 153, 153);
      font-size: 12px;
      margin: 0px 8px;
    }
  }

  .login-index {
    margin-top: 40px !important;
    width: 180px;
    height: 48px;
    text-align: center;
    border-radius: 50px !important;
    background: transparent !important;
    color: #333 !important;
    font-size: 16px !important;
    border: 1px solid rgb(152, 22, 244);
  }

  .login-submit {
    display: block !important;
    margin: 40px auto 10px auto !important;
    width: 200px;
    height: 48px;
    font-size: 14px !important;
    text-align: center;
    border-radius: 50px !important;
    border: 0px;
    box-shadow: rgba(152, 22, 244, 0.19) 0px 5px 10px 2px;
  }

  .login-form {
    margin: 10px 0;

    i {
      color: #999;
    }

    .el-form-item__content {
      width: 100%;
    }

    .el-form-item {
      margin-bottom: 12px;
    }

    .el-input {
      input {
        padding-bottom: 10px;
        text-indent: 5px;
        background: transparent;
        border: none;
        border-radius: 0;
        color: #333;
        border-bottom: 1px solid rgb(235, 237, 242);
      }

      .el-input__prefix {
        i {
          padding: 0 5px;
          font-size: 16px !important;
        }
      }
    }
  }

  .login-code {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 0 0 10px;
  }

  .login-code-img {
    margin-top: 2px;
    width: 100px;
    height: 38px;
    background-color: #fdfdfd;
    border: 1px solid #f0f0f0;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 5px;
    line-height: 38px;
    text-indent: 5px;
    text-align: center;
  }

  .login-select {
    input {
      color: #333;
      font-size: 18px;
      font-weight: 400;
      border: none;
      text-align: center;
    }
  }

  .login-page-footer {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    color: white;
    font-size: 16px;
    line-height: 48px;
    text-align: center;
    letter-spacing: 5px;
    z-index: -1;
  }

  .login-title2 {
    height: 35px;
    color: black;
    font-size: 16px;
    line-height: 35px;
    text-align: center;
    letter-spacing: 0;
  }

  .login-bg {
    height: 100%;
    /*background-image: url('/img/bg/joolun_login_bg.png');*/
    background-size: auto;
    background-position: center;
    background-repeat: no-repeat;

  }
</style>
