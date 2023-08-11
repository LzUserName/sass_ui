/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
import {getCount} from '@/api/mall/shopinfo'

const validateName = (rule, value, callback) => {
  if (window.openType === 'edit'){
    callback()
  }else{
    getCount({
      name: value
    }).then(response => {
      let data = response.data.data
      if (data > 0) {
        callback(new Error('店铺名字已经存在'))
      } else {
        callback()
      }
    })
  }
}

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
  labelWidth: 140,
  column: [
    {
      label: '店铺Logo',
      prop: 'imgUrl',
      width: 160,
      dataType: 'array',
      slot: true,
      formslot: true,
      row:true,
      rules: [{
        type: 'array',
        required: true,
        message: '图片不能为空',
        trigger: 'change'
      }]
    },
    {
      label: '店铺名',
      prop: 'name',
      editDisabled: true,
      rules: [
        {
          required: true,
          message: '请输入店铺名',
          trigger: 'blur'
        },
        {
          max: 100,
          message: '长度在不能超过100个字符'
        },{
          validator: validateName,
          trigger: 'blur'
        }
      ]
    },
    {
      label: '电话号码',
      prop: 'phone',
      sortable: true,
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
      label: '地址',
      prop: 'address',
      span: 24,
      formslot: true
    },
    {
      label: '是否启用',
      prop: 'enable',
      type: 'radio',
      search: true,
      sortable: true,
      span: 24,
      slot: true,
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
      label: '详细介绍',
      prop: 'detail',
      type: 'textarea',
      minRows: 1,
      sortable: true,
      hide: true,
      row:true,
      rules: [
        {
          max: 225,
          message: '长度在不能超过225个字符'
        },
      ]
    },
    {
      label: '微信特约商户号',
      labelTip: '提示：如果是微信服务商收款模式则必需配置。',
      prop: 'wxMchId',
      hide: true,
      rules: [
        {
          max: 32,
          message: '长度在不能超过32个字符'
        },
      ],
      tip: '微信服务商收款必配，微信支付服务商下的特约商户号'
    },
    {
      label: '支付宝Key',
      labelTip: '提示：如果是支付宝服务商收款模式则必需配置。',
      prop: 'aliAuthToken',
      hide: true,
      rules: [
        {
          max: 64,
          message: '长度在不能超过32个字符'
        },
      ],
      tip: '支付宝服务商收款必配，支付宝第三方应用商户授权的app_auth_token'
    }
  ]
}
