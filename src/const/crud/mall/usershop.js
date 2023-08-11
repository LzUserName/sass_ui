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
  addBtn: false,
  delBtn: false,
  searchMenuSpan: 6,
  expand: true,
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
      label: '店铺用户编号',
      prop: 'userCode',
      search: true,
      editDisplay: false
    },
    {
      label: '商城用户',
      prop: 'userId',
      slot: true,
      editDisplay: false
    },
    {
      label: '创建时间',
      prop: 'createTime',
      sortable: true,
      editDisplay: false
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
