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
      label: 'regionId',
      prop: 'regionId',
      rules: [{
        required: true,
        message: 'regionId不能为空',
        trigger: 'blur'
      }]
    },{
      label: 'accessKeyId',
      prop: 'accessKeyId',
      rules: [{
        required: true,
        message: 'accessKeyId不能为空',
        trigger: 'blur'
      }]
    },{
      label: 'accessKeySecret',
      prop: 'accessKeySecret',
      rules: [{
        required: true,
        message: 'accessKeySecret不能为空',
        trigger: 'blur'
      }]
    }
  ]
}
