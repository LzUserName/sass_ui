/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const tableOption = {
  // dateBtn:true,
  dialogType: 'drawer',
  dialogWidth: '80%',
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuWidth: 150,
  menuType: 'text',
  searchShow: true,
  // excelBtn: true,
  printBtn: true,
  editBtn: false,
  delBtn: false,
  addBtn: false,
  viewBtn: false,
  defaultExpandAll: true,
  searchMenuSpan: 6,
  dateBtn: false,
  column: [
    {
      label: '店铺',
      prop: 'shopId',
      type: 'select',
      search: true,
      filterable: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/mall/shopinfo/list',
      display: false
    },
    {
      label: '用户id',
      prop: 'userId',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '是否支付',
      prop: 'isPay',
      type: 'radio',
      hide: true,
      search: true,
      display: false,
      dicData: [{
        label: '是',
        value: '1'
      },
        {
          label: '否',
          value: '0'
        }]
    },
    {
      label: '订单编号',
      prop: 'orderNo',
      search: true,
      hide: true,
      display: false
    },
    {
      label: '订单信息',
      prop: 'name',
      width: 400,
      slot: true,
      display: false,
      search: true,
      merges: [ {s: {r: 0, c: 0}, e: {r: 0, c: 5}}]
    },
    {
      label: '时间/订单编号',
      prop: 'createTime',
      sortable: true,
      width: 170,
      align: 'left',
      slot: true,
      display: false
    },

    {
      label: '订单类型',
      prop: 'orderType',
      search: true,
      type: 'radio',
      sortable: true,
      display: false,
      hide: true,
      dicData: [{
        label: '普通订单',
        value: '0'
      }, {
        label: '砍价订单',
        value: '1'
      }, {
        label: '拼团订单',
        value: '2'
      }, {
        label: '秒杀订单',
        value: '3'
      }]
    },
    {
      label: '来源应用',
      prop: 'appId',
      sortable: true,
      type: 'select',
      filterable: true,
      hide: true,
      props: {
        label: 'name',
        value: 'id'
      },
      search: true,
      dicUrl: '/weixin/wxapp/list',
      display: false
    },
    {
      label: '配送方式',
      prop: 'deliveryWay',
      search: true,
      width: 100,
      type: 'radio',
      sortable: true,
      display: false,
      dicData: [{
        label: '普通快递',
        value: '1'
      }, {
        label: '上门自提',
        value: '2'
      }]
    },
    {
      label: '状态',
      prop: 'status',
      type: 'radio',
      sortable: true,
      slot: true,
      width: 150,
      display: false
    },
    {
      label: '订单金额(￥)',
      prop: 'salesPrice',
      sortable: true,
      slot: true,
      width: 200,
      display: false
    },
    {
      label: '付款时间',
      prop: 'paymentTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '付款方式',
      prop: 'paymentType',
      search: true,
      type: 'radio',
      sortable: true,
      display: false,
      dicData: [{
        label: '微信支付',
        value: '1'
      },{
        label: '支付宝',
        value: '2'
      }]
    },
    {
      label: '来源',
      prop: 'appType',
      search: true,
      type: 'radio',
      sortable: true,
      display: false,
      dicData: [{
        label: '普通H5',
        value: 'H5'
      }, {
        label: '小程序',
        value: 'MA'
      }, {
        label: '公众号H5',
        value: 'H5-WX'
      }, {
        label: 'APP',
        value: 'APP'
      }, {
        label: 'PC端H5',
        value: 'H5-PC'
      }]
    },
    {
      label: '收货人',
      prop: 'userNameOrderLogistics',
      hide: true,
      slot: true,
      display: false
    },
    {
      label: '收货人电话',
      prop: 'telNumOrderLogistics',
      hide: true,
      display: false
    },
    {
      label: '收货地址',
      prop: 'addressOrderLogistics',
      hide: true,
      display: false
    },
    {
      label: '发货类型',
      prop: 'deliveryType',
      type: 'radio',
      sortable: true,
      display: false,
      search: true,
      dicData: [{
        label: '发物流',
        value: '1'
      }, {
        label: '商家配送',
        value: '2'
      }, {
        label: '虚拟发货',
        value: '3'
      }]
    },
    {
      label: '发货时间',
      prop: 'deliveryTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '收货时间',
      prop: 'receiverTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '成交时间',
      prop: 'closingTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '最后更新时间',
      prop: 'updateTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '备注',
      prop: 'remark',
      hide: true,
      display: false
    },
    {
      label: '订单id',
      prop: 'id',
      search: true,
      display: false
    },
  ],
  group: [
    {
      icon: 'el-icon-s-order',
      label: '基本信息',
      prop: 'group1',
      column: [
        {
          label: '店铺',
          prop: 'shopId',
          type: 'select',
          filterable: true,
          props: {
            label: 'name',
            value: 'id'
          },
          editDisabled: true,
          dicUrl: '/mall/shopinfo/list',
          rules: [{
            required: true,
            message: '请选择店铺',
            trigger: 'blur'
          }]
        },
        {
          prop: 'orderNo',
          formslot: true,
          span: 24
        }]
    }, {
      icon: 'el-icon-user',
      label: '用户详情',
      prop: 'group2',
      column: [{
        prop: 'userId',
        formslot: true,
        span: 24
      }]
    }, {
      icon: 'el-icon-goods',
      label: '商品信息',
      prop: 'group3',
      column: [
        {
          prop: 'listOrderItem',
          formslot: true,
          span: 24
        }
      ]
    }, {
      icon: 'el-icon-location-outline',
      label: '收货信息',
      prop: 'group4',
      column: [{
        prop: 'orderLogistics',
        formslot: true,
        span: 24
      }]
    }]
}

