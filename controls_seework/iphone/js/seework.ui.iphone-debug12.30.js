/**
 * @author tanhz
 */

/**
 *  显示加载器 jquery Mobile
 * @param text 加载器中显示的文字
 * @param text_visible 是否显示文字
 * @param theme 加载器主题样式a-z
 * @param text_only 是否只显示文字
 * @param html_content 要显示的html内容，如图片等
 * */
$.showLoader = function (text, text_visible, theme, text_only, html_content) {
    $.mobile.loading('show', {
        text: text,                  //加载器中显示的文字
        textVisible: text_visible,  //是否显示文字
        theme: theme,                //加载器主题样式a-b
        textonly: text_only,        //是否只显示文字
        html: html_content           //要显示的html内容，如图片等
    });
}
//隐藏加载器
$.hideLoader = function() {
    $.mobile.loading('hide');
}

/**
 *  显示加载器,然后一段时间后隐藏
 * @param text 加载器中显示的文字
 * @param text_visible 是否显示文字
 * @param theme 加载器主题样式a-z
 * @param text_only 是否只显示文字
 * @param html_content 要显示的html内容，如图片等
 * @param time 隐藏时间，单位毫秒,默认2000毫秒
 * */
$.showLoaderHide = function(text, text_visible, theme, text_only, html_content,time){
    $.mobile.loading('show', {
        text: text,                  //加载器中显示的文字
        textVisible: text_visible,  //是否显示文字
        theme: theme,                //加载器主题样式a-b
        textonly: text_only,        //是否只显示文字
        html: html_content           //要显示的html内容，如图片等
    });
    var timer = 2000;
    if(time){
        timer = time;
    }
    setTimeout(function(){
        $.mobile.loading('hide');
    },timer);
}
/**
 *
 *  解决安卓转场闪屏问题
 *
 * */
$(document).bind("mobileinit", function(){
    //按钮按下/划过的状态感觉反应有些迟缓
    $.mobile.buttonMarkup.hoverDelay = "false";
    // 解决JQuery Mobile切换页面白屏问题
    $.extend(  $.mobile , {
        defaultPageTransition:'none'
    });

    // 载入文字中文提示
    $.mobile.loadingMessage = '页面加载中';
    $.mobile.pageLoadErrorMessage = '页面加载失败';

    $.mobile.transitionFallbacks.slideout = "none"
//    android2.X不支持3D转场，统一去掉3d转场效果
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';

});
/**
 *
 *  遮罩层-打开
 * @param fn 自定义方法或对话框对象
 * @param dialogFn 对话框扩展方法
 *
 * */
$.hideLayerOpen = function(fn,dialogFn){
    var layout_opacity_obj;
    if(typeof fn == "object"){
        layout_opacity_obj = fn.find(".layout_opacity_5");
    }
    else{
        layout_opacity_obj = $("section.ui-page-active").find(".layout_opacity_5");
    }
    layout_opacity_obj.removeClass("display_none");
    layout_opacity_obj.die().live("tap",function(){
        var _this = $(this);
        setTimeout(function(){
            _this.addClass("display_none");
            if(typeof fn == "function"){
                fn();
            }
            else if(typeof dialogFn == "function"){
                dialogFn();
            }
        },300)
    })
}
/**
 *
 *  遮罩层-自定义关闭
 * @param fn 自定义方法
 *
 * */
$.hideLayerClose = function(fn){
    var layout_opacity_obj;
    if(typeof fn == "object"){
        layout_opacity_obj = fn.find(".layout_opacity_5");
    }
    else{
        layout_opacity_obj = $("section.ui-page-active").find(".layout_opacity_5");
    }
    layout_opacity_obj.addClass("display_none");
    if(typeof fn == "function"){
        fn();
    }
}
/**
 * 自定义数据方法说明
 * @param definedFun 自定义方法
 */
function beforechange(definedFun) {
    $(document).unbind("pagebeforechange").bind("pagebeforechange", function(e,data){
        if (typeof data.toPage != "string") {
            var thisUrlObj = $.mobile.path.parseUrl(e.target.baseURI);
            var pageActiveObj = $.mobile.path.parseUrl(data.toPage);
            if(typeof definedFun == "function"){
                definedFun(e,thisUrlObj,data,pageActiveObj);
            }
        }
    });
}
/**
 * 跳转到下一页面
 * @param pageUrl 目标页面地址
 * @param dataObj 传递数据
 * @param definedFun 自定义方法
 * @param sectionId 目标页面sectionId
 */
function toNextPage(pageUrl,dataObj,definedFun,sectionId){
    if(definedFun){
        beforechange(definedFun);
    }
    $.mobile.changePage(pageUrl,{
        transition: "slidefade",
        type:"post",
        data:dataObj
    })
}


/**
 * 苹果高度
 */

function contentHeight(){
    if (navigator.userAgent.indexOf("iPhone") != -1){
        var body_h = $("body").height();
        var header_h = 0;
        var footer_h = 0;
        if($("section.ui-page-active").find("header[data-position='fixed']").length){
            header_h = $("section.ui-page-active").find("header[data-position='fixed']").outerHeight();
        }
        if($("section.ui-page-active").find("footer[data-position='fixed']").length){
            footer_h = $("section.ui-page-active").find("footer[data-position='fixed']").outerHeight();
        }
        $("section.ui-page-active").height(body_h - header_h - footer_h);
//        alert(body_h)
//        alert(header_h)
//        alert(footer_h)
//        alert($("section.ui-page-active").height())
    }
}

/**
 * 苹果滚动条
 * @param definedFn 自定义扩展方法
 */
function iphoneScroll(definedFn){
//    if (navigator.userAgent.indexOf("iPhone") != -1){
//        var scroll_top_hint;
//        $(window).unbind().bind("touchmove",function(){
//            scroll_top_hint = $(window).scrollTop();
//            $("input[type='text']").blur();
//            if(typeof definedFn == "function"){
//                definedFn();
//            }
//            $(window).unbind("touchmove");
//        })
//        $(window).scroll(function(){
//            alert(state)
//            scroll_top_hint = $(window).scrollTop();
//            if(scroll_top_hint != state){
//                $("input").blur();
//                if(typeof definedFn == "function"){
//                    definedFn();
//                }
//            }
//        });
//    }
}

/**
 * 本地存储
 * @param dataId 存储数据的id
 */
function setlocalStorage(dataId){
    if(localStorage.getItem("dataId")){
        var data_id_arr = eval("("+localStorage.getItem("dataId")+")");
        var data_id_arr_len = data_id_arr.length;
        data_id_arr.push(dataId);
        var data_id_str = "["+data_id_arr.toString()+"]";
        localStorage.setItem("dataId",data_id_str);
    }
    else{
        var data_id_str ='['+dataId+']';
        localStorage.setItem("dataId",data_id_str);
    }
}
/**
 * 本地存储——得到上次数据的id
 */
function getlocalStorage(){
    var get_this_id = null;
    if(localStorage.getItem("dataId")){
        var data_id_arr = eval("("+localStorage.getItem("dataId")+")");
        var data_id_arr_len = data_id_arr.length;
        if(data_id_arr_len){
            get_this_id = data_id_arr.pop();
            var data_id_str = "["+data_id_arr.toString()+"]";
            localStorage.setItem("dataId",data_id_str);
        }
    }
    return get_this_id;
}


/**
 *
 *  组件部分
 *
 * */

/**
 * page初始化
 * @param definedFn 初始化扩展方法
 */
function pageInit(definedFn) {
    if(!$("section.ui-page-active").hasClass("page_active")){
        contentHeight();
        $("section.ui-page-active .comp").each(function () {
            var compObj = eval("({" + $(this).attr("comp") + "})");
            if (compObj.type == "list") {
                listPart($(this), compObj);
            }
            else if (compObj.type == "tabs") {
                listTabs($(this), compObj);
            }
            else if (compObj.type == "letterPosition") {
                userLetterPosition($(this), compObj);
            }
            else if (compObj.type == "localSearch") {
                localSearch($(this), compObj);
            }
            else if (compObj.type == "inputTag") {
                inputTag($(this), compObj);
            }
            else if (compObj.type == "headSelect") {
                headSelect($(this), compObj);
            }
            else if (compObj.type == "focus") {
                localFocus($(this), compObj);
            }
            else if(compObj.type == "dialog"){
                localDialog($(this), compObj);
            }
            else if(compObj.type == 'expression'){
                localExpression($(this), compObj)
            }
            else if(compObj.type == 'tabInquiry'){
                tabInquiry($(this), compObj)
            }
            else if(compObj.type == 'formStatistics'){
                formStatistics($(this), compObj)
            }
            else if(compObj.type == 'patorlTrack'){
                patorlTrack($(this), compObj);
            }
        });
        $("section.ui-page-active").addClass("page_active");
        if(typeof  definedFn == "function"){
            definedFn();
        }
        if(!$("section.ui-page-active").find(".layout_opacity_5").length){
            var obj = $('<div class="layout_opacity_5 display_none"></div>');
            $("section.ui-page-active").append(obj);
        }
    }
}
/**
 * dialog初始化
 * @param objId 对话框父级id
 */
