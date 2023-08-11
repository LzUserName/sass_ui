<template>
  <div class="div-page-footer"
       :style="{backgroundColor: showData.bgColor, color: showData.textColor}"
       @click="onShowSet">
    <div class="footer-bottom">
      <div style="position: absolute;right: 20px;"><i class="icon el-icon-edit" style="color: #ffffff;padding:10px;font-size: 14px;font-weight: bold;"></i></div>
      <div class="footer-content solid-top"  :style="{color: showData.textColor}">
        <div class="flex">
          <div class="flex-sub text-left">
            <div class="text-left "><span class="cuIcon-phone margin-right-sm"></span>{{ showData.contactInfo.tel || '18525851621' }}</div>
            <div class="margin-top "><span class="cuIcon-mail margin-right-sm "></span>
              <span class="text-df">{{showData.contactInfo.email || 'Joolun@163.com'}}</span>
            </div>
            <div class="margin-top "><span class="cuIcon-location margin-right-sm "></span>
              <span class="text-df">{{showData.contactInfo.address||'湖南省长沙市'}}</span>
            </div>
          </div>
          <div class="flex-treble solid-left flex text-df text-center padding-left-xl">
            <div class="flex-sub">
              <div class="text-xl">{{ showData.col1.title||'购物指南' }}</div>
              <div class="margin-top">
                <a :style="{color: showData.textColor}" href="#" >{{  showData.col1.row1.name ||'注册会员' }}</a>
              </div>
              <div class="margin-top">
                <a :style="{color: showData.textColor}" href="#" >{{ showData.col1.row2.name ||'积分使用' }}</a>
              </div>
            </div>
            <div class="flex-sub">
              <div class="text-xl">{{ showData.col2.title||'支付配送' }}</div>
              <div class="margin-top">
                <a :style="{color: showData.textColor}" href="#" >{{ showData.col2.row1.name ||'支付方式' }}</a></div>
              <div class="margin-top">
                <a :style="{color: showData.textColor}" href="#" >{{ showData.col2.row2.name ||'配送服务' }}</a></div>
            </div>
            <div class="flex-sub">
              <div class="text-xl">{{ showData.col3.title||'购物保障' }}</div>
              <div class="margin-top">
                <a :style="{color: showData.textColor}" href="#" >{{ showData.col3.row1.name ||'商品销售和售后' }}</a></div>
              <div class="margin-top">
                <a :style="{color: showData.textColor}" href="#"  >{{ showData.col3.row2.name ||'退换流程' }}</a></div>
            </div>
            <div class="flex-sub">
              <div class="text-xl">{{ showData.col4.title||'常见问题' }}</div>
              <div class="margin-top">
                <a :style="{color: showData.textColor}" href="#" >{{ showData.col4.row1.name ||'分销说明' }}</a></div>
              <div class="margin-top">
                <a :style="{color: showData.textColor}" href="#" >{{ showData.col4.row2.name ||"砍价流程" }}</a></div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="footer-link"
         :style="{backgroundColor: showData.bgColor, color: showData.textColor}">
      <a :style="{color: showData.textColor}" href="/" target="_blank">{{showData.userAgreementConfig.row1.name||shoppingMallName+'首页'}}</a><span>|</span>
      <a :style="{color: showData.textColor}" href="https://www.joolun.com" target="_blank">{{showData.userAgreementConfig.row2.name||shoppingMallName}}</a><span>|</span>
      <a :style="{color: showData.textColor}" :href="protocolUrl" target="_blank">{{ showData.userAgreementConfig.row3.name||'用户协议' }}</a><span>|</span>
      <a :style="{color: showData.textColor}" :href="privacyPolicyUrl" target="_blank">{{ showData.userAgreementConfig.row4.name||'隐私政策' }}</a>
      <p class="copyright">{{ showData.copyrightConfig.name || 'Copyright ©2022 www.joolun.com All Rights Reserved.（1.0.0）'}}</p>
      <a :style="{color: showData.textColor}" href="https://www.beian.miit.gov.cn/"  target="_blank">
        <img src="https://0.ss.faisys.com/image/footer/public_security_icon.png"><span class="margin-left-xs">{{ showData.recordNoConfig.name||'粤ICP备15070342号 - 2' }}</span>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    clientType: [String],
    showData:{
      type: Object,
      default: ()=> {}
    },
    config   : {
      type: Object,
      default: ()=> {}
    }
  },
  watch: {
    showData: {
      handler(newVal, oldVal) {
        this.formData = newVal ? newVal : this.formData;
      },
      deep: true
    },
  },
  data() {
    return {
      version: '',
      shoppingMallName: 'JooLun',
      protocolUrl: '',
      privacyPolicyUrl: '',
    };
  },
  methods: {
    onShowSet(){
      this.$emit('onShowSet')
    }
  }
}
</script>

<style lang="less" >
.div-page-footer:hover{
  cursor: move;
  border: 1px dashed #165dff;
}
.div-page-footer{
  a{
    color:#999999;
    display:inline-block;
  }
  background-color: #333;
  color:#999999;
  font-size:13px;
  text-align:center;
  font-weight: 300;
  height: 242px;
  .footer-bottom{
    height: 130px;
    font-size: 18px;
    color: #FFFFFF;
  }
  .footer-content {
    color: #999999;
    padding: 30px;
    position: relative;
    width: 1176px;
    margin-right:auto;
    margin-left:auto;
  }
  .footer-link{
    background: #333;
    margin-top: 10px;
    padding: 10px 0;
    a{
      color:#999999;
      display:inline-block;
    }
    span{
      margin:0 10px;
    }
    .copyright{
      margin-top:13px;
      margin-bottom: 10px;
    }
  }

}
</style>
