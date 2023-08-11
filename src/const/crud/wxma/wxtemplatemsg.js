/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const attributeDicData = [
  {
      label: '订单编号',
      value: 'order.orderNo'
    },{
      label: '订单时间',
      value: 'order.createTime'
    },{
      label: '订单付款时间',
      value: 'order.paymentTime'
    },{
      label: '订单发货时间',
      value: 'order.deliveryTime'
    },{
      label: '订单收货时间',
      value: 'order.receiverTime'
    },{
      label: '订单发成交时间',
      value: 'order.closingTime'
    },{
      label: '订单销售价',
      value: 'order.salesPrice'
    },{
      label: '订单支付金额',
      value: 'order.paymentPrice'
    },{
      label: '订单名',
      value: 'order.name'
    },{
      label: '订单状态',
      value: 'order.statusDesc'
    },{
      label: '订单类型',
      value: 'order.orderTypeDesc'
    },{
      label: '运费金额',
      value: 'order.freightPrice'
    },{
      label: '支付积分',
      value: 'order.paymentPoints'
    },{
      label: '收件人电话',
      value: 'orderLogistics.telNum'
    },{
      label: '收件人名字',
      value: 'orderLogistics.userName'
    },{
      label: '物流地址',
      value: 'orderLogistics.address'
    },{
      label: '物流商家',
      value: 'orderLogistics.logisticsDesc'
    },{
      label: '物流单号',
      value: 'orderLogistics.logisticsNo'
    }]

export const tableOption = {
    dialogDrag: false,
    border: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    menuType: 'text',
    searchShow: false,
    excelBtn: true,
    printBtn: true,
    addBtn: false,
    viewBtn: true,
    column: [
        {
            label: '是否启用',
            prop: 'enable',
            type: 'radio',
            search: true,
            sortable: true,
            rules: [{
                required: true,
                message: '请选择启用状态',
                trigger: 'blur'
            }],
            dicData: [{
                label: '关闭',
                value: '0'
            },{
                label: '启用',
                value: '1'
            }]
        },
        {
            label: '用途',
            prop: 'useType',
            type: 'select',
            search: true,
            sortable: true,
            formslot: true,
            rules: [{
                required: true,
                message: '请选择用途',
                trigger: 'blur'
            }],
            dicData: [{
                label: '订单支付成功',
                value: '2'
            },{
                label: '订单发货提醒',
                value: '3'
            }]
        },
        {
            label: '模板ID',
            prop: 'priTmplId',
            rules: [{
                required: true,
                message: '请输入模板ID',
                trigger: 'blur'
            }],
        },
        {
            label: '模版标题',
            prop: 'title',
            rules: [{
                required: true,
                message: '请输入模版标题',
                trigger: 'blur'
            }],
        },
      {
        label: '模版内容',
        prop: 'content',
        type: 'dynamic',
        hide: true,
        span: 24,
        rules: [{
          required: true,
          message: '请输入模版内容',
          trigger: 'blur'
        }],
        children: {
          align: 'center',
          headerAlign: 'center',
          column: [{
            label: '名称',
            prop: 'name',
            rules: [{
              required: true,
              message: '请输入模版标题',
              trigger: 'blur'
            }]
          },{
            label: '对应属性（可直接输入固定信息）',
            prop: 'attribute',
            type: 'select',
            filterable: true,
            allowCreate: true,
            rules: [{
              required: true,
              message: '请选择对应属性',
              trigger: 'blur'
            }],
            dicData: attributeDicData
          }
          ]
        }
      },
    ]
}
