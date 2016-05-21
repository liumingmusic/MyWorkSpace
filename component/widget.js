/**
 * Created by liumingming on 16/5/17.
 */
define(['jquery'], function ($) {

    function Widget() {
        //this.handlers = {};
        this.$panel = null;//最外层容器
    }

    Widget.prototype = {
        /**
         * 绑定事件
         * @param type 事件类型
         * @param handler 执行方法
         * @returns {Widget}
         */
        on: function (type, handler) {
            if (typeof this.handlers[type] == 'undefined') {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },
        /**
         * 执行绑定成功的事件
         * @param type 类型
         * @param data 参数
         */
        fire: function (type, data) {
            if (this.handlers[type] instanceof  Array) {
                var handlers = this.handlers[type];
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i](data);
                }
                this.handlers[type] = [];
            }
        },
        /**
         * 渲染组件
         * @param container
         */
        render: function (container) {
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.$panel);
        },
        destroy: function () {
            this.destructor();
            //this.$panel.off();
            this.$panel.remove();
        },
        /**添加dom节点*/
        renderUI: function () {
        },
        /**监听事件*/
        bindUI: function () {
        },
        /**初始化组件属性*/
        syncUI: function () {
        },
        /**销毁前的处理方法*/
        destructor: function () {
        }
    };
    return new Widget();
});