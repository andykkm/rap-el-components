import './index.scss'
import STable from './STable.jsx'
STable.install = function (Vue) {
  Vue.component(STable.name, STable)
}
export default STable
