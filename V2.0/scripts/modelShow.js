/**
 * Created by Administrator on 14-9-24.
 */
/**
 * 组件初始化
 */
function commonUnit() {
    $(".comp").each(function() {
        var compObj = eval("({" + $(this).attr("comp") + "})");
        if (compObj.type == "modelTopChange") {
            modelTopChange($(this), compObj);
        }
    })
}
/**
 * modelTopChange 模块顶部变化
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function modelTopChange(domObj,compObj){
    domObj.find("a").bind({
        mouseover:function(){
            $(this).addClass("a_hover");
        },
        mouseout:function(){
            $(this).removeClass("a_hover");
        },
        click:function(){
            domObj.find("a").removeClass("a_active");
            $(this).addClass("a_active");
            setTimeout(function(){
                var hash = window.location.hash;
                if(hash){
                    if($("body").hasClass("jqm_load")){
                        if($("body").hasClass("jqm_ipad")){
                            $(".nav_area").css("margin-top","18px");
                        }
                        else{
                            $(".nav_area").css("margin-top","19px");
                        }
                    }
                }
            },50)
        }
    })
    windowScroll();
}
function windowScroll(){
    var temp = $('<div class="return_top tossing">回到顶部</div>');
    $("body").append(temp);
    $(window).bind("scroll", function(){
        var win_top = $(window).scrollTop();
        if(win_top != 0){
            temp.show();
        }
        else{
            temp.hide();
        }
    });
    temp.bind("click",function(){
        $(window).scrollTop(0)
    })
}

function show(id){
    var temp = id+":"+$("#"+id)[0].checked;
    showLoader(temp,true,"b",true,"");
    setTimeout(function(){
        $.mobile.loading('hide');
    },2000);
}
function showLoader(text,text_visible,theme,text_only,html_content) {
    $.mobile.loading('show', {
        text: text,                  //加载器中显示的文字
        textVisible: text_visible,  //是否显示文字
        theme: theme,                //加载器主题样式a-b
        textonly: text_only,        //是否只显示文字
        html: html_content           //要显示的html内容，如图片等
    });
}