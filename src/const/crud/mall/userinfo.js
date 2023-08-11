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
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  searchShow: false,
  excelBtn: true,
  printBtn: true,
  addBtn: false,
  delBtn: false,
  viewBtn: true,
  searchMenuSpan: 6,
  labelWidth: 110,
  column: [
    {
      label: '头像',
      prop: 'headimgUrl',
      type: 'upload',
      imgWith: "50px",
      listType: 'picture-img',
      action: '/upms/file/upload?fileType=image&dir=mall/user/',
      propsHttp: {
        url: 'link'
      },
      loadText: '图上上传中，请稍等',
      tip: '只能上传jpg/png文件，且不超过100kb',
      span: 24,
      slot: true
    },
    {
      label: '用户编码',
      prop: 'userCode',
      sortable: true,
      search: true,
      editDisabled: true
    },
    {
      label: '手机号',
      prop: 'phone',
      sortable: true,
      search: true,
      editDisabled: true
    },
    {
      label: '来源类型',
      prop: 'appType',
      type: 'select',
      sortable: true,
      hide: true,
      editDisabled: true,
      dicData: [{
        label: '普通H5',
        value: 'H5'
      }, {
        label: '小程序',
        value: 'MA'
      }, {
        label: '公众号H5',
        value: 'H5-WX'
      }, {
        label: 'APP',
        value: 'APP'
      }, {
        label: 'PC端H5',
        value: 'H5-PC'
      }]
    },
    {
      label: '来源应用',
      prop: 'appId',
      sortable: true,
      type: 'select',
      props: {
        label: 'name',
        value: 'id'
      },
      search: true,
      dicUrl: '/weixin/wxapp/list'
    },
    {
      label: '昵称',
      prop: 'nickName'
    },

    {
      label: '性别',
      prop: 'sex',
      sortable: true,
      hide: true,
      type: 'select',
      dicUrl: '/upms/dict/type/wx_sex'
    },
    // {
    //   label: '所在国家',
    //   prop: 'country',
    //   sortable: true,
    //   search: true,
    //   editDisabled: false
    // },
    {
      label: '所在省份',
      prop: 'province',
      sortable: true,
      search: true,
      hide: true,
      editDisabled: false
    },
    {
      label: '所在城市',
      prop: 'city',
      sortable: true,
      search: true,
      editDisabled: false
    },
    {
      label: '当前积分',
      prop: 'pointsCurrent',
      sortable: true,
      editDisabled: true,
      slot: true
    },
    {
      label: '创建时间',
      prop: 'createTime',
      sortable: true,
      editDisabled: true
    },
    {
      label: '上级分享人',
      prop: 'parentId',
      width: 200,
      slot: true,
      editDisplay: false
    },
    {
      label: '是否是分销员',
      prop: 'distributionUser',
      editDisplay: false,
      slot: true,
    },
    {
      label: '登录时间',
      prop: 'lastOnlineTime',
      editDisabled: false,
      editDisplay: false,
      hide:true,
      value:''
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
  viewBtn: true,
  searchMenuSpan: 6,
  menu: false,
  column: [
    {
      label: '用户编码',
      prop: 'userCode',
      search: true
    },
    {
      label: '手机号',
      prop: 'phone',
      search: true
    },
    {
      label: '来源类型',
      prop: 'appType',
      type: 'select',
      dicData: [{
        label: '普通H5',
        value: 'H5'
      }, {
        label: '小程序',
        value: 'MA'
      }, {
        label: '公众号H5',
        value: 'H5-WX'
      }, {
        label: 'APP',
        value: 'APP'
      }, {
        label: 'PC端H5',
        value: 'H5-PC'
      }]
    },
    {
      label: '来源应用',
      prop: 'appId',
      type: 'select',
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/weixin/wxapp/list'
    },
    {
      label: '用户信息',
      prop: 'userId',
      slot: true,
      display: false,
      width: 220,
    },
    {
      label: '是否是分销员',
      prop: 'distributionUser',
      slot: true,
      display: false
    },
    {
      label: '累计佣金金额',
      prop: 'commissionTotal',
      slot: true,
      display: false
    },
  ]
}
