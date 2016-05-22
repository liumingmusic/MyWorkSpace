/**
 * Created by liumingming on 16/5/15.
 */
require.config({
    baseUrl: './',
    paths: {
        jquery: 'lib/jquery-1.8.3.min',
        jqueryUI: 'lib/jquery-ui.min'
    }
});

require(['jquery', 'window'], function ($, window) {

    $("#a").click(function () {
        window.alert({
            content: '消息',
            width: 400,
            height: 200,
            title: '系统消息',
            y: 50,
            skinClassName: 'danger',
            btnOkText: '确定',
            btnOkSkin: 'info',
            btnClose: true
        }).on("okHandler", function () {
            console.log('点击确定按钮触发事件');
        }).on("closeHandler", function () {
            console.log('点击关闭按钮按钮触发事件');
        });
    });

    $("#a1").click(function () {
        window.confirm({
            content: '警告',
            width: 400,
            height: 200,
            title: '系统消息',
            y: 50,
            skinClassName: 'danger',
            btnOkText: '删除',
            btnOkSkin: 'danger',
            btnClose: true
        }).on("okHandler", function () {
            console.log('点击确定按钮触发事件');
        }).on("cancelHandler", function () {
            console.log('点击取消按钮触发事件');
        }).on("closeHandler", function () {
            console.log('点击关闭按钮按钮触发事件');
        });
    });

});
