$(function() {
    const form = layui.form;
    const layer = layui.layer;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });

    // 初始化用户信息
    const initUserInfo = ()=> {
        $.ajax({
            type: "GET",
            url:'/my/userinfo',
            success:(res) =>{
              if (res.status !== 0) return layer.msg("获取用户信息失败！")
              form.val("formUserInfo", res.data);
            }
        })
    }
    initUserInfo();

    // 实现点击重置
    $("#btnReset").click((e) => {
        e.preventDefault();
        initUserInfo();
    })

    // 更新用户功能
    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:'/my/userinfo',
            data:$(".layui-form").serialize(),
            success: (res) => {
                console.log(res);
                if(res.status !== 0) return layer.msg("更新用户信息失败！")
                layer.msg("更新用户信息成功！")
                // 调用父页面 index.html 重新渲染头像页面
                window.parent.getUserInfo();
            }
        })
    })
})