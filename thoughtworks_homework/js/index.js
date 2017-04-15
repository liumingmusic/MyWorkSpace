/**
 * @description 业务实现代码
 * @author 刘明明
 * @Date 2017-4-5
 */
window.onload = function () {
    var m_addPanel = M("#addPanel"),
        m_btnAddResource = M("#btnAddResource"),
        m_btnClosePanel = M("#btnClosePanel"),
        m_resourceDel = M(".resource-del"), //选择删除事件
        m_resourceSpecify = M(".resource-specify"), //选择添加事件
        m_flagTarget = null; //临时变量判断当前是哪个资源进行点击新增
    var add_y = 42,
        add_x = 60;

    //事件绑定 新增和删除资源
    M_on(M('.main-inner')[0], 'click', function (e) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.className === 'resource-del') {
            _delResource(e);
        } else if (target.className === 'resource-specify' || target.className === 'resource-add') {
            _addResource(e);
        }
    });

    //绑定事件
    M_on(m_btnAddResource, 'click', function (e) {
        _submitResource();
    });
    M_on(m_btnClosePanel, 'click', function (e) {
        _closePanel();
    });

    //具体删除资源的方法
    var _delResource = function (e) {
        var parentDOM = e.target.parentNode;
        //删除之前判断一下
        if (confirm('是否删除资源')) {
            parentDOM.remove();
        }
    }

    //添加资源事件绑定
    var _addResource = function (e) {
        m_flagTarget = e.target; //临时变量
        var target = e.target;

        //绝对布局top和left值
        var top = target.offsetTop + add_y + "px",
            left = target.offsetLeft - add_x + "px";
        //添加样式
        M_css(m_addPanel, {
            "top": top,
            "left": left,
            "display": "block"
        });
    }

    //关闭资源添加弹窗
    var _closePanel = function () {
        M("#inputResource").value = "";
        M_css(m_addPanel, {"display": "none"});
    }

    //浮窗提交事件绑定
    var _submitResource = function () {
        var targetParent = m_flagTarget.parentNode,
            m_resourceServer = M_Sibling(m_flagTarget, "resource-title");
        var vals = M("#inputResource")
            .value
            .replace(/，/g, ","); //处理输入中文分割
        var items = vals.split(",");
        //循环遍历 append
        for (var i = 0; i < items.length; i++) {
            if (items[i].length) {
                //创建节点 父节点
                var span = document.createElement('span');
                span.innerHTML = items[i];
                span.setAttribute("class", "resource-server");
                //删除按钮
                var delSpan = document.createElement('span');
                delSpan.innerHTML = "×";
                delSpan.setAttribute("class", "resource-del");
                span.appendChild(delSpan);
                //添加到页面
                targetParent.insertBefore(span, m_resourceServer.nextSibling);
            }
        }
        //关闭弹出
        _closePanel();
    }

}