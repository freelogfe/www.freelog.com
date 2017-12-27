export const CONTRACT_STATUS = {
    uncreated: -1,
    initial: 1,
    running: 2,
    activated: 3,
    userTerminated: 4,
    sysTerminated: 5,
    terminated: 6
};


export const CONTRACT_STATUS_TIPS = {
    '-1': '未创建合同',
    1: '未开始执行',
    2: '执行中',
    3: '生效中',
    4: '用户终止',
    5: '系统终止',
    6: '合同已终止'
}


export const CONTRACT_STATUS_COLORS = {
    '-1': 'warning',
    1: 'warning',
    2: '',
    3: 'success',
    4: 'info',
    5: 'info',
    6: 'info'
}