function dialogInit(objId){
    $("#"+objId+" .comp").each(function () {
        var compObj = eval("({" + $(this).attr("comp") + "})");
        if (compObj.type == "list") {
            listPart($(this), compObj);
        }
        else if (compObj.type == "tabs") {
            listTabs($(this), compObj);
        }
        else if (compObj.type == "letterPosition") {
            userLetterPosition($(this), compObj);
        }
        else if (compObj.type == "localSearch") {
            localSearch($(this), compObj);
        }
        else if (compObj.type == "inputTag") {
            inputTag($(this), compObj);
        }
        else if (compObj.type == "headSelect") {
            headSelect($(this), compObj);
        }
        else if (compObj.type == "focus") {
            localFocus($(this), compObj);
        }
        else if(compObj.type == "dialog"){
            localDialog($(this), compObj);
        }
        else if(compObj.type == 'expression'){
            localExpression($(this), compObj);
        }

    })
}


/**
 * list数据控制
 * @param domObj 当前对象
 * @param dataObjSet 数据数组对象
 * @param definedState 自定义状态
 */
function listData(domObj, dataObjSet,definedState) {
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
    if(dataObj.list_type == 'listInfo'){
        if(thisObj.find(".list_data").length){
            var ulObj = thisObj.find(".list_data");
        }
        else {
            if(dataObj.search_id){
                var ulObj = $('<ul data-role="listview" class="nav_list_box seework_list_box list_data" ' +
                    'data-filter="true" data-input="#'+dataObj.search_id+'"></ul>');
            }
            else{
                var ulObj = $('<ul data-role="listview" class="nav_list_box seework_list_box list_data"></ul>');
            }
        }
        if(definedState == "checkbox"){
            var liHtml = $('<li>'+
                            '<a href="#" data-transition="slidefade">' +
                                '<div class="nav_list_box_left">' +
                                    '<span class="iphone40 select_case_default_40"></span>' +
                                    '<img src=""  class="user_head"/>' +
                                '</div>' +
                                '<div class="nav_list_box_center">' +
                                    '<p class="nav_list_box_center_font14 nav_list_box_paddding_t_6 user_name"></p>'+
                                    '<div class="nav_list_box_center_font16 nav_title"></div>' +
                                    '<div class="nav_list_box_center_font11 nav_list_box_padding_t_8_b_8 user_tag">' +
                                    '<span class="iphone24 tag_24"></span>' +
                                '</div>' +
                                '</div>' +
                                '<div class="nav_list_box_right">' +
                                    '<p class="nav_list_box_right_font11 nav_list_box_paddding_t_10 font_arial user_time"></p>' +
                                    '<span class="iphone32 reply_32 nav_list_box_right_ico font_arial reply_num"></sapn>' +
                                '</div>' +
                            '</a>' +
                        '</li>');
        }else{
            var liHtml = $('<li>'+
                            '<a href="#" data-transition="slidefade">' +
                                '<div class="nav_list_box_left">' +
                                     '<img src=""  class="user_head"/>' +
                                '</div>' +
                                '<div class="nav_list_box_center">' +
                                    '<p class="nav_list_box_center_font14 nav_list_box_paddding_t_8 user_name"></p>'+
                                    '<div class="nav_list_box_center_font16 nav_title"></div>' +
                                    '<div class="nav_list_box_center_font11 nav_list_box_padding_t_8_b_8 user_tag">' +
                                    '<span class="iphone24 tag_24"></span>' +
                                '</div>' +
                                '</div>' +
                                '<div class="nav_list_box_right">' +
                                    '<p class="nav_list_box_right_font11 nav_list_box_paddding_t_12 font_arial user_time"></p>' +
                                    '<span class="iphone32 reply_32 nav_list_box_right_ico font_arial reply_num"></sapn>' +
                                '</div>' +
                                '</a>' +
                            '</li>');
        }
        if(dataObj.center_tag == false){
            liHtml.find(".nav_list_box_center .tag_24").addClass("display_none_important");
        }
        if(dataObj.reply_type == "flowForm"){
            liHtml.find(".nav_list_box_right .reply_num").removeAttr("class").attr("class","nav_list_box_right_ico reply_num iphone48");
        }
        thisObj.find(".list_time").html(dataObj.update_time);
        var data_len = dataObj.data.length;
        if(data_len != 0){
            $.map(dataObj.data,function(data_list){
                if(dataObj.reply_type){
                    var flow_state;
                    switch (data_list.replyNum){
                        case "1":
                            /*流程进行中*/
                            flow_state = "flow_ing_48";
                            break;
                        case "2":
                            /*流程结束*/
                            flow_state = "flow_end_48";
                            break;
                        case "3":
                            /*流程终止*/
                            flow_state = "flow_stop_48";
                            break;
                    }
                }
//            已存在，刷新回复条数/或刷新流程状态
                if(thisObj.find("a[objId='"+data_list.listId+"']").length){
                    if(flow_state){
                        thisObj.find("a[objId='"+data_list.listId+"']").find(".reply_num").addClass(flow_state);
                    }
                    else{
                        thisObj.find("a[objId='"+data_list.listId+"']").find(".reply_num").html(data_list.replyNum);
                    }
                }else{
                    var li_obj = $(liHtml).clone();
                    li_obj.find("a").attr("objId", data_list.listId);
                    li_obj.find(".user_head").attr("src",data_list.leftImgUrl);
                    li_obj.find(".user_name").html(data_list.userName);
                    li_obj.find(".nav_title").html(data_list.centerContent);
                    li_obj.find(".user_tag").append(data_list.centertag);
                    li_obj.find(".user_time").html(data_list.userTime);
                    if(flow_state){
                        li_obj.find(".reply_num").addClass(flow_state);
                    }
                    else{
                        li_obj.find(".reply_num").html(data_list.replyNum);
                    }
                    if(dataObj.list_refresh_type == "down"){
                        ulObj.prepend(li_obj);
                    }
                    else{
                        ulObj.append(li_obj);
                    }
                }
            });
            if(thisObj.find(".list_data").length){
                if(definedState == "listSearch"){
                    $(".imitate_search").removeClass("display_none");
                }
                thisObj.find(".list_data").listview("refresh");
            }
            else{
                if(definedState == "listSearch"){
                    var user_search = $('<div class="imitate_search">'+
                                            '<a href="work_search.html" class="ui-btn ui-btn-search" data-transition="slidefade"><span class="padding_lr_10"></span>搜索</a>'+
                                        '</div>');
                    var user_focus = $('<div class="user_focus display_none">'+
                                            '<span class="iphone32 list_follow_32"></span>'+
                                            '<span class="padding_lr_8">关注事项</span>'+
                                            '<span class="font_arial">5</span>'+
                                        '</div>');
                    thisObj.find(".list_data_content").prepend(user_focus).prepend(user_search);
                }
                thisObj.find(".list_data_content").append(ulObj).trigger('create');
            }
            if(thisObj.hasClass("no_content_135")){
                thisObj.removeClass("no_content_135");
            }
        }
        else{
            thisObj.find(".pullDown").hide();
            thisObj.find(".clickDown").hide();
        }
    }
    else if(dataObj.list_type == 'selectUserDepartment'){
        if(thisObj.find(".list_data").length){
            var group_Obj = thisObj.find(".list_data");
        }
        else {
            if(dataObj.search_id){
                var group_Obj = $('<ul data-role="listview" class="nav_list_box group_contact_person_list list_data" ' +
                    'data-filter="true" data-input="#'+dataObj.search_id+'"></ul>');
            }
            else{
                var group_Obj = $('<ul data-role="listview" class="nav_list_box group_contact_person_list list_data"></ul>');
            }
        }
        var group_title = $('<li data-role="list-divider" group_type=""></li>');
        var group_centent = $('<li>'+
                                    '<a href="#" data-transition="slidefade">'+
                                        '<div class="nav_list_box_left">'+
                                            '<span class="iphone40 select_case_default_40"></span>'+
                                            '<img src="" alt="" class="user_head"/>'+
                                        '</div>'+
                                        '<div class="nav_list_box_center">'+
                                             '<div class="nav_list_box_center_font16 type_name"></div>'+
                                        '</div>'+
                                        '<div class="nav_list_box_right">'+
                                            '<p class="nav_list_box_right_font11 padding_r_12 font_arial job">' +
                                                '<span class="display_none_important link_person_num_bg"><label class="link_person_num"></label>人</span>'+
                                                '<span class="iphone24 send_24 display_none"></span>'+
                                            '</p>'+
                                        '</div>'+
                                    '</a>'+
                                '</li>');
        var data_len = dataObj.data.length;
        if(data_len != 0){
              $.map(dataObj.data,function(data_list){
                if(data_list.letterType){
                    if(!group_Obj.find("li[group_type='"+data_list.letterType+"']").length){
                        var group_title_obj = $(group_title).clone();
                        group_title_obj.attr("group_type",data_list.letterType);
                        group_title_obj.html(data_list.letterType);
                        group_Obj.append(group_title_obj);
                    }
                }
                var group_centent_obj = $(group_centent).clone();
                group_centent_obj.find("a").attr("objId", data_list.listId);
                if(data_list.department){
                    group_centent_obj.find("a").attr("objDepartment", data_list.department);
                }
                if(data_list.leftImgUrl){
                    group_centent_obj.find(".user_head").attr("src",data_list.leftImgUrl);
                }
                group_centent_obj.find(".type_name").html(data_list.typeName);
                if(data_list.job){
                    group_centent_obj.find(".job").html(data_list.job);
                }
                else{
                    if(data_list.personNum){
                        group_centent_obj.find(".link_person_num").html(data_list.personNum);
                    }
                    group_centent_obj.find(".nav_list_box_right").addClass("nav_list_box_right_department");
                    group_centent_obj.find(".job").find(".iphone24").removeClass("display_none");
                }
                group_Obj.append(group_centent_obj);
              })
        }
        if(dataObj.letter_position == "none"){
            $(".letter_position").hide();
            group_Obj.find(".job").removeClass("padding_r_12");
        }
        else{
            $(".letter_position").show();
        }
        if(dataObj.list_role == "tag"){
            group_Obj.find(".nav_list_box_left").find("img").remove();
            group_Obj.find(".nav_list_box_right").remove();
        }
        if(dataObj.select_type == "none"){
            group_Obj.find(".nav_list_box_left").find(".iphone40").remove();
            group_Obj.find(".link_person_num_bg").removeClass("display_none_important");
        }
        if(thisObj.find(".list_data_content").length){
            if(definedState == "dataPrefetch"){
                return group_Obj;
            }else{
                thisObj.find(".list_data_content").append(group_Obj).trigger('create');
                thisObj.find(".list_data_content ul").listview('refresh');
            }
        }
        else{
            if(definedState == "dataPrefetch"){
                return group_Obj;
            }else{
                var list_data_content = $('<div class="list_data_content"></div>');
                list_data_content.append(group_Obj);
                thisObj.append(list_data_content).trigger('create');
            }
        }
    }
    else if(dataObj.list_type == 'sendRange'){
        if(thisObj.find(".list_data").length){
            var group_Obj = thisObj.find(".list_data");
        }
        else {
            var group_Obj = $('<ul data-role="listview" class="nav_list_box seework_range_list list_data"></ul>');
        }
        var group_li = $('<li>'+
                                '<a href="#" data-transition="slidefade">'+
                                    '<div class="nav_list_box_left">'+
                                        '<span class="iphone40 select_case_default_40 user_select_state display_none_important"></span>'+
                                        '<img src="" alt="" class="user_head"/>'+
                                        '<span class="iphone32 user_state range_state"></span>'+
                                    '</div>'+
                                    '<div class="nav_list_box_center">'+
                                        '<div class="nav_list_box_center_font16 type_name"></div>'+
                                    '</div>'+
                                    '<div class="nav_list_box_right">'+
                                        '<p class="nav_list_box_right_font11  font_arial job">' +
                                            '<span class="margin_r_10 user_num"></span><span class="iphone24 send_24"></span>'+
                                        '</p>'+
                                    '</div>'+
                                '</a>'+
                            '</li>');
        var data_len = dataObj.data.length;
        if(data_len != 0){
            var user_state;
            $.map(dataObj.data,function(data_list){
                var li_obj = $(group_li).clone();
                li_obj.find("a").attr("objId", data_list.listId);
                li_obj.find(".user_head").attr("src",data_list.leftImgUrl);
                switch (data_list.userState){
                    //发起人状态
                    case "1":
                        user_state = "user_organiger_32";
                        break;
                    //未看过状态
                    case "2":
                        user_state = "no_see_32";
                        break;
                    //看过状态
                    case "3":
                        user_state = "over_see_32";
                        break;
                    //回复状态
                    case "4":
                        user_state = "reply_state_32";
                        break;
                }
                li_obj.find(".user_state").addClass(user_state);
                if(data_list.userState=="1"){
                    li_obj.find(".type_name").html(data_list.userName+"(发起人)");
                }else{
                    li_obj.find(".type_name").html(data_list.userName);
                }
                if(!isNaN(parseInt(data_list.job))){
                    li_obj.find(".user_num").html(data_list.job+"人");
                    li_obj.find(".nav_list_box_right").addClass("nav_list_box_right_department");
                }
                else{
                    li_obj.find(".job").html(data_list.job);
                }
                group_Obj.append(li_obj);
            });
            if(thisObj.find(".list_data_content").length){
                thisObj.find(".list_data_content").append(group_Obj).trigger('create');
            }
            else{
                var list_data_content = $('<div class="list_data_content"></div>');
                list_data_content.append(group_Obj);
                thisObj.append(list_data_content).trigger('create');
            }
            if(dataObj.list_select){
                group_Obj.find(".user_select_state").removeClass("display_none_important");
            }
        }
    }
    else if(dataObj.list_type == 'inquirylist'){
        var parentObj = thisObj.find(".list_data_content");
        var divObj = $('<div class="form_list_item list_data"><a href="#" data-transition="slidefade"><ul></ul></a></div>');
        var listItemObj = $('<li>' +
                                '<p class="inquiry_title"></p>'+
                                '<p class="inquiry_centent"></p>'+
                            '</li>');
        var data_len = dataObj.data.length;
        if(data_len != 0){
            $.map(dataObj.data,function(data_list){
                var div_obj = $(divObj).clone();
                div_obj.find("a").attr("objId", data_list.listId);
                var lock_state = data_list.lockState;
                if(lock_state){
                    div_obj.find("a").append("<span class='iphone32 locking_32 locking_state'></span>");
                }
                $.map(data_list.listData,function(list_item){
                    var list_item_obj = $(listItemObj).clone();
                    if(list_item.listTitle !=""){
                        list_item_obj.find(".inquiry_title").html(list_item.listTitle+"：&nbsp;");
                    }
                    list_item_obj.find(".inquiry_centent").html(list_item.listContent);
                    div_obj.find("ul").append(list_item_obj);
                });
                if(dataObj.list_refresh_type == "down"){
                    parentObj.prepend(div_obj);
                }
                else{
                    parentObj.append(div_obj);
                }
            });
        }
        else{
            thisObj.find(".pullDown").hide();
            thisObj.find(".clickDown").hide();
        }
    }
    else if(dataObj.list_type == 'citylist'){
        if(definedState){
            var group_Obj = $('<ul data-role="listview" class="nav_list_box '+definedState+' list_data"></ul>');
        }
        else{
            var group_Obj = $('<ul data-role="listview" class="nav_list_box city_list list_data"></ul>');
        }
        var group_title = $('<li data-role="list-divider" group_type=""></li>');
        var group_centent = $('<li><a href="#" ></a></li>');
        var data_len = dataObj.data.length;
        if(data_len != 0){
            $.map(dataObj.data,function(data_list){
                if(data_list.letterType != ""){
                    if(!group_Obj.find("li[group_type='"+data_list.letterType+"']").length){
                        var group_title_obj = $(group_title).clone();
                        group_title_obj.attr("group_type",data_list.letterType);
                        group_title_obj.html(data_list.letterType);
                        group_Obj.append(group_title_obj);
                    }
                }
                var group_centent_obj = $(group_centent).clone();
                group_centent_obj.find("a").attr("objId",data_list.listId);
                group_centent_obj.find("a").html(data_list.cityName);
                group_Obj.append(group_centent_obj);
            })
            thisObj.append(group_Obj).trigger('create');
        }
    }
    else if(dataObj.list_type == 'patrolTrack'){
        var parentObj = thisObj.find(".list_data_content").addClass("list_data");
        var divObj = '<a href="#" data-transition="slidefade"  class="patorl_track_list">'+
                            '<div class="patrol_shop_time"><span></span></div>'+
                            '<div class="form_list_item adaptive_box_flex"><ul></ul></div>'+
                        '</a>';
        var listItemObj = $('<li>' +
                                '<p class="inquiry_title"></p>'+
                                '<p class="inquiry_centent"></p>'+
                            '</li>');
        thisObj.find(".list_time").html(dataObj.update_time);
        var data_len = dataObj.data.length;
        if(data_len != 0){
            $.map(dataObj.data,function(data_list){
                var div_obj = $(divObj).clone();
                div_obj.attr("objId", data_list.listId);
                div_obj.find(".patrol_shop_time span").html(data_list.listDate);
                $.map(data_list.listData,function(list_item){
                    var list_item_obj = $(listItemObj).clone();
                    if(list_item.listTitle !=""){
                        list_item_obj.find(".inquiry_title").html(list_item.listTitle+"：&nbsp;");
                    }
                    list_item_obj.find(".inquiry_centent").html(list_item.listContent);
                    div_obj.find("ul").append(list_item_obj);
                });
                if(dataObj.list_refresh_type == "down"){
                    parentObj.prepend(div_obj);
                }
                else{
                    parentObj.append(div_obj);
                }
            });
        }
        else{
            thisObj.find(".pullDown").hide();
            thisObj.find(".clickDown").hide();
        }
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
    if (compObj.listType == 'dataRefresh') {
        var pull_down = $('<div class="pullDown">'+
                            '<section>'+
                                '<span class="iphone48 update_48 pullDownIcon"></span>'+
                                '<div class="pullDownText">'+
                                    '<p class="font_14">下拉刷新</p>'+
                                    '<p class="font_14 change_text_height display_none">加载中…</p>'+
                                    '<p class="font_10">最近更新：<label class="margin_r_5 font_arial font_10 list_time">2014-09-29&nbsp;10:11</label></p>'+
                                '</div>'+
                            '</section>'+
                        '</div>');
        var pull_up = $('<div class="clickDown">'+
                            '<section>'+
                                '<span class="iphone48 update_48 pullDownIcon"></span>'+
                                '<div class="font_14 pullDownText">' +
                                    '<p class="font_14 display_none">上拉刷新</p>'+
                                    '<p class="font_14 change_text_height display_none">加载中…</p>'+
                                    '<p class="font_14">上拉加载更多</p>'+
                                '</div>'+
                            '</section>'+
                        '</div>');
        var list_data_content = $('<div class="list_data_content"></div>');
        if(compObj.mapPage){
            pull_down.find(".pullDownText p").first().text("下拉加载第1页").css("padding-top","8px");
//            pull_down.find(".pullDownText p").last().addClass("opacity_0");
            pull_down.find(".pullDownText p").last().hide();
            pull_up.find(".pullDownText p").last().text("上拉加载第2页");
//            pull_up.find(".pullDownText p").last().addClass("opacity_0");
        }
        domObj.append(pull_down).append(list_data_content).append(pull_up);
    }
    else if (compObj.listType == 'dataShow') {
        var list_data_content = $('<div class="list_data_content"></div>');
        if(!domObj.find(".list_data_content").length){
            domObj.append(list_data_content);
        }
    }
    if(compObj.selectType == "checkbox"){
        if(compObj.selectTag == "yes"){
            domObj.find(".list_data a").die().live("tap",function(){
                if($(this).find(".iphone40").hasClass("select_case_default_40")){
                    $(this).find(".iphone40").removeClass("select_case_default_40").addClass("select_case_chosen_40");
                    $(this).attr("objState","selected");
                }
                else{
                    $(this).find(".iphone40").removeClass("select_case_chosen_40").addClass("select_case_default_40");
                    $(this).removeAttr("objState");
                }
                if (typeof compObj.selectBack == "function") {
                    var obj_id = $(this).attr("objId");
                    compObj.selectBack($(this),obj_id,compObj);
                }
            })
        }else{
            domObj.find(".list_data .nav_list_box_left").die().live("tap", function () {
                if(!($(this).find(".iphone40").hasClass("select_chosen_gray_40") || $(this).find(".iphone40").hasClass("select_no_chose_40"))){
                    if($(this).find(".iphone40").hasClass("select_case_default_40")){
                        $(this).find(".iphone40").removeClass("select_case_default_40").addClass("select_case_chosen_40");
                        $(this).parent().attr("objState","selected");
                    }
                    else{
                        $(this).find(".iphone40").removeClass("select_case_chosen_40").addClass("select_case_default_40");
                        $(this).parent().removeAttr("objState");
                    }
                    if (typeof compObj.selectBack == "function") {
                        var obj_id = $(this).parent().attr("objId");
                        compObj.selectBack($(this).parent(),obj_id,compObj);
                    }
                }
            });
            domObj.find(".nav_list_box_right.nav_list_box_right_department").die().live("tap",function(){
                if (typeof compObj.callBack == "function") {
                    var obj_id = $(this).parent().attr("objId");
                    compObj.callBack($(this).parent(),obj_id);
                }
            })
        }
    }
    else if(compObj.selectType == "radio"){
        domObj.find(".list_data a").die().live("tap", function () {
            if(compObj.specialType == 'range'){
                if($(this).find(".nav_list_box_right_department").length){
                    if (typeof compObj.callBack == "function") {
                        var obj_id = $(this).attr("objid");
                        compObj.callBack($(this),obj_id);
                    }
                }
            }
            else{
                if (typeof compObj.callBack == "function") {
                    var obj_id = $(this).attr("objid");
                    compObj.callBack($(this),obj_id);
                }
            }

        })
    }
    else{
        domObj.find(".list_data a").die().live("tap", function () {
            domObj.find(".list_data a").removeClass("list_active");
            $(this).addClass("list_active");
            if (typeof compObj.callBack == "function") {
                var obj_id = $(this).attr("objid");
                compObj.callBack($(this),obj_id);
            }
        })
    }
}
/**
 * tabs选项卡控制
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function listTabs(domObj, compObj) {
    if (compObj.tabType == "navbar") {
        domObj.find("div[data-role='navbar']").find("a").die().live("tap",function(){
            $(this).parent().siblings().find("a").removeClass("ui-btn-active");
            $(this).addClass("ui-btn-active");
            var div_active = $(this).attr("tgt");
            if(compObj.tabParentId){
                $("#"+compObj.tabParentId).children().removeClass("display_block").addClass("display_none");
            }
            else{
                if(domObj.find(".tabs_body").hasClass("display_none")){
                    domObj.find(".tabs_body").removeClass("display_none");
                    if(compObj.hideLayerOpen){
                        $.hideLayerOpen(function(){
                            var dom_obj_id = domObj.attr("id");
                            $("#"+dom_obj_id).find(".tabs_body").addClass("display_none");
                            $("#"+dom_obj_id).find(".ui-btn").removeClass("ui-btn-active");
                            $("#"+dom_obj_id).find("div[data-role='navbar']").addClass("form_tab_none");
                        });
                    }
                }
                domObj.find(".tabs_body").children().removeClass("display_block").addClass("display_none");
            }
            $("#" + div_active).removeClass("display_none").addClass("display_block");
            if(compObj.scrollState){
                setTimeout(function(){
                    $.refreshScroll(div_active);
                },50)
            }
            else if(compObj.scrollId){
                $.refreshScroll(compObj.scrollId);
            }
            if(compObj.tabBorderClass){
                $(this).closest(".form_nav_bar").removeClass(compObj.tabBorderClass);
            }

            if (typeof(compObj.callBack) == "function") {
                compObj.callBack($(this),domObj,div_active);
            }
        })
    }
    else {
        domObj.children("div").bind("tap",function(){
            if($("."+compObj.contentTabBody).hasClass("display_none")){
                $("."+compObj.contentTabBody).removeClass("display_none").addClass("tab_body_active").addClass("display_block");
            }
            var div_active = $(this).attr("tgt");
            if(div_active == "remind_me"){
                domObj.children("div").removeClass("user_triangle");
                $("."+compObj.contentTabBody).addClass("display_none").removeClass("tab_body_active").removeClass("display_block");
            }else{
                $(this).siblings().removeClass("user_triangle");
                $(this).addClass("user_triangle");
                $("."+compObj.contentTabBody).children().removeClass("display_block").addClass("display_none");
                $("#" + div_active).removeClass("display_none");
            }
            if (typeof(compObj.callBack) == "function") {
                compObj.callBack($(this));
            }
        });
    }
}

/**
 * 本地搜索
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function localSearch(domObj, compObj) {
   domObj.find(".imitate_search").unbind().bind("tap",function(){
       $(this).addClass("display_none");
       domObj.find(".user_search_bg").removeClass("display_none_important");
       if(compObj.pageId){
           $.hideLayerOpen($("#"+compObj.pageId),function(){
               domObj.find(".imitate_search").removeClass("display_none");
               domObj.find(".user_search_bg").addClass("display_none_important");
           });
       }
       else{
           $.hideLayerOpen(function(){
               domObj.find(".imitate_search").removeClass("display_none");
               domObj.find(".user_search_bg").addClass("display_none_important");
           });
       }
   });
    domObj.find(".user_search_bg input").unbind().bind({
        focus:function(){
            if($(this).val() != ""){
                $.hideLayerClose($("#"+compObj.pageId));
                if(compObj.scrollId){
                    $("#"+compObj.scrollId).find("li[data-role]").hide("10",function(){
                        $.refreshScroll(compObj.scrollId);
                    });
                }
                if(compObj.letterPosition){
                    $("#"+compObj.pageId).find("."+compObj.letterPosition).hide();
                }
            }else{
                $.hideLayerOpen($("#"+compObj.pageId),function(){
                    domObj.find(".imitate_search").removeClass("display_none");
                    domObj.find(".user_search_bg").addClass("display_none_important");
                });
                if(compObj.scrollId){
                    $("#"+compObj.scrollId).find("li[data-role]").show("10",function(){
                        $.refreshScroll(compObj.scrollId);
                    });
                }
                if(compObj.letterPosition){
                    $("#"+compObj.pageId).find("."+compObj.letterPosition).show();
                }
            }
        },
        keyup:function(){
            if($(this).val() != ""){
                $.hideLayerClose($("#"+compObj.pageId));
                if(compObj.scrollId){
                    $("#"+compObj.scrollId).find("li[data-role]").hide("10",function(){
                        $.refreshScroll(compObj.scrollId);
                    });
                }
                if(compObj.letterPosition){
                    $("#"+compObj.pageId).find("."+compObj.letterPosition).hide();
                }
                $(this).next().removeClass("ui-input-clear-hidden");
            }else{
                $.hideLayerOpen($("#"+compObj.pageId),function(){
                    domObj.find(".imitate_search").removeClass("display_none");
                    domObj.find(".user_search_bg").addClass("display_none_important");
                });
                if(compObj.scrollId){
                    $("#"+compObj.scrollId).find("li[data-role]").show("10",function(){
                        $.refreshScroll(compObj.scrollId);
                    });
                }
                if(compObj.letterPosition){
                    $("#"+compObj.pageId).find("."+compObj.letterPosition).show();
                }
                $(this).next().addClass("ui-input-clear-hidden");
            }
        },
        blur:function(){
            if($(this).val() != ""){
                $.hideLayerClose($("#"+compObj.pageId));
                if(compObj.scrollId){
                    $("#"+compObj.scrollId).find("li[data-role]").hide("10",function(){
                        $.refreshScroll(compObj.scrollId);
                    });
                }
                if(compObj.letterPosition){
                    $("#"+compObj.pageId).find("."+compObj.letterPosition).hide();
                }
            }else{
                $.hideLayerOpen($("#"+compObj.pageId),function(){
                    domObj.find(".imitate_search").removeClass("display_none");
                    domObj.find(".user_search_bg").addClass("display_none_important");
                });
                if(compObj.scrollId){
                    $("#"+compObj.scrollId).find("li[data-role]").show("10",function(){
                        $.refreshScroll(compObj.scrollId);
                    });
                }
                if(compObj.letterPosition){
                    $("#"+compObj.pageId).find("."+compObj.letterPosition).show();
                }
            }
        }
    })
}
function userSearchChange(){

}
/**
 * 用户输入标签
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function inputTag(domObj,compObj){
    var add_tag_li = $('<li class="user_add_tag_li">'+
                        '<a href="#" data-transition="slidefade">'+
                            '<div class="nav_list_box_left">'+
                                '<span class="iphone40 select_case_default_40"></span>'+
                            '</div>'+
                            '<div class="nav_list_box_center">'+
                                '<div class="nav_list_box_center_font16 type_name"></div>'+
                            '</div>'+
                        '</a>'+
                    '</li>');
    var add_tag_ul = $('<ul data-role="listview" class="nav_list_box group_contact_person_list list_data"></ul>');
    //完全同步事件
    domObj.find("#"+compObj.inputId).live("input",function(){
//    domObj.find("#"+compObj.inputId).keyup(function (e){
//        if(!$("#"+compObj.tagListId).find(".group_contact_person_list").length){
//            $("#"+compObj.tagListId).find(".list_data_content").append(add_tag_ul);
//        }
        if($("#"+compObj.tagListId).find(".user_add_tag_li").length){
            $("#"+compObj.tagListId).find(".user_add_tag_li").find(".nav_list_box_center_font16").html($(this).val());
        }
        else{
            var add_tag_li_obj = $(add_tag_li).clone();
            add_tag_li_obj.find(".nav_list_box_center_font16").html($(this).val());
            add_tag_li_obj.find("a").attr("objId","user_change_tag");
            $("#"+compObj.tagListId).find(".group_contact_person_list").prepend(add_tag_li_obj).listview("refresh");
        }
        if($(this).val() == ""){
            $("#"+compObj.tagListId).find(".user_add_tag_li").remove();
        }
    })
    domObj.find(".add_new_tag").find("span").live("click",function(){
        var obj_id = $(this).attr("objId");
        var this_parent_tag_w = $(this).parent().outerWidth();
        var this_tag_w = $(this).outerWidth() + 5;
        $(this).remove();
        domObj.find(".add_new_tag").find("p").outerWidth(this_parent_tag_w - this_tag_w);
        if(obj_id != 'user_change_tag'){
            $("#"+compObj.tagListId).find("a[objId='"+obj_id+"']").find(".iphone40").removeClass("select_case_chosen_40").addClass("select_case_default_40");
        }
        if (typeof compObj.callBack == "function") {
            compObj.callBack($(this),obj_id);
        }
    })
}

/**
 * 用户标签选取扩展方法
 * @param obj 当前点击对象
 * @param objId 当前点击对象的自定义属性，对应下面的listId，每条数据的唯一标示符
 */
function userSelectTag(obj,objId,compObj){
    var tag_input_bg = $("#"+compObj.tagInputId);
    var tag_search_obj = $("#"+compObj.tagSearchId);
    var tag_p_obj = tag_input_bg.find(".add_new_tag p");
    var tag_name = obj.find(".type_name").html();
    var tag_hide = $(".tag_hide").html(tag_name);
    var this_tag_width = tag_hide.outerWidth() + 5;
    var this_tag_content_width = tag_p_obj.outerWidth();
    if(tag_p_obj.find("span[objId='"+objId+"']").length && objId != "user_change_tag"){
        tag_p_obj.find("span[objId='"+objId+"']").remove();
        tag_p_obj.outerWidth(this_tag_content_width - this_tag_width);
    }else{
        tag_p_obj.outerWidth(this_tag_content_width + this_tag_width).append('<span objId="'+objId+'">'+tag_name+'</span>');
    }
    if(objId == "user_change_tag"){
        obj.parent().remove();
        tag_search_obj.val("");
//      模拟键盘删除事件
        var tag_e = jQuery.Event("keyup");
        tag_e.which = 8;
        tag_search_obj.trigger(tag_e);
    }
}

/**
 * 用户头像选择
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function headSelect(domObj,compObj){
    domObj.find("p").die().live("tap",function(){
        var this_id = $(this).attr("objId");
        var list_obj = $("#"+compObj.personDepartmentId).find("a[objId="+this_id+"]");
        var list_obj_len = list_obj.length;
        if(list_obj_len){
            list_obj.find(".iphone40").removeClass("select_case_chosen_40").addClass("select_case_default_40");
        }
        if (typeof compObj.callBack == "function") {
            compObj.callBack($(this),this_id,compObj);
        }
    })
}
/**
 * 用户选择数据扩展方法
 * @param obj 当前点击对象
 * @param objId 当前点击对象的自定义属性，对应下面的listId，每条数据的唯一标示符
 * @param compObj 父级自定义扩展属性
 */
function userSelect(obj,objId,compObj){
    var user_head_set = $("#"+compObj.workSelectUserId);
    var user_name_obj = user_head_set.find("p[objId='"+objId+"']");
    var objName = obj.find(".type_name").html();
    var objDepartment = obj.attr("objdepartment");
    var user_name_obj_len = user_name_obj.length;
    var countNum=1;
    var user_name_width = user_head_set.children("div").outerWidth();
    if(user_name_obj_len){
        user_name_obj.remove();
        user_head_set.children("div").width(user_name_width - 45);
    }
    else{
        if(objId.indexOf("department_")!=-1){
            countNum = obj.find(".link_person_num").html();
        }
        var p_html = '<p class="user_head_name"  personCount ="'+countNum+'" objId="'+objId+'" objdepartment="'+objDepartment+'"><img src="../../../skin/seework/iphone/images/pic_1.png" /><span>'+objName+'</span></p>';
        user_head_set.children("div").width(user_name_width + 45);
        user_head_set.children("div").append(p_html);
        user_head_set.find("a[data-role='button']").removeClass("gray_btn_inline");
    }
    if(compObj.defindButtonId){
        var active_last_len = $("#"+compObj.workSelectUserId).find("p").length;
        if(active_last_len){
            $("#"+compObj.defindButtonId).removeClass("gray_btn_inline");
        }
        else{
            $("#"+compObj.defindButtonId).addClass("gray_btn_inline");
        }
    }
    $.refreshScroll(compObj.workSelectUserId);
}
/**
 * 用户头像变化
 * @param obj 当前点击对象
 * @param objId 当前点击对象的自定义属性，对应下面的listId，每条数据的唯一标示符
 * @param compObj 初始化自定义对象
 */
function headChange(obj,objId,compObj){
    var this_parent_obj = $("#"+compObj.scrollId);
    var img_width = this_parent_obj.children("div").outerWidth();
    obj.remove();
    this_parent_obj.children("div").width(img_width - 45);
    if(compObj.defindButtonId){
        var active_last_len = $("#"+compObj.scrollId).find("p").length;
        if(active_last_len){
            $("#"+compObj.defindButtonId).removeClass("gray_btn_inline");
        }
        else{
            $("#"+compObj.defindButtonId).addClass("gray_btn_inline");
        }
    }
    $.refreshScroll(compObj.scrollId);
};
/**
 * 获取焦点
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function localFocus(domObj,compObj){
    domObj.bind({
        focus:function(){
            $(this).css("color","#000");
            contentHeight();
            $.disableScroll(compObj.scrollId);
        },
        blur:function(){
            contentHeight();
            if($(this).val() != ""){
                $(this).css("color","#000");
            }
            $.refreshScroll(compObj.scrollId);
        }
    })
}
/**
 * 表情控件初始化
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function localExpression(domObj,compObj){
   var user_expression_1 = '<div class="flexible_box">'+
                               '<p>'+
                                   '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                               '</p>'+
                               '<p>'+
                                   '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                               '</p>'+
                               '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                               '</p>'+
                               '<p>'+
                                    '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                               '</p>'+
                               '<p>'+
                                     '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                               '</p>'+
                               '<p>'+
                                    '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                               '</p>'+
                               '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                               '</p>'+
                           '</div>';
    var user_expression_2 = '<div class="flexible_box">'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                                '<p>'+
                                     '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                             '</div>';
    var user_expression_3 = '<div class="flexible_box">'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                             '</div>';
    var user_expression_4 = '<div class="flexible_box">'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_se_48" replace_letter="/se"></span>'+
                                '</p>'+
                                '<p>'+
                                    '<span class="iphone48 brow_jiong_48" replace_letter="/gg"></span>'+
                                '</p>'+
                              '</div>';
    var expression_obj = $(user_expression_1 + user_expression_2 + user_expression_3 +user_expression_4);
    domObj.append(expression_obj);
    domObj.find("span").die().live('tap',function(){
        var temp = $(this).attr("replace_letter");
        if(compObj.tapType != 'userDined'){
            domObj.hide();
        }
        if (typeof compObj.callBack == "function") {
            compObj.callBack($(this),temp);
        }
    })
}
/**
 * 巡店轨迹头像点击变化
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function patorlTrack(domObj,compObj){
    domObj.find("a").die().live("tap",function(){
        var temp = $(this).attr("objid");
        domObj.find("li").removeClass(compObj.activeClass);
        $(this).parent().addClass(compObj.activeClass);
        if (typeof compObj.callBack == "function") {
            compObj.callBack($(this),temp);
        }
    })
}
/**
 * tab查询1
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function tabInquiry(domObj,compObj){
        if(compObj.hintObjId){
            domObj.find("#"+compObj.hintObjId).find("a").die().live("tap",function(){
                domObj.find("#"+compObj.hintObjId).find("li").removeClass("city_list_active");
                $(this).parent().addClass("city_list_active");
                if (typeof compObj.hintBack == "function") {
                    var this_obj_id = $(this).attr("objid")
                    compObj.hintBack($(this),this_obj_id);
                }
            })
        }
        domObj.find(compObj.actObj).die().live("tap",function(){
            $("#"+compObj.changeParentId).find(".tabs_body").addClass("display_none");
            $("#"+compObj.changeParentId).find(".ui-btn").removeClass("ui-btn-active");
            if(compObj.tabBorderClass){
                $("#"+compObj.changeParentId).find("div[data-role='navbar']").addClass(compObj.tabBorderClass);
            }
            if(compObj.hintObjId){
                domObj.find(compObj.actObj).parent().removeClass("city_list_active_2");
                $(this).parent().addClass("city_list_active_2");
            }
            if(compObj.hideLayerClose){
                $.hideLayerClose();
            }
            if(compObj.backFillTgt){
                $("#"+compObj.changeParentId).find("span[backTgt='"+compObj.backFillTgt+"']").html($(this).html());
            }
            if (typeof compObj.callBack == "function") {
                var this_obj_id = $(this).attr("objid");
                if(this_obj_id){
                    compObj.callBack($(this),this_obj_id);
                }else{
                    compObj.callBack($(this),null);
                }
            }
        })
}
/**
 * 表单查询宽度自适应计算
 * @param domObj 当前对象
 * @param showClass 展示list的clas类
 */
function formStatistics(domObj,showClass){
    var this_obj_len = $("body").outerWidth() - 20;
    var list_first_w = parseInt(this_obj_len * 0.5);
    var list_next_w = parseInt(this_obj_len * 0.25);
    var list_len = domObj.find("ul"+":first-child li").length - 1;
    var ul_w = list_first_w + list_next_w * list_len + 2;
    domObj.find("ul li").outerWidth(list_next_w);
    domObj.find("ul li:first-child").outerWidth(list_first_w);
    domObj.find("ul").outerWidth(ul_w);
    domObj.children("div").outerWidth(ul_w + 20);
}

/**
 * 模拟对话框
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function localDialog(domObj,compObj){
    var body_h = $("body").height();
    var header_h = $("#"+compObj.parentId).children("header").outerHeight();
    var footer_h = $("#"+compObj.parentId).children("footer").outerHeight();
    var content_h =  body_h - header_h - footer_h;
    domObj.height(content_h + 1);
    $("#"+compObj.parentId).children("footer").css("top",body_h - footer_h + "px");
    if(compObj.scrollId){
        $.loadedScroll(compObj.scrollId,1,"v");
    }
}

/**
 * popup动态组件
 * @param popupUrl 目标对话框地址
 * @param parentId 当前容器id
 * @param popupId  对话框id
 * @param dialogExpandFn  对话框自定方法
 */
function createDialog(popupUrl,parentId,popupId,dialogExpandFn){
    $.ajax({
        url: popupUrl,
        async: false,
        success: function(html){
            $("#"+parentId).append(html).trigger('create');
            dialogInit(popupId);
//            jqm对话框组件
            $("#"+popupId).popup("open",{
                transition:"pop",
                positionTo:"window"
            });
            if(typeof dialogExpandFn == "function"){
                dialogExpandFn();
            }
        }
    })
}

/**
 * 打开popup组件
 * @param popupId  对话框id
 * @param dialogExpandFn  对话框自定方法
 */
$.openDialog = function(popupId,dialogExpandFn){
//    $("#"+popupId).show();
    $("#"+popupId).popup("open",{
        transition:"pop",
        positionTo:"window"
    });
    if(typeof dialogExpandFn == "function"){
        dialogExpandFn();
    }
}

/**
 * 关闭popup组件
 * @param popupId  对话框id
 * @param dialogExpandFn  对话框自定方法
 */
$.closeDialog = function(popupId,dialogExpandFn){
    $("#"+popupId).popup("close");
//    $("#"+popupId).hide();
    if(typeof dialogExpandFn == "function"){
        dialogExpandFn();
    }
}

/**
 * 创建提示对话框
 * @param pageId  pageID
 * @param popupId  对话框id
 * @param hintContent  对话框提示内容
 * @param ensureFn  确定按钮扩展方法
 * @param cancelFn  取消按钮扩展方法
 */
$.createHinitDialog = function(pageId,popupId,hintContent,ensureFn,cancelFn){
    if(!$("#"+pageId).find("#"+popupId).length){
        var dialog_obj = $('<div data-role="popup" id='+popupId+' data-overlay-theme="b" data-theme="a" data-dismissible="false" class="work_popup_content">'+
                                '<div role="main" class="ui-content">'+
                                    '<h3 class="ui-title">'+hintContent+'</h3>'+
                                '<div class="work_popup_content_btn">'+
                                    '<a href="#" data-role="button" data-inline="true" class="cancel_btn">取消</a>'+
                                    '<a href="#"  data-role="button" data-inline="true" class="ensure_btn">确认</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>');
        $("#"+pageId).append(dialog_obj).trigger('create');
        dialog_obj.find(".work_popup_content_btn a").unbind().bind("tap",function(){
            var _this_obj = $(this);
            $("#"+popupId).popup("close");
            $("#"+popupId).popup({
                afterclose: function( event, ui ) {
                    if(_this_obj.hasClass("ensure_btn")){
                        if(typeof ensureFn == "function"){
                            ensureFn();
                        }
                    }
                    else if(_this_obj.hasClass("cancel_btn")){
                        if(typeof cancelFn == "function"){
                            cancelFn();
                        }
                    }
                }
            });
        })
    }
    $("#"+popupId).popup("open",{
        transition:"pop",
        positionTo:"window"
    });
}
/**
 * 图片放大
 * @param url  图片地址
 * @param pictureId  图片id
 * @param sectionId  pageId
 * @param closeFn  关闭自定义方法
 */

function picChange(url,pictureId,sectionId,closeFn){
    var temp_obj = '<div data-role="popup" id="'+pictureId+'" class="picture_amplify" data-overlay-theme="b" data-corners="false">'+
                        '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right iphone32 picture_close_32"></a>'+
                        '<img  src='+url+' style="max-height: 380px">'+
                    '</div>';
    $("#"+sectionId).append(temp_obj).trigger("create");
    $("#"+sectionId + " #"+pictureId+" a").bind("tap",function(){
        $(this).parent().popup("close");
        if(closeFn){
            closeFn();
        }
    })
}

/**
 * 用户滚动条定位
 * @param domObj 当前对象
 * @param compObj 当前对象的自定义属性集合
 */
function userLetterPosition(domObj, compObj) {
    var ul_obj = '<ul>'+
                    '<li>A</li>'+
                    '<li>B</li>'+
                    '<li>C</li>'+
                    '<li>D</li>'+
                    '<li>E</li>'+
                    '<li>F</li>'+
                    '<li>G</li>'+
                    '<li>H</li>'+
                    '<li>I</li>'+
                    '<li>J</li>'+
                    '<li>K</li>'+
                    '<li>L</li>'+
                    '<li>M</li>'+
                    '<li>N</li>'+
                    '<li>O</li>'+
                    '<li>P</li>'+
                    '<li>Q</li>'+
                    '<li>R</li>'+
                    '<li>S</li>'+
                    '<li>T</li>'+
                    '<li>U</li>'+
                    '<li>V</li>'+
                    '<li>W</li>'+
                    '<li>X</li>'+
                    '<li>Y</li>'+
                    '<li>Z</li>'+
                 '</ul>';
    domObj.append(ul_obj);
    domObj.find("li").each(function () {
        $(this).unbind().bind("tap", function () {
           var this_text = $(this).html();
            _myScrollMap[compObj.scrollId].scrollToElement('#'+compObj.scrollId+' li[group_type='+'"'+this_text+'"]', 100);
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
/**
 * iScroll控件-刷新数据
 * @param id 当前需要控制的对象的id名
 * @param state 刷新后滚动条是(true)否(false)回到初始位置0
 */
$.refreshScroll = function (id,state) {
    var obj = getScrollobj(id);
    if (obj != null) {
        obj.enable();
        obj.refresh();
        if(state){
            obj.scrollTo(0,0,100,0);
        }
    }
};
/**
 * iScroll控件-销毁滚动条
 * @param id 当前需要控制的对象的id名
 */
$.destroyScroll = function (id) {
    var obj = getScrollobj(id);
    if (obj != null) {
        obj.destroy();
    }
};
/**
 * iScroll控件-禁止滚动条
 * @param id 当前需要控制的对象的id名
 */
$.disableScroll = function (id) {
    var obj = getScrollobj(id);
    if (obj != null) {
        obj.disable();
    }
};
/**
 * iScroll控件-启用滚动条
 * @param id 当前需要控制的对象的id名
 */
$.enableScroll = function (id) {
    var obj = getScrollobj(id);
    if (obj != null) {
        obj.enable();
    }
};
/**
 * 初始化iScroll控件-默认是纵向刷新滚动条，即state=0
 * @param id 当前需要控制的对象的id名
 * @param refreshFunc 	下拉刷新数据方法
 * @param loadMoreFunc 上拉获取更多方法
 * @param defindFn 扩展自定义——可以传方法或字符串
 */
function loaded(id,refreshFunc,loadMoreFunc,defindFn) {
    var obj = getScrollobj(id);
    if(!obj){
        $.loadedScroll(id,0,refreshFunc,loadMoreFunc,defindFn);
    }
}
/**
 * 初始化iScroll控件
 * @param id 当前需要控制的对象的id名
 * @param state 状态值，0表示含有上下拉刷新，1表示只有滚动条,2表示捕捉元素
 * @param refreshFunc  当state为0时，表示下拉刷新数据方法，当state为1时,表示为为"h"，横向滚动条，"v"，纵向滚动条
 * @param loadMoreFunc 当state为0时，上拉获取更多方法，当state为1时,表示用于确定宽或高的自定义方法
 * @param defindFn 扩展自定义——可以传方法或字符串
 */
$.loadedScroll = function(id,state,refreshFunc,loadMoreFunc,defindFn) {
    var obj = getScrollobj(id);
    if(!obj){
        var myScroll = _myScrollMap[id];
        if(state == 1){
            if(loadMoreFunc){
                loadMoreFunc();
            }
            if(refreshFunc=="h"){
                var hScroll = true;
                var vScroll = false;
                var hScrollbar_state = false;
            }else if(refreshFunc == "v"){
                var hScroll = false;
                var vScroll = true;
                var hScrollbar_state = false;
            }
            else if(refreshFunc == "hv"){
                var hScroll = true;
                var vScroll = true;
                var hScrollbar_state = false;
                var vScrollbar_state = false;
            }
            myScroll = new iScroll(id,{
                scrollbarClass: 'myScrollbar',
                hScroll: hScroll,
                hScrollbar:hScrollbar_state,
                vScrollbar:vScrollbar_state,
                vScroll: vScroll,
                hideScrollbar:true,
                fadeScrollbars: true,
                bounce:true,
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
                 *  判断当前滚动是到顶端还是底端
                 */
                onBeforeScrollMove:function(){
                },
                onScrollMove: function () {
                }
            });
        }
        else if(state == 0){
            var hide =  $("#"+id).hasClass("display_none");
            if(hide){
                $("#"+id).removeClass("display_none");
                $("#"+id).addClass("display_block");
            }
            var pullDownEl = $('#'+id+' .pullDown')[0];
            var pullDownE2 = $('#'+id+' .pullDown');
            var pullDownOffset = pullDownEl.offsetHeight;
            var pullUpE1 = $('#' + id + ' .clickDown')[0];
            var pullUpE2 = $('#' + id + ' .clickDown');
            var pullUpOffset = pullUpE1.offsetHeight;
            //地图翻页
            var this_page_num;
            var max_page_num;
            var next_page_num;
            var before_page_num;


            if(defindFn == "map_page"){
                var map_type = defindFn;
            }

            var myScroll = _myScrollMap[id];
            if(myScroll	!=null){
                myScroll.destroy();
            }
            myScroll = new iScroll(id, {
                scrollbarClass: 'myScrollbar',
                useTransition: false,
                hideScrollbar:true,
                fixedScrollbar: false,
                fadeScrollbar:true,
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
                    this_page_num = parseInt($("section.ui-page-active").find(".map_page_num").val());
                    max_page_num = parseInt($("section.ui-page-active").find(".map_page_num").attr("maxValue"));
                    before_page_num = this_page_num - 1;
                    next_page_num = this_page_num + 1;
                    if(map_type){
                        if(before_page_num != 0){
                            pullDownE2.find("p").first().text('下拉加载第'+before_page_num+"页");
                            if(this_page_num == max_page_num){
                                pullUpE2.find("p").last().text('当前第'+this_page_num+"页,没有下一页了");
                            }
                            else{
                                pullUpE2.find("p").last().text('上拉加载第'+next_page_num+"页");
                            }
                        }
                        else{
                            pullDownE2.find("p").first().text('当前第1页，没有上一页了');
                            if(max_page_num == 1){
                                pullUpE2.find("p").last().text('当前第1页，没有下一页了');
                            }
                            else{
                                pullUpE2.find("p").last().text('上拉加载第'+next_page_num+"页");
                            }
                        }
                    }
                    if (pullDownE2.hasClass('loading')) {
                        pullDownE2.removeClass('loading');
                        pullDownE2.find("span").removeClass("loading_48").addClass("update_48");
                        pullDownE2.find("p").first().show();
                        if(map_type){
                            if(before_page_num != 0){
                                pullDownE2.find("p").first().text('下拉加载第'+before_page_num+"页");

                            }
                            else{
                                pullDownE2.find("p").first().text('当前第1页，没有上一页了');
                            }
                        }else{
                            pullDownE2.find("p").first().text('下拉刷新');
                        }
                        pullDownE2.find(".change_text_height").hide();
                    }
                    else if (pullUpE2.hasClass('loading')) {
                        pullUpE2.removeClass('loading');
                        pullUpE2.find("span").removeClass("loading_48").addClass("update_48");
                        pullUpE2.find("p").show();
                        pullUpE2.find("p").first().hide();
                        if(map_type){
                            if(max_page_num != 1 && next_page_num != max_page_num ){
                                pullUpE2.find("p").last().text('上拉加载第'+next_page_num+"页");
                            }
                            else{
                                pullUpE2.find("p").last().text('当前第1页，没有上一页了');
                            }
                        }else{
                            pullUpE2.find("p").last().text('上拉加载更多');
                        }
                        pullUpE2.find(".change_text_height").hide();
                    }
                },
                /**
                 *  开始滚动的回调
                 */
                onScrollStart:function(){
                    //地图翻页页码
//                    before_page_num = this_page_num - 1;
//                    next_page_num = this_page_num + 1;
//                    if(map_type){
//                        if(before_page_num != 0){
//                            pullDownE2.find("p").first().text('下拉加载第'+before_page_num+"页");
//                            if(this_page_num == max_page_num){
//                                pullUpE2.find("p").last().text('当前第'+this_page_num+"页,没有下一页了");
//                            }
//                            else{
//                                pullUpE2.find("p").last().text('上拉加载第'+next_page_num+"页");
//                            }
//                        }
//                        else{
//                            pullDownE2.find("p").first().text('当前第1页，没有上一页了');
//                            if(max_page_num == 1){
//                                pullUpE2.find("p").last().text('当前第1页，没有下一页了');
//                            }
//                            else{
//                                pullUpE2.find("p").last().text('上拉加载第'+next_page_num+"页");
//                            }
//                        }
//                    }
                },
                /**
                 *  判断当前滚动是到顶端还是底端
                 */
                onScrollMove: function () {
                    if (this.y > 5 && !pullDownE2.hasClass('flip')) {
                        pullDownE2.addClass('flip');
                        if(map_type){
                            if(before_page_num != 0){
                                pullDownE2.find("p").first().text('释放加载第'+before_page_num+"页");
                            }
                        }
                        else{
                            $(pullDownE2.find("p")).first().text('释放更新');
                        }
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownE2.hasClass('flip')) {
                        pullDownE2.removeClass('flip');
                        if(map_type){
                            if(before_page_num != 0){
                                pullDownE2.find("p").first().text('下拉加载第'+before_page_num+"页");
                            }
                        }
                        else{
                            $(pullDownE2.find("p")).first().text('下拉刷新');
                        }
                        this.minScrollY = -pullDownOffset;
                    }else if (this.y < (this.maxScrollY - 5) && !pullUpE2.hasClass('flip') && pullUpE2.css("opacity") == "1") {
                        pullUpE2.addClass('flip');
                        pullUpE2.find(".pullDownIcon").css("display","inline-block");
                        if(map_type){
                            if(max_page_num != 1 && this_page_num != max_page_num){
                                pullUpE2.find("p").last().text('释放加载第'+next_page_num+"页");
                            }
                        }
                        else{
                            $(pullUpE2.find("p")).last().text('释放加载更多');
                        }
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpE2.hasClass('flip')&& pullUpE2.css("opacity") == "1") {
                        pullUpE2.removeClass('flip');
                        if(map_type){
                            if(max_page_num != 1 && this_page_num != max_page_num){
                                pullUpE2.find("p").last().text('上拉加载第'+next_page_num+"页");
                            }
                        }
                        else{
                            $(pullUpE2.find("p")).last().text('上拉加载更多');
                        }
                        this.maxScrollY = pullUpOffset;
                    }
                },
                /**
                 *  参数方法触发加载新数据，再通过refresh方法重新渲染界面
                 */
                onScrollEnd: function () {
                    var section_h = $("#" + id).height();
                    var content_h = $("#" + id + " .list_data_content").height() + 60;
                    if (section_h <= content_h) {
                        pullUpE2.css("opacity","1");
                        if (pullUpE2.hasClass('flip')){
                            if(map_type){
                                if(max_page_num != 1 && this_page_num != max_page_num){
                                    pullUpE2.removeClass('flip').addClass('loading');
                                    pullUpE2.find("span").addClass("loading_48").removeClass("update_48");
                                    pullUpE2.find("p").hide();
                                    pullUpE2.find(".change_text_height").show();
                                    loadMoreFunc(this,id);
                                }
                                else{
                                    pullUpE2.removeClass('flip');
                                    $.refreshScroll(id);
                                }
                            }
                            else{
                                pullUpE2.removeClass('flip').addClass('loading');
                                pullUpE2.find("span").addClass("loading_48").removeClass("update_48");
                                pullUpE2.find("p").hide();
                                pullUpE2.find(".change_text_height").show();
                                loadMoreFunc(this,id);
                            }
                        }
                    }
                    if (pullDownE2.hasClass('flip')){
                        if(map_type){
                            if(before_page_num != 0){
                                pullDownE2.removeClass('flip').addClass('loading');
                                pullDownE2.find("span").addClass("loading_48").removeClass("update_48");
                                pullDownE2.find("p").hide();
                                pullDownE2.find(".change_text_height").show();
                                refreshFunc(this,id);
                            }
                            else{
                                $.refreshScroll(id);
                            }
                        }
                        else{
                            pullDownE2.removeClass('flip').addClass('loading');
                            pullDownE2.find("span").addClass("loading_48").removeClass("update_48");
                            pullDownE2.find("p").hide();
                            pullDownE2.find(".change_text_height").show();
                            refreshFunc(this,id);
                        }
                    }
                }
            });
            if(hide){
                $("#"+id).removeClass("display_block");
                $("#"+id).addClass("display_none");
            }
        }
        else if(state == 2){
            var scroll_obj = $("#"+id).children(".scroller");
            var _body_w = $("#"+id).width();
            /**
             *  初始化捕捉局部区域宽度
             */
            scroll_obj.children().outerWidth(_body_w);
            var _nubber = scroll_obj.children().length;
            var _all_w = _body_w * _nubber;
            if(_nubber > 1){
                /**
                 *  初始化总区域宽度
                 */
                scroll_obj.width(_all_w);
                var li_html = "";
                var snap_obj = $('<div class="snap_state"><ul class="ul_li_float"></ul></div>');
                for(var i = 0; i < _nubber;i++){
                    if(i == 0){
                        li_html += '<li class="snap_state_active"></li>';
                    }else{
                        li_html +='<li></li>';
                    }
                }
                snap_obj.find("ul").append(li_html);
                scroll_obj.after(snap_obj);
                myScroll = new iScroll(id, {
                    snap: true,
                    momentum: false,
    //                是否超过实际位置反弹
                    bounce:false,
                    hScrollbar: false,
                    onScrollEnd: function () {
                        $("#"+id).children(".snap_state").find("li").removeClass("snap_state_active");
                        $("#"+id).children(".snap_state").find("li:nth-child("+(this.currPageX+1)+ ")").addClass("snap_state_active");
                    }
                });
            }

        }
        _myScrollMap[id]=myScroll;
    }
}
