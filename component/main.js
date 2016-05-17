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
            skinClassName: 'default',
            btnOkText: '确定',
            btnOkSkin: 'info',
            btnClose: true,
            btnOkHandler: function () {
                console.log('...');
            }
        }).on("okHandler", function () {
            console.log('点击确定按钮触发事件1..');
        }).on("okHandler", function () {
            console.log('点击确定按钮触发事件2..');
        });
    });

});
