import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import 'element-ui/lib/theme-chalk/base.css'
import './global.scss'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
import {Loading} from 'element-ui'
Vue.use(Loading)
Vue.config.devtools = process.env.PRO_ENV === 'DEV'
Vue.config.productionTip = process.env.PRO_ENV === 'DEV'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
