<template>
  <div>
    <nav-top-bar></nav-top-bar>
    <el-container class="app-container">
      <el-header>
        <!--header-->
      </el-header>
      <el-container>
        <el-aside>
          <el-menu :default-active="activeIndex">
            <el-menu-item @click="routeHandler(0)" index="0"><i
                    class="el-icon-fa-user-circle-o"></i>基本信息
            </el-menu-item>
            <el-menu-item @click="routeHandler(1)" index="1"><i class="el-icon-fa-lock"></i>安全设置
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="background: white;">
          <div id="main-app"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
  import NavTopBar from '@/components/NavTop/index.vue'

  export default {
    data() {
      return {
        activeIndex: '0',
        routerMap: {
          0: '/pages/account/index.html',
          1: '/pages/account/security.html'
        }
      }
    },
    mounted() {
      this.initDefaultAcitve()
    },
    components: {
      NavTopBar
    },
    methods: {
      initDefaultAcitve() {
        var pathname = location.pathname
        for (const [index, path] of Object.entries(this.routerMap)) {
          if (path === pathname) {
            this.activeIndex = index.toString();
            break;
          }
        }
      },
      routeHandler(index) {
        location.href = this.routerMap[index] || '/'
      }
    }
  }
</script>
<style lang="less">
  .app-container {
    width: 990px;
    margin: auto;
  }
</style>
