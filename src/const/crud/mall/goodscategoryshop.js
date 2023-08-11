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
  viewBtn: true,
  searchMenuSpan: 6,
  column: [
    {
      label: '父分类',
      prop: 'parentId',
      type: 'tree',
      hide: true,
      props: {
        label: 'name',
        value: 'id'
      },
      rules: [{
        required: true,
        message: '请选择父分类',
        trigger: 'change'
      }]
    },
    {
      label: '名称',
      prop: 'name',
      align: 'left',
      sortable: true,
      rules: [{
        required: true,
        message: '名称不能为空',
        trigger: 'blur'
      },{
          max: 16,
          message: '长度在不能超过16个字符'
        },
      ]
    },
    {
      label: '是否显示',
      prop: 'enable',
      type: 'radio',
      sortable: true,
      span: 24,
      slot: true,
      rules: [{
        required: true,
        message: '请选择显示状态',
        trigger: 'blur'
      }],
      dicData: [{
        label: '关闭',
        value: '0'
      }, {
        label: '启用',
        value: '1'
      }]
    },
    {
      label: '排序',
      type: 'number',
      prop: 'sort',
      rules: [{
        required: true,
        message: '排序不能为空',
        trigger: 'blur'
      }]
    },
  ]
}
