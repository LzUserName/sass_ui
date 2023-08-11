<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <div style="text-align: center;color: red;margin-bottom: 20px;">
        <p>【注意】演示账号mall、huawei都属于租户1（JooLun多店版演示商城），所以查询和管理的数据都是租户1的。</p>
        <p>一个租户就是一个商城，各租户之间数据相互隔离、互不影响；每个商城下面可以有多个店铺（商户）；可以把租户比做简单的淘宝，JooLun系统可以同时承建多个不同的淘宝；</p>
      </div>
      <avue-crud
        ref="crud"
        v-model="form"
        @on-load="getPage"
        :page.sync="page"
        :option="tableOption"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :before-open="beforeOpen"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="handleDel">
        <template slot="menu"
                  slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     icon="el-icon-suitcase"
                     v-if="permissions['sys:tenant:edit']"
                     @click="handlePermission(scope.row,scope.index)">租户管理员角色权限
          </el-button>
          <el-button size="mini"
                     type="text"
                     icon="el-icon-link"
                     @click="handleShopapply(scope.row,scope.index)">店铺入驻申请
          </el-button>
        </template>
        <template slot="status" slot-scope="scope">
          <el-switch
            active-value="0"
            inactive-value="9"
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(scope.row)"
            :disabled="permissions['sys:tenant:status'] ? false : true">
          </el-switch>
        </template>
        <template slot="logo" slot-scope="scope">
          <img
            style="height: 58px"
            :src="scope.row.logo">
        </template>
        <template slot="logoForm"
                  slot-scope="scope">
          <div>
            <MaterialList v-model="form.logo" type="image" shopId="-1" :num=1 :width="120" :height=120></MaterialList>
            <div class="jl-tips-class">推荐尺寸：150*150</div>
          </div>
        </template>
      </avue-crud>
      <el-dialog title="分配权限"
                 :visible.sync="dialogPermissionVisible">
        <el-tree class="filter-tree"
                 :data="treeData"
                 :default-checked-keys="checkedKeys"
                 :check-strictly="false"
                 node-key="id"
                 highlight-current
                 :props="defaultProps"
                 show-checkbox
                 ref="menuTree"
                 :filter-node-method="filterNode"
                 default-expand-all>
        </el-tree>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="updatePermession(id, roleCode)"
                     v-loading = "dialogLoading">更 新
          </el-button>
        </div>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
    import {addObj, delObj, getPage, getObj, putObj, putObjStatus} from '@/api/upms/tenant'
    import {fetchRoleTreeTenant, permissionUpdTenant} from '@/api/upms/role'
    import {tableOption} from '@/const/crud/upms/tenant'
    import {fetchAllMenuTree} from '@/api/upms/menu'
    import {mapGetters} from 'vuex'
    import {getStore, setStore } from '@/util/store'
    import MaterialList from '@/components/material/list.vue'

    export default {
        components: {
          MaterialList
        },
        name: 'tenant',
        data() {
            return {
                form: {},
                dialogPermissionVisible: false,
                tableOption: tableOption,
                tableData: [],
                checkedKeys: [],
                tableLoading: false,
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20, // 每页显示多少条
                    ascs: [],//升序字段
                    descs: 'create_time'//降序字段
                },
                paramsSearch: {},
                defaultProps: {
                    label: "name",
                    value: 'id'
                },
                treeData: [],
                dialogLoading: false
            }
        },
        created() {
        },
        computed: {
            ...mapGetters(['permissions', 'userInfo']),
            permissionList() {
                return {
                    addBtn: this.permissions['sys:tenant:add'] ? true : false,
                    delBtn: this.permissions['sys:tenant:del'] ? true : false,
                    editBtn: this.permissions['sys:tenant:edit'] ? true : false,
                    viewBtn: this.permissions['sys:tenant:get'] ? true : false
                }
            }
        },
        methods: {
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
                row.logo = row.logo.length > 0 ? row.logo[0] : ''
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
                row.logo = row.logo.length > 0 ? row.logo[0] : ''
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
            searchChange(params,done) {
              params = this.filterForm(params)
              this.paramsSearch = params
              this.page.currentPage = 1
              this.getPage(this.page, params)
              done()
            },
            /**
             * 刷新回调
             */
            refreshChange(page) {
              this.getPage(this.page)
            },
            handlePermission(row) {
                this.tableLoading = true
                fetchRoleTreeTenant(row.id)
                    .then(response => {
                        this.checkedKeys = response.data.data.listMenuVO
                        this.checkedDysRole = response.data.data.sysRole
                        return fetchAllMenuTree()
                    })
                    .then(response => {
                        this.treeData = response.data.data
                        // 解析出所有的太监节点
                        this.checkedKeys = this.resolveAllEunuchNodeId(this.treeData, this.checkedKeys, [])
                        this.dialogPermissionVisible = true
                        this.id = this.checkedDysRole.id
                        this.roleCode = this.checkedDysRole.roleCode
                        this.tableLoading = false
                    })
            },
            /**
             * 解析出所有的节点id
             * @param json 待解析的json串
             * @param idArr 原始节点数组
             * @param temp 临时存放节点id的数组
             * @return 太监节点id数组
             */
            resolveAllEunuchNodeId(json, idArr, temp) {
                for (let i = 0; i < json.length; i++) {
                    const item = json[i]
                    // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
                    if (item.children && item.children.length !== 0) {
                        this.resolveAllEunuchNodeId(item.children, idArr, temp)
                    } else {
                        temp.push(idArr.filter(id => id === item.id))
                    }
                }
                return temp
            },
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            updatePermession(id, roleCode) {
                this.dialogLoading = true
                this.menuIds = ''
                this.menuIds = this.$refs.menuTree.getCheckedKeys().join(',').concat(',').concat(this.$refs.menuTree.getHalfCheckedKeys().join(','))
                permissionUpdTenant({
                  tenantId: this.checkedDysRole.tenantId,
                  roleId: id,
                  menuId: this.menuIds
                }).then(() => {
                    this.dialogLoading = false
                    this.dialogPermissionVisible = false
                    fetchAllMenuTree()
                        .then(response => {
                            this.form = response.data.data
                            return fetchRoleTreeTenant(this.checkedDysRole.tenantId)
                        })
                        .then(response => {
                            this.checkedKeys = response.data.data.listMenuVO
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
                }).catch(() => {
                  this.dialogLoading = false
                })
            },
            beforeOpen(done,type){
              window.openType = type
              if(type == 'add'){
                this.form.logo = []
              }else{
                this.form.logo = [this.form.logo]
              }
              done()
            },
            handleShopapply(row){
              window.open('#/mall/shop/shopapply/form?tenant_id='+row.id, '_blank')
            },
            changeStatus(row){
              putObjStatus({
                id: row.id,
                status: row.status
              }).then(data => {
                this.getPage(this.page)
              })
            }
        }
    }
</script>
<style>

</style>
