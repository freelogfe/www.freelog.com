export default function notifyNode (msg){
    msg = typeof msg == 'string' ? msg : '节点资源合同未生效，已通知节点'
        EC.appUiVm.$message({
            type: 'error',
            message:  msg
        })
}