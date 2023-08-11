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
      label: '创建时间',
      prop: 'createTime',
      sortable: true,
      addDisplay: false,
      editDisplay: false,
      rules: [
        {
          required: true,
          message: '请输入创建时间',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '最后更新时间',
      prop: 'updateTime',
      sortable: true,
      addDisplay: false,
      editDisplay: false,
      rules: [
        {
          required: true,
          message: '请输入最后更新时间',
          trigger: 'blur'
        },
      ]
    },
    {
      label: '活动名称',
      prop: 'activeName',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        },
        {
          max: 30,
          message: '长度在不能超过30个字符'
        },
      ]
    },
    {
      label: '活动图片',
      prop: 'picUrl',
      width: 450,
      dataType: 'array',
      slot: true,
      formslot: true,
      span: 24,
      rules: [{
        type: 'array',
        required: true,
        message: '图片不能为空',
        trigger: 'change'
      }]
    },
    {
      label: '时间范围',
      prop: 'validTime',
      type: 'datetimerange',
      editDisabled: true,
      hide: true,
      span: 24,
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      rules: [{
        type: 'array',
        required: true,
        message: '请选择时间范围',
        trigger: 'change'
      }],
      tip: '活动有效时间段'
    },
    {
      label: '是否启用',
      prop: 'enable',
      sortable: true,
      type: 'radio',
      rules: [{
        required: true,
        message: '请选择启用状态',
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
      label: '适用类型',
      prop: 'suitType',
      sortable: true,
      type: 'radio',
      rules: [
        {
          required: true,
          message: '请输入适用类型1、全部商品；2、指定商品可用；3、指定分类；4、指定店铺',
          trigger: 'blur'
        }
      ],
      dicData: [{
        label: '全部商品',
        value: '1'
      }, {
        label: '指定商品可用',
        value: '2'
      }, {
        label: '指定分类',
        value: '3'
      }, {
        label: '指定店铺',
        value: '4'
      }]
    },
    {
      label: '关联商品',
      prop: 'listActiveBackgroundRelation',
      formslot: true,
      display: false,
      hide: true,
      span: 24
    },
  ]
}
