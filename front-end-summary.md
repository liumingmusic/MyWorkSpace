# front-end-summary

- ## 用JS求出元素的最终的`background-color`，不考虑元素float情况。
    > widow.getComputedStyle (获取css中设置的样式，'准浏览器'。返回的对象中，驼峰命名和中划线命名的都有，如：`background-color`和`backgroundColor`都有。
    > element.style (获取的是元素行间设置的样式)
    > element.currentStyle (ie低版本)

    ```javascript
    // 获取指定元素的某个CSS样式，兼容IE
    var getStyle = function($el, _attr) {
        if(window.getComputedStyle) {
            return window.getComputedStyle($el, null)[_attr]
        }
        if($el.currentStyle) {
            return $el.currentStyle[_attr];
        }
        return $el.style[_attr];
    }

    var getBG = function($el) {
        var color = getStyle($el, 'backgroundColor');
        if(color === 'rgba(0, 0, 0, 0)' || color === 'transparent') { // 判断是否透明
            return $el.tagName === 'HTML' ? 'rgb(255, 255, 255)' : arguments.callee($el.parentNode, 'backgroundColor');
        } else {
            return color;
        }
    }
    ```

- ## 前端优化简述

    > 应用优化涉及各个方面，前端优化只是冰山一角。有人说：“离开系统的性能瓶颈的前端优化都是扯蛋”，我觉得，我们各司其职，做好前端本职工作就好，不要好高骛远。

    - 优化目的
        1. 用户角度：页面加载更快、操作响应更快、体验更好
        1. 服务端角度：减少请求数、减小请求带宽
    - 优化方法
        1. 页面优化
            - HTTP请求数
                1. 从设计实现层面简化页面
                1. 合理设置`HTTP`缓存
                1. 资源合并与压缩(example：`CSS Sprites`)
                1. Inline Images（将图片嵌入到页面或style文件）
                1. Lazy Load Images
                1. 避免重复的资源请求
            - 资源的无阻塞加载
                1. CSS放在HEAD中
                1. JavaScript置底
                1. Lazy Load Javascript（example：`AMD`）
        1. 代码优化
            - DOM操作优化
                1. 减少DOM操作，减少`Reflow和Repaint`
                1. HTML Collection（类数组集合。并不是一个静态的结果，表示的仅是特定的查询，每次访问时会重新执行查询。需要遍历 HTML Collection时，将它转为数组再访问，以提高性能。）
            - JavaScript
                1. 减少作用域链查找（example：缓存全局变量）
                1. 慎用 `with、eval、Function`
                1. 减少闭包的使用（易内存浪费，不仅仅是常驻内存，重要的是，使用不当会造成无效内存的产生）
                1. 直接量、局部变量的使用（对象属性以及数组的访问需要更大的开销）
                1. 减少字符串拼接`+`使用
            - CSS选择符优化
                1. 减少层级，多用class（浏览器解析CSS是从右往左）
            - 资源优化
                1. 图片格式的选择（非透明大图尽量不用png、PS保存图片为`web格式`且勾选`连续`选项）
            -  HTML结构优化
                1. 使用HTML5 DOCTYPE
                1. 标签闭合、结构分离
                1. Boolean 属性不需要赋值，如果存在则为True（example：`checked、selected`）
                1. 语义化、标签统一整洁
                1. 减少文本和元素混合，并作为另一元素的子元素
                1. 避免使用`<br />、<hr />`

- ## defer、asyn

- ## CSS下载解析会不会阻塞DOM树渲染

- ## JS下载解析时会阻塞DOM树的构建

- ## 以什么为基准去衡量什么时候使用base64

- ## HTTPS和HTTP有什么区别

- ## SSL四次握手过程?

- ## TCP三次握手过程?

- ## SSL握手时有对称加密和非对称加密吗

- ## CSS inline?

- ## 快排算法?

- ## 盒模型(W3C和IE)

- ## flex的使用

- ## CSS hack技术

- ## call与apply的区别

- ## 跨域?

- ## 从输入url到渲染的整个过程?

- ## 懒加载(跟预加载的区别?

- ## 如果父元素的font-size也是采用em表示，那么子元素的font-size怎么计算等?

- ## 有没有遇到过margin重叠的现象?如何解决？BFC

- ## bootstrap是怎么做的？bootstrap是怎么实现grid系统的？

- ## 什么是浅复制和深复制？有什么区别？如何实现Object的深复制？[递归的方法进行复制/循环的方法]

- ## xss和csrf
