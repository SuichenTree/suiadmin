import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/admin/Home.vue'
import login from "@/views/Login.vue"
import test from "@/views/Test.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: '默认路由',
    redirect:"/login"
  },
  {
    path: '/login',
    name: "登录页面",
    component:login
  },
  {
    path: '/test',
    name: "测试页面",
    component:test
  },
  {
    path: '/home',
    name:"主页面",
    component: home,
    redirect: "/home/dashboard", //默认加载的路由
    children:[
      {
        name:"仪表盘",
        path:"/home/dashboard",
        component: resolve => { require(['@/components/admin/Dashboard.vue'], resolve) }
      },
      {
        name:"用户列表",
        path:"/user/list",
        component: () => import('@/views/admin/user/userList.vue')
      },
      {
        name:"用户新增",
        path:"/user/add",
        component: () => import('@/views/admin/user/userAdd.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
