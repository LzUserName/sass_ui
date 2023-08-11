/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const tableOption = {
  dialogDrag: false,
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  searchShow: false,
  // excelBtn: true,
  printBtn: true,
  viewBtn: true,
  menu: false,
  searchMenuSpan: 6,
  column: [
    {
      label: '店铺',
      prop: 'shopId',
      type: 'select',
      props: {
        label: 'name',
        value: 'id'
      },
      search: true,
      filterable: true,
      editDisabled: true,
      dicUrl: '/mall/shopinfo/list',
      rules: [{
        required: true,
        message: '请选择店铺',
        trigger: 'blur'
      }]
    },
    {
      label: '领券时间',
      prop: 'createTime',
      sortable: true
    },
    {
      label: '用户信息',
      prop: 'userId',
      slot: true
    },
    {
      label: '电子券',
      prop: 'couponId',
      type: 'select',
      slot: true,
      search: true,
      filterable: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/mall/couponinfo/list'
    },
    {
      label: '电子券码',
      prop: 'couponCode',
      search: true,
    },
    {
      label: '有效期',
      prop: 'validEndTime',
      slot: true
    },
    {
      label: '状态',
      prop: 'status',
      type: 'radio',
      search: true,
      dicData: [{
        label: '未使用',
        value: '0'
      }, {
        label: '已使用',
        value: '1'
      }, {
        label: '已过期',
        value: '2'
      }]
    },
    {
      label: '使用时间',
      prop: 'usedTime',
      sortable: true
    },
  ]
}

export const tableOption2 = {
  dialogDrag: false,
  border: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  searchShow: false,
  menu: false,
  addBtn: false,
  refreshBtn: false,
  searchMenuSpan: 6,
  column: [
    {
      label: '店铺',
      prop: 'shopId',
      type: 'select',
      props: {
        label: 'name',
        value: 'id'
      },
      search: true,
      filterable: true,
      editDisabled: true,
      dicUrl: '/mall/shopinfo/list',
      rules: [{
        required: true,
        message: '请选择店铺',
        trigger: 'blur'
      }]
    },
    {
      label: '领券时间',
      prop: 'createTime',
      sortable: true
    },
    {
      label: '电子券',
      prop: 'couponId',
      type: 'select',
      slot: true,
      search: true,
      filterable: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/mall/couponinfo/list'
    },
    {
      label: '电子券码',
      prop: 'couponCode',
      search: true,
    },
    {
      label: '有效期',
      prop: 'validEndTime',
      slot: true
    },
    {
      label: '状态',
      prop: 'status',
      type: 'radio',
      search: true,
      dicData: [{
        label: '未使用',
        value: '0'
      }, {
        label: '已使用',
        value: '1'
      }, {
        label: '已过期',
        value: '2'
      }]
    },
    {
      label: '使用时间',
      prop: 'usedTime',
      sortable: true
    },
  ]
}

export const tableOption3 = {
  dialogDrag: false,
  border: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  searchShow: false,
  menu: false,
  addBtn: false,
  refreshBtn: false,
  searchMenuSpan: 6,
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
      label: '领券时间',
      prop: 'createTime',
      sortable: true
    },
    {
      label: '电子券',
      prop: 'couponId',
      type: 'select',
      slot: true,
      search: true,
      filterable: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/mall/couponinfo/list'
    },
    {
      label: '电子券码',
      prop: 'couponCode',
      search: true,
    },
    {
      label: '有效期',
      prop: 'validEndTime',
      slot: true
    },
    {
      label: '状态',
      prop: 'status',
      type: 'radio',
      search: true,
      dicData: [{
        label: '未使用',
        value: '0'
      }, {
        label: '已使用',
        value: '1'
      }, {
        label: '已过期',
        value: '2'
      }]
    },
    {
      label: '使用时间',
      prop: 'usedTime',
      sortable: true
    },
  ]
}
