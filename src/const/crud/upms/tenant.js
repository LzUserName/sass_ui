import {getCount} from '@/api/upms/user'
import {getList} from '@/api/upms/tenant'

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

const validateCode = (rule, value, callback) => {
    if (window.openType === 'edit'){
        callback()
    }else{
        getList({
            code: value
        }).then(response => {
            let data = response.data.data
            if (data.length > 0) {
                callback(new Error('机构编码已经存在'))
            } else {
                callback()
            }
        })
    }
}

export const tableOption = {
    dialogDrag: false,
    headerAlign: 'center',
    align: 'center',
    border: true,
    searchShow: false,
    viewBtn: true,
    defaultExpandAll: true,
    labelWidth: 150,
    searchMenuSpan: 6,
    column: [
      {
        label: '商城Logo',
        prop: 'logo',
        slot: true,
        formslot: true,
        row: true
      },
        {
            label: '商城(租户)名称',
            prop: 'name',
            width: 200,
            rules: [{
                required: true,
                message: '机构名称不能为空',
                trigger: 'blur'
            }]
        },
      {
        label: '租户ID',
        prop: 'id',
        editDisplay: false,
        addDisplay: false,
      },
        {
            label: '类型',
            prop: 'type',
            type: 'select',
            search: true,
            dicUrl: '/upms/dict/type/organ_type',
            rules: [{
                required: true,
                message: '请选择类型',
                trigger: 'blur'
            }]
        },
        {
            label: '编码',
            hide: true,
            prop: 'code',
            editDisabled: true,
            rules: [{
                required: true,
                message: '编码不能为空',
                trigger: 'blur'
            },{
                validator: validateCode,
                trigger: 'blur'
            }]
        },

        {
          label: '官方网址',
          prop: 'homeUrl',
          hide: true
        },
        {
            label: '状态',
            prop: 'status',
            type: 'radio',
            search: true,
            sortable: true,
            slot: true,
            editDisabled: true,
            dicData: [{
                label: '正常',
                value: '0'
            }, {
                label: '冻结',
                value: '9'
            }],
            rules: [{
              required: true,
              message: '状态不能为空',
              trigger: 'blur'
            }],
            tip: '冻结后，该租户下所有用户将无法登录'
        },
        {
            label: '排序',
            hide: true,
            type: 'number',
            prop: 'sort',
            rules: [{
                required: true,
                message: '排序不能为空',
                trigger: 'blur'
            }]
        },
        {
            label: '电话',
            hide: true,
            prop: 'phone'
        },
        {
            label: '传真',
            hide: true,
            prop: 'fax'
        },
        {
            label: '邮箱',
            hide: true,
            prop: 'email'
        },
        {
            label: '地址',
            hide: true,
            prop: 'address',
            span: 24
        },
        {
            label: '创建时间',
            prop: 'createTime',
            editDisplay: false,
            addDisplay: false
        },
        {
            label: '修改时间',
            prop: 'updateTime',
            hide: true,
            editDisplay: false,
            addDisplay: false
        },
        {
            label: '管理员账号',
            prop: 'username',
            hide: true,
            viewDisplay: false,
            editDisplay: false,
            rules: [{
                required: true,
                message: '管理员账号',
                trigger: 'blur'
            }, {
                validator: validateUserName,
                trigger: 'blur'
            }],
            tip: '新租户管理员的登录账号'
        },
        {
            label: '管理员密码',
            prop: 'password',
            hide: true,
            viewDisplay: false,
            editDisplay: false,
            rules: [{
              required: true,
              min: 6,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }],
            tip: '新租户管理员的登录密码'
        },
        {
          label: '备注',
          hide: true,
          prop: 'remarks'
        }
    ]
}

export const tableOption2 = {
  dialogDrag: false,
  headerAlign: 'center',
  align: 'center',
  border: true,
  viewBtn: true,
  defaultExpandAll: true,
  labelWidth: 150,
  searchMenuSpan: 6,
  column: [
    {
      label: '租户（商城）名称',
      prop: 'name',
      width: 200
    },
    {
      label: '编码',
      prop: 'code',
    },
    {
      label: '状态',
      prop: 'status',
      type: 'radio',
      dicData: [{
        label: '正常',
        value: '0'
      }, {
        label: '冻结',
        value: '9'
      }],
      tip: '冻结后，该租户下所有用户将无法登录'
    },
    {
      label: '官方网址',
      prop: 'homeUrl'
    },
    {
      label: '电话',
      prop: 'phone'
    },
    {
      label: '传真',
      prop: 'fax'
    },
    {
      label: '邮箱',
      prop: 'email'
    },
    {
      label: '地址',
      prop: 'address',
      span: 24
    },
    {
      label: '备注',
      hide: true,
      prop: 'remarks'
    },
  ]
}

