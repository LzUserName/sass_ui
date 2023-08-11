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
  column: [
    {
      label: '创建时间',
      prop: 'createTime',
      sortable: true,
      display: false,
      rules: [
        {
          required: true,
          message: '请输入创建时间',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '排序字段',
      prop: 'sort',
      type: 'number',
      minRows: 0,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入排序字段',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '名字',
      prop: 'name',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入名字',
          trigger: 'blur'
        },
        {
          max: 20,
          message: '长度在不能超过20个字符'
        },
      ]
    },
    {
      label: '积分数',
      prop: 'posts',
      type: 'number',
      minRows: 0,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入积分数',
          trigger: 'blur'
        },
      ]
    },
  ]
}
