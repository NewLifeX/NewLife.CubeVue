import { getMenu } from '@/api/menu'
import { formatRoutes } from '@/utils/route'

// 添加/编辑页的路由，不需要加到菜单显示
let addRouters = []

const route = {
  state: {
    // 将展示在侧边栏的菜单
    // menuRouters: [], // constantRouterMap,
    menuRouters: [
      {
        id: 4292,
        ParentModuleId: 0,
        label: '首页',
        Url: null,
        Rank: 1,
        IconUrl: 'dy-icon-merchant',
        IsMenu: 1,
        ButtonList: [],
        ModelLevel: 1,
        children: [
          {
            id: 3658,
            ParentModuleId: 4292,
            label: '站点首页',
            Url: '/menu',
            Rank: 1,
            IconUrl: null,
            IsMenu: 1,
            ModelLevel: 2,
            children: null,
          },
        ],
      },
      {
        id: 4278,
        ParentModuleId: 0,
        label: '设备管理',
        Url: null,
        Rank: 2,
        IconUrl: 'dy-icon-merchant',
        IsMenu: 1,
        ButtonList: [],
        ModelLevel: 1,
        children: [
          {
            id: 1558,
            ParentModuleId: 4278,
            label: '智能柜列表',
            Url: '/menu',
            Rank: 1,
            IsMenu: 1,
            ButtonList: ['重启'],
            ModelLevel: 2,
            children: null,
          },
          {
            id: 1951,
            ParentModuleId: 4278,
            label: '立式柜管理',
            Url: null,
            Rank: 610,
            IsMenu: 1,
            ButtonList: [],
            ModelLevel: 2,
            children: [
              {
                id: 1952,
                ParentModuleId: 1951,
                label: '立式柜设备',
                Url: '/menu',
                Rank: 1,
                IsMenu: 1,
                ButtonList: [],
                ModelLevel: 3,
                children: null,
              },
              {
                id: 1953,
                ParentModuleId: 1951,
                label: '收费设置',
                Url: '/menu',
                Rank: 3,
                IsMenu: 1,
                ButtonList: [],
                ModelLevel: 3,
                children: null,
              },
            ],
          },
          {
            id: 1951,
            ParentModuleId: 4278,
            label: '立式柜管理',
            Url: null,
            Rank: 610,
            IsMenu: 1,
            ButtonList: [],
            ModelLevel: 2,
            children: [
              {
                id: 1952,
                ParentModuleId: 1951,
                label: '立式柜设备',
                Url: '/menu',
                Rank: 1,
                IsMenu: 1,
                ButtonList: [],
                ModelLevel: 3,
                children: null,
              },
              {
                id: 1953,
                ParentModuleId: 1951,
                label: '收费设置',
                Url: '/menu',
                Rank: 3,
                IsMenu: 1,
                ButtonList: [],
                ModelLevel: 3,
                children: null,
              },
            ],
          },
        ],
      },
    ],
    // 将要添加到路由系统中的新路由
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.menuRouters = /* constantRouterMap.concat*/ routers
    },
    ADD_ROUTERS: (state, routers) => {
      state.addRouters = state.addRouters.concat(routers)
    },
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise((resolve) => {
        // let accessedRouters
        getMenu().then((routeRes) => {
          // 将请求回来的菜单转化成路由以及菜单信息
          let accessedRouters = routeRes.data.data
          addRouters = formatRoutes(routeRes.data.data)

          commit('SET_ROUTERS', accessedRouters)
          commit('ADD_ROUTERS', addRouters)
          resolve()
        })
      })
    },
  },
}

export default route
