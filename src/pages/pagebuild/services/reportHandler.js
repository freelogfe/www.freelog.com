import {Message} from 'element-ui'

export default {
  name: 'reportHandler',
  handle(data, appUI, callback) {
    Message({
      message: '已上报',
      type: 'success'
    })
  }
}