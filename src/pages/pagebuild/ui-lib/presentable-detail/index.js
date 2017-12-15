import {CONTRACT_STATUS_TIPS} from '../config'

export default {
    name: 'presentable-detail',
    data(){
      return {
          CONTRACT_STATUS_TIPS: CONTRACT_STATUS_TIPS
      }
    },
    props: {
        data: {
            type: Object,
            default() {
                return null
            }
        }
    }
}