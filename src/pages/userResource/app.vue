<template id="userResource">
<el-row >
  <el-col :span="12" :offset="6" >
  <div class="mainContent">
    <user-nav-bar index="4"></user-nav-bar>
    <div class="contentBody">

      <!-- 签约弹出框 -->
      <el-dialog
              :close-on-click-modal="false"
              title="管理合同"
              :visible.sync="shouldShowAuthDialog"
              :fullscreen="false"
              custom-class="auth-dialog"
              width="50%"
              center>
      </el-dialog>

      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="createDate"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="resourceId"
          label="资源号"
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
          tableData: [],
          shouldShowAuthDialog: false,
        }
    },
    components:{UserNavBar},
    mounted(){
      console.log('123');
      this.loadPolicyDetail();
    },
    methods: {
      loadPolicyDetail(authData) {
          var self = this
          var url = '/api/v1/contracts?contractType=3';
          // window.QI.fetch(url).then(function (res) {
          //     return res.json();
          // }).then(function (data) {
          //     console.log(data);
          // })
          this.tableData = [{"contractId":"5a0ea031d8eb01001f683b1e","targetId":"5a0d5b414a9fea0020d9ca41","resourceId":"8d91deb053f95a2e354213f97428f6847bab8d99","partyOne":10013,"partyTwo":10022,"segmentId":"b4a047741683c7e9c57c563afa8e4364","contractType":3,"createDate":"2017-11-17T08:39:13.128Z","status":2},{"contractId":"5a128bd5f8031c002ad68d8d","targetId":"5a0d5b414a9fea0020d9ca41","resourceId":"8d91deb053f95a2e354213f97428f6847bab8d99","partyOne":10013,"partyTwo":10024,"segmentId":"b4a047741683c7e9c57c563afa8e4364","contractType":3,"createDate":"2017-11-20T08:01:25.843Z","status":3},{"contractId":"5a13ed0b386cad001fe6a6f1","targetId":"5a0d5b524a9fea0020d9ca45","resourceId":"224787e17fb58795e771d90c5a7c5d3fff5d8427","partyOne":10013,"partyTwo":10024,"segmentId":"42ac7ee3da36551cda1a502adf1590b1","contractType":3,"createDate":"2017-11-21T09:08:27.955Z","status":2},{"contractId":"5a15263ca4ec47001f87aabc","targetId":"5a0d5b594a9fea0020d9ca47","resourceId":"e4c5f834c5cc283fffd536ac2a0685217e6356f9","partyOne":10013,"partyTwo":10024,"segmentId":"3501abf30c8160b2c5eba11bc823d0f7","contractType":3,"createDate":"2017-11-22T07:24:44.117Z","status":3},{"contractId":"5a154645291767001f9631ba","targetId":"5a0e44ba96b30b001f5670f1","resourceId":"06956e1cb63a5585878c149ddcf37e4286833dcc","partyOne":10013,"partyTwo":10024,"segmentId":"53ff30cc65789c3895923545b6b1b287","contractType":3,"createDate":"2017-11-22T09:41:25.226Z","status":2},{"contractId":"5a163008e173e3001fe24307","targetId":"5a151dc6c91a1200207cee58","resourceId":"0c0fe9a61e0b9e51475fea21daf36ae1277afa8f","partyOne":10013,"partyTwo":10024,"segmentId":"951c14911ec246f98e45f21612848e56","contractType":3,"createDate":"2017-11-23T02:18:48.318Z","status":3},{"contractId":"5a168b0530cb17001ffcd920","targetId":"5a0d4e124a9fea0020d9ca3f","resourceId":"d26c5064ab7278d20fa559680eebd87b5b00e66b","partyOne":10013,"partyTwo":10024,"segmentId":"0aba1df10df44021495ce8e088d1225e","contractType":3,"createDate":"2017-11-23T08:47:01.593Z","status":2}]
      },
      handleSelect() {

      },
      handleEdit (index,row) {
        console.log(index);
        console.log(row.address);
      },
      handleContract () {
        this.shouldShowAuthDialog = true;
        console.log('管理合同');
      }
    }
}
</script>

<style lang="less" scoped>
  @import "app.less";
</style>
