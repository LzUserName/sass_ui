<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="compSetting">
    <settingSlot @confirm="confirm" @cancel="cancel" @reset="reset" :showReset="true">
      <p slot="dialogTitle">商城页脚设置</p>
      <div slot="hint">
        <div class="tips-class " >提示：设置为空则显示默认值。</div>
      </div>
      <div slot="mainContent">
        <el-form ref="form"  label-width="90px" :model="formData">
          <el-form-item label="背景颜色">
            <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
              <el-input v-model="formData.bgColor" size="small" style="margin-top: 5px">
                <template slot="append">
                  <el-color-picker size="mini" v-model="formData.bgColor"></el-color-picker>
                </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="文字颜色">
            <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
              <el-input v-model="formData.textColor" size="small" style="margin-top: 5px">
                <template slot="append">
                  <el-color-picker size="mini" v-model="formData.textColor"></el-color-picker>
                </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <div class="margin-left text-bold">联系方式</div>
          <el-form-item label="电话" >
            <el-input max-length="300" v-model="formData.contactInfo.tel" size="mini" type="text" placeholder="联系电话" ></el-input>
          </el-form-item>
          <el-form-item label="邮箱"  >
            <el-input max-length="300" v-model="formData.contactInfo.email" size="mini" type="text" placeholder="联系邮箱" ></el-input>
          </el-form-item>
          <el-form-item label="地址" >
            <el-input max-length="300" v-model="formData.contactInfo.address" size="mini" type="text" placeholder="联系地址" ></el-input>
          </el-form-item>
          <div class="margin-left text-bold">第1竖列</div>
          <el-form-item label="标题" >
            <el-input max-length="300" v-model="formData.col1.title" size="mini" type="text" placeholder="联系电话" ></el-input>
          </el-form-item>
          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="名称" >
                <el-input style="width: 100%;" v-model="formData.col1.row1.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.col1.row1.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>
          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="名称" >
                <el-input style="width: 100%;" max-length="300" v-model="formData.col1.row2.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.col1.row2.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>

          <div class="margin-left text-bold">第2竖列</div>
          <el-form-item label="标题" >
            <el-input max-length="300" v-model="formData.col2.title" size="mini" type="text" placeholder="联系电话" ></el-input>
          </el-form-item>
          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="名称" >
                <el-input style="width: 100%;" max-length="300" v-model="formData.col2.row1.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.col2.row1.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>
          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="名称" >
                <el-input style="width: 100%;" max-length="300" v-model="formData.col2.row2.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.col2.row2.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>
          <div class="margin-left text-bold">第3竖列</div>
          <el-form-item label="标题" >
            <el-input max-length="300" v-model="formData.col3.title" size="mini" type="text" placeholder="联系电话" ></el-input>
          </el-form-item>
          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="名称" >
                <el-input style="width: 100%;" max-length="300" v-model="formData.col3.row1.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.col3.row1.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>
          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="名称" >
                <el-input style="width: 100%;" max-length="300" v-model="formData.col3.row2.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.col3.row2.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>
          <div class="margin-left text-bold">第4竖列</div>
          <el-form-item label="标题" >
            <el-input max-length="300" v-model="formData.col4.title" size="mini" type="text" placeholder="联系电话" ></el-input>
          </el-form-item>
          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="名称" >
                <el-input style="width: 100%;" max-length="300" v-model="formData.col4.row1.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.col4.row1.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>
          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="名称" >
                <el-input style="width: 100%;" max-length="300" v-model="formData.col4.row2.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.col4.row2.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>

          <div class="margin-left text-bold">用户协议配置</div>
          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="名称" >
                <el-input style="width: 100%;" max-length="300" v-model="formData.userAgreementConfig.row1.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.userAgreementConfig.row1.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>

          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="名称" >
                <el-input style="width: 100%;" max-length="300" v-model="formData.userAgreementConfig.row2.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.userAgreementConfig.row2.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>

          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="用户协议" >
                <el-input style="width: 100%;" max-length="300" v-model="formData.userAgreementConfig.row3.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.userAgreementConfig.row3.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>

          <el-row style="width: 100%;">
            <el-col :span="13">
              <el-form-item label="隐私政策" >
                <el-input style="width: 100%;" max-length="300" v-model="formData.userAgreementConfig.row4.name" size="mini" type="text" placeholder="名称" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-input style="margin-top: 7px;margin-left: 5px;" max-length="300" v-model="formData.userAgreementConfig.row4.url" size="mini" type="text" placeholder="跳转链接"></el-input>
            </el-col>
          </el-row>


          <div class="margin-left text-bold">版权信息描述</div>
          <el-form-item label="版权描述" >
            <el-input v-model="formData.copyrightConfig.name" size="mini" max-length="300" type="textarea" placeholder="版权描述" ></el-input>
          </el-form-item>

          <div class="margin-left text-bold">备案号</div>
          <el-form-item label="备案号" >
            <el-input v-model="formData.recordNoConfig.name" max-length="300" size="mini" type="text" placeholder="备案号" ></el-input>
          </el-form-item>

        </el-form>
      </div>
    </settingSlot>
    <!--    <p style="display:none">{{getData}}</p>-->
  </div>
