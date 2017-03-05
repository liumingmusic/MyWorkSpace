(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.RadiuslMotion = factory();
    }
}(this, function () {

    var radialMotionVersion = "1.0.0";

    /**
     * 创建径向运动
     * @param {*} startAngle 开始角度
     * @param {*} endAngle 结束角度
     * @param {*} targetDom 目标对象
     */
    var _create = function (targetDom, startAngle, endAngle) {
        //获取主节点
        var $this = $(targetDom);
        //添加角度区域，最主要的目的就是传入的变量不能保存起来
        $this.attr('data-startAngle', startAngle);
        $this.attr('data-endAngle', endAngle);
        //获取相应的节点对象
        var $handlerBtn = $this.find(".main-nav");
        //事件绑定
        $handlerBtn.click(function (e) {
            var $this = $(this);
            var $navWrap = $this.closest('.nav-wrap');
            var $navs = $navWrap.find("nav a");
            //激活时触发
            if (!$navWrap.hasClass('active')) {
                //圆的半径
                var radiusX = $navWrap.width() / 2;
                var radiusY = $navWrap.height() / 2;
                //起始角度和结束角度
                var startAngle = +$navWrap.attr("data-startAngle") || 0,
                    endAngle = +$navWrap.attr("data-endAngle") || 360;
                //两个子菜单的夹角
                var gap = (endAngle - startAngle) / ($navs.length & 1 ? $navs.length - 1 : $navs.length);
                //循环计算各个子菜单的位置
                $.each($navs, function (index, item) {
                    //当前子菜单与X轴的正向夹角  弧度
                    var angle = (startAngle + gap * index) * (Math.PI / 180);
                    //加上radius的目的是让园移动到正方形的中心
                    var x = radiusX + radiusX * Math.cos(angle);
                    var y = radiusY + radiusY * Math.sin(angle);
                    //设置样式
                    $(this).css({
                        "left": x + "px",
                        "top": y + "px"
                    });
                });
            }
            $navWrap.toggleClass("active");
        });
    }

    /**
     * 销毁径向运动
     * @param {*} targetDom 
     */
    var _destroy = function (targetDom) {
        $(targetDom).off();
    }

    /**
     * 返回当前版本
     */
    var _version = function () {
        return radialMotionVersion;
    }

    //共有接口暴露，进行调用
    return {
        create: _create,
        destroy: _destroy,
        version: _version()
    }
}));