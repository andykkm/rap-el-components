import './index.scss'
import SToolbar from './SToolbar.jsx'
SToolbar.install = function (Vue) {
  Vue.component(SToolbar.name, SToolbar)
}
export default SToolbar
