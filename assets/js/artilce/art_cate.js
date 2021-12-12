$(function () {
    let layer = layui.layer
    let form = layui.form;
    initAddCate();
    // 初始化表单数据
    function initAddCate() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('请数据拉取失败')
                }
                let htmls=  template('tpl-table',res)
                $('tbody').html(htmls);
            }
        })
    }
    let indexAdd = null;
    // 绑定点击事件弹出动态框
    $('#btnAddCate').on('click', function () {
      indexAdd=  layer.open({
            type: 1, 
            title: '添加文章分类',
            content: $('#dialog-add').html(),
            area: ['500px', '250px']

        });     
    })
    // 通过代理，监听表单的提交事件新增数据
    $('body').on('submit', '#form-add', function (e) {
      e.preventDefault()
        
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                     return layer.msg('新增分类失败！')
                }
                initAddCate();
                layer.close(indexAdd)
                layer.msg('新增分类成功！')

            }
        })
    })
    let indexedit = null
    // 通过代理方式，给修改案例绑定弹出动态框事件
    $('tbody').on('click', '.btn-edit', function () {
        indexedit=  layer.open({
            type: 1, 
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
            area: ['500px', '250px']
        });
        let id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res.data);

                form.val("form-edit" ,res.data)
            }
        })
    })
    // 通过代理方式，完成修改表单事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
          $.ajax({
              method: 'POST',
              url: '/my/article/updatecate',
              data: $(this).serialize(),
              success: function (res) {
                  if (res.status !== 0) {
                       return layer.msg('修改分类失败！')
                  }
                  layer.close(indexedit)
                  initAddCate();
                  layer.msg('修改分类成功！')
  
              }
          })
    })
    // 通过代理方式发起删除表单数据事件
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id');
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            console.log(id);
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + toString(id),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.close(index);
                    layer.msg('删除分类成功！')
                    initAddCate();
                }
            })
            
        });
    })
})