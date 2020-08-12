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
const Login = () => import('../views/Login')
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
      path: '/login',
      component: Login,
      meta: {
        title: '请先登录',
        keepAlive: true
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
/*******路由发生变化前***** */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 获取用户登录状态
  let isLogin = localStorage.getItem("token");
  // 注销
  if (to.path == '/logout') {
    // 清空
    sessionStorage.clear();
    // 跳转到登录
    next({
      path: '/login'
    });
  }
  // 如果请求的是登录页
  else if (to.path == '/login') {
    if (isLogin != null) {
      // 跳转到首页
      next({
        path: '/index'
      });
    }
  } // 如果为非登录状态
  else if (isLogin == null) {
    // 跳转到登录页
    next({
      path: '/login'
    });
  }
  next()
})
/*********************************** */
export default router
