/**
 * 简单的dom选择器
 *
 * @param {any} dom
 * @returns 原生dom对象
 */
function M(dom) {
    if (~ dom.indexOf("#")) { //id 选择器
        return document.getElementById(dom.slice(1));
    } else if (~ dom.indexOf(".")) { //class 选择器
        var doms = [],
            className = dom.slice(1);
        //支持通过类获取元素方法
        if (document.getElementsByClassName) {
            doms = document.getElementsByClassName(className);
        } else {
            doms = document.getElementsByTagName("*");
        }
        return doms;
    } else { //元素名称选择器
        return document.getElementsByTagName(dom);
    }
}

/**
 * 当前节点的相邻节点
 * 目前只支持下一个节点，通过类名进行匹配
 * @param {any} dom
 * @param {any} className
 */
function M_Sibling(dom, className) {
    if (dom.className === className) {
        return dom;
    } else {
        return M_Sibling(dom.nextSibling, className);
    }
}

/**
 * 原生javascript事件绑定
 *
 * @param {any} dom dom对象
 * @param {any} type 事件类型
 * @param {any} handle 回调函数
 */
function M_on(dom, type, handle) {
    try { // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        dom.addEventListener(type, handle, false);
    } catch (e) {
        try { // IE8.0及其以下版本
            dom.attachEvent('on' + type, handle);
        } catch (e) { // 早期浏览器
            dom['on' + type] = handle;
        }
    }
}

/**
 * 移除事件绑定
 *
 * @param {any} dom
 * @param {any} type
 * @param {any} handler
 */
function M_removeOn(dom, type, handle) {
    if (dom.removeEventListener) {
        dom.removeEventListener(type, handle, false);
    } else if (dom.detachEvent) {
        dom.detachEvent('on' + type, handle);
    } else if (dom != window) {
        dom['on' + type] = null;
    }
}

/**
 * 原生dom添加样式，只支持css对象
 *
 * @param {any} dom
 * @param {any} obj
 */
function M_css(dom, obj) {
    if (typeof obj === 'object') {
        for (var i in obj) {
            dom.style[M_cameCase(i)] = obj[i];
        }
    }
}

/**
 * 将横线命名转换为驼峰命名,主要用于样式部分
 *
 * @param {any} str
 * @returns
 */
function M_cameCase(str) {
    return str.replace(/\-(\w)/g, function (match, letter) {
        return letter.toUpperCase();
    })
}