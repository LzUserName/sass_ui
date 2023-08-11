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
      <avue-crud ref="crud"
                 :page.sync="page"
                 :data="tableData"
                 :permission="permissionList"
                 :table-loading="tableLoading"
                 :option="tableOption"
                 v-model="form"
                 @on-load="getPage"
                 @refresh-change="refreshChange"
                 @row-update="handleUpdate"
                 @row-save="handleSave"
                 @row-del="handleDel"
                 @sort-change="sortChange"
                 @search-change="searchChange">
        <template slot="menuLeft">
          <el-button type="primary"
                     size="small"
                     icon="el-icon-plus"
                     @click.stop="$refs.crud.rowAdd()"
                     v-if="permissions['payapi:payconfig:add'] && this.tableData.length < 2">新增收款配置
          </el-button>
        </template>
        <template slot="keyPathForm"
                  slot-scope="scope">
          <div v-if="form.keyPath">
            <el-tag closable @close="keyPathRemove">
              {{ form.keyPath.slice(0, 60) }}
            </el-tag>
          </div>
          <el-upload
            v-if="!form.keyPath"
            :action="'/payapi/payconfig/cert/upload'"
            :headers="headers"
            :limit="1"
            :on-success="uploadKeySuccess">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </template>
        <template slot="privateKeyPathForm"
                  slot-scope="scope">
          <div v-if="form.privateKeyPath">
            <el-tag closable @close="privateKeyPathRemove">
              {{ form.privateKeyPath.slice(0, 60) }}
            </el-tag>
          </div>
          <el-upload
            v-if="!form.privateKeyPath"
            :action="'/payapi/payconfig/cert/upload'"
            :headers="headers"
            :limit="1"
            :on-success="uploadPrivateKeySuccess">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </template>
        <template slot="privateCertPathForm"
                  slot-scope="scope">
          <div v-if="form.privateCertPath">
            <el-tag closable @close="privateCertPathRemove">
              {{ form.privateCertPath.slice(0, 60) }}
            </el-tag>
          </div>
          <el-upload
            v-if="!form.privateCertPath"
            :action="'/payapi/payconfig/cert/upload'"
            :headers="headers"
            :limit="1"
            :on-success="uploadPrivateCertSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </template>
        <template slot="type"
                  slot-scope="scope">
          <div v-if="scope.row.type == '1'"><img class="pay-img" src="/img/wx-pay.png"></div>
          <div v-if="scope.row.type == '2'"><img class="pay-img" src="/img/ali-pay.png"></div>
        </template>
        <template slot="typeForm"
                  slot-scope="scope">
          <el-radio-group v-model="form.type" size="small">
            <el-radio border
                      v-for="item in dicDataType"
                      :key="item.id"
                      :label="item.id"
                      :disabled="item.disabled">
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {getPage, getObj, addObj, putObj, delObj} from '@/api/payapi/payconfig'
import {tableOption} from '@/const/crud/payapi/payconfig'
import {mapGetters} from 'vuex'
import store from "@/store"
import {getStore} from '@/util/store'

