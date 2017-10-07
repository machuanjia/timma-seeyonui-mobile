/**
 * @author machuanjia
 */
//init layout macj
$(document).ready(function () {
    function initLayout() {
        var _l = $('.layout-l');
        var _r = $('.layout-r');
        if (_l.size() > 0 && _r.size() > 0) {
            var _w = $('body').width();
            var _lw = _l.eq(0).width();
            var r_width = _w - _lw;
            _r.eq(0).width(r_width);
            //pancel面板宽度
            $(".layout_panel").width(r_width);
        }
    }
    $(window).resize(initLayout);
    initLayout();
//    pageInit();
});

/**
 * 附件名字数省略
 * @param first_ele 表示包含附件名文字的元素
 * @param str_ele 表示附件名字符串
 * @param str_ele2 表示附件名后缀字符串(包含圆点)
 */


var str1 = "你好的斯蒂文四大看得见@#$#$#%#%E十年山三打erdtsdf三防师傅大四大法萨芬四大撒是是" +
    "撒旦法阿斯顿沙发沙发东决赛市劳动局卡萨拉大街上考虑的就是sdasf";
//var str1 = "你好的斯蒂文四大看得斯顿沙sf";
var str2 = ".MP4";
function getVideo(first_ele, str_ele, str_ele2) {
    var divH = $(first_ele).height();
    $(first_ele).children("label").text(str_ele + str_ele2);
    var test_p = $($(first_ele).children("label"), $(first_ele)).eq(0);
    if (test_p.outerHeight() >= divH) {
        $(first_ele).css({
            height: "2.5em"
        })
    }
    var regs = eval("/(\\s)*([a-zA-Z0-9]+|\\W)(\\…" + str_ele2 + ")?$/");
    while (test_p.outerHeight() > divH) {
        test_p.text(test_p.text().replace(regs, "…" + str_ele2));
    };
}

/**
 * 模块右侧初始化
 */
