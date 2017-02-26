/**
 *
 * @type {{regist, fire, remove}}
 */
var ObserverModule = (function (window) {

    //消息队列
    var _message = {};

    /**
     * 注册消息接口
     * @param type 类型
     * @param callback 回调函数
     * @private
     */
    var _regist = function (type, callback) {
        //如果此消息不存在，创建一个
        if (typeof _message[type] === 'undefined') {
            _message[type] = [callback];
        } else {
            //此消息存在 将方法加入到消息队列中
            _message[type].push(callback);
        }
    };

    /**
     * 发布消息接口
     * @param type 类型
     * @param data 参数
     * @private
     */
    var _fire = function (type, data) {
        //如果消息没有被注册，直接返回
        if (!_message[type]) {
            return;
        }
        //定义消息
        var message = {
            type: type,
            data: data || {},
            code: 1
        };
        var length = _message[type].length;
        //遍历消息方法
        for (var i = 0; i < length; i++) {
            //使用call 传入参数执行方法
            _message[type][i].call(this, message);
        }
    };

    /**
     * 接触消息接口
     * @param tyep 类型
     * @param callback 回调函数
     * @private
     */
    var _remove = function (tyep, callback) {
        //如果消息队列存在
        if (_message[callback] instanceof Array) {
            var len = _message[callback].length - 1;
            for (var i = 0; i < len; i++) {
                _message[callback][i] === fn && _message[callback].splice(i, 1);
            }
        }
    };

    return {
        regist: _regist,
        fire: _fire,
        remove: _remove
    }

}(window));
