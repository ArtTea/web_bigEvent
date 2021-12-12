$(function () {
    let layer = layui.layer;
    let form = layui.form;
    let laypage = layui.laypage;
    let q = {
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }
    initTable();
    initcate();

    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })


    template.defaults.imports.dataFormat= function (date) {
        const dt = new Date(date)

        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let s = padZero(dt.getDate());

        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());
        return y+'-'+m+'-'+s+' '+hh+':'+mm+':'+ss
    }
    function padZero(n) {
       return n>9?n:'0'+n
    }
    // 初始化文章列表
    function initTable() {
        $.ajax({
            method: 'GET',
            url:'/my/article/list',
            data: q,
            success: function (res) {
                var todylist = template('tpl-table', res)
                $('tbody').html(todylist);
                rendpage(res.total);
            }
        })
    }

    // 初始化下拉菜单
    function initcate(){
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('数据更新失败')
                }
                var selecrlist = template('tpl-cate', res)
                $('[name=cate_id]').html(selecrlist)
                form.render();
            }
        })
       
        
    }
    function rendpage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            limits:[2,3,5,7,9],
            curr: q.pagenum,
            layout:['count','limit','prev', 'page', 'next','skip'],
            jump: function (obj,first) {
               q.pagenum=obj.curr; //得到当前页，以便向服务端请求对应页的数据。
               q.pagesize=obj.limit
                if (!first) {
                    initTable()
                }
              }
        });
    }
    $('tbody').on('click', '.btn-delete', function () {
        // 拿到删除按钮的个数
        let len=$('.btn-delete').length
        let id= $(this).attr('data-id')
        layer.confirm('确定要删除吗?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除数据失败')
                    }
                    layer.close(index);
                    if (len === 1) {
                        q.pagenum=q.pagenum===1?1:q.pagenum-1 
                    }
                    initTable()
                    layer.msg('删除数据成功')
                }
            })
            
          });
    })
})