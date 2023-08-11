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
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  excelBtn: false,
  printBtn: false,
  delBtn: false,
  addBtn: false,
  viewBtn: false,
  editBtn: false,
  dateBtn: true,
  menu: false,
  searchMenuSpan: 6,
  column: [
    {
      label: '店铺',
      prop: 'shopId',
      type: 'select',
      search: true,
      width: 200,
      filterable: true,
      display: false,
      cascaderItem: ['spuId'],
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/mall/shopinfo/list'
    },
    {
      label: '商品',
      prop: 'spuId',
      type: 'select',
      search: true,
      display: false,
      width: 260,
      hide: true,
      filterable: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/mall/goodsspu/list?shopId={{key}}'
    },
    {
      label: '用户',
      prop: 'nickName',
      editDisplay: false,
      width: 110,
      slot:true,
    },
    {
      label: '评价时间',
      prop: 'createTime',
      sortable: true,
      hide: true,
      width: 150,
      display: false
    },
    {
      label: '商品信息',
      prop: 'specInfo',
      width: 230,
      slot: true,
      editDisplay: false,
      align: 'left'
    },
    {
      label: '订单信息',
      prop: 'orderItem',
      width: 230,
      slot: true,
      editDisplay: false,
      align: 'left'
    },
	  {
      label: '首评',
      prop: 'appraises',
      sortable:true,
      slot:true,
      editDisplay: false,
      align: 'left'
    },
	  {
      label: '追评',
      prop: 'appraises2',
      width: 190,
      slot:true,
      formslot: true,
      align: 'left'
    }
  ]
}
