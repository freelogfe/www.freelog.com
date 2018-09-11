// 无效的响应
export const HANDLE_INVALID_RESPONSE = 'HANDLE_INVALID_RESPONSE'
export function handleInvalidResponse (inValidResponse, callback){
    return {
        name: HANDLE_INVALID_AUTH, inValidResponse, callback
    }
}

// 无效授权
export const HANDLE_INVALID_AUTH = 'HANDLE_INVALID_AUTH'
export function handleAuthError (){
    return {
        name: HANDLE_INVALID_AUTH, 
    }
}

// 跳转去登陆页面
export const GO_TO_LOGIN = 'GO_TO_LOGIN'
export function goToLogin (){
    return {
        name: GO_TO_LOGIN, 
    }
}

// 上报错误
export const REPORT_ERROR = 'REPORT_ERROR'

// 显示"资源签约"模对话框
export const SHOW_SIGN_DIALOG = 'SHOW_SIGN_DIALOG'

// 显示右侧工具栏
export const SHOW_TOOL_BAR = 'SHOW_TOOL_BAR'

// 通知节点
export const NOTIFY_NODE = 'NOTIFY_NODE'

// 显示错误信息
export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE'



