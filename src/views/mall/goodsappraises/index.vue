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
                 @search-change="searchChange"
                 @date-change="dateChange">
        <template slot="nickName" slot-scope="scope">
          <el-avatar icon="el-icon-user-solid" :src="scope.row.headimgUrl"></el-avatar>
          <div>{{scope.row.nickName ? scope.row.nickName : '匿名'}}</div>
        </template>
        <template slot="specInfo" slot-scope="scope" v-if="scope.row.orderItem">
          <div class="jl-flex" style="text-align: left">
            <div>
              <img :src="scope.row.orderItem.picUrl" class="jl-img-width">
            </div>
            <div class="jl-flex-sub ">
              <div class="jl-text-line2 " :title="scope.row.orderItem.spuName">{{ scope.row.orderItem.spuName }}</div>
              <div class="jl-tips-class">{{ scope.row.orderItem.specInfo }}</div>
            </div>
          </div>
        </template>
        <template slot="orderItem" slot-scope="scope" v-if="scope.row.orderItem">
          <div>订单号：{{scope.row.orderInfo.orderNo}}</div>
          <div>购买价格：<span class="jl-money-text">{{scope.row.orderItem.salesPrice}}</span></div>
          <div>购买数量：{{scope.row.orderItem.quantity}}</div>
        </template>
        <template slot="appraises" slot-scope="scope">
          <div>
            <div>评价时间:&nbsp;&nbsp;{{scope.row.createTime}}</div>
            <div class="jl-flex">
              商品评分：
              <el-rate
                disabled
                v-model="scope.row.goodsScore"
                show-text>
              </el-rate>
            </div>
            <div class="jl-flex">
              服务评分：
              <el-rate
                disabled
                v-model="scope.row.serviceScore"
                show-text>
              </el-rate>
            </div>
            <div class="jl-flex">
              物流评分：
              <el-rate
                disabled
                v-model="scope.row.logisticsScore"
                show-text>
              </el-rate>
            </div>
            <div >
              <div  class="jl-flex jl-align-center">
                <div style="color:red" class="el-icon-chat-dot-round"> 买家留言：</div><div class="time">{{scope.row.createTime}}</div>
              </div>
              <div>{{scope.row.content ? scope.row.content : '此人很懒，什么也没写'}}</div>
              <el-row :gutter="20">
                <el-col :span="6" v-for="(item,index) in scope.row.picUrls" :key="index">
                  <el-image :src="item" :preview-src-list="scope.row.picUrls"></el-image>
                </el-col>
              </el-row>
            </div>

            <div v-if="scope.row.replyTime">
              <div  class="jl-flex jl-align-center">
                <div style="color:red" class="el-icon-chat-dot-round"> 卖家回复：</div><div class="time">{{scope.row.replyTime}}</div>
              </div>
              <div>{{scope.row.sellerReply}} <el-button type="text" icon="el-icon-edit" circle size="mini" @click="reply(scope.row)"></el-button></div>
            </div>
            <div v-if="!scope.row.replyTime"><br>
              <el-button size="mini" type="primary" @click="reply(scope.row)">立即回复</el-button>
            </div>
          </div>
        </template>
        <template slot="appraises2" slot-scope="scope" v-if="scope.row.listGoodsAppraises.length > 0">
          <div v-for="(item,index) in scope.row.listGoodsAppraises" :key="index">
            <div>
              <div style="color:red" class="el-icon-chat-dot-round"> 买家留言：</div><div class="time">{{item.createTime}}</div>
              <div>{{item.content ? item.content : '此人很懒，什么也没写'}}</div>
              <el-row :gutter="20">
                <el-col :span="6" v-for="(item,index) in item.picUrls" :key="index">
                  <el-image :src="item" :preview-src-list="item.picUrls"></el-image>
                </el-col>
              </el-row>
            </div>

            <div v-if="item.replyTime">
              <div style="color:red" class="el-icon-chat-dot-round"> 卖家回复：</div><div class="time">{{item.replyTime}}</div>
              <div>{{item.sellerReply}} <el-button type="text" icon="el-icon-edit" circle size="mini" @click="reply(item)"></el-button></div>
            </div>
            <div v-if="!item.replyTime"><br>
              <el-button size="mini" type="primary" @click="reply(item)">立即回复</el-button>
            </div>
          </div>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
  import { getPage, getObj, addObj, putObj, delObj } from '@/api/mall/goodsappraises'
  import { tableOption } from '@/const/crud/mall/goodsappraises'
  import { mapGetters } from 'vuex'
  export default {
    name: 'goodsappraises',
    data() {
      return {
        form: {},
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20, // 每页显示多少条
          ascs: [],//升序字段
          descs: 'create_time'//降序字段
        },
        paramsSearch:{},
        tableLoading: false,
        tableOption: tableOption,
        date: [],
        spuId: null
      }
    },
    created() {
      // let spuId = this.$route.query.spuId
      // if(spuId){
      //   this.spuId = spuId
      //   this.tableOption.searchShowBtn = false
      //   this.tableOption.searchShow = false
      //   this.tableOption.dateBtn = false
      // }else{
      //   this.tableOption.searchShowBtn = true
      //   this.tableOption.searchShow = true
      //   this.tableOption.dateBtn = true
      // }
    },
    mounted: function() { },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.permissions['mall:goodsappraises:add'] ? true : false,
          delBtn: this.permissions['mall:goodsappraises:del'] ? true : false,
          editBtn: this.permissions['mall:goodsappraises:edit'] ? true : false,
          viewBtn: this.permissions['mall:goodsappraises:get'] ? true : false
        };
      }
    },
    methods: {
      dateChange(date){
        if(date){
          this.date = date
        }else{
          this.date = []
        }
        this.getPage(this.page)
      },
      reply(row){
        this.$prompt('', '回复内容', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'textarea',
          inputPattern: /[\S]/,
          inputErrorMessage: '不能为空',
          maxlength:200,
        }).then(({ value }) => {
          row.replyTime = this.$moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
          row.sellerReply = value
          putObj(row).then(data => {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.getPage(this.page)
          }).catch(() => {

          })
        }).catch(() => {

        });
      },
      searchChange(params,done){
        params = this.filterForm(params)
        this.paramsSearch = params
        this.page.currentPage = 1
        this.getPage(this.page,params)
        done()
      },
      sortChange(val){
        let prop = val.prop ? val.prop.replace(/([A-Z])/g,"_$1").toLowerCase() : '';
        if(val.order=='ascending'){
          this.page.descs = []
          this.page.ascs = prop
        }else if(val.order=='descending'){
          this.page.ascs = []
          this.page.descs = prop
        }else{
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
          beginTime: this.date[0],
          endTime: this.date[1],
          spuId: this.spuId
        }, params, this.paramsSearch)).then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.page.currentPage = page.currentPage
          this.page.pageSize = page.pageSize
          this.tableLoading = false

          // 加载列表级联数据
          this.$nextTick(()=>{
            this.$refs.crud.dicInit('cascader');
          })
        }).catch(() => {
          this.tableLoading=false
        })
      },
      /**
       * @title 数据删除
       * @param row 为当前的数据
       * @param index 为当前删除数据的行数
       *
       **/
      handleDel: function(row, index) {
        var _this = this
        this.$confirm('是否确认删除此数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
            return delObj(row.id)
          }).then(data => {
          _this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getPage(this.page)
        }).catch(function(err) { })
      },
      /**
       * @title 数据更新
       * @param row 为当前的数据
       * @param index 为当前更新数据的行数
       * @param done 为表单关闭函数
       *
       **/
      handleUpdate: function(row, index, done, loading) {
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
      handleSave: function(row, done, loading) {
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
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
