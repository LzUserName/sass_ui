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
                 :before-open="beforeOpen"
                 @on-load="getPage"
                 @refresh-change="refreshChange"
                 @row-update="handleUpdate"
                 @row-save="handleSave"
                 @row-del="handleDel"
                 @sort-change="sortChange"
                 @search-change="searchChange">
        <template slot-scope="scope" slot="menu">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-bank-card el-icon--left"></i>收款账号申请<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="small"
                           type="text"
                           v-if="permissions['payapi:payapplyform:index']"
                           @click="payApplyFormAli(scope.row,scope.index)">支付宝第三方应用授权</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="small"
                           type="text"
                           v-if="permissions['payapi:payapplyform:index']"
                           @click="payApplyFormWx(scope.row,scope.index)">微信特约商户进件
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown><p/>
          <el-dropdown v-if="permissions['mall:pagedevise2:index']">
            <span class="el-dropdown-link">
              <i class="el-icon-s-shop el-icon--left"></i>店铺装修<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="small"
                           icon="el-icon-mobile"
                           type="text" @click="divPageShop(scope.row,scope.index)">店铺移动端装修</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="small"
                           icon="el-icon-monitor"
                           type="text" @click="divPageShopPC(scope.row,scope.index)">店铺PC端装修</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown><p/>
          <el-dropdown v-if="permissions['mall:pagedevise2:index']">
            <span class="el-dropdown-link">
              <i class="el-icon-house el-icon--left"></i>店铺首页<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="small"
                           type="text" @click="showWxH5Code(scope.row,scope.index)">微信公众号页面</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="small"
                           type="text" @click="showMaCode(scope.row,scope.index)">小程序码</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="small"
                           type="text" @click="showH5Url(scope.row,scope.index)">手机普通浏览器页面</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="small"
                           type="text" @click="showPCUrl(scope.row,scope.index)">PC浏览器页面</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="small"
                           type="text" @click="showAppUrl(scope.row,scope.index)">APP</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="enable" slot-scope="scope">
          <el-switch
            active-value="1"
            inactive-value="0"
            v-model="scope.row.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeEnable(scope.row)">
          </el-switch>
        </template>
        <template slot="addressForm" slot-scope="scope">
          <div >
            <avue-input-map v-model="addressInfo" placeholder="请选择地图位置"  style="width:100%"></avue-input-map>
            <div v-show="form.address"><i class="el-icon-location"></i>{{form.address}}</div>
          </div>
        </template>
        <template slot="imgUrlForm"
                  slot-scope="scope">
          <div>
            <MaterialList v-model="form.imgUrl" type="image" :shopId="form.id ? form.id : '-1'" :num=1 :width='100' :height=100></MaterialList>
            <p class="jl-tips-class">推荐尺寸100*100</p>
          </div>
        </template>
        <template slot="imgUrl" slot-scope="scope">
          <img class="jl-img-width"
            :src="scope.row.imgUrl">
        </template>
      </avue-crud>
      <el-dialog
        title="特约商户进件申请单"
        :visible.sync="dialogPayApplyFormWx"
        width="90%">
        <PayApplyFormWx :shopIdSelect="shopIdSelect" v-if="dialogPayApplyFormWx"></PayApplyFormWx>
      </el-dialog>
      <el-dialog
        title="支付宝授权记录"
        :visible.sync="dialogPayApplyFormAli"
        width="60%">
        <PayApplyFormAli :shopIdSelect="shopIdSelect" v-if="dialogPayApplyFormAli"></PayApplyFormAli>
      </el-dialog>
      <el-dialog
        :title="codeType == '1' ? '选择小程序' : '选择公众号'"
        :visible.sync="dialogWxApp"
        width="360px">
        <div class="jl-tips-class">选择生成首页二维码</div>
        <br>
        <el-select v-model="wxApp.id" placeholder="请选择" style="width: 100%;">
          <el-option
            v-for="item in wxAppData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogWxApp = false">取 消</el-button>
          <el-button type="primary" @click="getMaCode" v-if="codeType == '1'">确认</el-button>
          <el-button type="primary" @click="getQrCode" v-if="codeType == '2'">确认</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="codeType == '1' ? '小程序码，微信扫码进入该店铺首页' : '公众号H5二维码，微信扫码进入该店铺首页'"
        :visible.sync="dialogQrCode"
        center
        width="70%">
        <el-row v-if="codeType == '2'">
          <el-col :span="8">
            <vue-qr :text="qrCodeScene" :size="160" :dotScale = 1></vue-qr>
            <p>160x160</p>
          </el-col>
          <el-col :span="8">
            <vue-qr :text="qrCodeScene" :size="200" :dotScale = 1></vue-qr>
            <p>200x200</p>
          </el-col>
          <el-col :span="8">
            <vue-qr :text="qrCodeScene" :size="320" :dotScale = 1></vue-qr>
            <p>320x320</p>
          </el-col>
        </el-row>
        <el-row v-if="codeType == '2'">
          可直接有微信中打开此链接：
          <br>
          {{qrCodeScene}}
        </el-row>
        <div v-if="codeType == '1'" style="text-align: center">
          <img :src="'data:image/jpg;base64,'+qrCodeScene"/>
        </div>
      </el-dialog>

    </basic-container>
  </div>