export const tableOption2 = {
  // dateBtn:true,
  dialogType: 'drawer',
  dialogWidth: '80%',
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuWidth: 150,
  menu: false,
  searchShow: false,
  editBtn: false,
  delBtn: false,
  addBtn: false,
  viewBtn: false,
  defaultExpandAll: true,
  refreshBtn: false,
  searchMenuSpan: 6,
  dateBtn: true,
  column: [
    {
      label: '店铺',
      prop: 'shopId',
      type: 'select',
      search: true,
      filterable: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/mall/shopinfo/list',
      display: false
    },
    {
      label: '用户id',
      prop: 'userId',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '是否支付',
      prop: 'isPay',
      type: 'radio',
      hide: true,
      search: true,
      display: false,
      dicData: [{
        label: '是',
        value: '1'
      },
        {
          label: '否',
          value: '0'
        }]
    },
    {
      label: '订单编号',
      prop: 'orderNo',
      search: true,
      hide: true,
      display: false
    },
    {
      label: '商品信息',
      prop: 'name',
      width: 500,
      slot: true,
      display: false
    },
    {
      label: '时间/订单编号',
      prop: 'createTime',
      sortable: true,
      width: 250,
      slot: true,
      display: false
    },
    {
      label: '订单来源',
      prop: 'appType',
      search: true,
      type: 'radio',
      sortable: true,
      display: false,
      dicData: [{
        label: '普通H5',
        value: 'H5'
      }, {
        label: '小程序',
        value: 'MA'
      }, {
        label: '公众号H5',
        value: 'H5-WX'
      }, {
        label: 'APP',
        value: 'APP'
      }, {
        label: 'PC端H5',
        value: 'H5-PC'
      }]
    },
    {
      label: '来源应用',
      prop: 'appId',
      sortable: true,
      type: 'select',
      filterable: true,
      props: {
        label: 'name',
        value: 'id'
      },
      search: true,
      dicUrl: '/weixin/wxapp/list'
    },
    {
      label: '状态',
      prop: 'status',
      type: 'radio',
      sortable: true,
      slot: true,
      width: 200,
      display: false
    },
    {
      label: '订单金额(￥)',
      prop: 'salesPrice',
      sortable: true,
      slot: true,
      width: 200,
      display: false
    },
    {
      label: '付款时间',
      prop: 'paymentTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '发货类型',
      prop: 'deliveryType',
      sortable: true,
      hide: true,
      display: false,
      dicData: [{
        label: '发物流',
        value: '1'
      }, {
        label: '商家配送',
        value: '2'
      }, {
        label: '虚拟发货',
        value: '3'
      }]
    },
    {
      label: '发货时间',
      prop: 'deliveryTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '收货时间',
      prop: 'receiverTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '成交时间',
      prop: 'closingTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '最后更新时间',
      prop: 'updateTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '备注',
      prop: 'remark',
      hide: true,
      display: false
    }
  ]
}

