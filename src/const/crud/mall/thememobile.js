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
  labelWidth: 120,
  searchMenuSpan: 6,
  column: [
    {
      label: '主题颜色',
      prop: 'themeColor',
      sortable: true,
      formslot: true,
      rules: [
        {
          required: true,
          message: '请选择主题颜色',
          trigger: 'blur'
        },
        {
          max: 50,
          message: '长度在不能超过10个字符'
        },
      ],
      tip: 'colorUI中的类名'
    },
    {
      label: '背景颜色',
      prop: 'backgroundColor',
      sortable: true,
      formslot: true,
      rules: [
        {
          required: true,
          message: '请选择背景颜色',
          trigger: 'blur'
        },
        {
          max: 50,
          message: '长度在不能超过10个字符'
        },
      ],
      tip: 'colorUI中的类名'
    },
    {
      label: 'tabBar文字颜色',
      prop: 'tabbarColor',
      formslot: true,
      rules: [
        {
          required: true,
          message: '请选择tabBar文字颜色',
          trigger: 'blur'
        },
        {
          max: 50,
          message: '长度在不能超过10个字符'
        },
      ],
      tip: '色值代码，如#ffffff'
    },
    {
      label: 'tabBar文字选中颜色',
      prop: 'tabbarSelectedColor',
      formslot: true,
      rules: [
        {
          required: true,
          message: '请选择tabBar文字选中颜色',
          trigger: 'blur'
        },
        {
          max: 50,
          message: '长度在不能超过10个字符'
        },
      ],
      tip: '色值代码，如#ffffff'
    },
    {
      label: 'tabBar背景色',
      prop: 'tabbarBackgroundColor',
      type: 'color',
      formslot: true,
      rules: [
        {
          required: true,
          message: '请选择tabBar背景色',
          trigger: 'blur'
        },
        {
          max: 50,
          message: '长度在不能超过10个字符'
        },
      ],
      tip: '色值代码，如#ffffff'
    },
    {
      label: 'tabBar上边框颜色',
      prop: 'tabbarBorderStyle',
      type: 'select',
      sortable: true,
      rules: [{
        required: true,
        message: '请选择tabBar上边框颜色',
        trigger: 'blur'
      }],
      dicData: [{
        label: '黑色',
        value: 'black'
      }, {
        label: '白色',
        value: 'white'
      }]
    },
    // {
    //   label: 'tabBar明细设置',
    //   prop: 'tabbarItem'
    // },
  ]
}
