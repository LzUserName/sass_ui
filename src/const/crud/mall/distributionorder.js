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
      label: "店铺",
      prop: "shopId",
      type: "select",
      search: true,
      filterable: true,
      props: {
        label: "name",
        value: "id"
      },
      dicUrl: "/mall/shopinfo/list",
      display: false
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
      label: '分销级别',
      prop: 'distributionLevel',
      search: true,
      type: "radio",
      sortable: true,
      dicData: [
        {
          label: "一级分销",
          value: "1"
        },
        {
          label: "二级分销",
          value: "2"
        }
      ],
    },
    {
      label: '分销员ID',
      prop: 'distributionUserId',
      search: true,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入分销员ID',
          trigger: 'blur'
        },
        {
          max: 31,
          message: '长度在不能超过31个字符'
        },
      ]
    },
    {
      label: '订单id',
      prop: 'orderId',
      search: true,
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入订单id',
          trigger: 'blur'
        },
        {
          max: 32,
          message: '长度在不能超过32个字符'
        },
      ]
    },
    {
      label: '用户id',
      prop: 'userId',
      search: true,
      sortable: true,
      rules: [
        {
          max: 31,
          message: '长度在不能超过31个字符'
        },
      ]
    },
    {
      label: '返佣金额',
      prop: 'commission',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入返佣金额',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '佣金状态',
      prop: 'commissionStatus',
      search: true,
      sortable: true,
      type: "radio",
      dicData: [
        {
          label: "冻结",
          value: "1"
        },
        {
          label: "解冻",
          value: "2"
        }
      ],
    },
  ]
}

export const tableOption2 = {
  dialogDrag: false,
  border: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  refreshBtn: false,
  columnBtn: false,
  addBtn: false,
  delBtn: false,
  searchMenuSpan: 6,
  dateBtn: true,
  column: [
    {
      label: '创建时间',
      prop: 'createTime',
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
      label: '订单编号',
      prop: 'orderId',
      slot: true,
      rules: [
        {
          required: true,
          message: '请输入订单id',
          trigger: 'blur'
        },
        {
          max: 32,
          message: '长度在不能超过32个字符'
        },
      ],
      display: false
    },
    {
      label: '用户信息',
      prop: 'userId',
      slot: true,
      width: 220,
      rules: [
        {
          max: 31,
          message: '长度在不能超过31个字符'
        },
      ],
      display: false
    },
    {
      label: '返佣金额',
      prop: 'commission',
      rules: [
        {
          required: true,
          message: '请输入返佣金额',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '佣金状态',
      prop: 'commissionStatus',
      type: 'radio',
      search: true,
      rules: [
        {
          required: true,
          message: '请输入佣金状态（1：冻结；2：解冻）',
          trigger: 'blur'
        },
        {
          max: 2,
          message: '长度在不能超过2个字符'
        },
      ],
      dicData: [{
        label: '冻结',
        value: '1'
      }, {
        label: '解冻',
        value: '2'
      }]
    },
  ]
}
