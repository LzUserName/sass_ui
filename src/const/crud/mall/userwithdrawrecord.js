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
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  searchShow: false,
  excelBtn: true,
  printBtn: true,
  viewBtn: true,
  addBtn: false,
  searchMenuSpan: 6,
  column: [
    {
      label: '创建时间',
      prop: 'createTime',
      display: false,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入创建时间',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '最后更新时间',
      prop: 'updateTime',
      display: false,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入最后更新时间',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '商城用户',
      prop: 'userId',
      sortable: true,
      slot: true,
      display: false,
      width: 220
    },
    {
      label: '提现类型',
      prop: 'withdrawType',
      sortable: true,
      type: 'radio',
      dicData: [{
        label: '分销拥金提现',
        value: '1'
      }],
      rules: [
        {
          required: true,
          message: '请输入提现类型（1：分销拥金提现）',
          trigger: 'blur'
        },
        {
          max: 2,
          message: '长度在不能超过2个字符'
        },
      ]
    },
    {
      label: '申请金额',
      prop: 'applyAmount',
      slot: true,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入申请金额',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '收款方式',
      prop: 'paymentMethod',
      sortable: true,
      type: 'radio',
      dicData: [{
        label: '银行卡',
        value: '1'
      }],
      rules: [
        {
          required: true,
          message: '请输入收款方式（1：银行卡）',
          trigger: 'blur'
        },
        {
          max: 2,
          message: '长度在不能超过2个字符'
        },
      ]
    },
    {
      label: '审核状态',
      prop: 'status',
      sortable: true,
      display: false,
      slot: true,
      dicData: [{
        label: '审核中',
        value: '0'
      },{
        label: '审核通过',
        value: '1'
      },{
        label: '审核不通过',
        value: '2'
      }],
      rules: [
        {
          required: true,
          message: '请输入审核状态（0：审核中；1：审核通过；2：审核不通过；3：转账成功；4：转账失败）',
          trigger: 'blur'
        },
        {
          max: 2,
          message: '长度在不能超过2个字符'
        },
      ]
    },
    {
      label: '收款明细',
      prop: 'paymentDetail',
      sortable: true,
      type: 'textarea',
      rules: [
        {
          required: true,
          message: '请输入收款明细',
          trigger: 'blur'
        },
        {
          max: 1024,
          message: '长度在不能超过1024个字符'
        },
      ]
    },
    {
      label: '审核明细',
      prop: 'verifyDetail',
      sortable: true,
      display: false,
      type: 'textarea',
      rules: [
        {
          max: 50,
          message: '长度在不能超过50个字符'
        },
      ]
    },
    {
      label: '备注',
      prop: 'remarks',
      sortable: true,
      rules: [
        {
          max: 500,
          message: '长度在不能超过500个字符'
        },
      ]
    },
  ]
}
