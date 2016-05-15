/**
 * Created by liumingming on 16/5/15.
 */
require.config({
    paths: {
        'jquery': './lib/jquery-1.8.3.min'
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
            skinClassName: 'info',
            btnClose: false,
            btnOkHandler: function () {
                console.log('...');
            }
        });
    });

});
