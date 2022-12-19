import {Pagination} from 'element-ui'
export default {
  name: 'SPagination',
  components: {
    ElPagination: Pagination,
  },
  props: {
    ...Pagination.props,
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    background: {
      type: Boolean,
      default: true,
    },
    setStyle: {
      type: Object,
      default: function () {
        return {}
      },
    },
    pageSizes: {
      type: Array,
      default: function () {
        return [30, 50, 100, 300]
      },
    },
    position: {
      type: String,
      default: 'fixed',
    },
  },
  render() {
    const action = this.$scopedSlots.action
    const props = this.$props
    const on = {...this.$listeners}
    const position =
      's-pagination-pos-' +
      (['fixed', 'static'].includes(props.position) ? props.position : 'static')
    return (
      <div class={['s-pagination', position]} style={this.setStyle}>
        <div class='s-pagination-action'>{action && action(props)}</div>
        <el-pagination {...{props, on}}></el-pagination>
      </div>
    )
  },
}
