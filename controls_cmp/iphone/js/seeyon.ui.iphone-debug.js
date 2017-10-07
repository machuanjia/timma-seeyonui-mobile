/**
 * @author machuanjia
 */


/**
 * 附件名字数省略
 * @param first_ele 表示包含附件名文字的元素
 * @param second_ele 表示包含附件名后缀名的元素
 * @param str_ele 表示附件名字符串
 * @param str_ele2 表示附件名后缀字符串(包含圆点)
 */
var str1 = "你好速度是多少速度四大tawksjfkskldfjsak#@##￥#%￥#%你好点就搜到付死农民负担卡死tskfhakjgh附近时刻";
var str2 = ".MP4";
function getVideo(first_ele, second_ele, str_ele, str_ele2) {
//    $(first_ele).empty();
    var ele_width = $(first_ele).parent().width() - 44;
    $(first_ele).css("max-width", ele_width).text(str_ele);
    $(second_ele).text(str_ele2);
}

/**
 *
 *  组件部分
 *
 * */

/**
 * page初始化
 */
function pageInit() {
    $(".comp").each(function () {
        var compObj = eval("({" + $(this).attr("comp") + "})");
        if (compObj.type == "list") {
            listPart($(this), compObj);
        }
        else if (compObj.type == "tabs") {
            listTabs($(this), compObj);
        }
        else if (compObj.type == "radio") {
            userSelect($(this), compObj);
        }
        else if (compObj.type == "slide") {
            slideUpDown($(this), compObj);
        }
    })
}

/**
 * list数据控制
 * @param domObj 当前对象
 * @param dataObjSet 数据数组对象
 */
