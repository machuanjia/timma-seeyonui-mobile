/**
 * Created by Administrator on 14-9-30.
 */

//显示加载器 jquery Mobile
function showLoader(text, text_visible, theme, text_only, html_content) {
    $.mobile.loading('show', {
        text: text,                  //加载器中显示的文字
        textVisible: text_visible,  //是否显示文字
        theme: theme,                //加载器主题样式a-b
        textonly: text_only,        //是否只显示文字
        html: html_content           //要显示的html内容，如图片等
    });
}
//隐藏加载器jQuery Mobile
function hideLoader() {
    //隐藏加载器
    $.mobile.loading('hide');
}

$(function () {
    SyntaxHighlighter.all();
    commonUnit();
    $("#createDialog").unbind().bind("tap", function () {
        var content_dialog = $('<div data-role="popup" id="popupBasic2" data-dismissible="false">' +
            '<div data-role="header" data-theme="a">' +
            '<h1>删除提示</h1>' +
            '</div>' +
            '<div role="main" class="ui-content">' +
            '<h3 class="ui-title">亲，你确认删除你创建的内容?</h3>' +
            '<p>该内容被删除后将无法恢复，请亲慎用</p>' +
            '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back">取消</a>' +
            '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back" data-transition="flow">确认</a>' +
            '</div>' +
            '</div>');
        $("#content").append(content_dialog).trigger('create');
        $(content_dialog).popup("open", {
            transition: "pop"
        });
    });
    $("#createListview").unbind().bind("tap", function () {
        var content_ul = $('<ul data-role="listview" data-inset="true">' +
            '<li><a href="#">C语言</a></li>' +
            '<li><a href="#">Java语言</a></li>' +
            '<li><a href="#">C++语言</a></li>' +
            '<li><a href="#">社会信息</a></li>' +
            '<li><a href="#">社会心里</a></li>' +
            '<li><a href="#">人力资源</a></li>' +
            '</ul>');
        $(".creating_widget_demo").append(content_ul).trigger('create');
    })
    $("#createSelectview").unbind().bind("tap", function () {
        var content_select = $('<select name="select-choice-1" id="select-choice-5" data-native-menu="false" >' +
            '<option>请你选择菜单</option>' +
            '<option value="1">川菜</option>' +
            '<option value="2">粤菜</option>' +
            '<option value="3">浙菜</option>' +
            '<option value="4">广菜</option>' +
            '</select>');
        $(".creating_widget_demo").append(content_select).trigger('create');
    })
    $("#list_click").toggle(
        function () {
            $("#list1").append("<li>动态加载数据——未刷新</li>");
        },
        function(){
            $("#list1").append("<li>动态加载数据——刷新</li>").listview("refresh");
        }
    );
    $("#slider_click").click(function () {
        $("#slider1").val("50").slider("refresh");
    });
    $("#switch_click").click(function () {
        var myswitch = $("#switch1");
        myswitch[0].selectedIndex = 1;//1、2分别表示开或关
        myswitch.slider("refresh");
    });
    $("#select_click").click(function () {
        var myswitch = $("#select1");
        myswitch[0].selectedIndex = 3;
        myswitch.selectmenu("refresh");
    });
    $("#radio_click_1").click(function () {
        $(".radio1").prop("checked",false).checkboxradio('refresh');
        $(".radio2").prop("checked", true).checkboxradio("refresh");
    });
    $("#radio_click_2").click(function () {
        $("input[name='man']").removeAttr("checked").checkboxradio('refresh');
        $("input[value='3']").attr("checked",true).checkboxradio('refresh');
    });
    $("#checkbox_click_1").click(function () {
        $(".checkbox_select").prop("checked", true).checkboxradio("refresh");
    });
    $("#checkbox_click_2").toggle(
        function () {
            $('#checkbox-2a,#checkbox-2c').attr('checked', true).checkboxradio('refresh');
        },
        function () {
            $('#checkbox-2a,#checkbox-2c').removeAttr('checked').checkboxradio('refresh');
        })
    $("#button_click_1").toggle(
        function () {
            $("#button1").val("按钮修改完成——1").button("refresh");
            $("#button2").text("按钮修改完成——2");
        },
        function () {
            $("#button1").val("修改完成——3").button("refresh");
            $("#button2").text("按钮修改完成——4");
        }
    )
    $("#button_click_2").toggle(
        function () {
            var button_model = $("<input type='button' value='开始' />");
            $(".button0").append(button_model);
            $(button_model).button("refresh");
        },
        function () {
            var button_model = $("<input type='button' value='开始—1' />");
            $(".button0").append(button_model);
            $(button_model).buttonMarkup("refresh");
        }
    )
    $("#table_click_1").toggle(
        function () {
            var tr_obj = $("<tr id='add_tr'><td>005</td><td>杨波</td><td>销售总监</td><td>5年</td><td>四川成都</td></tr>");
            $("#my_table").append(tr_obj).table("refresh");
            tr_obj.css("background","rgb(213, 253, 255)");
        },
        function () {
            $("#add_tr").remove();
        }
    )
    $("#table_click_2").one("click",function () {
        $(".table_address").attr("data-priority","4");
        $("#my_table").table('refresh');
    });

    $("#show_bar_a").tap(function () {
        showLoader("加载中...", true, "a", false, "");
    });
    $("#show_bar_text_a").tap(function () {
        showLoader("加载中...", true, "a", true, "");
    });
    $("#show_bar_b").tap(function () {
        showLoader("加载中...", true, "b", false, "");
    });
    $("#show_bar_text_b").tap(function () {
        showLoader("加载中...", true, "b", true, "");
    });
    $("#user_defined").tap(function () {
        showLoader("", true, "b", false, "<span class='loading'></span><h1>加载中...</h1>");
    });
    $("#hide_bar").tap(function () {
        hideLoader();
    });
})

