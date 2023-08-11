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
  searchMenuSpan: 6,
  menu: false,
  column: [
    {
      label: '用户信息',
      prop: 'userId',
      sortable: true,
      slot: true,
      width: 260,
      rules: [
        {
          required: true,
          message: '请输入用户编号',
          trigger: 'blur'
        },
        {
          max: 32,
          message: '长度在不能超过32个字符'
        },
      ]
    },
    {
      label: '详细信息',
      prop: 'relationId',
      sortable: true,
      slot: true,
      rules: [
        {
          required: true,
          message: '请输入关联ID：商品类型为商品ID',
          trigger: 'blur'
        },
        {
          max: 32,
          message: '长度在不能超过32个字符'
        },
      ]
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: 200,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入创建时间',
          trigger: 'blur'
        },
      ]
    },
  ]
}
