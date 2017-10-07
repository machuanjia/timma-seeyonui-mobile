/**
/**
 * Created by Administrator on 14-11-5.
 */


function userLink(obj,objId){
    if(objId == "0004"){
        $("#user_info_list").find("ul").empty();
        listData($("#user_info_list"),{
            list_type:'selectUserDepartment',
            letter_position:"none",
            search_id:'user_search',
            data:[
                {
                    'letterType':'成员',
                    'listId':'001',
                    'leftImgUrl':'../../skin/seework/images/user.png',
                    'typeName':'张红',
                    'job':'测试工程师',
                    'personNum':null
                },
                {
                    'letterType':'成员',
                    'listId':'002',
                    'leftImgUrl':'../../skin/seework/images/more_user_head.png',
                    'typeName':'张强',
                    'job':"测试工程师",
                    'personNum':null
                }
            ],
            callback:function(){
                $.refreshScroll("work_select_all_user");
            }
        });
    }
}

$("#work_start").bind("pageshow", function () {
    pageInit();
    $.loadedScroll("work_start_content", 1, 'v', function () {
        var _h = $('body').height();
        $("#work_start_content").height(_h);
    });
    $.loadedScroll("picture_area", 1, 'h', function () {
        var _w = $('#picture_area').find("p").outerWidth() * $('#picture_area').find("p").length;
        $("#picture_area").children("div").width(_w);
    });
    $("#picture_area a").unbind().bind("tap",function(){
        $.openDialog("picture_amplify")
    })
    $(".open_expression").unbind().bind("tap",function(){
        if($(".expression_lib").css("display") == "none"){
            $(".expression_lib").show();
            $.refreshScroll("work_start_content");
        }
        else{
            $(".expression_lib").hide();
            $.refreshScroll("work_start_content");
        }
    });
    $(".open_accessory").unbind().bind("tap", function () {
        $(".work_start_footer").removeClass("display_none");
        contentHeight();
        $.hideLayerOpen(function () {
            $(".work_start_footer").addClass("display_none");
            $.refreshScroll("work_start_content");
        });
    });
//            $.hideLayerOpen();
//            $.showLoader("标题不能为空",true,"c",true,"");

    $("#test_tag").unbind().bind("click", function () {
        $(".work_title").blur();
        $(".work_content").blur();
        setTimeout(function(){
            if($("#work_start").find("#work_add_tag").length){
                $.openDialog("work_add_tag");
            }else{
                var popupUrl = 'dialog_tag.html';
                createDialog(popupUrl,"work_start","work_add_tag",function(){
                    listData($("#user_tag_gather .scroller"), {
                        list_type: 'selectUserDepartment',
                        list_role: "tag",
                        search_id: 'tag_search',
                        data: [
                            {
                                'listId': '001',
                                'typeName': '张红'
                            },
                            {
                                'listId': '002',
                                'typeName': '开发部'
                            },
                            {
                                'listId': '003',
                                'typeName': '测试部'
                            },
                            {
                                'listId': '004',
                                'typeName': '综合管理sdas部'
                            },
                            {
                                'listId': '005',
                                'typeName': 'sda综合管理部'
                            },
                            {
                                'listId': '006',
                                'typeName': '综合实打实的管理部'
                            },
                            {
                                'listId': '007',
                                'typeName': '综合实sdasfsa打实的管理部'
                            }
                        ],
                        callback: function () {
                            $.refreshScroll("user_tag_gather");
                        }
                    });
                })
            }
        },300)
    });
    $(".tag_ensure").die().live("tap",function(){
        $.closeDialog("work_add_tag");
        $(".user_add_tag").html("你好，我不好");

    });
    $(".picture_input").die().live("tap",function(){
//        alert("sd");
    });
    $(".user_select_send a").unbind().bind("tap",function(){
        $(".work_title").blur();
        $(".work_content").blur();
        if($("#work_start").find("#work_select_range").length){
            $.openDialog("work_select_range");
        }else{
            var popupUrl = 'dialog_select_widget.html';
            createDialog(popupUrl,"work_start","work_select_range",function(){
                $.loadedScroll("work_select_user",1,'h',function(){
                    var _w = 37*$('#work_select_user').find("img").length + 5;
                    $("#work_select_user").children("div").width(_w);
                });
                listData($("#user_info_list"),{
                    list_type:'selectUserDepartment',
                    search_id:'user_search',
                    data:[
                        {
                            'letterType':'A',
                            'listId':'per_000',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user_head.png',
                            'typeName':'张小一',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'A',
                            'listId':'001',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user.png',
                            'typeName':'张小一',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'A',
                            'listId':'002',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user_head.png',
                            'typeName':'张小二',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'B',
                            'listId':'003',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user.png',
                            'typeName':'张小三',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'C',
                            'listId':'004',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user_head.png',
                            'typeName':'张小四',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'D',
                            'listId':'005',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user.png',
                            'typeName':'张小吴',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'E',
                            'listId':'006',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user.png',
                            'typeName':'张小吴6',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'E',
                            'listId':'007',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user.png',
                            'typeName':'张小吴7',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'E',
                            'listId':'008',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user.png',
                            'typeName':'张小吴8',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'E',
                            'listId':'009',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user.png',
                            'typeName':'张小吴9',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'F',
                            'listId':'010',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user.png',
                            'typeName':'张小吴10',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'F',
                            'listId':'011',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user.png',
                            'typeName':'张小吴11',
                            'job':"测试工程师",
                            'personNum':null
                        },
                        {
                            'letterType':'F',
                            'listId':'012',
                            'department':'department_1',
                            'leftImgUrl':'../../skin/seework/images/user.png',
                            'typeName':'张小吴12',
                            'job':"测试工程师",
                            'personNum':null
                        }
                    ],
                    callback:function(){
                        $.refreshScroll("work_select_all_user");
                    }
                });
                $("#organize_skip").bind("tap",function(){
                    $(".reutrn_btn").removeClass("display_none");
                    $("#work_select_all_user").addClass("work_select_department");
                    $("#user_info_list").find("ul").empty();
                    $(this).parent().hide();
                   var sd = listData($("#user_info_list"),{
                        list_type:'selectUserDepartment',
                        letter_position:"none",
                        search_id:'user_search',
                        data:[
//                        {
//                            'letterType':'成员',
//                            'listId':'001',
//                            'department':'department_1',
//                            'leftImgUrl':'../../skin/seework/images/user.png',
//                            'typeName':'张红',
//                            'job':'测试工程师',
//                            'personNum':null
//                        },
//                        {
//                            'letterType':'成员',
//                            'listId':'002',
//                            'department':'department_1',
//                            'leftImgUrl':'../../skin/seework/images/more_user_head.png',
//                            'typeName':'张强',
//                            'job':"测试工程师",
//                            'personNum':null
//                        },
//                        {
//                            'letterType':'成员',
//                            'listId':'003',
//                            'department':'department_1',
//                            'leftImgUrl':'../../skin/seework/images/more_user_head.png',
//                            'typeName':'郭靖',
//                            'job':"测试工程师",
//                            'personNum':null
//                        },
                            {
                                'letterType':'星星科技公司',
                                'listId':'0004',
                                'department':'department_1',
                                'leftImgUrl':'../../skin/seework/images/more_user_head.png',
                                'typeName':' 综合管理部',
                                'job':null,
                                'personNum':"20"
                            },
                            {
                                'letterType':'星星科技公司',
                                'listId':'0005',
                                'department':'department_1',
                                'leftImgUrl':'../../skin/seework/images/more_user_head.png',
                                'typeName':' 综合管理部5',
                                'job':null,
                                'personNum':null
                            },
                            {
                                'letterType':'星星科技公司',
                                'listId':'0006',
                                'department':'department_1',
                                'leftImgUrl':'../../skin/seework/images/more_user_head.png',
                                'typeName':' 综合管理部6',
                                'job':null,
                                'personNum':null
                            },
                            {
                                'letterType':'星星科技公司',
                                'listId':'0007',
                                'department':'department_1',
                                'leftImgUrl':'../../skin/seework/images/more_user_head.png',
                                'typeName':' 综合管理部7',
                                'job':null,
                                'personNum':null
                            }
                        ],
                        callback:function(){
                            $.refreshScroll("work_select_all_user");
                        }
                    });
                })
            });
        }
    })
    $("#f1").die().live("tap",function(){
        $.closeDialog("work_select_range");
        $("#f2").html("233人");
    })
    $("#send_to_list").unbind().bind("tap",function(){
        var url = 'work_list.html';
        toNextPage(url,"",function(event,thisUrlObj,dataObj,pageActiveObj){
             listData(pageActiveObj.find("#userInfo"),{
                list_type:'listInfo',
                update_time: "2014-08-15&nbsp;&nbsp;12:30",
                list_refresh_type: "down",
                data:[
                    {
                        'listId':'003',
                        'leftImgUrl':'../../skin/seework/images/user.png',
                        'userName':'张小一',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["工作纪要","9月","销售","安排","工作纪要2","工作纪要3"],
                        'userTime':'9-17&nbsp;10:33',
                        'replyNum':"120"
                    }
                ]
            },"listSearch");
        })
    })
    $("#relevancy_type").unbind().bind("tap",function(){
        var popupUrl = 'dialog_relevancy.html';
        createDialog(popupUrl,"work_start","work_relevancy",function(){
           listData($("#work_relevancy_content"),{
                list_type:'listInfo',
                data:[
                    {
                        'listId':'003',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小一',
                        'centerContent':'销售部9月第一周工作纪要我',
                        'centertag':["工作纪要","9月","销售","安排"],
                        'userTime':'11-11&nbsp;11:30',
                        'replyNum':"31"
                    },
                    {
                        'listId':'004',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小一',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["10月","销售"],
                        'userTime':'11-11&nbsp;11:30',
                        'replyNum':"5"
                    },
                    {
                        'listId':'005',
                        'leftImgUrl':'../../skin/seework/images/user.png',
                        'userName':'张小三',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["工作纪要","9月","销售","安排","工作纪要2","工作纪要3"],
                        'userTime':'2014-9-17&nbsp;11:30',
                        'replyNum':"2"
                    },
                    {
                        'listId':'006',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小四',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["工作纪要","9月","销售","安排","工作纪要2","工作纪要3"],
                        'userTime':'2014-12-11&nbsp;11:30',
                        'replyNum':"3"
                    },
                    {
                        'listId':'007',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小七',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["工作纪要","9月","销售","安排","工作纪要2","工作纪要3"],
                        'userTime':'2014-12-11&nbsp;11:30',
                        'replyNum':"33"
                    },
                    {
                        'listId':'008',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小八',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["工作纪要","9月","销售","安排","工作纪要2","工作纪要3"],
                        'userTime':'2014-12-11&nbsp;11:30',
                        'replyNum':"33"
                    },
                    {
                        'listId':'009',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小九',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["工作纪要","9月","销售","安排","工作纪要2","工作纪要3"],
                        'userTime':'2014-12-11&nbsp;11:30',
                        'replyNum':"33"
                    },
                    {
                        'listId':'003',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小一',
                        'centerContent':'销售部9月第一周工作纪要我',
                        'centertag':["工作纪要","9月","销售","安排"],
                        'userTime':'11-11&nbsp;11:30',
                        'replyNum':"31"
                    },
                    {
                        'listId':'004',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小一',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["10月","销售"],
                        'userTime':'11-11&nbsp;11:30',
                        'replyNum':"5"
                    },
                    {
                        'listId':'005',
                        'leftImgUrl':'../../skin/seework/images/user.png',
                        'userName':'张小三',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["工作纪要","9月","销售","安排","工作纪要2","工作纪要3"],
                        'userTime':'2014-9-17&nbsp;11:30',
                        'replyNum':"2"
                    },
                    {
                        'listId':'006',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小四',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["工作纪要","9月","销售","安排","工作纪要2","工作纪要3"],
                        'userTime':'2014-12-11&nbsp;11:30',
                        'replyNum':"3"
                    },
                    {
                        'listId':'007',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小七',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["工作纪要","9月","销售","安排","工作纪要2","工作纪要3"],
                        'userTime':'2014-12-11&nbsp;11:30',
                        'replyNum':"33"
                    },
                    {
                        'listId':'008',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小八',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["工作纪要","9月","销售","安排","工作纪要2","工作纪要3"],
                        'userTime':'2014-12-11&nbsp;11:30',
                        'replyNum':"33"
                    },
                    {
                        'listId':'009',
                        'leftImgUrl':'../../skin/seework/images/user_head.png',
                        'userName':'张小九',
                        'centerContent':'销售部9月第一周工作纪要',
                        'centertag':["工作纪要","9月","销售","安排","工作纪要2","工作纪要3"],
                        'userTime':'2014-12-11&nbsp;11:30',
                        'replyNum':"33"
                    }
                ],
                callback:function(){
                    $.refreshScroll("work_relevancy_content");
                }
            },"checkbox");
        })
    })
    $("#f3").live("click",function(){
//        var temp_obj = '<div data-role="popup" id="picture_amplify" class="picture_amplify" data-overlay-theme="b" data-corners="false">'+
//                            '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right iphone32 picture_close_32"></a>'+
//                            '<img  src="../../skin/seework/images/pic_5.png" style="max-height: 380px">'+
//                        '</div>';
        var p_html = $('<p>'+
                '<a href="#" data-rel="popup" data-position-to="window" data-transition="fade">'+
                '<span class="iphone32 picture_close_32 picture_close"></span>'+
                '<img src="../../skin/seework/images/pic_1.png" alt=""/>'+
                '<label class="picture_title">标题标题标题标题标题标题</label>'+
                '<label class="picture_size font_arial">200K</label>'+
                '</a>'+
            '</p>');
        $("#picture_area").append(p_html).trigger("create");
        var url = "../../skin/seework/images/pic_5.png";
        picChange(url,"picture_amplify","work_start",function(){
            alert("Sd")
        });
//        $("#work_start").append(temp_obj).trigger("create");
        p_html.find("img").bind("click",function(){
            $.openDialog("picture_amplify")
        })
    })

//    var temp_obj = '<div data-role="popup" id="picture_amplify" class="picture_amplify" data-overlay-theme="b" data-corners="false">'+
//        '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right iphone32 picture_close_32"></a>'+
//        '<img  src="../../skin/seework/images/pic_5.png" style="max-height: 380px">'+
//        '</div>'
})
