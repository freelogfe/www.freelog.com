
export const INVALID_RESPONSE = 'INVALID_RESPONSE'
export function handleInvalidResponse (inValidResponse, callback){
    return {
        name: INVALID_AUTH, inValidResponse, callback
    }
}

export const INVALID_AUTH = 'INVALID_AUTH'
export function handleAuthError (){
    return {
        name: INVALID_AUTH, 
    }
}

export const GO_TO_LOGIN = 'GO_TO_LOGIN'
export function goToLogin (){
    return {
        name: GO_TO_LOGIN, 
    }
}

export const REPORT_ERROR = 'REPORT_ERROR'

export const SHOW_SYSTEM_DIALOG = 'SHOW_SYSTEM_DIALOG'

export const SHOW_TOOL_BAR = 'SHOW_TOOL_BAR'

export const NOTIFY_NODE = 'NOTIFY_NODE'

export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE'
