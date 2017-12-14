<template>
    <div id="app">
        <tool-bar></tool-bar>
        <el-dialog
                :close-on-click-modal="false"
                title="合约管理列表"
                :visible.sync="shouldShowAuthDialog"
                :fullscreen="false"
                custom-class="auth-dialog"
                @close="_closeDialogHandler"
                width="50%"
                center>

            <el-tabs v-model="activeTabName" type="border-card" @tab-remove="_removeTab">
                <el-tab-pane label="presentable list" name="presentables">
                    <presentables :data="presentables" @tabChange="_tabChange"></presentables>
                </el-tab-pane>
                <el-tab-pane
                        closable
                        :key="item.name"
                        v-for="(item, index) in tabs"
                        :label="item.title"
                        :name="item.name">
                    <component :is="item.content" :data="item.data"></component>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    import ToolBar from '@/components/toolbar/index.vue'
    import ContractState from './ui-lib/contract-state/index.vue'
    import Presentables from './ui-lib/presentables/index.vue'
    import Contract from './ui-lib/contract/index.vue'
    import Policy from './ui-lib/policy/index.vue'


    export default {
        data() {
            return {
                shouldShowAuthDialog: true,
                presentables: [],
                tabs: [],
                activeTabName: 'presentables'
            }
        },
        components: {
            ToolBar,
            ContractState,
            Presentables,
            'contract-manager': Contract,
            'policy-manager': Policy
        },
        mounted() {
            this.$emit('ready', this)
        },
        methods: {
            _tabChange(data) {
                var isExisted = this.tabs.some((tab) => {
                    return tab.name === data.name
                })

                if (!isExisted) {
                    this.tabs.push(data);
                }
                this.activeTabName = data.name;
            },
            _removeTab(targetName) {
                let activeName = this.activeTabName;
                if (activeName === targetName) {
                    this.tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = this.tabs[index + 1] || this.tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            } else {
                                activeName = null
                            }
                        }
                    });
                }

                this.activeTabName = activeName || 'presentables';
                this.tabs = this.tabs.filter((t) => {
                    return t.name !== targetName
                })
            },
            _closeDialogHandler() {
                //todo call callbacks
                this.$emit('close')
            },
            showAuthDialog() {
                this.shouldShowAuthDialog = true;
            },
            appendData(data) {
                this.presentables.push(data)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "./app.less";

</style>