export const tableOption3 = {
  // dateBtn:true,
  dialogType: 'drawer',
  dialogWidth: '80%',
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuWidth: 150,
  menu: false,
  searchShow: false,
  editBtn: false,
  delBtn: false,
  addBtn: false,
  viewBtn: false,
  defaultExpandAll: true,
  refreshBtn: false,
  searchMenuSpan: 6,
  dateBtn: true,
  column: [
    {
      label: '店铺',
      prop: 'shopId',
      type: 'select',
      filterable: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/mall/shopinfo/list',
      display: false
    },
    {
      label: '用户id',
      prop: 'userId',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '是否支付',
      prop: 'isPay',
      type: 'radio',
      hide: true,
      search: true,
      display: false,
      dicData: [{
        label: '是',
        value: '1'
      },
        {
          label: '否',
          value: '0'
        }]
    },
    {
      label: '订单编号',
      prop: 'orderNo',
      search: true,
      hide: true,
      display: false
    },
    {
      label: '商品信息',
      prop: 'name',
      width: 500,
      slot: true,
      display: false
    },
    {
      label: '时间/订单编号',
      prop: 'createTime',
      sortable: true,
      width: 250,
      slot: true,
      display: false
    },
    {
      label: '订单来源',
      prop: 'appType',
      search: true,
      type: 'radio',
      sortable: true,
      display: false,
      dicData: [{
        label: '普通H5',
        value: 'H5'
      }, {
        label: '小程序',
        value: 'MA'
      }, {
        label: '公众号H5',
        value: 'H5-WX'
      }, {
        label: 'APP',
        value: 'APP'
      }, {
        label: 'PC端H5',
        value: 'H5-PC'
      }]
    },
    {
      label: '来源应用',
      prop: 'appId',
      sortable: true,
      type: 'select',
      filterable: true,
      props: {
        label: 'name',
        value: 'id'
      },
      search: true,
      dicUrl: '/weixin/wxapp/list'
    },
    {
      label: '状态',
      prop: 'status',
      type: 'radio',
      sortable: true,
      slot: true,
      width: 200,
      display: false
    },
    {
      label: '订单金额(￥)',
      prop: 'salesPrice',
      sortable: true,
      slot: true,
      width: 200,
      display: false
    },
    {
      label: '付款时间',
      prop: 'paymentTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '发货类型',
      prop: 'deliveryType',
      sortable: true,
      hide: true,
      display: false,
      dicData: [{
        label: '发物流',
        value: '1'
      }, {
        label: '商家配送',
        value: '2'
      }, {
        label: '虚拟发货',
        value: '3'
      }]
    },
    {
      label: '发货时间',
      prop: 'deliveryTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '收货时间',
      prop: 'receiverTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '成交时间',
      prop: 'closingTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '最后更新时间',
      prop: 'updateTime',
      sortable: true,
      hide: true,
      display: false
    },
    {
      label: '备注',
      prop: 'remark',
      hide: true,
      display: false
    }
  ]
}
