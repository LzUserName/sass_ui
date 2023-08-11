/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const tableOption = {
  dialogDrag: true,
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
      label: "所属店铺",
      prop: "shopId",
      type: "select",
      props: {
        label: "name",
        value: "id"
      },
      search: true,
      editDisabled: true,
      dicUrl: "/mall/shopinfo/list",
      rules: [
        {
          required: true,
          message: "请选择店铺",
          trigger: "blur"
        }
      ]
    },
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
      label: '门店名称',
      prop: 'name',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入门店名称',
          trigger: 'blur'
        },
        {
          max: 200,
          message: '长度在不能超过200个字符'
        },
      ]
    },
    {
      label: '电话号码',
      prop: 'phone',
      rules: [
        {
          required: true,
          message: '请输入电话号码',
          trigger: 'blur'
        },
        {
          max: 15,
          message: '长度在不能超过15个字符'
        },
      ]
    },
    {
      label: '营业时间',
      prop: 'businessHours',
      type: 'timerange',
      valueFormat: 'HH:mm:ss',
      rules: [
        {
          required: true,
          message: '请输入营业时间',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '所在国家',
      prop: 'country',
      sortable: true,
      display: false,
      hide: true,
      rules: [
        {
          max: 64,
          message: '长度在不能超过64个字符'
        },
      ]
    },
    {
      label: '所在省份',
      prop: 'province',
      sortable: true,
      display: false,
      hide: true,
      rules: [
        {
          max: 64,
          message: '长度在不能超过64个字符'
        },
      ]
    },
    {
      label: '所在城市',
      prop: 'city',
      sortable: true,
      display: false,
      hide: true,
      rules: [
        {
          max: 64,
          message: '长度在不能超过64个字符'
        },
      ]
    },
    {
      label: '地址',
      prop: 'address',
      span: 24,
      type: "map",
      formslot: true
    },
    {
      label: '图片',
      prop: 'imgUrl',
      dataType: "string",
      type: "img",
      rules: [
        {
          required: true,
          message: "图片不能为空",
          trigger: "blur"
        }
      ]
    },
  ]
}
