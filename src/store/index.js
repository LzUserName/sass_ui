import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import tags from './modules/tags'
import logs from './modules/logs'
import getters from './getters'
import divpage from './modules/divpage' //todo divpage
import divpageShop from './modules/divpageShop' //todo divpageShop

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    common,
    logs,
    divpage,
    divpageShop,
    tags
  },
  getters
})

export default store
