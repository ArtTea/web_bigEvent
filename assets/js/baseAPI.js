$.ajaxPrefilter(function (option) {
    // 为所有的url添加根目录
    option.url = 'http://www.liulongbin.top:3007' + option.url;
    // 统一为有权限的接口，设置headers请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers= {
            Authorization:localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂在comolete回调函数
    option.complete=function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        // 清空本地存储的token
            localStorage.removeItem('token');
        // 跳转回登录页面
            location.href = '/login.html';
        }
     }
})