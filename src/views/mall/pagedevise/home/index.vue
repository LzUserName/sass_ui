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
      <div class="pd-container">
        <el-row :gutter="70">
          <el-col span="6" v-for="(item,index) in homeDivTypes" :key="index">
            <div class="pd-item-center">
              <div class="">
                <div >
                  <el-image
                    @click.stop="addPageNew(item)"
                    class="pd-item-image"
                    :src="item.status!='0'?item.icon:'/img/mall-add.png'"
                    fit="fill"></el-image>
                  <div :class="item.status!='0'?'pd-action':'pd-action-none'" >
                    <div>
                      <i class="el-icon-edit-outline" @click.stop="editPage(item)"></i>
                      <i class="el-icon-delete" @click.stop="handleDel(item)"></i>
                    </div>
                  </div>
                </div>
                <div class="pd-item-text">{{ item.name }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </basic-container>
  </div>
</template>

<script>
import {getPage, getObj, addObj, putObj, delObj} from '@/api/mall/pagedevise'
import {getObj2} from '@/api/mall/thememobile'
import {tableOption} from '@/const/crud/mall/pagedevise'

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

import pagePreview from "../component-library/pages/page-components/pagePreview.vue";

export default {
  name: 'pagedevise',
  components: {
    pagePreview
  },
  data() {
    return {
      showAddMobile: true,//是否显示新增
      showAddPC: true,//是否显示新增
      thememobile: {},//必须配置主题才能新增页面
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
      tableLoading: true,
      tableOption: tableOption,
      opemType: null,
      clientTypeData: [{
        label: 'H5',
        value: 'H5'
      }, {
        label: 'APP',
        value: 'APP'
      }, {
        label: '小程序',
        value: 'MA'
      }],
      homeDivTypes: [{
        icon: '/img/mall-mini-program.png',
        status: 0,
        name: '小程序',
        type: 'MA'
      },{
        icon: '/img/mall-h5.png',
        status: 0,
        name: 'H5',
        type: 'H5'
      },{
        icon: '/img/mall-h5-pc.png',
        status: 0,
        name: 'PC',
        type: 'H5-PC'
      },{
        icon: '/img/mall-app.png',
        status: 0,
        name: 'APP',
        type: 'APP'
      },]
    }
  },
  created() {
    //必须配置主题才能新增页面
    getObj2().then(response => {
      this.thememobile = response.data.data
    });
    this.getPageData()
  },
  watch:{
    $route: function () {
      getObj2().then(response => {
        this.thememobile = response.data.data
      });
      this.getPageData()
    },
  },
  computed: {
    ...mapState({
      pageId: state => state.divpage.pageId,//页面ID
      userInfo: state => state.user.userInfo,
    }),
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.permissions['mall:pagedevise:add'] ? true : false,
        delBtn: this.permissions['mall:pagedevise:del'] ? true : false,
        editBtn: this.permissions['mall:pagedevise:edit'] ? true : false,
        viewBtn: this.permissions['mall:pagedevise:get'] ? true : false
      };
    }
  },
  methods: {
    ...mapMutations([
      'updateData'
    ]),
    addPCPage() {
      if (!this.thememobile) {
        this.$message({
          showClose: true,
          message: '必须先配置主题才能新增',
          type: 'info'
        });
        return;
      }
      let pagePCdata = this.tableData.find(item => item.clientType == 'H5-PC')
      let query = ''
      if (pagePCdata) {
        query = '?id=' + pagePCdata.id
      }
      //兼容
      window.localStorage.removeItem('PCdivPageId');
      // 用于获取缓存租户的装修id
      let tenantId = this.userInfo.switchTenantId || this.userInfo.tenantId
      window.localStorage.removeItem('PCdivPageId_' + tenantId + this.userInfo.username);
      window.open('/#/mall/config/decorate/home/pagePC/addPagePC' + query);
    },
    addPageNew(item) {//新增
      if (!this.thememobile) {
        this.$message({
          showClose: true,
          message: '必须先配置主题才能新增',
          type: 'info'
        });
        return;
      }
      if (this.tableLoading) {
        this.$message({
          showClose: true,
          message: '正在加载数据，稍后再试...',
          type: 'info'
        });
        return;
      }
      if(item.type=='H5-PC'){
        this.addPCPage()
      }else{
        //兼容
        window.localStorage.removeItem('divPageId');
        // 用于获取缓存租户的装修id
        let tenantId = this.userInfo.switchTenantId || this.userInfo.tenantId
        window.localStorage.removeItem('divPageId_' + tenantId + this.userInfo.username);
        this.updateData({pageId: null});
        this.$router.push({name: '商城页面装修',params:{clientType: item.type}});
      }
    },
    addPage() {
      if (!this.thememobile) {
        this.$message({
          showClose: true,
          message: '必须先配置主题才能新增',
          type: 'info'
        });
        return;
      }
      let mobileTypes = this.tableData.filter((item) => {
        return item.clientType === 'H5' || item.clientType === 'APP' || item.clientType === 'MA'
      })
      if (mobileTypes.length > 2) {
        this.$message({
          showClose: true,
          message: '目前只能新增【H5】【APP】【小程序】3种不同类型。',
          type: 'warning'
        });
        return;
      }
      //兼容
      window.localStorage.removeItem('divPageId');
      // 用于获取缓存租户的装修id
      let tenantId = this.userInfo.switchTenantId || this.userInfo.tenantId
      window.localStorage.removeItem('divPageId_' + tenantId + this.userInfo.username);
      this.updateData({pageId: null});
      this.$router.push({name: '商城页面装修',});
    },
    editPage(row) {
      if (row.type == 'H5-PC') {
        this.addPCPage()
      } else {
        this.$router.push({name: '商城页面装修', params: {id: row.id}});
      }
    },
    getPageData() {
      this.tableLoading = true
      getPage(Object.assign({
        current: 0,
        size: 10,
        pageType: '1'
      })).then(response => {
        this.tableData = response.data.data.records
        this.homeDivTypes.map(item2=>{
          item2.id = null
          item2.status = 0
        })
        this.tableData.map(item=>{
          this.homeDivTypes.map(item2=>{
            if(item.clientType==item2.type){//有数据表示已经创建了，修改状态为已创建
              item2.id = item.id
              item2.status = 1
            }
          })
        })
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
        this.getPageData()
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
      row.pageType = '1'
      this.$refs.pageCompRef.submitData().then(pageComponent => {
        row.pageComponent = {componentsList: pageComponent ? JSON.parse(pageComponent) : []}
        putObj(row).then(response => {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          done()
          this.getPageData(this.page)
        }).catch(() => {
          loading()
        })
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
      row.pageType = '1'
      row.pageName = '商城首页'
      this.$refs.pageCompRef.submitData().then(pageComponent => {
        row.pageComponent = {componentsList: pageComponent ? JSON.parse(pageComponent) : []}
        addObj(row).then(response => {
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          })
          done()
          this.getPageData(this.page)
        }).catch(() => {
          loading()
        })
      }).catch(() => {
        loading()
      })
    },
    /**
     * 刷新回调
     */
    refreshChange(page) {
      this.getPageData(this.page)
    },
    beforeOpen(done, type) {
      this.opemType = type
      done()
    },
  }
}
</script>
<style scoped lang="scss">

.pd-container {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pd-item-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pd-item-image {
  width: 240px;
  height: 240px;
  cursor: pointer;
  border-radius: 5px;
  &:hover{
    background: rgba(224, 238, 255, 0.65);
    transform: scale(1.1,1.1);
    border-radius: 5px;
  }
}

.pd-item-text {
  text-align: center;
  margin-top: 30px;
  letter-spacing: 1px;
  font-size: 26px;
}

.pd-action-none {
  display: none;
}
.pd-action {
  text-align: center;
  font-size: 26px;
  background: rgba(0, 12, 23, 0.49);
  width: 240px;
  height: 240px;
  display: none;
  position: absolute;
  top:0;
  color: #FFFFFF;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  i{
    font-size: 40px;
    margin: 20px;
    &:hover{
      color: rgba(255, 255, 255, 0.66);
    }
  }
}

.pd-item-center:hover {
  .pd-action{
    display: flex;
  }
}

</style>

