<template>
  <Home></Home>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Home from './demo/home.vue'
@Component({
  components: {
    Home,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;
}
</style>