</template>

<script>

  import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';

  import settingSlot from './settingSlot'
  import MaterialList from '@/components/material/list.vue'
  import AppPageSelect from '@/components/app-page-select/Index.vue'

  export default {
    components: { settingSlot, MaterialList, AppPageSelect  },
    data() {
      return {
        formDataCopy : {
          bgColor: '#333333',
          textColor: '#999999',
          contactInfo: {
            tel: '',
            email: '',
            address: '',
          },
          col1: {
            title: '',
            row1: { name: '', url: ''},
            row2: { name: '', url: ''},
          },
          col2: {
            title: '',
            row1: { name: '', url: ''},
            row2: { name: '', url: ''},
          },
          col3: {
            title: '',
            row1: { name: '', url: ''},
            row2: { name: '', url: ''},
          },
          col4: {
            title: '',
            row1: { name: '', url: ''},
            row2: { name: '', url: ''},
          },
          userAgreementConfig: {
            row1: { name: '', url: ''},
            row2: { name: '', url: ''},
            row3: { name: '', url: ''},
            row4: { name: '', url: ''},
          },
          copyrightConfig: {
            name: ''
          },
          recordNoConfig: {
            name: ''
          },
        },
        formData : {
          bgColor: '#333333',
          textColor: '#999999',
          contactInfo: {
            tel: '',
            email: '',
            address: '',
          },
          col1: {
            title: '',
            row1: { name: '', url: ''},
            row2: { name: '', url: ''},
          },
          col2: {
            title: '',
            row1: { name: '', url: ''},
            row2: { name: '', url: ''},
          },
          col3: {
            title: '',
            row1: { name: '', url: ''},
            row2: { name: '', url: ''},
          },
          col4: {
            title: '',
            row1: { name: '', url: ''},
            row2: { name: '', url: ''},
          },
          userAgreementConfig: {
            row1: { name: '', url: ''},
            row2: { name: '', url: ''},
            row3: { name: '', url: ''},
            row4: { name: '', url: ''},
          },
          copyrightConfig: {
            name: ''
          },
          recordNoConfig: {
            name: ''
          },
        }
      };
    },
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
    computed: {
      ...mapState({
        componentsList: state => state.divpage.componentsList,
        clickComIndex : state => state.divpage.clickComIndex,
      })
    },
    mounted(){
      let that = this;
      if(that.IsEmptyObj(that.showData)){
        that.formData = JSON.parse(JSON.stringify(that.formDataCopy))
      } else {
        that.formData = that.showData
      }
      that.$emit('changeCompData', 'pageFooterConfig',this.formData)
    },
    methods: {
      ...mapMutations([
        'updateData'
      ]),
      // 删除按钮
      delBtn(index){
        let that = this;
        that.$confirm('是否删除该组件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type : 'warning'
        }).then(()=>{
          this.$emit('changeCompData', 'pageFooterConfig', this.formData)
          // that.$delete(that.componentsList[that.clickComIndex].data.itemArray, index)
          // that.updateData({ componentsList: that.componentsList });
        }).catch(()=>{})
      },
      cancel(){
        this.$emit('cancel')
      },
      reset(){
        let that = this;
        that.formData = JSON.parse(JSON.stringify(that.formDataCopy))
        // that.componentsList[that.clickComIndex]['data'] = this.formData;
      },
      confirm(){
        this.$emit('confirm', this.formData)
      },
      delete(){
        this.$emit('delete')
      }
    },
    watch: {
      showData: {
        handler(newVal, oldVal) {
          this.formData = newVal ? newVal : this.formData;
        },
        deep: true
      },
      clientType(){}
    }
  };
</script>
<style lang='less' scoped>
  .compSetting{
    /deep/ .el-form .el-form-item{
      margin-bottom: 8px;
    }

  }
  .el-form-item{
    margin-bottom: 0;
  }
</style>
