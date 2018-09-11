<template>
  <div id="app">
    <component :is="personal.panelName" :renderData="personal.data"></component>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import NavTopBar from '@/components/NavTop/index.vue'
  import MyProfile from './profile/index'
  import MyCollections from './collections/index'
  import MyAccounts from './accounts/index.vue'
  import MyResources from './resources/index.vue'
  import AccountCreateView from './accounts/create.vue'
  import AccountRechargeView from './accounts/recharge'
  import AccountTransactionRecordsView from './accounts/records'
  import AccountResetPayPasswordView from './accounts/reset'
  import AccountWithdrawView from './accounts/withdraw'
  import AccountTransferView from './accounts/transfer'
  import ResourceContractDetailView from './resources/contract'

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
