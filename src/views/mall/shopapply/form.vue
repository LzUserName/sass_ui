<!--
  - Copyright (C) 2018-2019
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="execution">
    <basic-container>
      <el-alert
        v-if="tenantInfo"
        style="font-weight: bold;"
        effect="dark"
        :title="'申请入驻【'+tenantInfo.name+'】'"
        type="success"
        :closable="false"
        center>
      </el-alert>
      <el-steps align-center :active="active" finish-status="success" style="padding: 20px">
        <el-step title="填写申请单"></el-step>
        <el-step title="审核申请单"></el-step>
        <el-step title="审核完成"></el-step>
      </el-steps>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>店铺入驻申请</span>
        </div>
        <avue-form v-model="form"
                   :option="type == 'view' ? formOption2 : formOption"
                   @submit="handleUpdate">
          <template slot="address" slot-scope="scope">
            <div>
              <i class="el-icon-location"></i>{{form.address}}
              <avue-input-map v-model="addressInfo" style="width:200px"></avue-input-map>
            </div>
          </template>
        </avue-form>
      </el-card>
      <div style="padding: 10px;text-align: center">
        <a @click="toView">申请单查询</a>
      </div>
    </basic-container>
  </div>
</template>

<script>
  import {getPage, getObj, addObj, putObj, delObj, getOne} from '@/api/mall/shopapply'
  import {getObjOutSide as getTenant} from '@/api/upms/tenant'
  import {formOption, formOption2} from '@/const/crud/mall/shopapply'

  export default {
    name: 'shopapply-form',
    data() {
      return {
        form: {},
        formOption: formOption,
        formOption2: formOption2,
        addressInfo: [],
        type: '',
        id: '',
        active: 0,
        tenantInfo: null
      }
    },
    created() {
      this.form.tenantId = this.$route.query.tenant_id
      this.type = this.$route.query.type
      this.id = this.$route.query.id
      window.tenantId = this.$route.query.tenant_id
      this.getTenant()
      if(this.type == 'edit' || this.type == 'view'){
        this.active = 1
        this.getOne()
      }
    },
    mounted: function () {
    },
    watch: {
      addressInfo: {
        deep: true,
        immediate: true,
        handler(newSkus, oldSkus) {
          this.form.address = newSkus[2]
        }
      }
    },
    computed: {},
    methods: {
      toView(){
        this.$prompt('请输入申请单编号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '申请单编号格式不正确'
        }).then(({ value }) => {
          window.location.href = '#/mall/shop/shopapply/form?tenant_id='+this.form.tenantId+'&type=view&id='+value
          location.reload()
        }).catch(() => {

        });
      },
      getTenant(){
        getTenant(this.form.tenantId).then(response => {
          this.tenantInfo = response.data.data
        })
      },
      getOne(){
        getOne({
          tenantId: this.form.tenantId,
          id: this.id
        }).then(response => {
          if(response.data.data){
            this.form = response.data.data
            this.addressInfo = [this.form.longitude, this.form.latitude, this.form.address]
            if(this.form.status != '0'){
              this.active = 3
            }
          }else{
            this.$message({
              showClose: true,
              message: '无此申请单',
              type: 'error'
            })
          }
        }).catch(() => {
        })
      },
      handleUpdate(form, done) {
        let addressInfo = this.addressInfo
        form.longitude = addressInfo[0]
        form.latitude = addressInfo[1]
        form.address = addressInfo[2]
        putObj(form).then(response => {
          window.location.href = '#/mall/shop/shopapply/form?tenant_id='+this.form.tenantId+'&type=view&id='+response.data.data.id
          location.reload()
        }).catch(() => {
          done()
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  /*#app {*/
  /*  height: unset!important*/
  /*}*/
  /*#html, body, #app {*/
  /*  height: unset!important*/
  /*}*/
</style>
