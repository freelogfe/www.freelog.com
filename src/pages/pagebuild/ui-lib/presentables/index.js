import {CONTRACT_STATUS, CONTRACT_STATUS_TIPS} from '../config'


export default {
    name: 'presentables',

    data() {
        return {
            presentables: [],
            CONTRACT_STATUS: CONTRACT_STATUS,
            CONTRACT_STATUS_ACTION_TIPS: {
                '-1': '去创建合同',
                1: '去执行合同', //未开始执行
                2: '去执行合同', //执行中
                3: '合同生效中',
                4: '用户终止合同',
                5: '系统终止合同',
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
        //todo 待分页
        formatPresentableList() {
            var self = this;
            var presentables = self.data
            presentables.forEach((presentable) => {
                self.resovlePresentableStatus(presentable)
            })

            this.presentables =  presentables.slice(0)
            this.presentables.sort((p1, p2) => {
                return (p1._contractStatus - p2._contractStatus)
            })
        },
        resovlePresentableStatus(presentable) {
            if (presentable.contractDetail) {
                presentable._contractStatus = presentable.contractDetail.status
            } else {
                presentable._contractStatus = CONTRACT_STATUS.uncreated
            }

            presentable.statusTip = CONTRACT_STATUS_TIPS[presentable._contractStatus] || 'n/a'
        },
        tabActionHandler(presentable) {
            var tabConfig = {
                content: 'contract-manager',
                data: presentable,
                title: '合同管理',
                name: 'tab' + presentable.presentableId
            }

            switch (presentable._contractStatus) {
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

            this.$emit('tabChange', tabConfig)
        }
    }
}