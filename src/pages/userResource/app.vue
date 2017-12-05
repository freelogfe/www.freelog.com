<template id="userResource">
<el-row >
  <el-col :span="12" :offset="6" >
  <div class="mainContent">
    <user-nav-bar index="4"></user-nav-bar>
    <div class="contentBody">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
          <template slot-scope="scope">
            <a>{{ scope.row.address }}</a>
            <el-button
     size="mini"
     @click="handleEdit(scope.$index, scope.row)">查看</el-button>
     <el-button
  size="mini"
  @click="handleContract(scope.$index, scope.row)">管理合同</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
          tableData: [{
            date: '2016-05-02',
            name: 'philyoung',
            address: 'address1'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
    },
    components:{UserNavBar},
    mounted(){

    },
    methods: {
      handleSelect() {

      },
      handleEdit (index,row) {
        console.log(index);
        console.log(row.address);
      },
      handleContract () {
        console.log('管理合同');
      }
    }
}
</script>

<style lang="less" scoped>
  @import "app.less";
</style>
