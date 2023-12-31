import Layout from '@/page/index/'

export default [{
  path: '/login',
  name: '登录页',
  component: () =>
    import ( /* webpackChunkName: "page" */ '@/page/login/index'),
  meta: {
    keepAlive: true,
    isTab: false,
    isAuth: false,
    activeName: 'user'
  }
},
  {
    path: '/register',
    name: '注册页',
    component: () =>
      import ( /* webpackChunkName: "page" */ '@/page/login/index'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
      activeName: 'register'
    }
  },
  {
    path: '/lock',
    name: '锁屏页',
    component: () =>
      import ( /* webpackChunkName: "page" */ '@/page/lock/index'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/404',
    component: () =>
      import ( /* webpackChunkName: "page" */ '@/components/error-page/404'),
    name: '404',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }

  },
  {
    path: '/403',
    component: () =>
      import ( /* webpackChunkName: "page" */ '@/components/error-page/403'),
    name: '403',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/500',
    component: () =>
      import ( /* webpackChunkName: "page" */ '@/components/error-page/500'),
    name: '500',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/',
    name: '主页',
    redirect: '/wel',
  },
  {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [{
      path: ":routerPath",
      name: 'iframe',
      component: () =>
        import ( /* webpackChunkName: "page" */ '@/components/iframe/main'),
      props: true
    }]
  },
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/authredirect',
    name: '授权页',
    component: () =>
      import ( /* webpackChunkName: "page" */ '@/page/login/authredirect'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/mall/shop/shopapply/form',
    name: '店铺入驻申请',
    component: () =>
      import ( /* webpackChunkName: "page" */ '@/views/mall/shopapply/form.vue'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
      activeName: 'shopapplyForm'
    }
  },
  {
    path: '/upms/tenant/index-outside',
    name: '租户对外列表',
    component: () =>
      import ( /* webpackChunkName: "page" */ '@/views/upms/tenant/index-outside.vue'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
      activeName: 'tenantOutside'
    }
  },
]
