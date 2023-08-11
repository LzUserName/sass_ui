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
  addBtn: false,
  labelWidth: 150,
  column: [

    {
      label: '支付类型',
      prop: 'type',
      search: true,
      sortable: true,
      editDisplay: false,
      slot: true,
      formslot: true,
      rules: [{
        required: true,
        message: '请选择支付类型',
        trigger: 'blur'
      }]
    },
    {
      label: '收款模式',
      prop: 'model',
      type: 'select',
      value: '2',
      rules: [{
        required: true,
        message: '请选择收款模式',
        trigger: 'blur'
      }],
      dicData: [{
        label: '服务商',
        value: '1'
      }, {
        label: '普通商户',
        value: '2'
      }],
      control: (val, form) => {//控制
        if (val == '1') {
          return {
            apiV3Key: {
              display: form.type==2?false:true
            },
            privateKeyPath: {
              display: true
            },
            certSerialNo: {
              display: form.type==2?false:true
            },
            privateCertPath: {
              display: true
            },
          }
        } else {
          return {
            apiV3Key: {
              display: false
            },
            certSerialNo: {
              display: false
            },
            privateKeyPath: {
              display: form.type==2?true:false
            },
            privateCertPath: {
              display: form.type==2?true:false
            },
          }
        }
      },
    },
    {
      label: 'appId',
      prop: 'appId',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入appId',
          trigger: 'blur'
        },
        {
          max: 64,
          message: '长度在不能超过64个字符'
        },
      ],
      tip: '支付平台申请，不要乱填，否则商城将无法下单'
    },
    {
      label: '商户号',
      prop: 'mchId',
      sortable: true,
      hide: true,
      display: false,
      rules: [
        {
          required: true,
          message: '请输入商户号',
          trigger: 'blur'
        },
        {
          max: 64,
          message: '长度在不能超过64个字符'
        },
      ],
      tip: '支付平台申请，不要乱填，否则商城将无法下单'
    },
    {
      label: '密钥',
      prop: 'mchKey',
      type: 'password',
      hide: true,
      rules: [
        {
          required: true,
          message: '请输入密钥',
          trigger: 'blur'
        },
        {
          max: 2048,
          message: '长度在不能超过2048个字符'
        },
      ],
      tip: '支付平台申请，不要乱填，否则商城将无法下单'
    },
    {
      label: 'api证书序列号',
      prop: 'certSerialNo',
      hide: true,
      sortable: true,
      display: false,
      rules: [
        {
          required: true,
          message: '请输入apiV3证书序列号',
          trigger: 'blur'
        },
        {
          max: 64,
          message: '长度在不能超过64个字符'
        },
      ],
      tip: '支付平台申请，不要乱填，否则商城将无法下单'
    },
    {
      label: 'apiV3秘钥',
      prop: 'apiV3Key',
      type: 'password',
      span: 12,
      hide: true,
      display: false,
      rules: [
        {
          required: true,
          message: '请输入apiV3秘钥',
          trigger: 'blur'
        },
        {
          max: 64,
          message: '长度在不能超过64个字符'
        },
      ],
      tip: '支付平台申请，不要乱填，否则商城将无法下单'
    },
    {
      label: 'apiclient_cert.p12',
      prop: 'keyPath',
      span: 24,
      row: true,
      sortable: true,
      hide: true,
      rules: [
        {
          required: true,
          message: '请上传apiclient_cert.p12',
          trigger: 'blur'
        }],
      formslot: true,
      tip: '支付平台申请，不要乱填，否则商城退款功能将无法使用'
    },
    {
      label: 'apiclient_key.pem',
      prop: 'privateKeyPath',
      sortable: true,
      span: 24,
      hide: true,
      rules: [
        {
          required: true,
          message: '请上传apiclient_key.pem',
          trigger: 'blur'
        }],
      formslot: true,
      tip: '支付平台申请，不要乱填，否则商城退款功能将无法使用'
    },
    {
      label: 'apiclient_cert.pem',
      prop: 'privateCertPath',
      span: 24,
      sortable: true,
      hide: true,
      rules: [
        {
          required: true,
          message: '请上传apiclient_cert.pem',
          trigger: 'blur'
        }],
      formslot: true,
      tip: '支付平台申请，不要乱填，否则商城退款功能将无法使用'
    },
    {
      label: '微信开放平台移动应用APPID',
      prop: 'subAppId',
      span: 12,
      row: true,
      sortable: true,
      hide: true,
      display: false,
      rules: [
        {
          max: 64,
          message: '长度在不能超过64个字符'
        },
      ],
      tip: '开放平台申请移动应用，app端支付使用'
    },
  ]
}
