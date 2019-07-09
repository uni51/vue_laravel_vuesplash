import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import PhotoList from './pages/PhotoList.vue'
import PhotoDetail from './pages/PhotoDetail.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System.vue'

import store from './store'

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
  {
    path: '/',
    component: PhotoList
  },
  {
    path: '/photos/:id',
    component: PhotoDetail,
    props: true // props: true は 変数部分（写真IDの値）を props として受け取ることを意味する
  },  
  {
    path: '/login',
    component: Login,
    beforeEnter (to, from, next) {
      if (store.getters['auth/check']) {
        next('/')
      } else {
        next()
      }
    }    
  },
  {
    path: '/500',
    component: SystemError
  }  
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
  mode: 'history',    
  routes
})

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router