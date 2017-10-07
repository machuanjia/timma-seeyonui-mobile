/**
 * Created by tan on 14-7-25.
 */
/**
 * 初始化iScroll控件
 * @param id 当前需要控制的对象的id名
 * @param refreshFunc    下拉刷新数据方法
 * @param loadMoreFunc 上拉获取更多方法
 */
var _myScrollMap = new Array();

/**
 * iScroll控件
 */
function loaded(id, pullDownAction, pullUpAction) {
    var myScroll = _myScrollMap[id];
    if(myScroll	!=null){
        myScroll.destroy();
    }
    if(pullDownAction == 1){
        var hScroll = true;
        var vScroll = true;
        myScroll = new iScroll(id,{
            scrollbarClass: 'myScrollbar',
            hScroll: hScroll,
            vScroll: vScroll,
            hideScrollbar:true,
            bounce:true
        });
    }
    else{
        var pullDownEl =$('.pullDown')[0];
        var pullDownOffset = pullDownEl.offsetHeight;
        var pullUpEl = $('.pullUp')[0];
        var pullUpOffset = pullUpEl.offsetHeight;
        myScroll = new iScroll(id, {
            scrollbarClass: 'myScrollbar',
            useTransition: false,
            hideScrollbar:true,
            fadeScrollbars: false,
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
                if (pullDownEl.className.match('loading')) {
                    pullDownEl.className = 'pullDown';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                } else if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = 'pullUp';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                }
            },
            /**
             *  判断当前滚动到顶端还是底端
             */
            onScrollMove: function () {
                if (this.y > 5 && !pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'pullDown flip';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                    this.minScrollY = 0;
                } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'pullDown';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    this.minScrollY = -pullDownOffset;
                } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip') && pullUpEl.style.display == "block") {
                    pullUpEl.className = 'pullUp flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip') && pullUpEl.style.display == "block") {
                    pullUpEl.className = 'pullUp';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    this.maxScrollY = pullUpOffset;
                }
            },
            /**
             *  参数方法触发加载新数据，再通过refresh方法重新渲染界面
             */
            onScrollEnd: function () {
                if (pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'pullDown loading';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                    pullDownAction(this,id);
                } else if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'pullUp loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                    pullUpAction(this,id);
                }
            }
        });
    }
}
