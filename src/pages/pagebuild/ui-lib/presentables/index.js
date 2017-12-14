import {CONTRACT_STATUS, CONTRACT_STATUS_TIPS} from '../config'


export default {
    name: 'presentables',

    data() {
        return {
            CONTRACT_STATUS: CONTRACT_STATUS,
            CONTRACT_STATUS_ACTION_TIPS: {
                '-1': '去创建合同',
                1: '去执行', //未开始执行
                2: '去执行', //执行中
                3: '生效中',
                4: '用户终止',
                5: '系统终止',
                6: '合同已终止'
            }
        }
    },
    props: {
        data: {
            type: Array,
            default() {
                return null
            }
        }
    },
    mounted() {
        this.formatPresentableList()
        console.log(this.data)
    },
    watch: {
        data: 'formatPresentableList'
    },
    methods: {
        formatPresentableList() {
            var self = this;
            var presentables = self.data
            presentables.forEach((presentable) => {
                self.resovlePresentableStatus(presentable)
            })
        },
        resovlePresentableStatus(presentable) {
            if (presentable.contractDetail) {
                presentable.contractStatus = presentable.contractDetail.status
            } else {
                presentable.contractStatus = CONTRACT_STATUS.uncreated
            }

            presentable.statusTip = CONTRACT_STATUS_TIPS[presentable.contractStatus] || 'n/a'
        },
        tabActionHandler(presentable) {
            var tabConfig = {
                content: 'contract-manager',
                data: presentable,
                title: '合同管理',
                name: 'tab' + (+new Date())
            }
            switch (presentable.contractStatus) {
                case CONTRACT_STATUS.uncreated:
                    Object.assign(tabConfig, {
                        title: '创建合同',
                        content: 'policy-manager'
                    })
                    break;
                case CONTRACT_STATUS.initial:
                    break;
                case CONTRACT_STATUS.running:
                    break;
                case CONTRACT_STATUS.activated:
                    break;
                case CONTRACT_STATUS.userTerminated:
                    break;
                case CONTRACT_STATUS.sysTerminated:
                    break;
                case CONTRACT_STATUS.terminated:
                    break;
            }

            this.$emit('tabChange', tabConfig) //自己监听自己，但是处理函数定义在父级元素
            // this.$message.warning('todo')
        },
        showPolicyDetailHandler() {

        }
    }
}
