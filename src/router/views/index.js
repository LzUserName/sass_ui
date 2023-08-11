import Layout from '@/page/index/'
export default [{
      path: '/wel',
      component: Layout,
      redirect: '/wel/index',
      children: [{
          path: 'index',
          name: '首页',
          component: () =>
              import ( /* webpackChunkName: "views" */ '@/page/wel')
      }]
  },
  {
      path: '/info',
      component: Layout,
      redirect: '/info/index',
      children: [{
          path: 'index',
          name: '个人信息',
          component: () =>
              import ( /* webpackChunkName: "page" */ '@/views/upms/user/info'),
      },
      ]
  },
  {
    path: '/mall/config/decorate/home/pagePC',
    component: Layout,
    children: [{
      path: 'addPagePC',
      name: '商城PC页面装修',
      component: () => import ( /* webpackChunkName: "divpagePC" */ '@/views/mall/pagedevise/pc-component-library/pages/divpage.vue'),
      meta: {
        hideInMenu: true,//是否单独页面：不加载左侧菜单和顶部菜单
        keepAlive: false,
        isAuth: true,
        repeatAddTag: false,
        activeName: 'addDivPagePC'
      }
    },]
  },

  {
    path: '/mall/config/decorate/home/page',
    component: Layout,
    children: [{
      path: 'addPage',
      name: '商城页面装修',
      component: () =>
        import ( /* webpackChunkName: "divpage" */ '@/views/mall/pagedevise/component-library/pages/divpage.vue'),
      meta: {
        keepAlive: false,
        isAuth: true,
        repeatAddTag: false,
        activeName: 'addDivPage'
      }
    },]
  },

  {
    path: '/mall/config/decorate/home/page',
    component: Layout,
    children: [{
      path: 'addPageShopPC',
      name: '店铺PC页面装修',
      component: () =>  import ( /* webpackChunkName: "divpageShopPC" */ '@/views/mall/pagedevise/pc-component-library-shop/pages/divpage.vue'),
      meta: {
        hideInMenu: true,//是否单独页面：不加载左侧菜单和顶部菜单
        keepAlive: false,
        isAuth: true,
        repeatAddTag: false,
        activeName: 'addDivPageShopPC'
      }
    },]
  },
  {
    path: '/mall/config/decorate/home/page',
    component: Layout,
    children: [{
      path: 'addPageShop',
      name: '店铺页面装修',
      component: () =>
        import ( /* webpackChunkName: "divpageShop" */ '@/views/mall/pagedevise/component-library-shop/pages/divpage.vue'),
      meta: {
        keepAlive: false,
        isAuth: true,
        repeatAddTag: false,
        activeName: 'addDivPageShop'
      }
    },]
  },
  {
    path: '/mall/bigscreen',
    component: Layout,
    children: [{
      path: 'fullscreen',
      name: '大屏全屏',
      component: () =>
        import ( /* webpackChunkName: "dashboardFullscreen" */ '@/views/bigscreen/fullscreen'),
      meta: {
        hideInMenu: true,//是否单独页面：不加载左侧菜单和顶部菜单
        keepAlive: false,
        isAuth: true,
        repeatAddTag: false,
        activeName: 'fullscreen'
      }
    },]
  },
  // {
  //   path: '/mall/goods/goodsappraises',
  //   name: '商品评论',
  //   component: Layout,
  //   children: [{
  //     path: ':goodsAppraises',
  //     component: () =>
  //       import( /* webpackChunkName: "views" */ '@/views/mall/goodsappraises')
  //   }]
  // }

]
