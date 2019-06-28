import {axios } from '@/lib';
/**
 * 去往登录界面
 * @param {boolean} isForceQuit 是否是因登录信息失效，而强制进行的退出
 * @param {boolean} recover 登录成功后，是否需要恢复到退出界面
 * @param {string} redirect 自定义需要恢复到的 URL
 */
async function gotoLogin(isForceQuit = false, recover = false, redirect) {
    // console.log('!@#$!@#$!@#$@#$@#$12341234');
    const loginPath = '/auth';

    // 判断当前是否
    // if (window.location.pathname === loginPath) {
    //     return;
    // }

    // 如果是用户点击退出，则需要通知后台清空登录信息
    if (!isForceQuit) {
        await axios.get('/v1/passport/logout');
    }

    // 登录界面的 URL
    let loginUrl = `${window.location.origin.replace('console', 'www')}${loginPath}`;

    // 如果需要恢复，再在 URL 加上 redirect 的参数
    if (recover) {
        redirect = redirect || window.location.href;
        loginUrl += `?redirect=${encodeURIComponent(redirect)}`;
    }

    window.location.href = loginUrl;
}

export default {
    gotoLogin,
};
