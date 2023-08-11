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
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入创建时间',
          trigger: 'blur'
        },
      ],
      display: false
    },
    {
      label: '用户信息',
      prop: 'userId',
      display: false,
      slot: true,
      rules: [
        {
          required: true,
          message: '请输入商城用户ID',
          trigger: 'blur'
        },
        {
          max: 31,
          message: '长度在不能超过31个字符'
        },
      ]
    },
    {
      label: '累计佣金金额',
      prop: 'commissionTotal',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入累计佣金金额',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '已提现佣金金额',
      prop: 'commissionWithdrawal',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入已提现佣金金额',
          trigger: 'blur'
        },
      ]
    },
  ]
}