function modelRightInit(){
    $(".layout-r > div,.layout-r > ul").hide();
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
    modelRightInit();
    $(".comp").each(function () {
        var compObj = eval("({" + $(this).attr("comp") + "})");
        if (compObj.type == "list") {
            listPart($(this), compObj);
        }
        else if (compObj.type == "tabsOne") {
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
 * list控制
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function listPart(domObj, compObj) {
    if (compObj.listType == 'dataRefresh') {
        var pull_down = $('<div class="pullDown">' +
                            '<span class="pullDownIcon"></span>' +
                            '<div class="pullDownText">' +
                                '<p class="padding_t_20">下拉刷新</p>' +
                                '<p class="padding_t_5">已加载<label class="margin_r_10 list_show_num">40条</label>共<label class="list_num">606</label>条</p>' +
                            '</div>' +
                        '</div>');
        var pull_up = $('<div class="clickDown">' +
                            '<p>加载更多</p>'+
                            '<p>还有<label class="list_more_num">699</label>条</p>' +
                            '<span class="pullDownIcon"></span>' +
                        '</div>');
        domObj.append(pull_down).append('<div class="list_data"></div>').append(pull_up);
    }
    else if(compObj.listType == 'dataShow'){
        domObj.append('<div class="scroller list_data"></div>');
    }

    var dataObj = compObj.listGather;
    if (dataObj) {
        listData(domObj,dataObj);
    }
    domObj.find(".nav_list_box").live("tap", function () {
        initListLi($(this),compObj);
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
                            '<div class="nav_list_box_left">' +
                                '<span class="ico14 state_icon"></span>' +
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
                     '</div>';
    }
    else if(dataObj.list_type == 'doc'){
        var liHtml = '<div class="nav_list_box doc_list_box nav_list_box_def">'+
            '<a href="#" data-transition="slide">' +
            '<div class="nav_list_box_left">' +
            '<span class="state_icon"></span>' +
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
        if(dataObj.list_folder_layout == "one"){
            var liHtml = '<div class="nav_list_box folder_list_box nav_list_box_def">'+
                            '<div class="nav_list_box_center statistic_title nav_title"></div>' +
                        '</div>';
        }
        else{
            var liHtml = '<div class="nav_list_box folder_list_box nav_list_box_def">'+
                            '<div class="nav_list_box_left padding_r_10 padding_l_20">' +
                                '<span class="ico40 state_icon"></span>' +
                            '</div>' +
                            '<div class="nav_list_box_center">' +
                                '<label class="nav_title"></label>' +
                            '</div>' +
                            '<div class="nav_list_box_right padding_r_30"></div>' +
                        '</div>';
        }
    }
    if(thisObj.find(".list_num").length){
        thisObj.find(".list_num").html(dataObj.list_num);
        thisObj.find(".list_show_num").html(dataObj.list_show_num + "条");
        thisObj.find(".list_more_num").html(dataObj.list_num - dataObj.list_show_num);
    }
    if(dataObj.update_time){
        $(".layout-l").find(".refresh_data_time").html(dataObj.update_time);
    }
    var data_len = dataObj.data.length;
    for (var i = 0; i < data_len; i++) {
        var li_obj = $(liHtml).clone();
        var right_icon_html = "";
        li_obj.attr("objId", dataObj.data[i].listId);
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
                            right_icon_html += '<span class="ico_pad_28 spread_right_28"></span>';
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
                    case 1:
                        right_icon_html += '<span class="ico14  accessory_14 navlisticon1"></span>';
                        break;
                    case 2:
                        right_icon_html += '<span class="ico14  meeting_summary_14 navlisticon2"></span>';
                        break;
                }
            }
            li_obj.find(".nav_title_sub").html(dataObj.data[i].centerSub);
            li_obj.find(".nav_list_box_right_ico").html(right_icon_html);
            li_obj.find(".creator").html(dataObj.data[i].rightName);
        }
        thisObj.find(".list_data").append(li_obj);
    }


    //数据加载完后自定义方法
    if (typeof dataObj.callback == "function") {
        dataObj.callback();
    }
}
//列表初始化数据之后触发
function initListLi (dom,compObj,modelPos) {
    if ($(".layout-r").hasClass("defaultBG")) {
        $(".layout-r").removeClass("defaultBG");
        $(".layout-r > div,.layout-r > ul").show();
    }
    dom.siblings().addClass("nav_list_box_def").removeClass("nav_list_box_cur");
    dom.removeClass("nav_list_box_def").addClass("nav_list_box_cur");
    if(compObj.modelPos == "left" || modelPos == "left"){
        dom.parent().find("span").detach(".nav_list_box_jiao");
        dom.append("<span class='nav_list_box_jiao'></span>");
    }
    if (typeof compObj.callBack == "function") {
        compObj.callBack(dom);
    }
}
/**
 * tabs选项卡(单选)控制
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function listTabs(domObj, compObj){
    if( domObj.children("div[data-role='navbar']").find("li").length == 1){
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
 * 用户单选控制
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function userSelect(domObj, compObj) {
    var tap_default = 1;
    var tap_state;
    domObj.find(".ipad_radio").each(function () {
        $(this).unbind().bind("tap",function () {
            if ($(this).children(".feedbackradio").hasClass("ico_pad_radio_checked30") && tap_default != 1 && tap_state != this) {
                $(this).children(".feedbackradio").removeClass("ico_pad_radio_checked30").addClass("ico_pad_radio30");
            }
            else {
                domObj.find(".feedbackradio").removeClass("ico_pad_radio_checked30").addClass("ico_pad_radio30");
                $(this).children(".feedbackradio").removeClass("ico_pad_radio30").addClass("ico_pad_radio_checked30");
            }
            tap_default++;
            tap_state = this;
            var radio_value = $(this).children(".feedbackradio").attr("radio_value");
            $("#"+compObj.inputId).val(radio_value);
        });
    });
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

/*
 *  组件部分结束
 *
 * */


/*
 *  数据加载刷新方法
 *
 * */

var _myScrollMap = new Array();
/*
 *  数据加载刷新状态，0表示下拉刷新，1表示上拉刷新
 * */
var _myScroll_state = 0;;
function getScrollobj(id){
    return _myScrollMap[id];
}

$.refreshScroll = function(id){
    var obj = getScrollobj(id);
    if(obj!=null){
        obj.refresh();
    }
};

/**
 * 初始化iScroll控件-默认下拉刷新滚动条，即state=0
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
 * @param refreshFunc  当state为0时，表示下拉刷新数据方法，当state为1时,表示为"h"，横向滚动条，"v"，纵向滚动条
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
        var ele_dis = $("#" + id).css("display");
        if (ele_dis == 'none') {
            $("#" + id).css("display", "block")
        }
        var pullDownEl = $('#' + id + ' .pullDown')[0];
        var pullDownE2 = $('#' + id + ' .pullDown');
        var pullDownOffset = pullDownEl.offsetHeight;
        var pullUpEl = $('#' + id + ' .clickDown')[0];
        var pullUpE2 = $('#' + id + ' .clickDown');
        var pullUpOffset = pullUpEl.offsetHeight;

        if (myScroll != null) {
            myScroll.destroy();
        }
        myScroll = new iScroll(id, {
            scrollbarClass: 'myScrollbar',
            useTransition: false,
            fixedScrollbar: false,
            topOffset: pullDownOffset,
            /**
             *  取消事件的默认动作
             *  解决iscroll的滚动容器范围内，点击input框、select等表单元素时没有响应
             *  原因在于iscroll需要一直监听用户的touch操作，以便灵敏的做出对应效果
             */
            onBeforeScrollStart: function (e) {
                var nodeType = e.explicitOriginalTarget ? e.explicitOriginalTarget.nodeName.toLowerCase() : (e.target ? e.target.nodeName.toLowerCase() : '');
                if (nodeType != 'select' && nodeType != 'option' && nodeType != 'input' && nodeType != 'textarea') {
                    e.preventDefault();
                }
            },
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
                    pullUpE2.find("span").hide();
                    $(pullUpE2.find("p")).first().css("margin-top", "0").text("加载更多");
                    pullUpE2.find("p").show();
                }

            },
            /**
             *  判断当前滚动到顶端还是底端
             */
            onScrollMove: function () {
                if (this.y > 5 && !pullDownE2.hasClass('flip')) {
                    pullDownE2.addClass('flip');
                    $(pullDownE2.find("p")).first().text('松开更新');
                    this.minScrollY = 0;
                }
                else if (this.y < 5 && pullDownE2.hasClass('flip')) {
                    pullDownE2.removeClass('flip');
                    $(pullDownE2.find("p")).first().text('下拉刷新');
                    this.minScrollY = -pullDownOffset;
                }
                else if (this.y < (this.maxScrollY - 5) && !pullUpE2.hasClass('flip') && pullUpE2.css("display") == "block") {
                    pullUpE2.addClass('flip');
                    $(pullUpE2.find("p")).first().text('松开更新');
                    this.maxScrollY = this.maxScrollY;

                } else if (this.y > (this.maxScrollY + 5) && pullUpE2.hasClass('flip') && pullUpE2.css("display") == "block") {
                    pullUpE2.removeClass('flip');
                    $(pullUpE2.find("p")).first().text('加载更多');
                    this.maxScrollY = pullUpOffset;
                }
                _myScroll_state = 0;
            },
            /**
             *  参数方法触发加载新数据，再通过refresh方法重新渲染界面
             */
            onScrollEnd: function () {
                if ($("#" + id).height() <= $("#" + id + " .list_data").height() + 85) {
                    pullUpE2.css("opacity","1");
                }
                if (pullDownE2.hasClass('flip')) {
                    pullDownE2.removeClass('flip').addClass('loading');
                    pullDownE2.find("p").hide();
                    $(pullDownE2.find("p")).first().addClass("change_text_height").text('加载中').show();
                    refreshFunc(this,id);
                    _myScroll_state = 1;

                }
                else if (pullUpE2.hasClass('flip') && pullUpE2.css("opacity") == "1") {
                    if(_myScroll_state == 0){
                        pullUpE2.removeClass('flip').addClass('loading');
                        pullUpE2.find("p").hide();
                        pullUpE2.find("span").show();
                        $(pullUpE2.find("p")).first().css("margin-top", "24px").text('加载中').show();
                        loadMoreFunc(this,id);
                    }
                    else{
                        $(pullUpE2.find("p")).first().text('加载更多');
                    }

                }
            }
        });

        if (ele_dis == 'none') {
            $("#" + id).css("display", "none")
        }
    }
    _myScrollMap[id] = myScroll;
}


/*
 *  对话框组件
 * */
function dialogContent(options){
    this.partentId = options.partentId;
    this.content_text = options.content_text;
    this.buttons = options.buttons;
    var buttons_html;
    var dialog_html = '<div class="dialog_box">'+
                            '<p class="dialog_content">'+this.content_text+'</p>'+
                            '<div class="dialog_btn"></div>' +
                        '</div>';
    var buttons_len = this.buttons.length;
    $("#"+this.partentId).addClass("add_btn_position");
    $("#"+this.partentId).append(dialog_html);
    for(var i = 0;i < buttons_len; i++){
        buttons_html = $('<a href="#" data-role="none">'+this.buttons[i].name+'</a>');
        buttons_html[0].onclick = this.buttons[i].userTap;
        $("#"+this.partentId).find(".dialog_btn").append(buttons_html);
    }
}
$.dialog = function(options) {
    dialogContent(options);
};
//var _dialog = $.dialog({
//    partentId: 'fast_dialog',
//    content_text:'确定离开么？',
//    buttons: [{
//        name: "确定",
//        userTap: function () {
//            alert("1");
//        }
//    }, {
//        name: "取消",
//        userTap: function () {
//            alert("2");
//        }
//    }]
//});
