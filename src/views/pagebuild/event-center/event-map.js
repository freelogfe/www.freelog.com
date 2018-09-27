import handleAuthError from '../event-handlers/authError'
import showResourceSignDialog from '../event-handlers/showResourceSignDialog'
import handleInvalidResponse from '../event-handlers/invalidResponse'
import goToLogin from '../event-handlers/goToLogin'
import notifyNode from '../event-handlers/notifyNode'
import reportError from '../event-handlers/reportError'

// 异常码对应的解释和eventName
import {
  HANDLE_INVALID_RESPONSE,
  HANDLE_INVALID_AUTH,
  GO_TO_LOGIN,
  NOTIFY_NODE,
  REPORT_ERROR,
  SHOW_SIGN_DIALOG
} from './event-name'

const EventsMap = {
  // 无效的响应
  [HANDLE_INVALID_RESPONSE]: handleInvalidResponse,
  // 无效授权
  [HANDLE_INVALID_AUTH]: handleAuthError,
  // 跳转去登陆页面
  [GO_TO_LOGIN]: goToLogin,
  // 通知节点
  [NOTIFY_NODE]: notifyNode,
  // 上报错误
  [REPORT_ERROR]: reportError,
  // 显示"资源签约"模对话框
  [SHOW_SIGN_DIALOG]: showResourceSignDialog
}

export default EventsMap
