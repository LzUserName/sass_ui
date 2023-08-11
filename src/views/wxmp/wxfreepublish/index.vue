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
      <el-row :span="24" :gutter="10">
        <el-col :span="5">
          <el-card shadow="never">
            <div slot="header">
              <span>公众号名称</span>
            </div>
            <el-input
              placeholder="输入关键字进行过滤"
              size="mini"
              v-model="filterText">
            </el-input>
            <el-tree
              style="margin-top: 5px"
              :data="treeWxAppData"
              :props="treeWxAppProps"
              :filter-node-method="filterNode"
              node-key="id"
              default-expand-all
              ref="tree"
              @node-click="nodeClick">
            </el-tree>
          </el-card>
        </el-col>
        <el-col :span="19"
                class="user__main">
          <div class="waterfall" v-loading="tableLoading">
            <div v-if="item.content && item.content.newsItem" class="waterfall-item" v-for="item in tableData"
                 :key='item.id'>
              <WxNews :objData="item.content.newsItem"></WxNews>
              <el-row class="ope-row">
                <el-button type="danger" size="small" icon="el-icon-delete" circle @click="delMaterial(item)"></el-button>
              </el-row>
            </div>
          </div>
          <div v-if="tableData.length <=0 && !tableLoading" class="el-table__empty-block">
            <span class="el-table__empty-text">暂无数据</span>
          </div>
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page.sync="page.currentPage"
            :page-sizes="[10, 20]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            class="pagination"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
  import {getPage, delObj} from '@/api/wxmp/wxfreepublish'
  import {getList as getWxAppList} from '@/api/wxmp/wxapp'
  import {mapGetters} from 'vuex'
  import WxNews from '@/components/wx-news/main.vue'
  import store from "@/store"
  import {getStore} from '@/util/store'

  export default {
    name: 'wxdraft',
    components: {
      WxNews
    },
    data() {
      return {
        filterText: '',
        treeWxAppProps: {
          label: 'name',
          value: 'id'
        },
        treeWxAppData: [],
        appId: null,
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        page1: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        tableLoading: false,
        headers: {
          Authorization: 'Bearer ' + store.getters.access_token
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
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
      this.getWxAppList()
    },
    computed: {
      ...mapGetters(['permissions', 'userInfo'])
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      //加载公众号列表
      getWxAppList() {
        getWxAppList({
          appType: '2'
        }).then(response => {
          let data = response.data
          this.treeWxAppData = data
          if (data && data.length > 0) {
            //默认加载第一个公众号的素材
            this.nodeClick({
              id: data[0].id
            })
          }
        }).catch(() => {

        })
      },
      nodeClick(data) {
        if (this.appId != data.id) {
          this.$nextTick(() => {
            if (this.$refs.tree) {
              this.$refs.tree.setCurrentKey(data.id)
            }
          })
          this.tableData = []
          this.page.total = 0
          this.page.currentPage = 1
          this.appId = data.id
          this.getPage(this.page)
        }
      },
      getPage(page, params) {
        this.tableData = []
        this.tableLoading = true
        getPage(Object.assign({
          current: page.currentPage,
          size: page.pageSize,
          appId:this.appId
        }, params)).then(response => {
          this.tableData = response.data.data.items
          this.page.total = response.data.data.totalCount
          this.page.currentPage = page.currentPage
          this.page.pageSize = page.pageSize
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      sizeChange(val) {
        this.page.currentPage = 1
        this.page.pageSize = val
        this.getPage(this.page)
      },
      currentChange(val) {
        this.page.currentPage = val
        this.getPage(this.page)
      },
      delMaterial(item){
        this.$confirm('删除后用户将无法访问此页面，确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableLoading = true
          delObj({
            id: item.articleId,
            appId: this.appId
          }).then(response => {
            this.tableLoading = false
            if(response.data.code == '0'){
              this.getPage(this.page)
            }else{
              this.tableLoading = false
              this.$message.error('删除出错：' + response.data.msg)
            }
          }).catch(() => {
            this.tableLoading = false
          })
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .pagination {
    float: right;
    margin-right: 25px;
  }

  .add_but {
    padding: 10px;
  }

  .ope-row {
    margin-top: 5px;
    text-align: center;
    border-top: 1px solid #eaeaea;
    padding-top: 5px;
  }

  .item-name {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }

  .el-upload__tip {
    margin-left: 5px;
  }

  /*新增图文*/
  .left {
    display: inline-block;
    width: 35%;
    vertical-align: top;
    margin-top: 200px;
  }

  .right {
    display: inline-block;
    width: 60%;
    margin-top: -40px;
  }

  .avatar-uploader {
    width: 20%;
    display: inline-block;
  }

  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: unset !important;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #165dff;
  }

  .avatar-uploader-icon {
    border: 1px solid #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 230px;
    height: 120px;
  }

  .avatar1 {
    width: 120px;
    height: 120px;
  }

  .digest {
    width: 60%;
    display: inline-block;
    vertical-align: top;
  }

  /*新增图文*/
  /*瀑布流样式*/
  .waterfall {
    width: 100%;
    column-gap: 10px;
    column-count: 5;
    margin: 0 auto;
  }

  .waterfall-item {
    padding: 10px;
    margin-bottom: 10px;
    break-inside: avoid;
    border: 1px solid #eaeaea;
  }

  p {
    line-height: 30px;
  }

  @media (min-width: 992px) and (max-width: 1300px) {
    .waterfall {
      column-count: 3;
    }
    p {
      color: red;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .waterfall {
      column-count: 2;
    }
    p {
      color: orange;
    }
  }

  @media (max-width: 767px) {
    .waterfall {
      column-count: 1;
    }
  }

  /*瀑布流样式*/
  .news-main {
    background-color: #FFFFFF;
    width: 100%;
    margin: auto;
    height: 120px;
  }

  .news-content {
    background-color: #acadae;
    width: 100%;
    height: 120px;
    position: relative;
  }

  .news-content-title {
    display: inline-block;
    font-size: 15px;
    color: #FFFFFF;
    position: absolute;
    left: 0px;
    bottom: 0px;
    background-color: black;
    width: 98%;
    padding: 1%;
    opacity: 0.65;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 25px;
  }

  .news-main-item {
    background-color: #FFFFFF;
    padding: 5px 0px;
    border-top: 1px solid #eaeaea;
    width: 100%;
    margin: auto;
  }

  .news-content-item {
    position: relative;
    margin-left: -3px
  }

  .news-content-item-title {
    display: inline-block;
    font-size: 12px;
    width: 70%;
  }

  .news-content-item-img {
    display: inline-block;
    width: 25%;
    background-color: #acadae
  }

  .input-tt {
    padding: 5px;
  }

  .activeAddNews {
    border: 5px solid #2bb673;
  }

  .news-main-plus {
    width: 280px;
    text-align: center;
    margin: auto;
    height: 50px;
  }

  .icon-plus {
    margin: 10px;
    font-size: 25px;
  }

  .select-item {
    width: 60%;
    padding: 10px;
    margin: 0 auto 10px auto;
    border: 1px solid #eaeaea;
  }

  .father .child {
    display: none;
    text-align: center;
    position: relative;
    bottom: 25px;
  }

  .father:hover .child {
    display: block;
  }

  .thumb-div {
    display: inline-block;
    width: 30%;
    text-align: center;
  }

  .thumb-but {
    margin: 5px;
  }

  .material-img {
    width: 100%;
    height: 100%;
  }
</style>
