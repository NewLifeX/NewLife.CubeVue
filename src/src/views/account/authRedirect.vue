<script lang="ts">
import { setMenu } from "@/utils/menu"
import { defineComponent } from "vue"
export default defineComponent({
  name: 'AuthRedirect',
  async created() {
    let vm = this
    const redirect = vm.$route.query.redirect || '/'
    let token = vm.$route.hash.replace('#token=', '')
    vm.$store.dispatch('setToken', token)
    // 报错解决：Redirected when going from "/auth-redirect" to "/Admin/User" via a navigation guard
    // https://blog.csdn.net/Tom__cy/article/details/112846816
    // 获取用户信息
    vm.$api.user.getUserInfo()
      .then((response: any) => {
        const data = response.data.data
        // 设置用户信息
        vm.$store.dispatch('setUserInfo', data)
      })

    // 获取菜单信息， 将请求回来的菜单转化成路由以及菜单信息
    vm.$api.menu.getMenu().then((routeRes: any) => {
      const accessedRouters = routeRes.data.data

      // 保存一份在浏览器
      setMenu(accessedRouters)

      // 设置路由信息
      vm.$store.dispatch('generateRoutes', accessedRouters)

      // 添加路由信息
      const addRouters = vm.$store.getters.addRouters
      if (addRouters) {
        addRouters.forEach((e: any) => {
          vm.$router.addRoute(e) // 动态添加可访问路由表
        })
      }

      vm.$router.push({ path: redirect } as any)
    })
  },
  render() {
    return ''
  },
})
</script>
