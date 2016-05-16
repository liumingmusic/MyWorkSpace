/**
 * Created by liumingming on 16/5/15.
 */
define(['jquery', 'jqueryUI'], function ($, $UI) {
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
            btnClose: true,
            skinClassName: 'default',
            hasMask: true,
            isDraggable: true
        }
    }

    Window.prototype = {
        alert: function (option) {
            //使用默认值还是用户自定义
            var opt = $.extend(this.option, option);
            //需要使用到的DOM对象
            var $panel = $("<div class='panel panel-" + opt.skinClassName + "'></div>");
            var $panelHeading = $("<div class='panel-heading'></div>");
            var $panelBody = $("<div class='panel-body'></div>");
            var $panelFooter = $("<div class='panel-footer'></div>");
            var $headClose = $('<span class="panel-close" title="关闭">x</span>');
            var $mask = $("<div class='window-mask'></div>");
            //添加主体区域
            $panel.appendTo("body");
            $panel.append($panelHeading);
            $panel.append($panelBody);
            $panel.append($panelFooter);
            $panelBody.html(opt.content);
            //添加弹框模态
            if (opt.hasMask) {
                $mask.appendTo("body");
            }
            //是否可以拖动
            if (opt.isDraggable) {
                $panel.draggable({handle: '.panel-heading'});
            }
            //判断是否显示关闭按钮
            if (opt.btnClose) {
                $panelHeading.append(opt.title, $headClose);
                $headClose.click(function () {
                    opt.btnCloseHandler && opt.btnCloseHandler();
                    $panel.remove();
                    $mask && $mask.remove();
                });
            } else {
                $panelHeading.append(opt.title);
            }
            //添加按钮
            var $btnOk = $("<input type='button' class='btn'/>").addClass("btn-" + opt.btnOkSkin).val(opt.btnOkText);
            $btnOk.appendTo($panelFooter);
            $btnOk.click(function () {
                opt.btnOkHandler && opt.btnOkHandler();
                $panel.remove();
                $mask && $mask.remove();
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
