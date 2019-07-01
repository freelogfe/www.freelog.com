import {axios} from '@/lib';
import {cookieStore} from '@/lib/storage'

/**
 * 去往登录界面
 * @param {boolean} isForceQuit 是否是因登录信息失效，而强制进行的退出，（而非用户点击『退出』的正常退出）
 * @param {boolean} recover 登录成功后，是否需要恢复到退出界面
 * @param {string} redirect 自定义需要恢复到的 URL
 */
async function gotoLogin({isForceQuit = false, recover = false, redirect = ''}) {
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

/**
 * 去往首页
 */
function goHome() {
    window.location.replace(window.location.origin);
}

/**
 * 判断当前是否是登录状态
 * @return {Promise<boolean>}
 */
async function isPermissionValid() {
    return !!(cookieStore.get('authInfo') && cookieStore.get('uid'));
}


/**
 * 获取用户信息
 * @return {Promise<*>}
 */
async function getCurrentUserInfo() {
    let userInfo = null;

    /**
     * 获取当前用户信息，且缓存并返回用户信息
     * @return {Promise<*>}
     */
    async function getInfo() {
        const res = await axios.get('/v1/userinfos/current');
        // console.log(res, 'resfasdfccxvasd');
        userInfo = res.data.data;
        return userInfo;
    }

    // 如果登录信息已存在
    if (cookieStore.get('authInfo') && cookieStore.get('uid')) {

        if (userInfo && userInfo.userId === cookieStore.get('uid')) {
            /*
            如果用户信息已存在, 且用户信息就为当前登录用户
            直接返回用户信息
            */

            return userInfo;
        }

        /*
        如果没有缓存信息
        则去向服务端获取用户信息
        */
        return await getInfo();
    }

    throw new Error('请先登录，才能获取用户信息');
}

export default {
    gotoLogin,
    goHome,
    isPermissionValid,
    getCurrentUserInfo,
};
