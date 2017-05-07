var Lmm = (function () {
    //定义变量
    var $,
        lmm = {};

    //
    $ = function (selector, context) {
        return lmm.init(selector, context);
    }

    //
    lmm.init = function (selector, context) {
        var dom;
        selector = selector.trim();
        //判断是否传入的值
        if (!selector) {
            return lmm.Z();
        } else if (typeof selector == 'string') {
            //只处理id、css、标签选择器三种
            dom = lmm.qsa(document, selector);
        }
        return lmm.Z(dom, selector);
    }

    //
    lmm.Z = function (dom, selector) {
        dom = dom || [];
        dom.__proto__ = $.fn;
        dom.selector = selector || '';
        return dom;
    }

    //
    lmm.qsa = function (element, selector) {
        if (~ selector.indexOf("#")) {
            //id 选择器
            return element.getElementById(selector.slice(1));
        } else if (~ selector.indexOf(".")) {
            //class 选择器
            var doms = [],
                className = selector.slice(1);
            //支持通过类获取元素方法
            if (element.getElementsByClassName) {
                doms = element.getElementsByClassName(selector);
            } else {
                doms = element.getElementsByTagName("*");
            }
            return doms;
        } else {
            //元素名称选择器
            return element.getElementsByTagName(selector);
        }
    }

    //
    $.fn = {
        forEach: [].forEach,
        reduce: [].reduce, // 方法何用？？？？
        push: [].push,
        sort: [].sort,
        indexOf: [].indexOf,
        concat: [].concat,
        addClass: function () {},
        css: function () {},
        removeClass: function () {},
        size: function () {},
        toArray: function () {}
    }
    
    //
    lmm.Z.prototype = $.fn;

    //
    return $;
})();

window.Lmm = Lmm;
window.$ === undefined && (window.$ = Lmm)