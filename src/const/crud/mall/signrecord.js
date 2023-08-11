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
  labelWidth: 200,
  column: [
    {
      label: '用户',
      prop: 'userId',
      slot: true
    },
    {
      label: '连续天数',
      prop: 'continuDays',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入连续天数',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '累计天数',
      prop: 'cumulateDays',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入累计天数',
          trigger: 'blur'
        },
      ]
    },
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
      ]
    },
    {
      label: '最后签到时间',
      prop: 'updateTime',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入最后更新（签到）时间',
          trigger: 'blur'
        },
      ]
    },
  ]
}
