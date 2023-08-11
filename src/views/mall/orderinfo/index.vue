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
      <el-tabs v-model="status" type="card" @tab-click="handleClickStatus">
        <el-tab-pane name="-1">
          <span slot="label"><i class="el-icon-s-order"></i> 全部订单</span>
        </el-tab-pane>
        <el-tab-pane name="0">
          <span slot="label"><i class="el-icon-bank-card"></i> 待付款<label
            class="order-num">（{{ status0 }}）</label></span>
        </el-tab-pane>
        <el-tab-pane name="1">
          <span slot="label"><i class="el-icon-refrigerator"></i> 待发货<label
            class="order-num">（{{ status1 }}）</label></span>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label"><i class="el-icon-truck"></i> 待收货<label class="order-num">（{{ status2 }}）</label></span>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label"><i class="el-icon-document"></i> 已完成</span>
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label"><i class="el-icon-brush"></i> 待评价<label class="order-num">（{{ status4 }}）</label></span>
        </el-tab-pane>
        <el-tab-pane name="5">
          <span slot="label"><i class="el-icon-circle-close"></i> 已取消</span>
        </el-tab-pane>
      </el-tabs>
      <avue-crud ref="crud"
                 v-model="form"
                 :page.sync="page"
                 :data="tableData"
                 :permission="permissionList"
                 :table-loading="tableLoading"
                 :option="tableOption"
                 @on-load="getPage"
                 @refresh-change="refreshChange"
                 @row-update="handleUpdate"
                 @row-save="handleSave"
                 @row-del="handleDel"
                 @sort-change="sortChange"
                 @search-change="searchChange"
                 @date-change="dateChange">

        <template slot="menuLeft">
          <el-button type="primary" icon="el-icon-download" size="small" @click.stop="exportExcel()">导出</el-button>
        </template>
        <template slot="menuRight">
          <div style="float: left;margin-right: 10px;">
            <el-date-picker
              v-model="date"
              type="datetimerange"
              :picker-options="pickerOptions"
              @change="dateChange(date)"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="left"
              size="small">
            </el-date-picker>
          </div>
        </template>
        <template slot-scope="scope" slot="status">
          <div style="text-align: left">
            <div class="grid-content">订单状态：
              <el-tag
                :type="scope.row.status=='2' ||scope.row.status=='3' || scope.row.status=='4' ? 'success' : 'danger'"
                effect="dark" size="mini"> {{ scope.row.statusDesc }}
              </el-tag>
            </div>
            <div class="grid-content">支付状态：
              <el-tag :type="scope.row.isPay=='1' ? 'success' : 'danger'"
                      effect="dark" size="mini">{{ scope.row.isPay == '1' ? '已支付' : '未支付' }}
              </el-tag>
            </div>
            <div class="grid-content" v-if="scope.row.appraisesStatus">评价状态：
              <el-tag :type="scope.row.appraisesStatus != '0' ? 'success' : 'danger'"
                      effect="dark" size="mini">{{
                  scope.row.appraisesStatus == '0' ? '未评价' :
                    scope.row.appraisesStatus == '1' ? '已评价' : scope.row.appraisesStatus == '2' ? '已追评' :
                      ''
                }}
              </el-tag>
            </div>
          </div>
        </template>
        <template slot-scope="scope" slot="orderNoForm">
          <el-table
            :data="[form]"
            border
            style="width: 100%; margin-top: 20px; margin-top: 0px">
            <el-table-column
              align="left"
              prop="salesPrice"
              label="订单金额"
              width="200">
              <template slot-scope="scope">
                <div>订单金额：￥{{ scope.row.salesPrice }}</div>
                <div>运费金额：+ ￥{{ scope.row.freightPrice }}</div>
                <div>优惠券抵扣金额：- ￥{{ scope.row.paymentCouponPrice }}</div>
                <div>积分抵扣金额：- ￥{{ scope.row.paymentPointsPrice }}</div>
                <div style="color: red">支付金额：￥{{ scope.row.paymentPrice }}</div>
                <div style="color: red">支付积分：{{ scope.row.paymentPoints }}</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="salesPrice"
              label="订单信息"
              width="230">
              <template slot-scope="scope">
                <div class=" jl-text-left">
                  <div>订单单号:{{ scope.row.orderNo }}</div>
                  <div>订单类型:
                    <el-tag size="mini">
                      {{
                        scope.row.orderType == '0' ? '普通订单' : scope.row.orderType == '1' ? '砍价订单' : scope.row.orderType == '2' ? '拼团订单' : scope.row.orderType == '3' ? '秒杀订单' : ''
                      }}
                    </el-tag>
                  </div>
                  <div>订单来源:
                    <el-tag size="mini">
                      {{
                        scope.row.appType == 'MA' ? '小程序' : scope.row.appType == 'H5-WX' ? '公众号H5' : scope.row.appType == 'H5' ? '普通H5' : scope.row.appType == 'APP' ? 'APP' : scope.row.appType == 'H5-PC' ? 'PC端H5' : ''
                      }}
                    </el-tag>
                  </div>
                  <div style="text-align: left">
                    <div class="grid-content">订单状态：
                      <el-tag
                        :type="scope.row.status=='2' ||scope.row.status=='3' || scope.row.status=='4' ? 'success' : 'danger'"
                        effect="dark" size="mini"> {{ scope.row.statusDesc }}
                      </el-tag>
                    </div>
                    <div class="grid-content">支付状态：
                      <el-tag :type="scope.row.isPay=='1' ? 'success' : 'danger'"
                              effect="dark" size="mini">{{ scope.row.isPay == '1' ? '已支付' : '未支付' }}
                      </el-tag>
                    </div>
                    <div class="grid-content" v-if="scope.row.appraisesStatus">评价状态：
                      <el-tag :type="scope.row.appraisesStatus != '0' ? 'success' : 'danger'"
                              effect="dark" size="mini">{{
                          scope.row.appraisesStatus == '0' ? '未评价' :
                            scope.row.appraisesStatus == '1' ? '已评价' : scope.row.appraisesStatus == '2'
                              ? '已追评' : ''
                        }}
                      </el-tag>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              prop="deliveryWay"
              label="配送方式">
              <template slot-scope="scope">
                <div>
                  <el-tag size="mini">
                    {{ scope.row.deliveryWay == '1' ? '普通快递' : scope.row.deliveryWay == '2' ? '上门自提' : '' }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="paymentType"
              label="支付方式">
              <template slot-scope="scope">
                <div>{{ scope.row.$paymentType }}</div>
                <div>
                  <el-tag size="mini"> {{ scope.row.paymentWay == '2' ? '在线支付' : '' }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="orderTime"
              label="订单时间"
              width="250">
              <template slot-scope="scope">
                <div>创建时间：{{ scope.row.createTime }}</div>
                <div v-if="scope.row.paymentTime">付款时间：{{ scope.row.paymentTime }}</div>
                <div v-if="scope.row.deliveryTime">发货时间：{{ scope.row.deliveryTime }}</div>
                <div v-if="scope.row.receiverTime">收货时间：{{ scope.row.receiverTime }}</div>
                <div v-if="scope.row.closingTime">成交时间：{{ scope.row.closingTime }}</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="transactionId"
              label="支付流水号">
            </el-table-column>
            <el-table-column
              align="center"
              prop="deliveryType"
              label="发货类型">
              <template slot-scope="scope">
                <div v-if="scope.row.deliveryType">
                  <el-tag>
                    {{ scope.row.$deliveryType }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="userMessage"
              label="买家留言">
            </el-table-column>
          </el-table>
        </template>
        <template slot-scope="scope" slot="listOrderItemForm">
          <el-table
            :data="form.listOrderItem"
            border
            style="width: 100%; margin-top: 20px; margin-top: -10px">
            <el-table-column
              align="center"
              prop="picUrl"
              label="图片"
              width="120">
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" class="jl-img-width"/>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="spuName"
              width="300"
              label="商品名">
            </el-table-column>
            <el-table-column
              align="center"
              prop="specInfo"
              label="规格">
            </el-table-column>
            <el-table-column
              align="center"
              prop="salesPrice"
              label="商品单价"
              width="100">
              <template slot-scope="scope">
                ￥{{ scope.row.salesPrice }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="quantity"
              label="数量"
              width="50">
            </el-table-column>
            <el-table-column
              align="center"
              prop="salesPriceTotal"
              label="商品总价"
              width="100">
              <template slot-scope="scope">
                ￥{{ (scope.row.salesPrice * scope.row.quantity).toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="freightPrice"
              label="运费金额"
              width="100">
              <template slot-scope="scope">
                ￥{{ scope.row.freightPrice }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="paymentCouponPrice"
              label="优惠券抵扣金额"
              width="100">
              <template slot-scope="scope">
                ￥{{ scope.row.paymentCouponPrice }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="paymentPointsPrice"
              label="积分抵扣金额"
              width="100">
              <template slot-scope="scope">
                ￥{{ scope.row.paymentPointsPrice }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="salesPriceTotal"
              label="支付金额"
              width="80">
              <template slot-scope="scope">
                <span style="color: red">￥{{ scope.row.paymentPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="salesPriceTotal"
              label="支付积分"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.paymentPoints }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              label="状态"
              width="200">
              <template slot-scope="scope">
                <div class="grid-content" v-if="scope.row.status != '0'">
                  <el-tag type="danger" @click="handleOrderItemStatus(scope.row)">
                    {{ scope.row.statusDesc }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template slot-scope="scope" slot="userIdForm">
          <el-table
            :data="[form.userInfo]"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              prop="nickName"
              label="用户名">
              <template slot-scope="scope">
                <el-avatar icon="el-icon-user-solid" :src="scope.row.headimgUrl"></el-avatar>
                <div>{{ scope.row.nickName }}</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="sex"
              label="性别">
              <template slot-scope="scope">
                <div>{{ scope.row.sex == '1' ? '男' : scope.row.sex == '2' ? '女' : '未知' }}</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="userCode"
              label="用户编号">
            </el-table-column>
            <el-table-column
              align="center"
              prop="pointsCurrent"
              label="当前积分">
            </el-table-column>
          </el-table>
        </template>
        <template slot-scope="scope" slot="orderLogisticsForm" v-if="form.deliveryWay == '1'">
          <div>
            <el-table
              :data="[form.orderLogistics]"
              border
              style="width: 100%">
              <el-table-column
                align="center"
                prop="userName"
                label="姓名">
              </el-table-column>
              <el-table-column
                align="center"
                prop="telNum"
                label="电话">
              </el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="地址">
              </el-table-column>
              <el-table-column
                align="center"
                prop="logisticsDesc"
                label="快递公司">
              </el-table-column>
              <el-table-column
                align="center"
                prop="logisticsNo"
                label="单号">
              </el-table-column>
              <el-table-column
                align="center"
                prop="action"
                width="70"
                label="操作">
                <template slot-scope="scope">
                  <el-button v-if="form.status == '2'" @click="updateOrderLogistics(scope.row)" type="text"
                             size="small">修改
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-card class="box-card">
              <el-timeline :reverse="false"
                           v-if="form.orderLogistics.listOrderLogisticsDetail.length > 0">
                <el-timeline-item
                  v-for="(obj, index) in form.orderLogistics.listOrderLogisticsDetail"
                  :key="index"
                  :timestamp="obj.logisticsTime">
                  {{ obj.logisticsInformation }}
                </el-timeline-item>
              </el-timeline>
              <el-timeline :reverse="false" v-else>
                <el-timeline-item>
                  暂无物流信息
                </el-timeline-item>
              </el-timeline>
            </el-card>
          </div>
        </template>
        <template slot-scope="scope" slot="userNameOrderLogistics">
          <div v-if="scope.row.orderLogistics">{{ scope.row.orderLogistics.userName }}</div>
        </template>
        <template slot-scope="scope" slot="telNumOrderLogistics">
          <div v-if="scope.row.orderLogistics">{{ scope.row.orderLogistics.telNum }}</div>
        </template>
        <template slot-scope="scope" slot="addressOrderLogistics">
          <div v-if="scope.row.orderLogistics">{{ scope.row.orderLogistics.address }}</div>
        </template>
        <template slot-scope="scope" slot="name">
          <div>

            <el-row :gutter="10" v-for="(item, index) in scope.row.listOrderItem" :key="index"
                    style="border:1px solid #eaeaea;padding: 5px">
              <el-col :span="3">
                <img :src="item.picUrl" width="100%"/>
              </el-col>
              <el-col :span="17" style="text-align: left">
                <div class="spu-name">
                  <el-tag type="danger" size="mini" v-if="scope.row.orderType != '0'">
                    {{
                      scope.row.orderType == '1' ? '砍价' : scope.row.orderType == '2' ? '拼团' : scope.row.orderType == '3' ? '秒杀' : ''
                    }}
                  </el-tag>
                  <el-tag v-else size="mini">普通订单</el-tag>
                  {{ item.spuName }}
                </div>
                <div class="spec-info">{{ item.specInfo }}</div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content" style="color:red;">
                  ￥{{ item.paymentPrice }}{{
                    item.paymentCouponPrice ? ' + 优惠券￥' + item.paymentCouponPrice : ''
                  }}{{ item.paymentPoints ? ' + 积分' + item.paymentPoints : '' }}
                </div>
                <div class="grid-content">×{{ item.quantity }}件</div>
                <div class="grid-content" v-if="item.status != '0'">
                  <el-tag type="danger" style="cursor: pointer" @click="handleOrderItemStatus(item)" size="small"><i
                    class="el-icon-edit"></i>{{ item.statusDesc }}
                  </el-tag>
                </div>
                <div class="grid-content" v-if="item.status == '0' && scope.row.isPay == '0' && !scope.row.status">
                  <el-button type="text" @click="handleEditPrice(item)" size="small"><i class="el-icon-edit"></i>改价
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>

        </template>
        <template slot-scope="scope" slot="createTime">
          <div>
            <div class="grid-content"><i class="el-icon-time"></i> {{ scope.row.createTime }}</div>
            <div class="grid-content"><i class="el-icon-s-order"></i> {{ scope.row.orderNo }}</div>
          </div>
        </template>
        <template slot-scope="scope" slot="salesPrice">
          <div style="text-align: left">
            <div class="grid-content">订单金额：￥{{ scope.row.salesPrice }}</div>
            <div class="grid-content">运费金额：+ ￥{{ scope.row.freightPrice }}</div>
            <div class="grid-content">优惠券抵扣金额：- ￥{{ scope.row.paymentCouponPrice }}</div>
            <div class="grid-content">积分抵扣金额：- ￥{{ scope.row.paymentPointsPrice }}</div>
            <div class="grid-content" style="color: red">支付金额：￥{{ scope.row.paymentPrice }}</div>
            <div class="grid-content" style="color: red">支付积分：{{ scope.row.paymentPoints }}</div>
          </div>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button icon="el-icon-edit"
                     size="small"
                     type="text"
                     v-if="permissions['mall:orderinfo:get']"
                     @click="openView(scope.row,scope.index)">订单详情
          </el-button>
          <el-button icon="el-icon-position"
                     size="small"
                     type="text"
                     v-if="permissions['mall:orderinfo:edit'] && scope.row.deliveryWay == '1' && scope.row.status == '1'"
                     @click="showDialogLogistics(scope.row,scope.index)">发货
          </el-button>
          <el-button icon="el-icon-position"
                     size="small"
                     type="text"
                     v-if="permissions['mall:orderinfo:edit'] && scope.row.deliveryWay == '2' && scope.row.status == '1'"
                     @click="takeGoods(scope.row,scope.index)">提货
          </el-button>
          <el-button icon="el-icon-delete"
                     size="small"
                     type="text"
                     v-if="permissions['mall:orderinfo:edit'] && scope.row.isPay == '0' && !scope.row.status"
                     @click="orderCancel(scope.row,scope.index)">取消
          </el-button>
        </template>
      </avue-crud>
      <el-dialog
        title="发货"
        :visible.sync="dialogLogistics"
        width="40%">
        <avue-form :option="logisticsOption" v-model="logisticsForm" @submit="delivery"></avue-form>
      </el-dialog>
      <el-dialog
        title="退款管理"
        :visible.sync="dialogRefunds"
        width="40%">
        <el-card>
          <div slot="header">
            <span>退款信息</span>
          </div>
          <el-row :gutter="10"
                  style="border:1px solid #eaeaea;padding: 5px">
            <el-col :span="3">
              <img :src="orderItemObj.picUrl" width="100%"/>
            </el-col>
            <el-col :span="13" style="text-align: left">
              <div class="spu-name">{{ orderItemObj.spuName }}</div>
              <div class="spec-info">{{ orderItemObj.specInfo }}</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">￥{{ orderItemObj.salesPrice }}</div>
              <div class="grid-content">×{{ orderItemObj.quantity }}件</div>
            </el-col>
          </el-row>
          <div style="margin-top: 20px">
            退款状态：
            <el-tag type="danger" size="small" v-if="orderItemObj.listOrderRefunds">
              {{ orderItemObj.listOrderRefunds[0].statusDesc }}
            </el-tag>
          </div>
          <div style="margin-top: 20px">
            是否退款：
            <el-tag :type="orderItemObj.isRefund == '1' ? 'success' : 'danger'" size="small">
              {{ orderItemObj.isRefund == '1' ? '是' : '否' }}
            </el-tag>
            <el-tooltip style="margin-left: 10px" effect="dark" content="“是”则代表退款金额已成功到达用户账上" placement="top-start">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </div>
          <div style="margin-top: 20px">
            商品数量：x{{ orderItemObj.quantity }}
          </div>
          <div style="margin-top: 20px">
            订单金额：￥{{ (orderItemObj.quantity * orderItemObj.salesPrice).toFixed(2) }}
          </div>
          <div style="margin-top: 20px">
            运费金额：￥{{ orderItemObj.freightPrice }}
          </div>
          <div style="margin-top: 20px; color: red" v-if="orderItemObj.listOrderRefunds">
            退款金额：￥{{ orderItemObj.listOrderRefunds[0].refundAmount }}
          </div>
          <div style="margin-top: 20px; color: red">
            退款积分：{{ orderItemObj.paymentPoints }}
          </div>
          <div style="margin-top: 20px" v-if="orderItemObj.listOrderRefunds">
            退款原因：{{ orderItemObj.listOrderRefunds[0].refundReson }}
          </div>
          <div style="margin-top: 20px" v-if="orderItemObj.listOrderRefunds">
            拒绝原因：{{ orderItemObj.listOrderRefunds[0].refuseRefundReson }}
          </div>
        </el-card>
        <el-card style="margin-top: 10px" v-if="orderRefundsStatusList.length > 0">
          <div slot="header">
            <span>退款操作</span>
          </div>
          <el-form ref="orderRefunds" :model="orderRefunds" :rules="orderRefundsRules" label-width="80px">
            <el-form-item label="退款状态" prop="status">
              <el-select v-model="orderRefunds.status" placeholder="请选择">
                <el-option
                  v-for="item in orderRefundsStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="拒绝原因" prop="refuseRefundReson"
                          v-if="orderRefunds.status == '12' || orderRefunds.status == '22' || orderRefunds.status == '212'">
              <el-input type="textarea" v-model="orderRefunds.refuseRefundReson" maxlength="200"
                        show-word-limit placeholder="请填写拒绝原因"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-loading="orderRefundsSubmitLoading"
                         @click="orderRefundsSubmit(orderItemObj.listOrderRefunds[0])">确认提交
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import {
  getPage,
  getObj,
  addObj,
  putObj,
  delObj,
  editPrice,
  orderCancel,
  takeGoods,
  delivery
} from '@/api/mall/orderinfo'
import {getObj as getOrderItem} from '@/api/mall/orderitem'
import {doOrderRefunds} from '@/api/mall/orderrefunds'
import {tableOption} from '@/const/crud/mall/orderinfo'
import {mapGetters} from 'vuex'

export default {
  name: 'orderinfo',
  data() {
    let moment = this.$moment
    const end = moment().endOf('day')
    return {
      form: {},
      date: [],
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick(picker) {
            const start = moment(end).subtract(1, 'days')
            picker.$emit('pick', [start.format('YYYY-MM-DD HH:mm:ss'), end.format('YYYY-MM-DD HH:mm:ss')]);
          }
        }, {
          text: '昨日',
          onClick(picker) {
            const start = moment(end).subtract(2, 'days')
            const end2 = moment(end).subtract(1, 'days')
            picker.$emit('pick', [start.format('YYYY-MM-DD HH:mm:ss'), end2.format('YYYY-MM-DD HH:mm:ss')]);
          }
        }, {
          text: '最近一周',
          onClick(picker) {
            const start = moment(end).subtract(7, 'days')
            picker.$emit('pick', [start.format('YYYY-MM-DD HH:mm:ss'), end.format('YYYY-MM-DD HH:mm:ss')]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const start = moment(end).subtract(1, 'months')
            picker.$emit('pick', [start.format('YYYY-MM-DD HH:mm:ss'), end.format('YYYY-MM-DD HH:mm:ss')]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const start = moment(end).subtract(3, 'months')
            picker.$emit('pick', [start.format('YYYY-MM-DD HH:mm:ss'), end.format('YYYY-MM-DD HH:mm:ss')]);
          }
        }]
      },
      status: '-1',
      status0: 0,
      status1: 0,
      status2: 0,
      status4: 0,
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条
        ascs: [],//升序字段
        descs: 'create_time'//降序字段
      },
      paramsSearch: {},
      tableLoading: false,
      tableOption: tableOption,
      dialogLogistics: false,
      logisticsForm: {
        row: {},
        deliveryType: null,
        logistics: null,
        logisticsNo: null,
        address: null
      },
      logisticsOption: {
        emptyBtn: false,
        card: true,
        group: [
          {
            icon: 'el-icon-user',
            label: '收货人信息',
            prop: 'group1',
            column: [{
              label: '收货人名字',
              prop: 'userName',
              span: 24,
              readonly: true
            }, {
              label: '电话号码',
              prop: 'telNum',
              span: 24,
              readonly: true
            }, {
              label: '收货地址',
              prop: 'address',
              type: 'textarea',
              span: 24,
              readonly: true
            }]
          }, {
            icon: 'el-icon-truck',
            label: '发货信息',
            prop: 'group2',
            column: [{
              label: '发货类型',
              prop: 'deliveryType',
              type: 'radio',
              dicData: [{
                label: '发物流',
                value: '1'
              }, {
                label: '商家配送',
                value: '2'
              }, {
                label: '虚拟发货',
                value: '3'
              }],
              rules: [{
                required: true,
                message: "请选择发货类型",
                trigger: "blur"
              }]
            }, {
              label: '快递公司',
              prop: 'logistics',
              dicUrl: '/mall/logistics/list',
              span: 24,
              type: 'select',
              filterable: true,
              display: false,
              props: {
                label: 'name',
                value: 'code'
              },
              rules: [{
                required: true,
                message: "请选择快递公司",
                trigger: "blur"
              }]
            },
              {
                label: '快递单号',
                prop: 'logisticsNo',
                span: 24,
                display: false,
                rules: [{
                  required: true,
                  message: "请输入快递单号",
                  trigger: "blur"
                }]
              }]
          }
        ]
      },
      dialogRefunds: false,
      orderItemObj: {},
      orderRefunds: {},
      orderRefundsStatusList: [],
      orderRefundsRules: {
        status: [
          {required: true, message: '请选择退款状态', trigger: 'change'}
        ]
      },
      orderRefundsSubmitLoading: false
    }
  },
  watch: {
    'logisticsForm.deliveryType'(val, oldVal) {
      let column1 = this.logisticsOption.group[1].column[1]
      let column2 = this.logisticsOption.group[1].column[2]
      if (val === '1') {
        column1.display = true
        column2.display = true
      } else {
        column1.display = false
        column2.display = false
      }
    }
  },
  created() {
  },
  mounted: function () {
    this.getCount()
  },
  computed: {
    ...mapGetters(['permissions']),
    permissionList() {
      return {
        addBtn: this.permissions['mall:orderinfo:add'] ? true : false,
        delBtn: this.permissions['mall:orderinfo:del'] ? true : false,
        editBtn: this.permissions['mall:orderinfo:edit'] ? true : false,
        viewBtn: this.permissions['mall:orderinfo:get'] ? true : false
      };
    }
  },
  methods: {
    exportExcel() {
      // 由于订单过于复杂，所以自定义导出
      let data = JSON.parse(JSON.stringify(this.tableData))
      data.map(item => {
        item.shopId = item.$shopId//店铺名
        item.appType = item.$appType//订单来源
        item.orderType = item.$orderType//订单类型
        item.deliveryWay = item.$deliveryWay//配送方式
        item.paymentType = item.$paymentType//付款方式
        item.deliveryType = item.$deliveryType
        item.status = item.statusDesc//状态
        item.isPay = item.isPay == 1 ? '已支付' : '未支付'//支付状态
        if (item.orderLogistics) {//收货信息
          item.userNameOrderLogistics = item.orderLogistics.userName
          item.telNumOrderLogistics = item.orderLogistics.telNum
          item.addressOrderLogistics = item.orderLogistics.address
        }
        let name = ''//购买的商品
        item.listOrderItem.map(item2 => {
          name = name + item2.spuName + ' ×' + item2.quantity + '    \n'
        })
        item.name = name
      })
      this.$Export.excel({
        columns: tableOption.column,
        data: data
      });
    },
    orderRefundsSubmit(orderRefunds) {
      this.orderRefunds.id = orderRefunds.id
      this.$refs['orderRefunds'].validate((valid) => {
        if (valid) {
          this.orderRefundsSubmitLoading = true
          doOrderRefunds(this.orderRefunds).then(res => {
            this.orderRefundsSubmitLoading = false
            getOrderItem(orderRefunds.orderItemId).then(response => {
              let orderItemObj = response.data.data
              this.handleOrderItemStatus(orderItemObj)
            }).catch(() => {
              this.orderRefundsSubmitLoading = false
            })
          }).catch(() => {
            this.orderRefundsSubmitLoading = false
          })
        } else {
          return false
        }
      })
    },
    handleOrderItemStatus(obj) {
      this.dialogRefunds = true
      this.orderRefunds = {}
      this.orderItemObj = {}
      getOrderItem(obj.id).then(response => {
        this.orderItemObj = response.data.data
        let orderRefunds = this.orderItemObj.listOrderRefunds[0]
        this.orderRefundsStatusList = []
        if (obj.status == '1') {//处理退款申请
          if (orderRefunds.status == '1') {
            this.orderRefundsStatusList = [{
              label: '同意退款',
              value: '11'
            }, {
              label: '拒绝退款',
              value: '12'
            }]
          }
        }
        if (obj.status == '2') {//处理退货退款申请
          if (orderRefunds.status == '2') {
            this.orderRefundsStatusList = [{
              label: '等待退货',
              value: '21'
            }, {
              label: '拒绝退货退款',
              value: '22'
            }]
          }
          if (orderRefunds.status == '21') {
            this.orderRefundsStatusList = [{
              label: '收到退货同意退款',
              value: '211'
            }, {
              label: '收到退货拒绝退款',
              value: '212'
            }]
          }
        }
      })
    },
    //改价
    handleEditPrice(obj) {
      this.$prompt('请输入价格', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'number',
        inputPattern: /\S/,
        inputErrorMessage: '请输入价格'
      }).then(({value}) => {
        editPrice({
          id: obj.id,
          paymentPrice: value
        }).then(data => {
          this.getPage(this.page)
        }).catch(() => {

        })
      }).catch(() => {

      })
    },
    handleClickStatus(tab, event) {
      this.status = tab.name
      this.page.currentPage = 1
      this.getPage(this.page)
    },
    openView(row, index) {
      this.tableLoading = true
      getObj(row.id).then(response => {
        row.userInfo = response.data.data.userInfo
        row.app = response.data.data.app
        row.orderLogistics = response.data.data.orderLogistics
        this.$refs.crud.rowView(row, index)
        this.tableLoading = false
      })
    },
    //订单取消
    orderCancel(row, index) {
      var _this = this
      this.$confirm('是否确认取消此订单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return orderCancel(row.id).then(data => {
          _this.$message({
            showClose: true,
            message: '取消成功',
            type: 'success'
          })
          _this.getPage(_this.page)
        }).catch(function (err) {
        })
      })
    },
    showDialogLogistics(row, index, done) {
      this.logisticsForm.row = row
      this.logisticsForm.address = row.orderLogistics.address
      this.logisticsForm.userName = row.orderLogistics.userName
      this.logisticsForm.telNum = row.orderLogistics.telNum
      this.dialogLogistics = true
    },
    updateOrderLogistics(data) {
      let row = this.form
      this.logisticsForm.row = row
      this.logisticsForm.address = row.orderLogistics.address
      this.logisticsForm.userName = row.orderLogistics.userName
      this.logisticsForm.telNum = row.orderLogistics.telNum
      this.logisticsForm.logistics = row.orderLogistics.logistics
      this.logisticsForm.logisticsNo = row.orderLogistics.logisticsNo
      this.dialogLogistics = true
    },
    //提货
    takeGoods(row, index, done) {
      var _this = this
      this.$confirm('是否确认提货此订单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return takeGoods(row.id).then(data => {
          _this.$message({
            showClose: true,
            message: '提货成功',
            type: 'success'
          })
          _this.getPage(_this.page)
        }).catch(function (err) {
        })
      })
    },
    delivery(form, done) {
      let row = this.logisticsForm.row
      row.status = '2',
        row.logistics = form.logistics,
        row.logisticsNo = form.logisticsNo
      row.deliveryType = form.deliveryType

      delivery(row).then(data => {
        this.$message({
          showClose: true,
          message: '发货成功',
          type: 'success'
        })
        row.orderLogistics.logistics = form.logistics
        row.orderLogistics.logisticsNo = form.logisticsNo
        this.logisticsForm.deliveryType = ''
        this.logisticsForm.logistics = ''
        this.logisticsForm.logisticsNo = ''
        this.getPage(this.page)
        this.dialogLogistics = false
        done()
        this.$refs.crud.closeDialog()
      }).catch(() => {
        done()
      })
    },
    dateChange(date) {
      this.page.currentPage = 1
      if (date) {
        this.date = date
      } else {
        this.date = []
      }
      this.getPage(this.page)
    },
    searchChange(params, done) {
      params = this.filterForm(params)
      this.paramsSearch = params
      this.page.currentPage = 1
      this.getPage(this.page, params)
      done()
    },
    sortChange(val) {
      let prop = val.prop ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase() : '';
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
    getCount() {
      let dateQuery = {}
      if (this.date && this.date.length > 0) {
        dateQuery = {
          beginTime: this.date[0],
          endTime: this.date[1]
        }
      }
      getPage({
        ...dateQuery,
        current: 1,
        size: 0,
        status: '0',
      }).then(response => {
        this.status0 = response.data.data.total
      })
      getPage({
        ...dateQuery,
        current: 1,
        size: 0,
        status: '1'
      }).then(response => {
        this.status1 = response.data.data.total
      })
      getPage({
        ...dateQuery,
        current: 1,
        size: 0,
        status: '2'
      }).then(response => {
        this.status2 = response.data.data.total
      })
      getPage({
        ...dateQuery,
        current: 1,
        size: 0,
        status: '4'
      }).then(response => {
        this.status4 = response.data.data.total
      })
    },
    getPage(page, params) {
      this.tableLoading = true
      getPage(Object.assign({
        current: page.currentPage,
        size: page.pageSize,
        descs: this.page.descs,
        ascs: this.page.ascs,
        status: this.status != '-1' ? this.status : null,
        beginTime: this.date[0],
        endTime: this.date[1]
      }, params, this.paramsSearch)).then(response => {
        this.tableData = response.data.data.records
        this.page.total = response.data.data.total
        this.page.currentPage = page.currentPage
        this.page.pageSize = page.pageSize
        this.tableLoading = false
        this.getCount()
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
<style>
.order-num {
  color: red;
  font-weight: bold
}

.spu-name {
  font-size: 13px;
}

.spec-info {
  margin-top: 10px;
  font-size: 12px;
  color: #7b7b7b;
}
</style>
