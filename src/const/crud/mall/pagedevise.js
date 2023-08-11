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
  addBtn:false,
  editBtn:false,
  searchShow: false,
  viewBtn: false,
  direction:'rtl',
  searchMenuSpan: 6,
  column: [
    {
      label: '应用端',
      prop: 'clientType',
      type: 'select',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请选择应用类型',
          trigger: 'blur'
        },
      ],
      formslot: true,
      dicData: [{
        label: '小程序',
        value: 'MA'
      }, {
        label: 'H5',
        value: 'H5'
      }, {
        label: 'APP',
        value: 'APP'
      }]
    },
    // {
    //   label: '是否启用',
    //   prop: 'enable',
    //   type: 'radio',
    //   sortable: true,
    //   slot: true,
    //   display: false,
    //   dicData: [{
    //     label: '关闭',
    //     value: '0'
    //   }, {
    //     label: '启用',
    //     value: '1'
    //   }]
    // },

    {
      prop: 'pageComponent',
      hide: true,
      span: 24,
      formslot: true
    },
  ]
}
