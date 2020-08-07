/**
 * keepAlive:true:需要缓存 false:不需要缓存
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import('../views/Index')
const Home = () => import('../views/Home')
const Detail = () => import('../views/Detail')
const Tab2 = () => import('../views/Tab2')
const Tab3 = () => import('../views/Tab3')
const Tab4 = () => import('../views/Tab4')
const A404 = () => import('../views/404')

Vue.use(VueRouter)

  const routes = [
    { path:'/', redirect:'/index' },
    {
      path: '/index',
      component: Index,
      meta: {
        keepAlive: true
      },
      children: [
        { path: '', redirect: '/home' },
        {
          path: '/home',
          component: Home,
          meta: {
            title:'首页',
            keepAlive: true
          },
        },
        {
          path: '/tab2',
          component: Tab2,
          meta: {
            title:'tab2导航',
            keepAlive: true
          },
        },
        {
          path: '/tab3',
          component: Tab3,
          meta: {
            title: 'tab3导航',
            keepAlive: true
          },
        },
        {
          path: '/tab4',
          component: Tab4,
          meta: {
            title: 'tab4导航',
            keepAlive: true
          },
        },
      ]
    },
    {
      path: '/detail',
      component: Detail,
      meta: {
        title: '详情页',
        keepAlive: false
      }
    },
    {
      path: '*',
      component: A404,
      meta: {
        title: '页面找不到了',
        keepAlive: true
      }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
