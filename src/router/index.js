import Vue from 'vue'
import Router from 'vue-router'
import { publicRoute, protectedRoute } from './config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = publicRoute.concat(protectedRoute)
import store from '@/store'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: routes,
})
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start()
  const isTokenExpired = store.getters.getExpiredDate < Date.now();
  if (!to.meta.public) {
    if (isTokenExpired) {
      store.commit("SET_LOGOUT_MODE")
      next({ name: 'login', query: { redirect: to.path } })
    } else {
      next()
    }
  }
  if(!isTokenExpired && to.meta.disableIfLoggedIn) {
    next({ name: 'dashboard' })
  } else {
    next()
  }

  //auth route is authenticated
})

router.afterEach(() => {
  NProgress.done()
})

export default router
