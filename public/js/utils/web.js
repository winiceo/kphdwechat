/*
 * 用于手机端的工具
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
/* 去除字符两边空格 */
String.prototype.startWith = function(str){
	if(str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if(this.substr(0,str.length) == str)
		return true;
	else
		return false;
	return true;
}
String.prototype.endWith = function(str){
	if(str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if(this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
	return true;
}
String.prototype.dealUrl = function(baseDomain){
	var _this = this.toString();
	if(_this.startWith('http://') || _this.startWith('https://')){
		return _this;
	}else{
		if(!baseDomain){
			if(imgdomain){
				baseDomain = imgdomain;
			}else{
				baseDomain = 'http://img.wkey.cn/';
			}
		}
		if(!baseDomain.endWith('/') && !_this.startWith('/')){
			baseDomain = baseDomain + '/';
		}
		if(baseDomain.endWith('/') && _this.startWith('/')){
			baseDomain = baseDomain.substr(0,baseDomain.length - 1);
		}
		return baseDomain + _this;
	}
}
function hasClass(elem, cls){
    cls = cls || '';
    if(cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}
function addClass(elem, cls){
    if(!hasClass(elem, cls)){
        elem.className += ' ' + cls;
    }
}
function removeClass(elem, cls) {
	if (hasClass(elem, cls)) {
		var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
		while (newClass.indexOf(' ' + cls + ' ') >= 0) {
			newClass = newClass.replace(' ' + cls + ' ', ' ');
		}
		elem.className = newClass.replace(/^\s+|\s+$/g, '');
	}
}
/*cookie 操作方法*/
function Cookie(){}
Cookie.put = function(path, key, value, expiredays){
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = key + '=' + escape(value) + ';expires=' + exdate.toGMTString() + ';path=' + path;
	return this;
}
Cookie.get = function(key){
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(key + '=')
		if (c_start != -1) {
			c_start = c_start + key.length + 1;
			c_end = document.cookie.indexOf(';', c_start);
			if (c_end == -1){
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return null;
}
var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
Math.uuid = function (len, radix) {
  var chars = CHARS, uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random()*16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};
var xmlHttp;
function createXMLHttpRequest() {
	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}
}
function commonRequest(setting) {
	if (!setting || !setting.method || !setting.url || !setting.dataContent) {
		return;
	}
	createXMLHttpRequest();
	xmlHttp.open(setting.method, setting.url, true);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) {
				try {
					var responseText = xmlHttp.responseText;
					var responseJson = JSON.parse(responseText);
					setting.callBack && setting.callBack(responseJson);
				} catch (e) {
					setting.errorCallBack && setting.errorCallBack();
				}
			} else {
				// alert('网络异常，刷新后重试！');
			}
		}
	};
	xmlHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded; charset=UTF-8");
	xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	var data = 'dataContent='
			+ encodeURIComponent(JSON.stringify(setting.dataContent));
	xmlHttp.send(data);
}