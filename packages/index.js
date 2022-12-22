import Smenu from './menu'
import Spagination from './pagination'
import Stoolbar from './toolbar'
import Stable from './table'
const components = [Stable, Smenu, Spagination, Stoolbar]
const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {version: '1.0.5', install, Smenu, Spagination, Stoolbar, Stable}
