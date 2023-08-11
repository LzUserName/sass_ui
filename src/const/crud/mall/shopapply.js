/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
import {getCount} from '@/api/mall/shopinfo'
import {getCount as getCountUser} from '@/api/upms/user'

const validateName = (rule, value, callback) => {
  if (window.openType === 'edit'){
    callback()
  }else{
    getCount({
      tenantId: window.tenantId,
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

const validateUserName = (rule, value, callback) => {
  if (window.openType === 'edit'){
    callback()
  }else{
    getCountUser({
      username: value
    }).then(response => {
      let data = response.data.data
      if (data > 0) {
        callback(new Error('账号已经存在'))
      } else {
        callback()
      }
    })
  }
}

const validateEmail = (rule, value, callback) => {
  if (window.openType === 'edit'){
    callback()
  }else{
    getCountUser({
      email: value
    }).then(response => {
      let data = response.data.data
      if (data > 0) {
        callback(new Error('邮箱已经存在'))
      } else {
        callback()
      }
    })
  }
}

const validatePhone = (rule, value, callback) => {
  if (window.openType === 'edit'){
    callback()
  }else{
    getCountUser({
      phone: value
    }).then(response => {
      let data = response.data.data
      if (data > 0) {
        callback(new Error('手机号码已经存在'))
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
  addBtn: false,
  excelBtn: true,
  printBtn: true,
  viewBtn: true,
  searchMenuSpan: 6,
  labelWidth: 85,
  column: [
    {
      label: '店铺名',
      prop: 'name',
      display: false
    },
    {
      label: '电话号码',
      prop: 'phone',
      display: false
    },
    {
      label: '详细地址',
      prop: 'address',
      display: false
    },
    {
      label: '编号',
      hide: true,
      prop: 'id',
      display: false
    },
    {
      label: '店长昵称',
      prop: 'userNickname',
      display: false
    },
    {
      label: '店长用户名',
      prop: 'userUsername',
      hide: true,
      display: false
    },
    {
      label: '店长手机号',
      prop: 'userPhone',
      display: false
    },

    {
      label: '更新时间',
      prop: 'updateTime',
      sortable: true,
      display: false
    },
    {
      label: '店铺Logo',
      prop: 'imgUrl',
      hide: true,
      display: false
    },
    {
      label: '详细介绍',
      prop: 'detail',
      hide: true,
      display: false
    },
    {
      label: '店长邮箱',
      prop: 'userEmail',
      hide: true,
      display: false
    },
    {
      label: '店长头像',
      prop: 'userAvatar',
      hide: true,
      display: false
    },
    {
      label: '审核状态',
      prop: 'status',
      type: 'select',
      slot: true,
      sortable: true,
      display: false,
      dicData: [{
        label: '审核中',
        value: '0'
      }, {
        label: '审核通过',
        value: '1'
      }, {
        label: '审核不通过',
        value: '2'
      }],
      rules: [
        {
          required: true,
          message: '请输入审核状态',
          trigger: 'blur'
        },
        {
          max: 2,
          message: '长度在不能超过2个字符'
        },
      ]
    },
    {
      label: '审核意见',
      prop: 'applyDetail',
      hide: true,
      display: false
    },
    {
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      hide: true,
      display: false
    },
  ],
  group: [
   {
      label: '店铺信息',
      prop: 'shopInfo',
      icon: 'el-icon-s-shop',
      column: [
        {
          label: '店铺名',
          prop: 'name',
          sortable: true,
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
          label: '电话',
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
          label: '详细地址',
          prop: 'address',
          formslot:true,
          sortable: true,
          span: 24,
          rules: [
            {
              max: 225,
              message: '长度在不能超过225个字符'
            },
          ]
        },
        {
          label: '详细介绍',
          prop: 'detail',
          type: 'textarea',
          span: 24,
          minRows:1,
          rules: [
            {
              max: 225,
              message: '长度在不能超过225个字符'
            },
          ]
        },
        {
          label: '店铺Logo',
          prop: 'imgUrl',
          hide: true,
          formslot: true,
          rules: [
            {
              required: true,
              message: '请上传图片',
              trigger: 'blur'
            }
          ]
        },
      ]
    },

    {
      label: '店长信息',
      prop: 'shopUser',
      icon: 'el-icon-s-custom',
      column: [
        {
          label: '昵称',
          prop: 'userNickname',
          sortable: true,
          rules: [
            {
              required: true,
              message: '请输入店长昵称',
              trigger: 'blur'
            },
            {
              max: 64,
              message: '长度在不能超过64个字符'
            },
          ]
        },
        {
          label: '登录账号',
          prop: 'userUsername',
          sortable: true,
          rules: [
            {
              required: true,
              message: '请输入登录账号',
              trigger: 'blur'
            },
            {
              max: 64,
              message: '长度在不能超过64个字符'
            },
          ]
        },
        {
          label: '手机号',
          prop: 'userPhone',
          sortable: true,
          rules: [
            {
              required: true,
              message: '请输入店长手机号',
              trigger: 'blur'
            },
            {
              min: 11,
              max: 11,
              message: '长度在 11 个字符',
              trigger: 'blur'
            }
          ]
        },
        {
          label: '邮箱',
          prop: 'userEmail',
          sortable: true,
          rules: [
            {
              required: true,
              message: '请输入店长邮箱',
              trigger: 'blur'
            },
            {
              max: 64,
              message: '长度在不能超过64个字符'
            },
          ]
        },

        {
          label: '店长头像',
          prop: 'userAvatar',
          hide: true,
          formslot: true
        },
      ]
    },
    {
      label: '审核信息',
      prop: 'baseInfo',
      icon: 'el-icon-s-order',
      column: [
        {
          label: '编号',
          prop: 'id',
          sortable: true,
          editDisabled: true
        },

        {
          label: '更新时间',
          prop: 'updateTime',
          sortable: true,
          editDisabled: true,
          rules: [
            {
              required: true,
              message: '请输入最后更新时间',
              trigger: 'blur'
            },
          ]
        },
        {
          label: '审核状态',
          prop: 'status',
          type: 'select',
          sortable: true,
          editDisabled: true,
          span: 24,
          dicData: [{
            label: '审核中',
            value: '0'
          }, {
            label: '审核通过',
            value: '1'
          }, {
            label: '审核不通过',
            value: '2'
          }],
          rules: [
            {
              required: true,
              message: '请输入审核状态',
              trigger: 'blur'
            },
            {
              max: 2,
              message: '长度在不能超过2个字符'
            },
          ]
        },
        {
          label: '审核意见',
          prop: 'applyDetail',
          editDisabled: true,
          sortable: true,
          span: 24,
          rules: [
            {
              max: 500,
              message: '长度在不能超过500个字符'
            },
          ]
        },
        {
          label: '店铺',
          prop: 'shopId',
          type: 'select',
          props: {
            label: 'name',
            value: 'id'
          },
          editDisabled: true,
          dicUrl: '/mall/shopinfo/list'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          sortable: true,
          editDisabled: true,
          rules: [
            {
              required: true,
              message: '请输入创建时间',
              trigger: 'blur'
            },
          ]
        },
      ]
    },
  ]
}

export const formOption = {
  dialogDrag: false,
  border: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  searchShow: false,
  addBtn: false,
  editBtn: false,
  viewBtn: true,
  searchMenuSpan: 6,
  labelWidth: 85,
  group: [
    {
      label: '店铺信息',
      prop: 'shopInfo',
      icon: 'el-icon-s-shop',
      column: [
        {
          label: '店铺名',
          prop: 'name',
          sortable: true,
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
          label: '电话',
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
          label: '详细地址',
          prop: 'address',
          formslot:true,
          sortable: true,
          span: 24,
          rules: [
            {
              max: 225,
              message: '长度在不能超过225个字符'
            },
          ]
        },
        {
          label: '详细介绍',
          prop: 'detail',
          type: 'textarea',
          span: 24,
          rules: [
            {
              max: 225,
              message: '长度在不能超过225个字符'
            },
          ]
        }
      ]
    },{
      label: '店长信息',
      prop: 'shopUser',
      icon: 'el-icon-s-custom',
      column: [
        {
          label: '登录账号',
          prop: 'userUsername',
          sortable: true,
          rules: [
            {
              required: true,
              message: '请输入登录账号',
              trigger: 'blur'
            },
            {
              max: 64,
              message: '长度在不能超过64个字符'
            },{
              validator: validateUserName,
              trigger: 'blur'
            }
          ]
        },
        {
          label: '登录密码',
          prop: 'userPassword',
          rules: [
            {
              required: true,
              message: '请输入登录密码',
              trigger: 'blur'
            },
            {
              max: 64,
              message: '长度在不能超过64个字符'
            },
          ]
        },
        {
          label: '手机号',
          prop: 'userPhone',
          sortable: true,
          rules: [
            {
              required: true,
              message: '请输入店长手机号',
              trigger: 'blur'
            },
            {
              min: 11,
              max: 11,
              message: '长度在 11 个字符',
              trigger: 'blur'
            },{
              validator: validatePhone,
              trigger: 'blur'
            }
          ]
        },
        {
          label: '邮箱',
          prop: 'userEmail',
          sortable: true,
          rules: [
            {
              required: true,
              message: '请输入店长邮箱',
              trigger: 'blur'
            },
            {
              max: 64,
              message: '长度在不能超过64个字符'
            },{
              validator: validateEmail,
              trigger: 'blur'
            }
          ]
        },
        {
          label: '昵称',
          prop: 'userNickname',
          sortable: true,
          rules: [
            {
              required: true,
              message: '请输入店长昵称',
              trigger: 'blur'
            },
            {
              max: 64,
              message: '长度在不能超过64个字符'
            },
          ]
        }
      ]
    }
  ]
}

export const formOption2 = {
  dialogDrag: false,
  border: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: 'text',
  detail: true,
  searchMenuSpan: 6,
  labelWidth: 100,
  group: [
    {
      label: '基本信息',
      prop: 'baseInfo',
      icon: 'el-icon-s-order',
      column: [
        {
          label: '编号',
          prop: 'id'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        },
        {
          label: '更新时间',
          prop: 'updateTime'
        },
        {
          label: '审核状态',
          prop: 'status',
          type: 'select',
          dicData: [{
            label: '审核中',
            value: '0'
          }, {
            label: '审核通过',
            value: '1'
          }, {
            label: '审核不通过',
            value: '2'
          }]
        },
        {
          label: '审核意见',
          prop: 'applyDetail'
        }
      ]
    },
    {
      label: '店铺信息',
      prop: 'shopInfo',
      icon: 'el-icon-s-shop',
      column: [
        {
          label: '店铺名',
          prop: 'name'
        },
        {
          label: '电话',
          prop: 'phone'
        },
        {
          label: '详细地址',
          prop: 'address',
          formslot:true
        },
        {
          label: '详细介绍',
          prop: 'detail',
          type: 'textarea'
        }
      ]
    },{
      label: '店长信息',
      prop: 'shopUser',
      icon: 'el-icon-s-custom',
      column: [
        {
          label: '登录账号',
          prop: 'userUsername'
        },
        {
          label: '登录密码',
          prop: 'userPassword'
        },
        {
          label: '手机号',
          prop: 'userPhone'
        },
        {
          label: '邮箱',
          prop: 'userEmail'
        },
        {
          label: '昵称',
          prop: 'userNickname'
        }
      ]
    }
  ]
}
