import {getList} from '@/api/upms/organ'

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
  viewBtn: true,
  defaultExpandAll: true,
  searchMenuSpan: 6,
  column: [
    {
      label: '父类机构',
      prop: 'parentId',
      type: 'tree',
      hide: true,
      width: 260,
      defaultExpandAll: true,
      props: {
        label: 'name',
        value: 'id'
      },
      rules: [{
        required: true,
        message: '请选择父类机构',
        trigger: 'change'
      }]
    },
    {
      label: '机构名称',
      prop: 'name',
      align: 'left',
      width: 260,
      rules: [{
        required: true,
        message: '机构名称不能为空',
        trigger: 'blur'
      }]
    },
    {
      label: '机构类型',
      prop: 'type',
      type: 'select',
      dicUrl: '/upms/dict/type/organ_type',
      rules: [{
        required: true,
        message: '请选择机构类型',
        trigger: 'blur'
      }]
    },
    {
      label: '机构编码',
      hide:true,
      prop: 'code',
      editDisabled: true,
      rules: [{
        required: true,
        message: '机构编码不能为空',
        trigger: 'blur'
      },{
        validator: validateCode,
        trigger: 'blur'
      }]
    },
    {
      label: '排序',
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
      prop: 'address'
    },
    {
      label: '备注',
      hide: true,
      prop: 'remarks'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      editDisplay:false,
      addDisplay:false
    },
    {
      label: '修改时间',
      prop: 'updateTime',
      hide: true,
      editDisplay:false,
      addDisplay:false
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
  labelWidth: 120,
  searchMenuSpan: 6,
  column: [
    {
      label: 'Logo图标',
      prop: 'logo',
      row: true,
      slot: true
    },
    {
      label: '名称',
      prop: 'name',
      width: 200,
      rules: [{
        required: true,
        message: '名称不能为空',
        trigger: 'blur'
      }]
    },
    {
      label: '编码',
      prop: 'code',
      disabled: true,
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
      type: 'textarea',
      minRows: 1
    },
    {
      label: '备注',
      hide: true,
      prop: 'remarks'
    },
  ]
}
