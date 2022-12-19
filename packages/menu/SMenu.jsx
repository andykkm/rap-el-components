import {Submenu, MenuItem, Menu} from 'element-ui'
export default {
  name: 'SMenu',
  components: {
    ElMenu: Menu,
    ElSubmenu: Submenu,
    ElMenuItem: MenuItem,
  },
  props: Object.assign({}, Menu.props, {
    menus: {
      type: Array,
      default: function () {
        return []
      },
    },
  }),
  data() {
    return {}
  },
  watch: {},
  created() {},
  methods: {
    renderMenu(menus) {
      return menus.map(node => {
        if (node.children && node.children.length) {
          const title = (
            <template slot='title'>
              <i class=''></i>
              <span slot='title'>{node.meta.title}</span>
            </template>
          )
          return (
            <el-submenu index={node.path} key={node.path}>
              {title}
              {this.renderMenu(node.children)}
            </el-submenu>
          )
        } else {
          return (
            <el-menu-item index={node.path} key={node.path}>
              <span slot='title'>{node.meta.title}</span>
            </el-menu-item>
          )
        }
      })
    },
  },
  render() {
    let props = {...this.$props}
    return (
      <el-menu {...{props}} on={this.$listeners}>
        {this.renderMenu(this.menus)}
      </el-menu>
    )
  },
}
