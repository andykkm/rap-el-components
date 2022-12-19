import Vue from 'vue'
import Router from 'vue-router'
import Stable from './demo/stable.vue'
import Spagination from './demo/spagination.vue'
import Stoolbar from './demo/stoolbar.vue'
import Smenu from './demo/smenu.vue'
Vue.use(Router)
export const routes = [
  {
    path: '/demo/stable',
    name: 'stable',
    meta: {title: 'stable'},
    component: Stable,
  },
  {
    path: '/demo/spagination',
    name: 'pagination',
    meta: {title: 'spagination'},
    component: Spagination,
  },
  {
    path: '/demo/stoolbar',
    name: 'toolbar',
    meta: {title: 'stoolbar'},
    component: Stoolbar,
  },
  {
    path: '/demo/smenu',
    name: 'menu',
    meta: {title: 'smenu'},
    component: Smenu,
  },
]
export const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/demo/home',
    },
    ...routes,
  ],
})
