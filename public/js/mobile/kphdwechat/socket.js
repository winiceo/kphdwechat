/**
 * Created by chenshi on 16/6/15.
 */
/********************* 发送请求 End ************************/
/********************* Socket 封装 Start ************************/

function Socket(setting) {
    var defaultSetting = {
        baseUrl : 'ws://wall-dev.71an.com:1337' ,
        uri : '',
        onOpen : function() {
            Debug.log('Info: connection opened.');
        },
        onMessage : function(uri, payload) {
            Debug.log('Received: ' +  payload.msg);
        },
        onClose : function(error) {
            //Debug.log('Info: connection closed.');
            //Debug.log(error);
            console.log("Disconnected for " + error.reason + " with code " + error.code);
            //close();
        }
    }
    this.setting = $.extend(defaultSetting, setting);
    this.socket = null;
    this.session = null;
};

Socket.prototype.connect = function() {

    var _this = this;

    _this.socket = WS.connect(_this.setting.baseUrl);

    _this.socket.on("socket/connect", function(session){
        session.subscribe("andy/channel/"+window.__app.flag,_this.setting.onMessage);
        _this.session = session;
    });
    _this.socket.on("socket/disconnect",_this.setting.onClose);
};

Socket.prototype.close = function() {
    if (this.socket != null&&this.session!=null) {
        //this.socket.close();
        this.session.unsubscribe("andy/channel/"+window.__app.flag);
        this.socket = null;
        this.session=null;
    }
};

Socket.prototype.isOpen = function() {
    if (this.socket != null) {
        return true;
    } else {
        return false;
    }
};

Socket.prototype.send = function(data) {
    if (this.socket != null&&this.session!=null) {
        this.session.publish("andy/channel",data);
    }
};
/********************* Socket 封装 End ************************/