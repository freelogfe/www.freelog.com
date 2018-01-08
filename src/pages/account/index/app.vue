<template id="accountManagement">
  <div id="app">
    <ul class="setting-items">
      <li>
        <span class="setting-title"><label>loginName</label></span>
        <span class="setting-desc">{{user.email||user.mobile}}</span>
        <div class="setting-action">
          <el-button type="text">查看</el-button>
        </div>
      </li>
      <li>
        <span class="setting-title"><label>用户名</label></span>
        <span class="setting-desc">{{user.nickname}}</span>
      </li>
      <li>
        <span class="setting-title"><label>用户角色</label></span>
        <span class="setting-desc">{{userRoles}}</span>
      </li>
    </ul>
  </div>
</template>


<script>
  import store from '@/lib/storage'

  export default {
    data() {

      return {
        user: store.get('userInfo') || {}
      }
    },
    mounted() {
    },
    computed: {
      userRoles: function () {
        var userRoleByte = this.user.userRole;
        var roles = [
          {val: 1, name: '普通用户'},
          {val: 2, name: '节点商'},
          {val: 4, name: '资源商'}
        ].reduce((roles, item) => {
          if ((item.val & userRoleByte) === item.val) {
            roles.push(item.name)
          }
          return roles
        }, [])

        return roles.join('|')
      }
    },
    methods: {}
  }
</script>
<style lang="less">
  @import "app.less";
</style>
