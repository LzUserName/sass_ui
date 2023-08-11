import {getCount} from '@/api/upms/user'


const validateUserName = (rule, value, callback) => {
  if (window.openType === 'edit') {
    callback()
  } else {
    getCount({
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
  if (window.openType === 'edit') {
    callback()
  } else {
    getCount({
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
  if (window.openType === 'edit') {
    callback()
  } else {
    getCount({
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
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  viewBtn: true,
  searchShow: false,
  excelBtn: true,
  printBtn: true,
  searchMenuSpan: 6,
  column: [
    {
      fixed: true,
      label: '昵称',
      prop: 'nickName',
      span: 12,
      rules: [{
        required: true,
        message: '请输入昵称'
      },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }],
      tip: '显示在商城端的客服名'
    }, {
      label: '店铺',
      prop: 'shopId',
      type: 'select',
      filterable: true,
      search: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/mall/shopinfo/list',
      editDisabled: true,
      rules: [{
        required: true,
        message: '请选择店铺'
      }]
    }, {
      fixed: true,
      label: '账号',
      prop: 'username',
      editDisabled: true,
      search: true,
      span: 12,
      rules: [{
        required: true,
        message: '请输入账号'
      },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }, {
          validator: validateUserName,
          trigger: 'blur'
        }]
    }, {
      label: '密码',
      prop: 'password',
      type: 'password',
      value: '',
      hide: true,
      viewDisplay: false,
      editDisplay: false,
      span: 12,
      rules: [{
        required: true,
        min: 6,
        max: 20,
        message: '长度在 6 到 20 个字符',
        trigger: 'blur'
      }]
    },  {
      label: '手机号',
      prop: 'phone',
      span: 12,
      editDisabled: true,
      rules: [{
        required: true,
        message: '请输入手机号'
      }, {
        min: 11,
        max: 11,
        message: '长度在 11 个字符',
        trigger: 'blur'
      }, {
        validator: validatePhone,
        trigger: 'blur'
      }]
    }, {
      label: '邮箱',
      prop: 'email',
      editDisabled: true,
      rules: [{
        required: true,
        message: '请输入邮箱'
      }, {
        validator: validateEmail,
        trigger: 'blur'
      }]
    },{
      label: '头像',
      prop: 'avatar',
      width: 130,
      dataType: 'array',
      slot: true,
      formslot: true,
      span: 24,
      rules: [{
        type: 'array',
        required: true,
        message: '头像不能为空',
        trigger: 'change'
      }]
    },{
      width: 150,
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisabled: true,
      addDisplay: false,
      span: 12
    }, ]
}
