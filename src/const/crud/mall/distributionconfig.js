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
  labelWidth: 150,
  column: [
    {
      label: '分销启用',
      prop: 'enable',
      type: 'radio',
      sortable: true,
      rules: [
        {
          required: true,
          message: '请输入（1：开启；0：关闭）',
          trigger: 'blur'
        },
        {
          max: 2,
          message: '长度在不能超过2个字符'
        },
      ],
      dicData: [{
        label: '开启',
        value: '1'
      },{
        label: '关闭',
        value: '0'
      }],
      labelTip: '商城分销功能开启|关闭'
    },
    {
      label: '分销关系绑定',
      prop: 'bindType',
      span: 24,
      type: 'radio',
      display : true,
      rules: [
        {
          required: true,
          message: '请输入分销关系绑定1：所有用户；2：新用户',
          trigger: 'blur'
        },
        {
          max: 2,
          message: '长度在不能超过2个字符'
        },
      ],
      dicData: [{
        label: '所有用户',
        value: '1'
      }, {
        label: '新用户',
        value: '2'
      }],
      labelTip: '”所有用户”指所有没有上级推广人的用户，“新用户”指新注册的用户'
    },
    {
      label: '分销模式',
      prop: 'distributionModel',
      span: 24,
      type: 'radio',
      display: true,
      rules: [
        {
          required: true,
          message: '请输入分销模式1：指定分销；2：人人分销；3：满额分销',
          trigger: 'blur'
        },
        {
          max: 2,
          message: '长度在不能超过2个字符'
        },
      ],
      dicData: [{
        label: '指定分销',
        value: '1'
      }, {
        label: '人人分销',
        value: '2'
      }, {
        label: '满额分销',
        value: '3'
      }],
      labelTip: '‘指定分销’商城管理员指定分销员；‘人人分销’默认每个人都可以分销；‘满额分销’用户在商城的消费金额满一定额度才能分销'
    },
    {
      label: '指定额度',
      prop: 'fullAmount',
      span: 24,
      type: 'number',
      minRows: 0.01,
      precision: 2,
      display: true,
      rules: [
        {
          required: true,
          message: '请输入满度指定额度',
          trigger: 'blur'
        },
      ],
      labelTip: '分销模式为‘满额分销’时指定'
    },
    {
      label: '一级返佣比例',
      prop: 'firstRebate',
      span: 24,
      type: 'number',
      minRows: 0,
      precision: 0,
      maxRows: 100,
      display: true,
      rules: [
        {
          required: true,
          message: '请输入一级返佣比例',
          trigger: 'blur'
        },
      ],
      labelTip: '订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%'
    },
    {
      label: '二级返佣比例',
      prop: 'secondRebate',
      span: 24,
      type: 'number',
      minRows: 0,
      precision: 0,
      maxRows: 100,
      display: true,
      rules: [
        {
          required: true,
          message: '请输入二级返佣比例',
          trigger: 'blur'
        },
      ],
      labelTip: '订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%'
    },
    {
      label: '冻结时间',
      prop: 'frozenTime',
      span: 24,
      type: 'number',
      minRows: 1,
      precision: 0,
      display: true,
      rules: [
        {
          required: true,
          message: '请输入冻结时间（小时）',
          trigger: 'blur'
        },
      ],
      labelTip: '佣金冻结时间(小时)'
    },
    {
      label: '提现最低金额',
      prop: 'withdrawMin',
      span: 24,
      type: 'number',
      minRows: 0,
      precision: 2,
      display: true,
      rules: [
        {
          required: true,
          message: '请输入提现最低金额',
          trigger: 'blur'
        },
      ],
      labelTip: '用户提现最低金额'
    },
    {
      label: '提现银行',
      prop: 'withdrawBank',
      span: 24,
      display: true,
      rules: [
        {
          required: true,
          message: '请输入提现银行',
          trigger: 'blur'
        },
        {
          max: 200,
          message: '长度在不能超过200个字符'
        },
      ],
      labelTip: '提现银行，多个银行用’，‘隔开'
    },
    {
      label: '分销图片',
      prop: 'picUrls',
      dataType: 'array',
      formslot: true,
      span: 24,
      display: true,
      rules: [
        {
          required: true,
          message: '请输入分销图片',
          trigger: 'blur'
        }
      ],
      labelTip: '个人中心分销海报图片，建议尺寸600x1000'
    },
  ]
}
