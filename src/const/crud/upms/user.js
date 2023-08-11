import {getCount} from '@/api/upms/user'


const validateUserName = (rule, value, callback) => {
    if (window.openType != 'add'){
        callback()
    }else{
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
  if (window.openType != 'add'){
    callback()
  }else{
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
  if (window.openType != 'add'){
    callback()
  }else{
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
    excelBtn: true,
    printBtn: true,
    searchMenuSpan: 6,
    column: [{
        label: 'id',
        prop: 'id',
        span: 24,
        hide: true,
        editDisabled: true,
        addDisplay: false
    }, {
        label: '账号',
        prop: 'username',
        editDisabled: true,
        search: true,
        span: 24,
        rules: [{
            required: true,
            message: '请输入账号'
        },
        {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
        },{
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
        span: 24,
        rules: [{
            required: true,
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
        }]
    }, {
        label: '所属机构',
        prop: 'organId',
        span: 24,
        sortable: true,
        rules: [{
            required: true,
            message: '请选择机构',
            trigger: 'change'
        }],
        type: 'tree',
        search: true,
        props: {
            label: 'name',
            value: 'id'
        },
        defaultExpandAll: true,
        dicUrl: '/upms/organ/tree'
    }, {
        label: '角色',
        prop: 'roleIds',
        overHidden: true,
        dataType: 'array',
        span: 24,
        type: 'checkbox',
        rules: [{
            required: true,
            message: '请选择角色',
            trigger: 'blur'
        }],
        props: {
            label: 'roleName',
            value: 'id'
        },
        dicUrl: '/upms/role/list'
    }, {
      label: '账号类型',
      prop: 'type',
      type: 'radio',
      sortable: true,
      search: true,
      editDisabled: true,
      formslot: true,
      rules: [{
        required: true,
        message: '请选择账号类型',
        trigger: 'blur'
      }],
      dicData: [{
        label: '商城（租户）管理员',
        value: '1'
      }, {
        label: '店铺管理员',
        value: '2'
      }]
    }, {
      label: '允许登录',
      prop: 'lockFlag',
      type: 'radio',
      slot: true,
      sortable: true,
      rules: [{
        required: true,
        message: '请选择状态',
        trigger: 'blur'
      }],
      dicData: [{
        label: '是',
        value: '0'
      }, {
        label: '否',
        value: '9'
      }]
    }, {
      label: '店铺',
      prop: 'shopId',
      overHidden: true,
      type: 'select',
      filterable: true,
      search: true,
      rules: [{
        required: true,
        message: '请选择店铺',
        trigger: 'blur'
      }],
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: '/mall/shopinfo/list',
      display: false
    }, {
        width: 150,
        label: '创建时间',
        prop: 'createTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        editDisabled: true,
        addDisplay: false,
        span: 24
    }, {
        label: '邮箱',
        prop: 'email',
        editDisabled: true,
        rules: [{
            required: true,
            message: '请输入邮箱'
        },{
          validator: validateEmail,
          trigger: 'blur'
        }]
    }, {
        label: '手机号',
        prop: 'phone',
        span: 24,
        editDisabled: true,
        rules: [{
          required: true,
          message: '请输入手机号'
        },{
            min: 11,
            max: 11,
            message: '长度在 11 个字符',
            trigger: 'blur'
        },{
          validator: validatePhone,
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
    }, {
      label: '昵称',
      prop: 'nickName',
      span: 24,
      rules: [{
        required: true,
        message: '请输入昵称'
      },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }]
    }]
}


export const tableOption2 = {
  dialogDrag: false,
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  viewBtn: true,
  excelBtn: true,
  printBtn: true,
  searchMenuSpan: 6,
  column: [{
    label: 'id',
    prop: 'id',
    span: 24,
    hide: true,
    editDisabled: true,
    addDisplay: false
  }, {
    label: '账号',
    prop: 'username',
    editDisabled: true,
    search: true,
    span: 24,
    rules: [{
      required: true,
      message: '请输入账号'
    },
      {
        min: 3,
        max: 20,
        message: '长度在 3 到 20 个字符',
        trigger: 'blur'
      },{
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
    span: 24,
    rules: [{
      required: true,
      min: 6,
      max: 20,
      message: '长度在 6 到 20 个字符',
      trigger: 'blur'
    }]
  }, {
    label: '角色',
    prop: 'roleIds',
    overHidden: true,
    dataType: 'array',
    span: 24,
    type: 'checkbox',
    rules: [{
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }],
    props: {
      label: 'roleName',
      value: 'id'
    },
    dicUrl: '/upms/role/list'
  }, {
    label: '允许登录',
    prop: 'lockFlag',
    type: 'radio',
    slot: true,
    sortable: true,
    rules: [{
      required: true,
      message: '请选择状态',
      trigger: 'blur'
    }],
    dicData: [{
      label: '是',
      value: '0'
    }, {
      label: '否',
      value: '9'
    }]
  }, {
    width: 150,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    editDisabled: true,
    addDisplay: false,
    span: 24
  }, {
    label: '邮箱',
    prop: 'email',
    editDisabled: true,
    rules: [{
      required: true,
      message: '请输入邮箱'
    },{
      validator: validateEmail,
      trigger: 'blur'
    }]
  }, {
    label: '手机号',
    prop: 'phone',
    span: 24,
    editDisabled: true,
    rules: [{
      required: true,
      message: '请输入手机号'
    },{
      min: 11,
      max: 11,
      message: '长度在 11 个字符',
      trigger: 'blur'
    },{
      validator: validatePhone,
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
  }, {
    label: '管理租户',
    prop: 'tenantIds',
    overHidden: true,
    dataType: 'array',
    span: 24,
    type: 'checkbox',
    rules: [{
      required: true,
      message: '请选择租户',
      trigger: 'blur'
    }],
    props: {
      label: 'name',
      value: 'id'
    },
    dicUrl: '/upms/tenant/list',
    tip: '请选择该用户需要管理的租户（商城），用户可通过切换租户来进行管理'
  }]
}
