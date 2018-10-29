<template>
  <div class="resource-contract-detail-view">
    <account-layout ref="layout" title="资源详情" :showFooter="false" return-name="/resources">

      <single-contract
              style="width: 100%"
              v-if="isRenderContract"
              :presentable="presentable"
              @close-dialog="goBack"
      ></single-contract>
    </account-layout>

  </div>
</template>

<script>
import { SingleContract } from '@freelog/freelog-ui-contract/src/index.js'
import { mapGetters } from 'vuex'
import AccountLayout from '../layout.vue'

export default {
  name: 'resource-contract-detail-view',

  data() {
    return {
      presentable: null,
      isRenderContract: false
    }
  },

  props: {
  },

  components: { AccountLayout, SingleContract },

  mounted() {
    const { resourceId, presentableId, partyTwo } = this.$route.query
    this.$axios.get(`/v1/presentables/${presentableId}`).then(res => res.data)
      .then(res => {
        if (res.errcode === 0 && res.data) {
          this.presentable = res.data
          this.isRenderContract = true
        }
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
