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
  group: [
    {
      icon: 'el-icon-s-order',
      label: 'QQ',
      prop: 'group1',
      column: [
        {
          label: 'qq的AppId',
          prop: 'qqAppId',
          type: 'number',
          rules: [{
            required: true,
            message: 'qq的AppId不能为空',
            trigger: 'blur'
          }]
        },{
          label: 'qq的appKey',
          prop: 'qqAppKey',
          rules: [{
            required: true,
            message: 'qq的appKey不能为空',
            trigger: 'blur'
          }]
        }
      ]
    },{
      icon: 'el-icon-s-order',
      label: '微信',
      prop: 'group2',
      column: [
        {
          label: '微信的appId',
          prop: 'wxAppId',
          rules: [{
            required: true,
            message: '微信的appId不能为空',
            trigger: 'blur'
          }]
        },{
          label: '微信的appSecret',
          prop: 'wxAppSecret',
          rules: [{
            required: true,
            message: '微信的appSecret不能为空',
            trigger: 'blur'
          }]
        }
      ]
    }
    ]
}
