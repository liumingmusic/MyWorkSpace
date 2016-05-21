/**
 * Created by liumingming on 16/5/15.
 */
define(['widget', 'jquery', 'jqueryUI'], function (widget, $, $UI) {
    function Window() {
        //定义字典
        this.option = {
            content: '',
            width: 350,
            height: 200,
            title: '消息',
            btnOkHandler: null,
            btnOkText: '确定',
            btnOkSkin: 'success',
            btnCloseHandler: null,
            btnClose: false,
            skinClassName: 'default',
            hasMask: false,
            isDraggable: true
        };
    }

    Window.prototype = $.extend({}, widget, {
        /**添加dom节点*/
        renderUI: function () {
            //弹框主体
            this.$panel = $("<div class='panel panel-" + this.option.skinClassName + "'>" +
                "<div class='panel-heading'></div>" +
                "<div class='panel-body'>" + this.option.content + "</div>" +
                "<div class='panel-footer'>" +
                "<input type='button' class='btn btn-" + this.option.btnOkSkin + " ok' value='" + this.option.btnOkText + "'/>" +
                "</div>" +
                "</div>");
            //添加模态
            if (this.option.hasMask) {
                this._$mask = $("<div class='window-mask has-mask'></div>");
                this._$mask.appendTo("body");
            } else {
                this._$mask = $("<div class='window-mask no-mask'></div>");
                this._$mask.appendTo("body");
            }
            //是否需要关闭按钮
            if (this.option.btnClose) {
                var $headClose = $('<span class="panel-close" title="关闭">x</span>');
                this.$panel.find(".panel-heading").append(this.option.title, $headClose);
            } else {
                this.$panel.find(".panel-heading").append(this.option.title);
            }
        },
        /**节点监听事件*/
        bindUI: function () {
            var that = this;
            this.$panel.delegate("input[class*=ok]", "click", function () {
                that.fire("okHandler");
                that.destroy();
            }).delegate(".panel-close", "click", function () {
                that.fire("closeHandler");
                that.destroy();
            });
            //非链式结构书写
            if (this.option.btnCloseHandler) {
                that.on("closeHandler", this.option.btnCloseHandler);
            }
            if (this.option.btnOkHandler) {
                that.on("okHandler", this.option.btnOkHandler);
            }
        },
        /**初始化组件属性*/
        syncUI: function () {
            //基本样式
            this.$panel.css({
                width: this.option.width + 'px',
                height: this.option.height + 'px',
                left: (this.option.x || (window.innerWidth - this.option.width) / 2) + 'px',
                top: (this.option.y || (window.innerHeight - this.option.height) / 2) + 'px'
            });
            this.$panel.find(".panel-body").css({'min-height': this.option.height - (95) + 'px'});
            //是否拖动
            if (this.option.isDraggable) {
                this.$panel.draggable({handle: '.panel-heading'});
            }
        },
        /**销毁前的处理方法*/
        destructor: function () {
            this._$mask && this._$mask.remove();
        },
        alert: function (option) {
            $.extend(this.option, option);
            this.render();
            return this;
        },
        confirm: function () {

        },
        prompt: function () {

        }
    });
    return {Window: Window};
});
















