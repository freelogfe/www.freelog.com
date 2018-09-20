<template>
  <div id="app">
    <!--<component :is="personal.panelName" :renderData="personal.data"></component>-->
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NavTopBar from '@/components/NavTop/index.vue'
import MyProfile from './profile/index.vue'
import MyCollections from './collections/index.vue'
import MyAccounts from './accounts/index.vue'
import MyResources from './resources/index.vue'
import AccountCreateView from './accounts/create.vue'
import AccountRechargeView from './accounts/recharge.vue'
import AccountTransactionRecordsView from './accounts/records.vue'
import AccountResetPayPasswordView from './accounts/reset.vue'
import AccountWithdrawView from './accounts/withdraw.vue'
import AccountTransferView from './accounts/transfer.vue'
import ResourceContractDetailView from './resources/detail.vue'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      personal: 'personal'
    })
  },

  mounted() {
  },

  components: {
    NavTopBar,
    MyAccounts,
    MyProfile,
    MyCollections,
    MyResources,
    AccountCreateView,
    AccountRechargeView,
    AccountTransactionRecordsView,
    AccountResetPayPasswordView,
    AccountWithdrawView,
    AccountTransferView,
    ResourceContractDetailView
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  @import "app.less";
</style>
