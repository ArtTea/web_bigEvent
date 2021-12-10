$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    // 表单验证
    const form = layui.form
    var layer=layui.layer

    form.verify({
        // 自定义一个pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 获取密码的值
            let pwd = $('#form_reg [name=password]').val();
            // 校验两次密码是否一致
            if (pwd !== value) {
                console.log(pwd);
                console.log(value);
                return "两次密码不一致！"
            }
            
        }
    })
    $('#form_reg').on('submit', function (e) {
        // 阻止表单的默认事件
        console.log(44);
        e.preventDefault();
        let data = {username:$('#form_reg [name=uname]').val(),password:$('#form_reg [name=password]').val()}
        $.post("api/reguser", data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录！')
            $('#link_login').click();
        })
    })
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
      e.preventDefault()
      console.log($(this).serialize());
        $.ajax({
          url: 'api/login',
          method: 'POST',
          // 快速获取表单中的数据
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = 'index.html'
          }
        })
      })
})