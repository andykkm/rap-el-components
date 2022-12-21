import './index.scss'
import Toolbar from './Toolbar.jsx'
Toolbar.install = function (Vue) {
  Vue.component(Toolbar.name, Toolbar)
}
export default Toolbar
