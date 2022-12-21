import './index.scss'
import Table from './Table.jsx'
Table.install = function (Vue) {
  Vue.component(Table.name, Table)
}
export default Table
