import iconList from "@/const/iconList";

export const tableOption = {
  dialogDrag: false,
  headerAlign: 'center',
  align: 'center',
  border: true,
  viewBtn: true,
  column: [
    {
      label: '上级菜单',
      prop: 'parentId',
      type: 'tree',
      hide: true,
      props: {
        label: 'name',
        value: 'id'
      },
      rules: [{
        required: true,
        message: '请选择上级菜单',
        trigger: 'change'
      }]
    },
    {
      label: '名称',
      prop: 'name',
      align: 'left',
      width: 200,
      rules: [{
        required: true,
        message: '名称不能为空',
        trigger: 'blur'
      }]
    },
    {
      label: '类型',
      prop: 'type',
      type: 'select',
      slot: true,
      dicData: [{
        label: '菜单',
        value: '0'
      },{
        label: '按钮',
        value: '1'
      }],
      rules: [{
        required: true,
        message: '请选择类型',
        trigger: 'blur'
      }],
      control:(val,form)=>{
        // 如果是菜单类型才能设置缓存
        if(form.type=='0'){
          return {
            keepAlive:{
              display:true
            }
          }
        }else{
          return {
            keepAlive:{
              display:false
            }
          }
        }
      },
    },
    {
      label: '权限标识',
      prop: 'permission'
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
      label: '图标',
      prop: 'icon',
      type: 'icon',
      iconList: iconList,
      slot: true,
      display: false
    },
    {
      label: '菜单路径',
      prop: 'component',
      display: false
    },
    {
      label: '菜单编码',
      prop: 'path',
      display: false
    },
    {
      label: '是否缓存',
      prop: 'keepAlive',
      type:'radio',
      display: false,
      hide: true,
      value:'1',
      dicData:[{
        label:'缓存',
        value:'0'
      },{
        label:'不缓存',
        value:'1',
      }],
    },
    {
      label: '创建时间',
      prop: 'createTime',
      hide: true,
      editDisplay: false,
      addDisplay: false
    },
    {
      label: '修改时间',
      prop: 'updateTime',
      hide: true,
      editDisplay: false,
      addDisplay: false
    }
  ]
}
