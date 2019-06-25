/**
 * 去往登录界面
 * @param {boolean} recover 登录成功后，是否需要恢复到退出界面
 * @param {string} redirect 自定义需要恢复到的 URL
 */
function gotoLogin(recover = false, redirect) {
    const loginPath = '/auth';

    // 判断当前是否
    // if (window.location.pathname === loginPath) {
    //     return;
    // }

    // 登录界面的 URL
    let loginUrl = `${window.location.origin.replace('console', 'www')}${loginPath}`;

    // 如果需要恢复，再在 URL 加上 redirect 的参数
    if (recover) {
        redirect = redirect || window.location.href;
        loginUrl += `?redirect=${encodeURIComponent(redirect)}`;
    }

    window.location.href = loginUrl;
}

export {
    gotoLogin,
};
