/**
 * Created by liumingming on 16/5/15.
 */
define(['jquery'], function ($) {
    function Window() {
        //定义字典
        this.option = {
            content: '',
            width: 350,
            height: 200,
            title: '消息',
            btnOkHandler: null,
            btnCloseHandler: null,
            btnClose: true,
            skinClassName: 'default'
        }
    }

    Window.prototype = {
        alert: function (option) {
            //使用默认值还是用户自定义
            var opt = $.extend(this.option, option);
            var $panel = $("<div class='panel panel-" + opt.skinClassName + "'></div>");
            var $panelHeading = $("<div class='panel-heading'></div>");
            var $panelBody = $("<div class='panel-body'></div>");
            var $panelFooter = $("<div class='panel-footer'></div>");
            var $headClose = $('<span class="panel-close" title="关闭">x</span>');
            //添加主体区域
            $panel.appendTo("body");
            $panel.append($panelHeading);
            $panel.append($panelBody);
            $panel.append($panelFooter);
            $panelBody.html(opt.content);
            //判断是否显示关闭按钮
            if (opt.btnClose) {
                $panelHeading.append(opt.title, $headClose);
                $headClose.click(function () {
                    opt.btnCloseHandler && opt.btnCloseHandler();
                    $panel.remove();
                });
            } else {
                $panelHeading.append(opt.title);
            }
            //添加按钮
            var $btnOk = $("<input type='button' class='btn btn-success' value='确定'/>");
            $btnOk.appendTo($panelFooter);
            $btnOk.click(function () {
                opt.btnOkHandler && opt.btnOkHandler();
                $panel.remove();
            });
            //指定宽高
            $panel.css({
                width: opt.width + 'px',
                height: opt.height + 'px',
                left: (opt.x || (window.innerWidth - opt.width) / 2) + 'px',
                top: (opt.y || (window.innerHeight - opt.height) / 2) + 'px'
            });
            $panelBody.css({'min-height': opt.height - (95) + 'px'})
        },
        confirm: function () {

        },
        prompt: function () {

        }
    };
    return new Window();
});
