import {Table, TableColumn} from 'element-ui'
import {debounce} from 'lodash'
import SPagination from '../pagination'
import SToolbar from '../toolbar'
export default {
  name: 'STable',
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    SPagination,
    SToolbar,
  },
  mixins: [],
  props: Object.assign({}, Table.props, {
    toolbar: {
      type: Object,
      default: function () {
        return null
      },
    },
    pagination: {
      type: [Boolean, Object],
      default: function () {
        return {}
      },
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    sticky: {
      type: Object,
      default: () => {
        return {}
      },
    },
    needScroll: {
      type: Boolean,
      default: false,
    },
    pagerOffset: {
      type: Array,
      default: () => {
        return [0, 0]
      },
    },
    pagerFixedStyle: {
      type: Object,
      default: () => {
        return {left: 0, right: 0, bottom: 0}
      },
    },
    action: {
      type: [Object, Boolean],
      default: () => {
        return {refresh: true, columnDisplay: true, scale: true}
      },
    },
    rowKey: {
      type: [String, Function],
      default: 'id',
    },
    selectedRows: {
      type: Array,
      default: () => {
        return []
      },
    },
    headerCellStyle: {
      type: [Object, Function],
      default: () => {
        return {background: '#fafafa'}
      },
    },
    columns: {
      type: Array,
      default: () => {
        return []
      },
    },
    groupColumn: {
      type: Object,
      default: () => {
        return {}
      },
    },
    loadData: {
      type: Function,
      requrie: true,
    },
  }),
  data() {
    let localPagination = {
      layout: 'total, sizes, prev, pager, next, jumper',
    }
    if (this.pagination && typeof this.pagination === 'object') {
      localPagination = {...localPagination, ...this.pagination}
    }
    return {
      localLoad: false,
      selectedList: [],
      expandRowList: this.expandRowKeys,
      localPagination: localPagination,
      localColumns: this.columns,
      tableList: [],
      localTableList: [],
      loading: false,
      tableListener: null,
      tableHeight: null,
    }
  },
  watch: {
    expandRowKeys: function (val) {
      this.expandRowList = val
    },
    expandRowList: function (val) {
      this.$emit('expand-row-keys-change', val)
    },
  },
  beforeCreate() {},
  created() {
    this.localColumns = this.localColumns.map(item => {
      item.checked = true
      return item
    })
    if (this.loadData) {
      this.loadTable()
    } else {
      this.localLoad = true
      this.tableList = this.data
    }
  },
  mounted() {
    this.selectedRows.forEach(row => {
      this.$refs.table.toggleRowSelection(row)
    })
    if (this.pagination) {
      this.updateLayout()
      this.observe()
    }
  },
  destroyed() {
    this.tableListener = null
  },
  methods: {
    refresh(bool = false) {
      bool && (this.localPagination.currentPage = 1)
      this.loadTable()
    },
    loadTable() {
      let parameter = {
        currentPage: this.localPagination.currentPage || 1,
        pageSize: this.localPagination.pageSize || 30,
      }
      this.loading = true
      let result = this.loadData(parameter)
      if (typeof result.then === 'function') {
        result.then(r => {
          this.loading = false
          if (r) {
            if (r instanceof Array) {
              this.localLoad = true
              this.localTableList = r
              this.tableList = r
              this.localLoadTable()
            } else {
              this.tableList = r.list
              this.localPagination.currentPage = r.currentPage
              this.localPagination.pageSize = r.pageSize
              this.localPagination.total = r.total
            }
          } else {
            this.tableList = []
            this.localPagination.currentPage = 1
            this.localPagination.pageSize = 30
            this.localPagination.total = 0
          }
        })
      }
    },
    localLoadTable() {
      this.localPagination.total = this.localTableList.length
      const currentPage = this.localPagination.currentPage || 1
      const pageSize = this.localPagination.pageSize || 30
      const pageStart = (currentPage - 1) * pageSize
      const pageEnd = currentPage * pageSize
      this.tableList = this.localTableList.slice(pageStart, pageEnd)
    },
    renderColumn(columns) {
      return columns.map(item => {
        if (!item.checked) {
          return ''
        }
        item = {...this.groupColumn, ...item}
        if (item.children && item.children.length) {
          return (
            <el-table-column {...{props: item}}>{this.renderColumn(item.children)}</el-table-column>
          )
        } else {
          let scopedSlots = this.$scopedSlots
          if (scopedSlots[item.prop]) {
            let slot = {
              default: props => {
                return scopedSlots[item.prop]({
                  text: props.row[item.prop],
                  row: props.row,
                  column: props.column,
                  index: props.$index,
                  tableData: this.tableList,
                  $table: this,
                })
              },
            }
            if (item.headerRender && scopedSlots[item.headerRender]) {
              slot['header'] = props => {
                return scopedSlots[item.headerRender]({
                  column: props.column,
                  index: props.$index,
                  tableData: this.tableList,
                  $table: this,
                })
              }
            }
            return <el-table-column scopedSlots={slot} {...{props: item}}></el-table-column>
          }
          return <el-table-column {...{props: item}}></el-table-column>
        }
      })
    },
    renderSetUp() {
      if (this.action) {
        const action = [
          this.action.refresh ? (
            <el-tooltip content='刷新' placement='top'>
              <i class='el-icon-refresh' onClick={() => this.refresh(false)}></i>
            </el-tooltip>
          ) : (
            ''
          ),
          this.action.columnDisplay ? (
            <el-tooltip content='列展示' placement='top'>
              <el-dropdown hide-on-click={false} trigger='hover'>
                <i class='el-icon-setting'></i>
                <el-dropdown-menu slot='dropdown'>
                  {this.localColumns
                    .filter(item => item.prop && item.label)
                    .map(item => {
                      return (
                        <el-dropdown-item>
                          <el-checkbox
                            style='width:100%'
                            vModel={item.checked}
                            vOn:change={val => this.setColumn(val, item.prop)}>
                            {item.label}
                          </el-checkbox>
                        </el-dropdown-item>
                      )
                    })}
                </el-dropdown-menu>
              </el-dropdown>
            </el-tooltip>
          ) : (
            ''
          ),
        ]
        return <div class='s-table-toolbar-action'>{action}</div>
      }
    },
    setColumn(val, prop) {
      let index = this.localColumns.findIndex(item => item.prop === prop)
      if (~index) {
        this.localColumns[index].checked = val
        this.$set(this.localColumns, index, this.localColumns[index])
      }
    },
    renderSToolbar() {
      if (this.toolbar) {
        let scopedSlots = this.$scopedSlots
        let slotConfig = {}
        for (let name in this.toolbar) {
          slotConfig[name] = props => {
            return (
              scopedSlots[this.toolbar[name]] &&
              scopedSlots[this.toolbar[name]]({
                tableData: this.tableList,
                selectedList: this.selectedList,
                $table: this,
              })
            )
          }
        }
        let {offsetHeader} = this.sticky
        let style = {}
        if (offsetHeader) {
          style = {top: offsetHeader + 'px'}
        }
        return (
          <div class='s-table-toolbar' style={style}>
            <s-toolbar scopedSlots={{...slotConfig}}></s-toolbar>
            {this.renderSetUp()}
          </div>
        )
      }
    },
    renderSPagination() {
      if (this.pagination) {
        let on = {
          'size-change': val => {
            this.localPagination.pageSize = val
            this.localLoad ? this.localLoadTable() : this.loadTable()
          },
          'current-change': val => {
            this.localPagination.currentPage = val
            this.expandRowList = []
            this.localLoad ? this.localLoadTable() : this.loadTable()
          },
        }
        let slot = {}
        let scopedSlots = this.$scopedSlots
        slot['action'] = props => {
          return (
            scopedSlots['pagerAction'] &&
            scopedSlots['pagerAction']({
              tableData: this.tableList,
              selectedList: this.selectedList,
              $table: this,
            })
          )
        }
        return (
          <SPagination
            ref='pagination'
            scopedSlots={{...slot}}
            {...{props: this.localPagination, on: on}}></SPagination>
        )
      }
    },
    updateLayout() {
      if (this.$refs.pagination) {
        let stableRect = this.$el.getBoundingClientRect()
        let win = document.documentElement.offsetWidth
        let style = this.$refs.pagination.$el.style
        let offsetLeft = this.pagerOffset[0] || 0
        let offsetRight = this.pagerOffset[1] || 0
        style.left = stableRect.left - offsetLeft + 'px'
        style.right = win - stableRect.right - offsetRight + 'px'
      }
      if (this.needScroll) {
        let tableReact = this.$refs.table.$el.getBoundingClientRect()
        this.tableHeight = window.innerHeight - tableReact.top - 10 - 56 - 20
      }
    },
    observe() {
      this.tableListener = new MutationObserver(debounce(this.updateLayout, 0))
      let target = this.$el.querySelector('table')
      this.tableListener.observe(target, {
        attributes: true,
        childList: true,
      })
    },
  },
  render(h) {
    let renderColumns = this.renderColumn(this.localColumns)
    let props = {
      ...this.$props,
      data: this.tableList,
      //height: this.tableHeight,
    }
    let on = {
      ...this.$listeners,
      'selection-change': selection => {
        this.selectedList = selection
      },
    }
    return (
      <div class={['s-table', this.shadow ? 'is-always-shadow' : '']} v-loading={this.loading}>
        <div class={['s-table-wrapper']}>
          {this.renderSToolbar()}
          <el-table style='min-height:300px' ref='table' {...{props, on: on}}>
            {renderColumns}
          </el-table>
          {this.renderSPagination()}
        </div>
      </div>
    )
  },
}
