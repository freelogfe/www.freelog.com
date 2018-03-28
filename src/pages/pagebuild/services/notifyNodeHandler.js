import {Message} from 'element-ui'

export default {
  name: 'notifyNodeHandler',
  handle(data, app, callback) {
    Message({
      type: 'success',
      message: '已通知节点'
    })
  }
}