<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <el-alert
        title="租户（商城）列表，请选择需要入驻的商城"
        type="success"
        :closable="false"
        center>
      </el-alert>
      <avue-crud
        @on-load="getPage"
        :page.sync="page"
        :option="tableOption"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        @search-change="searchChange">
        <template slot="menu"
                  slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     icon="el-icon-link"
                     @click="handleShopapply(scope.row,scope.index)">店铺入驻申请
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
    import {getPageOutSide as getPage} from '@/api/upms/tenant'
    import {tableOption2} from '@/const/crud/upms/tenant'
    import {mapGetters} from 'vuex'

    export default {
        name: 'tenant',
        data() {
            return {
                tableOption: tableOption2,
                tableData: [],
                tableLoading: false,
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20, // 每页显示多少条
                    ascs: [],//升序字段
                    descs: 'create_time'//降序字段
                },
                paramsSearch: {}
            }
        },
        created() {
        },
        computed: {
            ...mapGetters(['permissions']),
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
                    status: '0'
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

            handleShopapply(row){
              window.open('#/mall/shop/shopapply/form?tenant_id='+row.id, '_blank')
            }
        }
    }
</script>

