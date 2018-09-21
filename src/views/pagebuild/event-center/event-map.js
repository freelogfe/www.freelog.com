import handleAuthError from '../event-handlers/authError'
import showResourceSignDialog from '../event-handlers/showResourceSignDialog'
import handleInvalidResponse from '../event-handlers/invalidResponse'
import goToLogin from '../event-handlers/goToLogin'
import notifyNode from '../event-handlers/notifyNode'
import reportError from '../event-handlers/reportError'

// 异常码对应的解释和eventName
import { HANDLE_INVALID_RESPONSE, HANDLE_INVALID_AUTH, GO_TO_LOGIN, NOTIFY_NODE, REPORT_ERROR, SHOW_SIGN_DIALOG } from './event-name'

const eventSet = [
  // 无效的响应
  { name: HANDLE_INVALID_RESPONSE, handler: handleInvalidResponse },
  // 无效授权
  { name: HANDLE_INVALID_AUTH, handler: handleAuthError },
  // 跳转去登陆页面
  { name: GO_TO_LOGIN, handler: goToLogin },
  // 通知节点
  { name: NOTIFY_NODE, handler: notifyNode },
  // 上报错误
  { name: REPORT_ERROR, handler: reportError },
  // 显示"资源签约"模对话框
  { name: SHOW_SIGN_DIALOG, handler: showResourceSignDialog },
]

export default eventSet
