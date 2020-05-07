import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/admin/Home.vue'
import login from "@/views/Login.vue"
import test from "@/views/Test.vue"
import TEST2 from "@/views/TEST2.vue"

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
    path: '/test2',
    name: "测试页面2",
    component:TEST2
  },
  {
    path: '/home',
    name:"主页面",
    component: home,
    redirect: "/home/dashboard", //默认加载的路由
    children:[
      {
        name:"空组件",
        path:"/empty",
        component: () => import('@/components/admin/Empty.vue')
      },
      {
        name:"仪表盘",
        path:"/home/dashboard",
        component: resolve => { require(['@/components/admin/Dashboard.vue'], resolve) }
      },
      //用户
      {
        name:"用户列表",
        path:"/user/list",
        component: () => import('@/views/admin/user/userList.vue')
      },
      {
        name:"用户新增",
        path:"/user/add",
        component: () => import('@/views/admin/user/userAdd.vue')
      },
      {
        name:"用户编辑",
        path:"/user/edit",
        component: () => import('@/views/admin/user/userEdit.vue')
      },
      //测试exam
      {
        name:"测试列表",
        path:"/exam/list",
        component: () => import('@/views/admin/exam/ExamList.vue')
      },{
        name:"测试题目列表",
        path:"/exam/question/list",
        component: () => import('@/views/admin/exam/QuestionList.vue')
      },{
        name:"题目编辑",
        path:"/exam/question/edit",
        component: () => import('@/views/admin/exam/QuestionEdit.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
