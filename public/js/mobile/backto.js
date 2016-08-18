(function(window, document, $, WeixinJSBridge) {

    /***********************************
    按钮的四种形态以及对应的script参数

    <!-- // 返回微网页；入口页面 -->
    <a class="back-to-button" back-to-with-chat-nobound="true" 
        href="/w/${wall.flag}/index.html" 
        style="display:block;width:69px;height:24.5px;border-radius:5px;line-height:24.5px;border:1px solid #fef9d9;position:absolute;left:23px;top:20px;font-size:10px;text-decoration:none;color:#fef9d9;text-align:center;z-index:999;display:none;"
    >返回上墙页</a>
    with:
    // backto.js[?from=chat&walltype=NoBound]


    <!-- // 绑定版，直接关闭；入口页面 -->
    <a class="back-to-button" back-to-with-bound="true" 
        href="javascript:WeixinJSBridge.invoke('closeWindow',{},function(res){});" 
        style="display:block;width:69px;height:24.5px;border-radius:5px;line-height:24.5px;border:1px solid #fef9d9;position:absolute;left:23px;top:20px;font-size:10px;text-decoration:none;color:#fef9d9;text-align:center;z-index:999;display:none;"
    >返回上墙页</a>
    with:
    // backto.js[?from=&walltype=Bound]


    <!-- // 独立版(返回)，直接关闭；入口页面 ， 该处虽然文案为返回，但是执行关闭操作，经产品独立确认！ -->
    <a class="back-to-button" back-to-with-standalone-nobound="true" back-to-with-standalone-bound="true" 
        href="javascript:WeixinJSBridge.invoke('closeWindow',{},function(res){});" 
        style="display:block;width:50px;height:24.5px;border-radius:5px;line-height:24.5px;border:1px solid #fef9d9;position:absolute;left:23px;top:20px;font-size:10px;text-decoration:none;color:#fef9d9;text-align:center;z-index:999;display:none;"
    >返回</a>
    with:
    // backto.js[?from=standalone&walltype=NoBound]
    // backto.js[?from=standalone&walltype=Bound]


    <!-- // 后退,history.go(-1);所有子级别页面； -->
    <a class="back-to-button" back-to-with-standalone-nobound="true" back-to-with-standalone-bound="true" back-to-with-chat-nobound="true" back-to-with-chat-bound="true" back-to-with-nobound="true" back-to-with-bound="true" 
        href="javascript:window.history.go(-1);" 
        style="display:block;width:50px;height:24.5px;border-radius:5px;line-height:24.5px;border:1px solid #fef9d9;position:absolute;right:23px;top:20px;font-size:10px;text-decoration:none;color:#fef9d9;text-align:center;z-index:999;display:none;"
    >返回</a>
    with:
    // backto.js
    */

    'use strict';

    // 解析script src 参数
    var parse_params = function() {
        var scripts = document.getElementsByTagName("script");
        var url = scripts[scripts.length - 1].src;
        var argstr = url.indexOf('?') !== -1 ? url.split('?').pop() : '';
        var args = {};
        argstr.replace(/(\w+)(?:=([^&]*))?/g, function(a, key, value) {
            args[key] = value;
        });
        return args;
    };

    // 读取cookie
    var read_cookie = function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (!(arr = document.cookie.match(reg))){
        	return ;
        }
		return unescape(arr[2]);
    }

    // 根据参数以及读取到的cookie数据显示相应的button
    var params = parse_params();
    var from = params.from,
        walltype = params.walltype;
    console.log('from params : ',from,walltype);
    
    var readonly = !from && !walltype;
    readonly && (from = read_cookie('from'));
    (!readonly) && (document.cookie = 'from=' + escape(from || '') + ';path=/');

    readonly && (walltype = read_cookie('walltype'));
    (!readonly) && (document.cookie = 'walltype=' + escape(walltype || '') + ';path=/');
    console.log('from params : ',from,walltype);
    
    // 显示button
    console.log('a.back-to-button[back-to-with-' + ((from ? from + '-' : '') + (walltype || '').toLowerCase()) + '=true]');
    $('a.back-to-button[back-to-with-' + ((from ? from + '-' : '') + (walltype || '').toLowerCase()) + '=true]').show();

})(window, document, window.jQuery || window.Zepto, window.WeixinJSBridge);
