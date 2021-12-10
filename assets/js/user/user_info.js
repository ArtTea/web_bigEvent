$(function () {
    let form = layui.form;
    let layer=layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6之间！'
            }
        }
    })
    // 初始化表单样式
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url:'/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取信息失败！')
              }
                form.val('formUserInfo', res.data);
            }
        })
    } 
    initUserInfo();
    // 重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return  layer.msg('数据提交失败！')
                }
                layer.msg('数据提交成功！')
                window.parent.getUserInfo()
            }
        })
    })
})