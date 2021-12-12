$(function () {
    let layer = layui.layer;
    let form = layui.form;
    initCate()
    initEditor()
    // 初始化下拉菜单 
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('数据更新失败')
                }
                let htmls = template('tpl-cate', res);
                $("[name=cate_id]").html(htmls);
                form.render();
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')
     
    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#coverFlie').click();
    })
    $('#coverFlie').on('change', function (e) {
        let flies =  e.target.files;
        if (flies.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(flies[0]);
        $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)
    })
    let state = '已发布';
    // 监听存为草稿按钮
    $('#btnSave2').on('click', function () {
        state = '草稿';
    })
    // 绑定submit表单提交事件
    $('#form-pub').on('submit', function (e) {
    // 阻止表单的默认提交行为
        e.preventDefault();
        var fb = new FormData($(this)[0])
        fb.append('state', state)
   
        $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
         width: 400,
        height: 280
        }).toBlob(function (blob) {
            fb.append('cover_img', blob)
            publishArticle(fb);
        })                                          
    })
    // 发布新文章函数
    function publishArticle(fb) {
        $.ajax({
            method: "POST",
            url: '/my/article/add',
            data: fb,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.status!==0) {
                    return layer.msg('发布文章失败')
                }
                layer.msg('发布文章成功')
                location.href='/article/art_list.html'
            }
        })
    }

})