export default {
  name: 'payconfig',
  data() {
    return {
      form: {},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
        ascs: [],//升序字段
        descs: []//降序字段
      },
      paramsSearch: {},
      tableLoading: false,
      tableOption: tableOption,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token
      },
      dicDataType: [{
        name: '微信支付',
        id: '1'
      }
        , {
          name: '支付宝',
          id: '2'
        }
      ]
    }
  },
  watch: {
    'form.type'(val, oldVal) {
      let column3 = this.tableOption.column[3]
      let column4 = this.tableOption.column[4]
      let column5 = this.tableOption.column[5]
      let column6 = this.tableOption.column[6]
      let column7 = this.tableOption.column[7]
      let column8 = this.tableOption.column[8]
      let column9 = this.tableOption.column[9]
      let column10 = this.tableOption.column[10]
      if (val === '1') {
        column3.display = true
        column5.display = true
        column6.display = true
        column10.display = true
        column4.label = 'apiV2秘钥'
        column7.label = 'apiclient_cert.p12'
        column8.label = 'apiclient_key.pem'
        column9.label = 'apiclient_cert.pem'
        column7.tip = '微信支付平台申请，不要乱填，否则商城退款功能将无法使用'
        column8.tip = '微信支付平台申请，不要乱填，否则商城退款功能将无法使用'
        column9.tip = '微信支付平台申请，不要乱填，否则商城退款功能将无法使用'

      }
      if (val === '2') {
        column3.display = false
        column5.display = false
        column6.display = false
        column10.display = false
        column4.label = '应用私钥'
        column7.label = '支付宝根证书'
        column8.label = '支付宝公钥证书'
        column9.label = '应用公钥证书'
        column7.tip = 'alipayRootCert.crt，支付宝平台申请，不要乱填，否则商城支付无法使用'
        column8.tip = 'alipayCertPublicKey_RSA2.crt，支付宝平台申请，不要乱填，否则商城支付无法使用'
        column9.tip = 'appCertPublicKey_2019051064521003.crt，支付宝平台申请，不要乱填，否则商城支付无法使用'
      }
    }
  },
  created() {
    if (this.userInfo.type == '-1') {
      let switchTenantId = getStore({name: 'switchTenantId'})
      if (switchTenantId) {
        this.headers['switch-tenant-id'] = switchTenantId
      }
    }
  },
  mounted: function () {
  },
  computed: {
    ...mapGetters(['permissions', 'userInfo']),
    permissionList() {
      return {
        addBtn: this.permissions['payapi:payconfig:add'] ? true : false,
        delBtn: this.permissions['payapi:payconfig:del'] ? true : false,
        editBtn: this.permissions['payapi:payconfig:edit'] ? true : false,
        viewBtn: this.permissions['payapi:payconfig:get'] ? true : false
      };
    }
  },
  methods: {
    keyPathRemove() {
      this.form.keyPath = ''
    },
    privateKeyPathRemove() {
      this.form.privateKeyPath = ''
    },
    privateCertPathRemove() {
      this.form.privateCertPath = ''
    },
    uploadKeySuccess(response, file, fileList) {
      this.form.keyPath = response.link
    },
    uploadPrivateKeySuccess(response, file, fileList) {
      this.form.privateKeyPath = response.link
    },
    uploadPrivateCertSuccess(response, file, fileList) {
      this.form.privateCertPath = response.link
    },
    searchChange(params, done) {
      params = this.filterForm(params)
      this.paramsSearch = params
      this.page.currentPage = 1
      this.getPage(this.page, params)
      done()
    },
    sortChange(val) {
      let prop = val.prop ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase() : ''
      if (val.order == 'ascending') {
        this.page.descs = []
        this.page.ascs = prop
      } else if (val.order == 'descending') {
        this.page.ascs = []
        this.page.descs = prop
      } else {
        this.page.ascs = []
        this.page.descs = []
      }
      this.getPage(this.page)
    },
    getPage(page, params) {
      this.tableLoading = true
      getPage(Object.assign({
        current: page.currentPage,
        size: page.pageSize,
        descs: this.page.descs,
        ascs: this.page.ascs,
      }, params, this.paramsSearch)).then(response => {
        let data = response.data.data.records
        data.map(item => {//兼容之前逻辑，设置一个默认值
          item.model = item.model ? item.model : '1'
        })
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.page.currentPage = page.currentPage
        this.page.pageSize = page.pageSize
        this.tableLoading = false
        let dicDataType = this.dicDataType
        for (let i = 0; i < dicDataType.length; i++) {
          dicDataType[i].disabled = false
          for (let j = 0; j < this.tableData.length; j++) {
            if (dicDataType[i].id == this.tableData[j].type) {
              dicDataType[i].disabled = true
            }
          }
        }
      }).catch(() => {
        this.tableLoading = false
      })
    },
    /**
     * @title 数据删除
     * @param row 为当前的数据
     * @param index 为当前删除数据的行数
     *
     **/
    handleDel: function (row, index) {
      let _this = this
      this.$confirm('是否确认删除此数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj(row.id)
      }).then(data => {
        _this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
        this.getPage(this.page)
      }).catch(function (err) {
      })
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function (row, index, done, loading) {
      putObj(row).then(response => {
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
        done()
        this.getPage(this.page)
      }).catch(() => {
        loading()
      })
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function (row, done, loading) {
      addObj(row).then(response => {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        done()
        this.getPage(this.page)
      }).catch(() => {
        loading()
      })
    },
    /**
     * 刷新回调
     */
    refreshChange(page) {
      this.getPage(this.page)
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-img {
  width: 100px;
  height: 50px;
}
</style>