function listData(domObj, dataObjSet) {
    if(typeof dataObjSet == "function"){
        var dataObj = dataObjSet();
    }
    else{
        var dataObj = dataObjSet;
    }
    var thisObj;
    if (typeof domObj == 'string') {
        thisObj = $("#" + domObj);
    }
    else {
        thisObj = domObj;
    }
    if(dataObj.list_type == 'nav'){
        var liHtml = '<div class="nav_list_box nav_list_box_def">'+
                         '<a href="#" data-transition="slide">' +
                            '<div class="nav_list_box_left">' +
                                '<span class="state_icon ico_phone_22"></span>' +
                            '</div>' +
                            '<div class="nav_list_box_center">' +
                                '<div class="nav_list_box_center_font16 nav_list_box_center_marginBottom">' +
                                    '<label class="nav_title"></label>' +
                                '</div>' +
                                '<div class="nav_list_box_center_font12">' +
                                '   <label class="nav_title_sub"></label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="nav_list_box_right">' +
                                '<div class="nav_list_box_right_ico"></div>' +
                                '<div class="nav_list_box_right_name"><label class="creator"></label></div>' +
                            '</div>' +
                         '</a>' +
                      '</div>';
    }
    else if(dataObj.list_type == 'doc'){
        var liHtml = '<div class="nav_list_box doc_list_box nav_list_box_def">'+
                        '<a href="#" data-transition="slide">' +
                            '<div class="nav_list_box_left">' +
                                '<span class="state_icon ico_phone_70"></span>' +
                            '</div>' +
                            '<div class="nav_list_box_center">' +
                                '<div class="nav_list_box_center_font16 nav_list_box_center_marginBottom">' +
                                     '<label class="nav_title"></label>' +
                                '</div>' +
                                '<div class="nav_list_box_center_font12">' +
                                     '<label class="nav_title_sub"></label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="nav_list_box_right">' +
                                '<div class="nav_list_box_right_ico"></div>' +
                                '<div class="nav_list_box_right_name"><label class="creator"></label></div>' +
                            '</div>' +
                        '</a>' +
                    '</div>';
    }

    else if(dataObj.list_type == 'folder'){
        if(dataObj.leftIconShow == false){
            var left_icon_html = '<span class="state_icon"></span>';
        }
        else{
            var left_icon_html = '<span class="state_icon ico_phone_70"></span>';
        }
        liHtml += '<div class="nav_list_box folder_list_box nav_list_box_def">'+
                        '<a href="#" data-transition="slide">' +
                            '<div class="nav_list_box_left">'
                                +left_icon_html+
                            '</div>' +
                            '<div class="nav_list_box_center">' +
                                '<label class="nav_title"></label>' +
                            '</div>' +
                            '<div class="nav_list_box_right"></div>' +
                        '</a>' +
                      '</div>';
    }

    thisObj.find(".list_num").html(dataObj.list_num);
    thisObj.find(".list_time").html(dataObj.update_time);
    thisObj.find(".more_list_num").html(dataObj.more_num);
    var data_len = dataObj.data.length;
    for (var i = 0; i < data_len; i++) {
        var li_obj = $(liHtml).clone();
        var right_icon_html = "";
        li_obj.attr("objId", dataObj.data[i].listId);
        li_obj.find("a").attr("href", dataObj.data[i].transitionUrl);
        if(dataObj.data[i].leftIcon){
            li_obj.find(".state_icon").addClass(dataObj.data[i].leftIcon);
        }
        li_obj.find(".nav_title").html(dataObj.data[i].centerContent);
        if(dataObj.list_type == 'folder'){
            if(dataObj.data[i].rightIcon){
                var right_icon_len = dataObj.data[i].rightIcon.length;
                for (var j = 0; j < right_icon_len; j++) {
                    switch (dataObj.data[i].rightIcon[j]) {
                        case '1':
                            right_icon_html += '<span class="ico_phone_48 next_department_48"></span>';
                            break;
                    }
                }
                li_obj.find(".nav_list_box_right").html(right_icon_html);
            }
        }
        else{
            var right_icon_len = dataObj.data[i].rightIcon.length;
            for (var j = 0; j < right_icon_len; j++) {
                switch (dataObj.data[i].rightIcon[j]) {
                    case '1':
                        right_icon_html += '<span class="ico_phone_list_16 accessory_16 navlisticon1"></span>';
                        break;
                    case '2':
                        right_icon_html += '<span class="ico_phone_22 meeting_summary_22 navlisticon2"></span>';
                        break;
                }
            }
            li_obj.find(".nav_title_sub").html(dataObj.data[i].centerTime);
            li_obj.find(".nav_list_box_right_ico").html(right_icon_html);
            li_obj.find(".creator").html(dataObj.data[i].rightName);
        }
        thisObj.find(".list_data").append(li_obj);
    }

    //自定义加载滚动条方法
    if (typeof dataObj.callback == "function") {
        dataObj.callback();
    }
}
/**
 * list控制
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function listPart(domObj, compObj) {
    if(domObj.children().length != 0){
//        domObj.empty();
    }
    if (compObj.listType == 'dataRefresh') {
        var pull_down = $('<div class="pullDown">' +
                            '<span class="pullDownIcon"></span>' +
                            '<div class="pullDownText">' +
                                '<p>下拉刷新</p>' +
                                '<p>共<label class="list_num">606</label>条</p>' +
                                '<p>最近更新：<label class="margin_r_5 list_time">2012-08-24&nbsp;12:23</label></p>' +
                            '</div>' +
                           '</div>');
        var pull_up = $('<div class="clickDown loading">' +
                            '<p class="margin_t_15">加载更多</p>' +
                            '<p class="margin_t_5">还有<label class="more_list_num">699</label>条</p>' +
                            '<span class="pullDownIcon"></span>' +
                        '</div>');
        domObj.append(pull_down).append('<div class="list_data"></div>').append(pull_up);
    }
    else if(compObj.listType == 'dataShow'){
        domObj.append('<div class="scroller list_data"></div>');
    }
    var listDataObj = compObj.listGather;
    if (listDataObj) {
        listData(domObj, listDataObj);
    }
    domObj.find(".nav_list_box").live("tap", function () {
        $(this).siblings().addClass("nav_list_box_def").removeClass("nav_list_box_cur");
        $(this).removeClass("nav_list_box_def").addClass("nav_list_box_cur");
        if (typeof compObj.callBack == "function") {
            compObj.callBack($(this));
        }
    });
}
/**
 * tabs选项卡控制
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function listTabs(domObj, compObj) {
    if (domObj.children("div[data-role='navbar']").find("li").length != 1) {
        domObj.children("div[data-role='navbar']").find("a").each(function (index) {
            $(this).tap(function () {
                $(this).parent().siblings().find("a").removeClass("ui-btn-active");
                $(this).addClass("ui-btn-active");
                var div_active = $(this).attr("tgt");
                domObj.find(".tabs_body").children().removeClass("ele_active").addClass("ele_hide");
                $("#" + div_active).removeClass("ele_hide").addClass("ele_active");
                if (typeof(compObj.callBack) == "function") {
                    compObj.callBack($(this), index);
                }
            })
        })
    }
    else {
        domObj.children("div[data-role='navbar']").find("a").toggle(
            function () {
                $(this).addClass("ui-btn-active");
            },
            function () {
                $(this).removeClass("ui-btn-active");
            }
        );
    }
}

/**
 * 展开与关闭
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function slideUpDown(domObj, compObj) {
    domObj.collapsible({
        collapse: function(event,ui) {
            $.refreshScroll(compObj.scrollId);
        }
    });
    domObj.collapsible({
        expand: function(event,ui) {
            $.refreshScroll(compObj.scrollId);
        }
    });
}

/**
 * 用户单选控制
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function userSelect(domObj, compObj) {
    var tap_default = 1;
    var tap_state;
    domObj.find(".iphone_radio").each(function () {
        $(this).unbind().bind("tap", function () {
            if ($(this).children(".feedbackradio").hasClass("ico_phone_radio_checked30") && tap_default != 1 && tap_state != this) {
                $(this).children(".feedbackradio").removeClass("ico_phone_radio_checked30").addClass("ico_phone_radio30");
            }
            else {
                domObj.find(".feedbackradio").removeClass("ico_phone_radio_checked30").addClass("ico_phone_radio30");
                $(this).children(".feedbackradio").removeClass("ico_phone_radio30").addClass("ico_phone_radio_checked30");
            }
            tap_default++;
            tap_state = this;
            var radio_value = $(this).attr("radio_value");
            $("#" + compObj.inputId).val(radio_value);
        });
    })
}


/*
 *  组件部分结束
 *
 * */

