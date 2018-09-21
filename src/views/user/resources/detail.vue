<template>
  <div class="resource-contract-detail-view">
    <account-layout ref="layout" title="资源详情" :showFooter="false" return-name="/resources">

      <single-contract
              style="width: 100%"
              v-if="isRenderContract"
              :presentable="presentable"
              :contractIDs="contractIDs"
              @close-dialog="goBack"
      ></single-contract>
    </account-layout>

  </div>
</template>

<script>
import singleContract from '@/views/pagebuild/views/resource-contract/single-contract.vue'
import { mapGetters } from 'vuex'
import AccountLayout from '../layout.vue'

export default {
  name: 'resource-contract-detail-view',

  data() {
    return {
      presentable: null,
      contractIDs: [],
      isRenderContract: false
    }
  },

  props: {
  },

  components: { AccountLayout, singleContract },

  mounted() {
    const { resourceId, presentableId, partyTwo } = this.$route.query

    Promise.all([
      this.$axios.get(`/v1/presentables/${presentableId}`).then(res => res.data),
      this.$axios.get(`/v1/contracts/contractRecords?resourceIds=${resourceId}&partyTwo=${partyTwo}&contentType=3`).then(res => res.data)
    ])
      .then(([res1, res2]) => {
        if (res1.errcode === 0 && res1.data) {
          this.presentable = res1.data
        }
        if (res2.errcode === 0 && res2.data) {
          res2.data.forEach((item) => {
            if (presentableId === item.targetId) {
              this.contractIDs.push(item.contractId)
            }
          })
        }
        this.isRenderContract = true
      })
  },

  computed: {
    ...mapGetters({
      user: 'session'
    })
  },


  methods: {
    goBack() {
      this.$refs.layout.goBack()
    }

  },

  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped type="text/less">

</style>