</template>

<script>
  import {getPage, getObj, addObj, putObj, delObj} from '@/api/mall/shopinfo'
  import {tableOption} from '@/const/crud/mall/shopinfo'
  import MaterialList from '@/components/material/list.vue'
  import { getList as getWxAppList,getObj as getWxApp } from '@/api/wxmp/wxapp'
  import { getMaCode } from '@/api/wxma/wxapp'
  import { mapGetters, mapMutations } from 'vuex'
  import { h5HostMobile, h5HostPC } from '@/config/env.js'
  import PayApplyFormWx from '@/views/payapi/payapplyform/index-wx.vue'
  import PayApplyFormAli from '@/views/payapi/payapplyform/index-ali.vue'

  export default {
    components: {
      MaterialList,
      PayApplyFormWx,
      PayApplyFormAli
    },
    name: 'shopinfo',
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
        addressInfo: [],
        dialogPayApplyFormWx: false,
        shopIdSelect: null,
        wxAppData: [],
        dialogWxApp: false,
        shopId: '',
        wxApp: {},
        h5HostMobile: h5HostMobile,
        h5HostPC: h5HostPC,
        dialogQrCode: false,
        qrCodeScene: '',
        codeType: '',
        dialogPayApplyFormAli: false
      }
    },
    created() {
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
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.permissions['mall:shopinfo:add'] ? true : false,
          delBtn: this.permissions['mall:shopinfo:del'] ? true : false,
          editBtn: this.permissions['mall:shopinfo:edit'] ? true : false,
          viewBtn: this.permissions['mall:shopinfo:get'] ? true : false
        };
      }
    },
    methods: {
      ...mapMutations([
        'updateData'
      ]),

      divPageShop(row, index){
          this.updateData({shopId: row.id, pageName: row.name});
          window.localStorage.removeItem('divPageShopId');
          this.$router.push({ name: '店铺页面装修', params: { shopId: row.id, shopName: row.name} });
      },
      divPageShopPC(row, index){
        let url = '/#/mall/config/decorate/home/page/addPageShopPC?shopId=' + row.id + '&pageName=' + row.name
        window.open(url);
      },
      payApplyFormWx(row, index, done){
        this.dialogPayApplyFormWx = false//销毁组件
        this.$nextTick(() => {
          this.dialogPayApplyFormWx = true//重建组件
        })
        this.shopIdSelect = row.id
      },
      payApplyFormAli(row, index, done){
        this.dialogPayApplyFormAli = false//销毁组件
        this.$nextTick(() => {
          this.dialogPayApplyFormAli = true//重建组件
        })
        this.shopIdSelect = row.id
      },
      beforeOpen(done,type){
        window.openType = type
        if(type == 'add'){
          this.form.imgUrl = []
        }else{
          this.form.imgUrl = [this.form.imgUrl]
          this.addressInfo = [this.form.longitude, this.form.latitude, this.form.address]
        }
        done()
      },
      changeEnable(row){
        putObj({
          id: row.id,
          enable: row.enable
        }).then(data => {

        })
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
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.page.currentPage = page.currentPage
          this.page.pageSize = page.pageSize
          this.tableLoading = false
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
        row.imgUrl = row.imgUrl.length > 0 ? row.imgUrl[0] : ''
        let addressInfo = this.addressInfo
        row.longitude = addressInfo[0]
        row.latitude = addressInfo[1]
        row.address = addressInfo[2]
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
        row.imgUrl = row.imgUrl.length > 0 ? row.imgUrl[0] : ''
        let addressInfo = this.addressInfo
        row.longitude = addressInfo[0]
        row.latitude = addressInfo[1]
        row.address = addressInfo[2]
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
      },
      //获取小程序码
      showMaCode(row, index){
        this.codeType = '1'
        this.shopId = row.id
        this.tableLoading = true
        this.wxApp = {}
        getWxAppList({
          appType: '1'
        }).then(response => {
          this.tableLoading = false
          let data = response.data
          if(data && data.length > 0){
            if(data.length == 1){
              this.wxApp = data[0]
              this.getMaCode()
            }else{
              this.wxAppData = data
              this.dialogWxApp = true
            }
          }else{
            this.$message({
              showClose: true,
              message: '没有可选择的小程序，请先添加',
              type: 'error'
            })
          }
        }).catch(() => {
          this.tableLoading = false
        })
      },
      //获取首页PC端页面地址
      showPCUrl(row, index){
        let url = this.h5HostPC + '/pages/shop/shop-detail/index?tenant_id='+row.tenantId + '&id='+row.id
        this.$alert(url, '在PC浏览器中打开此链接', {
          confirmButtonText: '确定'
        });
      },
      getMaCode(){
        getMaCode({
          appId: this.wxApp.id,
          scene: this.shopId,
          page: 'pages/shop/shop-detail/index'
        }).then(response => {
          this.dialogWxApp = false
          this.dialogQrCode = true
          this.qrCodeScene = response.data.data
        })
      },
      //获取公众号h5二维码
      showWxH5Code(row, index){
        this.codeType = '2'
        this.shopId = row.id
        this.wxApp = {}
        this.tableLoading = true
        getWxAppList({
          appType: '2'
        }).then(response => {
          this.tableLoading = false
          let data = response.data
          if(data && data.length > 0){
            if(data.length == 1){
              this.wxApp = data[0]
              this.getQrCode()
            }else{
              this.wxAppData = data
              this.dialogWxApp = true
            }
          }else{
            this.$message({
              showClose: true,
              message: '没有可选择的公众号，请先添加',
              type: 'error'
            })
          }
        }).catch(() => {
          this.tableLoading = false
        })
      },
      getQrCode(){
        getWxApp(this.wxApp.id).then(response => {
          this.dialogWxApp = false
          this.wxApp = response.data.data
          let qrUrl = this.h5HostMobile+'/pages/shop/shop-detail/index?app_id='+this.wxApp.id + '&tenant_id='+this.wxApp.tenantId + '&id='+this.shopId
          //第三方平台托管的需要加上component_appid
          if('1' == this.wxApp.isComponent){
            qrUrl = qrUrl + '&component_appid='+this.wxApp.componentAppId;
          }
          this.dialogQrCode = true
          this.qrCodeScene = qrUrl
        }).catch(() => {

        })
      },
      showH5Url(row, index){
        let url = this.h5HostMobile + '/pages/shop/shop-detail/index?tenant_id='+row.tenantId + '&id='+row.id
        this.$alert(url, '在手机普通浏览器中打开此链接', {
          confirmButtonText: '确定'
        });
      },
      showAppUrl(){
        this.$alert('https://www.joolun.com/h-nd-108.html#_jcp=1', '请下载并安装App', {
          confirmButtonText: '确定'
        });
      },

    }
  }
</script>

<style lang="scss" scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
