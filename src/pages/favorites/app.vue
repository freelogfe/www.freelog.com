<template id="userResource">
<el-row >
  <el-col :span="12" :offset="6" >
  <div class="mainContent">
    <user-nav-bar index="3"></user-nav-bar>

  </div>
</el-col>
</el-row>

</template>

<script>
import UserNavBar from '@/pages/userCenterNavBar/index.vue';
export default {
    name: 'user-resource',
    data(){
        return {

        }
    },
    components:{UserNavBar},
    mounted(){

    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
  @import "app.less";
</style>
