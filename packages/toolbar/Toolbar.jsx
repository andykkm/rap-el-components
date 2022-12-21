export default {
  name: 'SToolbar',
  components: {},
  props: {},
  data() {
    return {}
  },
  render() {
    return (
      <div class='s-toolbar'>
        <div class='s-toolbar-container'>
          <div class='s-toolbar-left'>{this.$scopedSlots.left && this.$scopedSlots.left()}</div>
          <div class='s-toolbar-right'>{this.$scopedSlots.right && this.$scopedSlots.right()}</div>
        </div>
      </div>
    )
  },
}
