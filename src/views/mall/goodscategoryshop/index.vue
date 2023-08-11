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
      <div style="margin-bottom: 15px;">
        <el-select v-model="shopId" placeholder="请选择店铺2" @change="changeShopInfo" size="small">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
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
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
  import {getPage, fetchTree, getObj, addObj, putObj, delObj} from '@/api/mall/goodscategoryshop'
  import {getList as shopList} from '@/api/mall/shopinfo'
  import {tableOption} from '@/const/crud/mall/goodscategoryshop'
  import {mapGetters} from 'vuex'

  export default {
    name: 'goodscategoryshop',
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
        shopId: null,
        shopList: []
      }
    },
    created() {
      this.getshopList()
    },
    mounted: function () {
    },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.permissions['mall:goodscategoryshop:add'] ? true : false,
          delBtn: this.permissions['mall:goodscategoryshop:del'] ? true : false,
          editBtn: this.permissions['mall:goodscategoryshop:edit'] ? true : false,
          viewBtn: this.permissions['mall:goodscategoryshop:get'] ? true : false
        };
      }
    },
    methods: {
      changeEnable(row){
        putObj({
          id: row.id,
          enable: row.enable
        }).then(data => {

        })
      },
      getshopList(){
        shopList().then(response => {
          let shopList = response.data.data
          this.shopList = shopList
          if(shopList.length > 0){
            this.changeShopInfo(shopList[0].id)
          }
        })
      },
      changeShopInfo(e){
        this.shopId = e
        this.getPage()
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
        if(this.shopId){
          this.tableLoading = true
          fetchTree({
            shopId: this.shopId
          }).then(response => {
            let tableData = response.data.data
            this.tableData = tableData
            let parentIdDIC = [{
              id: "0",
              name: "顶级分类",
              parentId: "0"
            }]
            tableData.forEach(item => {
              parentIdDIC.push({
                id: item.id,
                name: item.name,
                parentId: item.parentId
              })
            })
            this.$refs.crud.DIC.parentId = parentIdDIC
            this.tableLoading = false
          }).catch(() => {
            this.tableLoading = false
          })
        }
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
        row.shopId = this.shopId
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
        row.shopId = this.shopId
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
</style>
