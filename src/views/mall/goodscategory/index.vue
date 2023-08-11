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
                 :data="tableData"
                 :permission="permissionList"
                 :table-loading="tableLoading"
                 :option="tableOption"
                 :before-open="beforeOpen"
                 v-model="form"
                 @on-load="getPage"
                 @refresh-change="refreshChange"
                 @row-update="handleUpdate"
                 @row-save="handleSave"
                 @row-del="handleDel">
        <template slot="picUrlForm"
                  slot-scope="scope">
          <div>
            <MaterialList v-model="form.picUrl" type="image" shopId="-1" :num=1 :width='form.parentId == "0" ? 310 : 100' :height='form.parentId == "0" ? 90 : 100'></MaterialList>
            <p v-if="form.parentId" class="jl-tips-class">推荐尺寸:{{form.parentId == "0" ? "620*180或同比例尺寸" : "100*100"}}</p>
          </div>
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
        <template slot="picUrl" slot-scope="scope">
          <img
            style="height: 90px"
            :src="scope.row.picUrl">
        </template>
        <template slot="pageForm" slot-scope="scope">
          <div v-if="form.parentId == '0'">
            <app-page-select :page="form.page" @change="form.page=$event"></app-page-select>
          </div>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
    import {getPage, fetchTree, getObj, addObj, putObj, delObj} from '@/api/mall/goodscategory'
    import {tableOption} from '@/const/crud/mall/goodscategory'
    import {mapGetters} from 'vuex'
    import MaterialList from '@/components/material/list.vue'
    import AppPageSelect from '@/components/app-page-select/Index.vue'

    export default {
        components: {
            MaterialList,
            AppPageSelect,
        },
        name: 'goodscategory',
        data() {
            return {
                form: {},
                tableData: [],
                tableLoading: false,
                tableOption: tableOption
            }
        },
        created() {
        },
        mounted: function () {
        },
        computed: {
            ...mapGetters(['permissions']),
            permissionList() {
                return {
                    addBtn: this.permissions['mall:goodscategory:add'] ? true : false,
                    delBtn: this.permissions['mall:goodscategory:del'] ? true : false,
                    editBtn: this.permissions['mall:goodscategory:edit'] ? true : false,
                    viewBtn: this.permissions['mall:goodscategory:get'] ? true : false
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
            beforeOpen(done,type){
                if(type == 'add'){
                  this.form.picUrl = []
                }else{
                  this.form.picUrl = [this.form.picUrl]
                }
                done()
            },
            getPage() {
                this.tableLoading = true
                fetchTree().then(response => {
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
            },
            /**
             * @title 数据删除
             * @param row 为当前的数据
             * @param index 为当前删除数据的行数
             *
             **/
            handleDel: function (row, index) {
                var _this = this
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
              if(row.page&&row.page.indexOf('id=')!=-1){
                if(row.page.endsWith('id=')){
                  this.$message.error('请选择具体页面');
                  loading()
                  return
                }
              }
              row.picUrl = row.picUrl.length > 0 ? row.picUrl[0] : ''
              putObj(row).then(data => {
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
              if(row.page&&row.page.indexOf('id=')!=-1){
                if(row.page.endsWith('id=')){
                  this.$message.error('请选择具体页面');
                  loading()
                  return
                }
              }
              row.picUrl = row.picUrl.length > 0 ? row.picUrl[0] : ''
              addObj(row).then(data => {
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