/*
 *  数据加载刷新方法
 *
 * */

var _myScrollMap = new Array();

function getScrollobj(id) {
    return _myScrollMap[id];
}

$.refreshScroll = function (id) {
    var obj = getScrollobj(id);
    if (obj != null) {
        obj.refresh();
    }
};
/**
 * 初始化iScroll控件-默认是纵向刷新滚动条，即state=0
 * @param id 当前需要控制的对象的id名
 * @param refreshFunc 	下拉刷新数据方法
 * @param loadMoreFunc 上拉获取更多方法
 */
function loaded(id,refreshFunc,loadMoreFunc) {
    $.loadedScroll(id,0,refreshFunc,loadMoreFunc);
}
/**
 * 初始化iScroll控件
 * @param id 当前需要控制的对象的id名
 * @param state 状态值，0表示含有上下拉刷新，1表示只有滚动条
 * @param refreshFunc  当state为0时，表示下拉刷新数据方法，当state为1时,表示为为"h"，横向滚动条，"v"，纵向滚动条
 * @param loadMoreFunc 当state为0时，上拉获取更多方法，当state为1时,表示用于确定宽或高的自定义方法
 */
$.loadedScroll = function(id,state,refreshFunc,loadMoreFunc) {
    var myScroll = _myScrollMap[id];
    if(state == 1){
        if(loadMoreFunc){
            loadMoreFunc();
        }
        if(refreshFunc=="h"){
            var hScroll = true;
            var vScroll = false;
        }else if(refreshFunc == "v"){
            var hScroll = false;
            var vScroll = true;
        }
        myScroll = new iScroll(id,{
            scrollbarClass: 'myScrollbar',
            hScroll: hScroll,
            vScroll: vScroll,
            hideScrollbar:true,
            fadeScrollbars: true,
            bounce:true
        });
    }
    else if(state == 0){
        var hide =  $("#"+id).hasClass("ele_hide");
        if(hide){
            $("#"+id).removeClass("ele_hide");
            $("#"+id).addClass("ele_active");
        }
        var pullDownEl = $('#'+id+' .pullDown')[0];
        var pullDownE2 = $('#'+id+' .pullDown');
        var pullDownOffset = pullDownEl.offsetHeight;
        var pullUpE2 = $('#' + id + ' .clickDown');

        var myScroll = _myScrollMap[id];
        if(myScroll	!=null){
            myScroll.destroy();
        }
        myScroll = new iScroll(id, {
            scrollbarClass: 'myScrollbar',
            useTransition: false,
            fixedScrollbar: false,
            topOffset: pullDownOffset,
            /**
             *  调整刷新后的界面结构
             */
            onRefresh: function () {
                if (pullDownE2.hasClass('loading')) {
                    pullDownE2.removeClass('loading');
                    pullDownE2.find("p").show();
                    $(pullDownE2.find("p")).first().removeClass("change_text_height").text('下拉刷新');
                }
                else if (pullUpE2.hasClass('loading')) {
                    pullUpE2.find("p").show();
                    pullUpE2.find("span").hide();
                    $(pullUpE2.find("p")).first().removeClass("margin_t_25").addClass("margin_t_15").text('加载更多');
                }
            },
            /**
             *  判断当前滚动是到顶端还是底端
             */
            onScrollMove: function () {
                if (this.y > 5 && !pullDownE2.hasClass('flip')) {
                    pullDownE2.addClass('flip');
                    $(pullDownE2.find("p")).first().text('松手开始更新');
                    this.minScrollY = 0;
                } else if (this.y < 5 && pullDownE2.hasClass('flip')) {
                    pullDownE2.removeClass('flip');
                    $(pullDownE2.find("p")).first().text('下拉刷新');
                    this.minScrollY = -pullDownOffset;
                }
            },
            /**
             *  参数方法触发加载新数据，再通过refresh方法重新渲染界面
             */
            onScrollEnd: function () {
                if ($("#" + id).height() <= ($("#" + id + " .list_data").height() + 63)) {
                    pullUpE2.css("opacity","1");
                    pullUpE2.unbind("tap").bind("tap",function(){
                        pullUpE2.find("p").hide();
                        pullUpE2.find("span").show();
                        $(pullUpE2.find("p")).first().removeClass("margin_t_15").addClass("margin_t_25").text('加载中').show();
                        loadMoreFunc(this,id);
                    });
                }
                if (pullDownE2.hasClass('flip')){
                    pullDownE2.removeClass('flip').addClass('loading');
                    pullDownE2.find("p").hide();
                    $(pullDownE2.find("p")).first().addClass("change_text_height").text('加载中').show();
                    refreshFunc(this,id);
                }
            }
        });
        if(hide){
            $("#"+id).removeClass("ele_active");
            $("#"+id).addClass("ele_hide");
        }
    }
    _myScrollMap[id]=myScroll;
}
