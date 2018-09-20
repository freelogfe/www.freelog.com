<template>
  <div>
    <nav-top-bar></nav-top-bar>
    <el-container class="app-container">
      <user-aside-nav></user-aside-nav>
      <el-main class="main-app-content" :class="[themeCls]">
        <!--<div id="main-app"></div>-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavTopBar from '@/components/NavTop/index.vue'
import UserAsideNav from '@/components/UserAsideNav/index.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      personal: 'personal'
    }),
    themeCls() {
      return this.$route.meta.theme || 'white'
    }
  },

  mounted() {
  },
  components: {
    NavTopBar,
    UserAsideNav
  },
  methods: {}
}
</script>
<style lang="less" scoped>
  @import "index.less";
</style>
