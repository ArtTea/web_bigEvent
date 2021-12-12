$(function () {
    getUserInfo();
    let layer=layui.layer
    $('#btnLoginout').on('click',function(){
        layer.confirm('确认要退出吗？', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地存储的token
            localStorage.removeItem('token');
            // 跳转回登录页面
            location.href='/login.html'
            layer.close(index);
          })
    })
})
// 获取用户信息函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url:'/my/userinfo',
       
        success: function (res) {

            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败！')
          }
            // 调用 renderAvatar渲染用户头像
            renderAvatar(res.data);
        },
        
        
    })
}
function renderAvatar(user) {
    let name = user.nickname || user.username;
    $(".welcome").html('欢迎您  ' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show().siblings('.text-avant').hide();
    } else {
        let first = name[0].toUpperCase();
        $('.text-avant').html(first).show().siblings('.layui-nav-img').hide();
    }
}