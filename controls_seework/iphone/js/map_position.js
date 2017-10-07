/**
 * Created by Administrator on 14-11-27.
 */

/**
 * 获取定位信息
 * @param createMapType 自定义地图方法
 * @param defindFn 自定义扩展方法
 */
function getPosition(createMapType,defindFn){
//    createMapType();
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(createMapType, handleError);
    }else{
        alert("您的浏览器不支持使用HTML5来获取地理位置服务");
    }
}
/**
 * 错误提示信息
 * @param value 经纬度对象
 */
function handleError(value){
    switch(value.code){
        case 1:
            alert("位置服务被拒绝");
            break;
        case 2:
            alert("暂时获取不到位置信息");
            break;
        case 3:
            alert("获取信息超时");
            break;
        case 4:
            alert("未知错误");
            break;
    }
}
/**
 * 创建定位地图
 * @param position 经纬度对象
 */
function createMap(position){
    var currentLat = position.coords.latitude;//纬度
//    var currentLat = 30.546656;//纬度
    var currentLon = position.coords.longitude;//经度
//    var currentLon = 104.044156;//经度
    var gpsPoint = new BMap.Point(currentLon, currentLat);//定义一个中心点坐标
    BMap.Convertor.translate(gpsPoint, 0, translateCallback); //真实经纬度转成百度坐标
}
/**
 * 获取当前位置地图信息
 * @param position 经纬度对象
 */
function getLocalMapInfo(position){
    var currentLat = position.coords.latitude;
    var currentLon = position.coords.longitude;
    var gpsPoint = new BMap.Point(currentLon, currentLat);//定义一个中心点坐标
    BMap.Convertor.translate(gpsPoint, 0, getLocalAddressInfo); //真实经纬度转成百度坐标
}
/**
 * 真实经纬度转成百度坐标
 * @param point 百度坐标
 */
function translateCallback(point){
    //初始化地图
   var  map = new BMap.Map("my_map");
//    map.addControl(new BMap.ZoomControl()); //添加地图缩放控件
    map.addControl(new BMap.NavigationControl());//添加缩放控件
    map.addControl(new BMap.ScaleControl()); //向地图中添加比例尺控件
//    map.addControl(new BMap.OverviewMapControl());//向地图中添加缩略图控件
    map.centerAndZoom(point, 15);

    var myIcon = new BMap.Icon("../../../skin/seework/iphone/images/position_icon_2.png", new BMap.Size(26,25));
    var marker = new BMap.Marker(point,{icon:myIcon});
    map.addOverlay(marker);
    map.setCenter(point);

    var geoc = new BMap.Geocoder();
    geoc.getLocation(point, function(rs){
        var addComp = rs.addressComponents;
        var address_str = addComp.province + "" + addComp.city + "" + addComp.district + "" + addComp.street + "" + addComp.streetNumber;
        $("#get_address_info").html(address_str);

        var _w = -$("#get_address_info").outerWidth() * 0.37;
        var label_obj = new BMap.Label("<h2 style='font-size:13px;color: #939393'>成华店</h2><p>"+address_str+"</p>",{offset:new BMap.Size(_w,-60)});
        marker.setLabel(label_obj); //添加百度label
        label_obj.setStyle({                 //给label设置样式，任意的CSS都是可以的
            color:"#000000",               //颜色
            fontSize:"15px",               //字号
            border:"none",                 //边
            padding:"8px 10px 20px",
            background:"url(../../../skin/seework/iphone/images/map_hint.png) no-repeat",
            backgroundSize:"100% 100%",
            cursor:"pointer"
        });
        label_obj.hide();
        var click_num = 1;
        marker.addEventListener("click", function(){
            if(click_num % 2 ==0){
                label_obj.hide();
            }
            else{
                label_obj.show();
            }
            click_num++;
        });
    });
}
/**
 * 获取当前位置地址信息
 * @param point 百度坐标
 */
function getLocalAddressInfo(point){
    var geoc = new BMap.Geocoder();
    var map = new BMap.Map("my_map");
    map.centerAndZoom(point,18);
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    geoc.getLocation(point, function(rs){
        var addComp = rs.addressComponents;
        getAddressInfo(addComp);
    });
}
/**
 * 地址转换成百度地图
 * @param shopInfo 地址信息
 * @param connect 连接与否
 */
function getAddressMap(shopInfo,connect){
    var map = new BMap.Map("my_map");
    var shop_info = shopInfo;
    var point_arr =[];
    var shop_info_len = shop_info.length;
    map.addControl(new BMap.ScaleControl()); //向地图中添加比例尺控件
    map.addControl(new BMap.NavigationControl());//添加缩放控件
    var myGeo = new BMap.Geocoder();
    for(var i = 0;i < shop_info_len;i++){
        showAddressMap(shop_info[i],i);
    }
    /**
     * 百度地图地址转化无法在for循环中判断回调函数成功与否，故将整体添加循环
     */
    function showAddressMap(shopInfo,index){
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(shopInfo.shop_address,function(point){
            if (point) {
                map.centerAndZoom(point, 11);
                var myIcon = new BMap.Icon("../../../skin/seework/iphone/images/position_icon_2.png", new BMap.Size(26,25));
                var marker = new BMap.Marker(point,{icon:myIcon});
                map.addOverlay(marker);
                map.setCenter(point);
                $("#get_address_info").html(shopInfo.shop_address);
                var _w = -$("#get_address_info").outerWidth() * 0.37;
                var label_obj = new BMap.Label("<h2 style='font-size:13px;color: #939393'>"+shopInfo.shop_name+"</h2><p>"+shopInfo.shop_address+"</p>",{offset:new BMap.Size(_w,-60)});
                marker.setLabel(label_obj); //添加百度label
                label_obj.setStyle({        //给label设置样式，任意的CSS都是可以的
                    color:"#000000",      //颜色
                    fontSize:"15px",       //字号
                    border:"none",          //边
                    padding:"8px 10px 20px",
                    background:"url(../../../skin/seework/iphone/images/map_hint.png) no-repeat",
                    backgroundSize:"100% 100%",
                    cursor:"pointer"
                });
                $("#get_address_info").html("");
                if(shop_info[0].shop_address != shopInfo.shop_address){
                    label_obj.hide();
                }
                var click_num = 1;
                marker.addEventListener("click", function(){
                    if(click_num % 2 ==0){
                        label_obj.hide();
                    }
                    else{
                        label_obj.show();
                    }
                    click_num++;
                });
                if(connect){
                    point_arr.push(new BMap.Point(point.lng,point.lat));
                    var curve = new BMap.Polyline(point_arr, {strokeColor:"#9F32A0", strokeWeight:2,strokeOpacity:1}); //创建折线对象
                    map.addOverlay(curve); //添加到地图中
                }
            }
        },shopInfo.city_name);
    }
}

/**
 * 取得当前位置信息
 * @param address 地址信息对象
 */
function getAddressInfo(address){
    var address_id = $("section.ui-page-active").attr("address_info_id");
    $("#"+address_id).html(address.province + "" + address.city + "" + address.district + "" + address.street + "" + address.streetNumber);
}
