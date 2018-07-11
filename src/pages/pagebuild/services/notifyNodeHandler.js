import {Message} from 'element-ui'

export default {
  name: 'notifyNodeHandler',
  handle(data, app, callback) {
    Message({
      type: 'success',
      message: '节点资源合同未生效，已通知节点'
    })
  }
}