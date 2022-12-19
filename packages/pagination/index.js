import './index.scss'
import SPagination from './SPagination.jsx'
SPagination.install = function (Vue) {
  Vue.component(SPagination.name, SPagination)
}
export default SPagination
