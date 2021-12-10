$(function () {
    let form = layui.form;
    let layer=layui.layer

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与旧密码一致';
             }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致，请重新确认！';
             }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success:function(res) {
                if (res.status !== 0) {
                    return layer.msg('数据更新失败，请确认数据是否正确！');
                }
                layer.msg('数据更新成功！');
                $('.layui-form')[0].reset();

            }
        })
    })
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        $('.layui-form')[0].reset();
        
    })
})