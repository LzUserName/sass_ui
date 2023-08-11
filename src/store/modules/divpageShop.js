import { getStore, setStore } from '@/util/store'

/*模块*/
// import INPUT from './modules/input.js';
// import IMAGE from './modules/image.js';

// todo divpageShop
const divpage = {
  state: {
    // 页面
    pageId          : null,//页面ID
    shopId          : null,//店铺ID（当店铺装修时）
    pageSetData     : {},
    pageSetConfig   : {},
    componentsList  : [],
    clickComIndex   : null,           //当前点击的组件下标
    // input组件
    inputVal        : '',
    searchFormData  : {
      background: `#efeff4`,
      color: '#ffffff',
      placeholder: '请输入关键字',
      radius: 38,
      textColor: '#999999',
      textPosition: `center`
    },
    inputFormDatas  : {
      inputName  : "",
      inputPlshd : "",
    },
    // 弹窗遮层
    showModal    : false,
    // 是否是图片上传触发
    isImgUpload  : false,
  },
  mutations: {
    updateData(state, payload) {
      Object.assign(state, payload);
    }
  },
  actions: {

  },
  // modules: { INPUT, IMAGE }
}

export default divpage
