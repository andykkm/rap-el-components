<template>
  <div class="main">
    <div class="main-lt">
      <SMenu :menus="menus" :router="true" :default-active="currentActive"></SMenu>
    </div>
    <div class="main-rg">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {routes} from '../router'
import SMenu from '../../packages/menu'
export default {
  name: 'Home',
  components: {
    SMenu,
  },
  data() {
    return {
      menus: [],
      currentActive: '',
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function () {
        this.currentActive = this.$route.path
      },
    },
  },
  created() {
    this.menus = routes
  },
}
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  overflow: hidden;
  display: flex;
}
.main-lt {
  height: 100vh;
  width: 200px;
  border-right: 1px solid #dcdcdc;
}
.main-rg {
  height: 100vh;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
}
</style>
