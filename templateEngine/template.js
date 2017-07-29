/**
 * 不考虑负责的if for while等语句，只是简单的表达式
 *
 * @param {any} temp 页面模板
 * @param {any} data 数据
 */
function templateEngine_1(temp, data) {
    //定义变量
    var reg = /<%([^%>]+)?%>/gi,
        cursor = 0,
        code = 'var _arr = []; \n';
    //正则循环处理
    while (match = reg.exec(temp)) {
        //非js相关逻辑代码
        code += '_arr.push("' + temp.slice(cursor, match.index) + '");\n';
        //js相关逻辑代码
        code += '_arr.push(data.' + match[1] + ');\n';
        //修改移动的下标
        cursor = match.index + match[0].length;
    }
    //添加code结尾部分
    code += '_arr.push("' + temp.slice(cursor, temp.length) + '");\n';
    code += 'return _arr.join("");\n';
    //使用Function构造函数
    var result = new Function("data", code.replace(/\n\r\t/g, ''));
    return result(data);
}

/**
 * 考虑负责的if for while等语句，
 *
 * @param {any} temp 页面模板
 * @param {any} data 数据
 */
function templateEngine_2(temp, data) {
    //定义变量
    var reg = /<%([^%>]+)?%>/gi,
        regx = /(if|for|else|switch|case|break|{|})+/g,
        cursor = 0,
        code = 'var _arr = []; \n';
    var addCode = function (tmp, flag) {
        if (flag) { //js逻辑相关代码
            if (tmp.match(regx)) { //包含语句代码
                code += tmp + '\n';
            } else {
                code += '_arr.push(' + tmp + ');\n';
            }
        } else { //非js逻辑相关代码
            code += '_arr.push("' + tmp.replace(/(\r|\n|\t)+/g,"") + '");\n';
        }
    };
    //正则循环处理
    while (match = reg.exec(temp)) {
        //非js相关逻辑代码
        addCode(temp.slice(cursor, match.index).trim(), false);
        //js相关逻辑代码 非if等语句
        addCode(match[1].trim(), true);
        //修改移动的下标
        cursor = match.index + match[0].length;
    }
    //添加code结尾部分
    addCode(temp.slice(cursor, temp.length).trim(), false);
    code += 'return _arr.join("");\n';
    console.log(code);
    // 使用Function构造函数
    var result = new Function("data", code.replace(/[\n\r\t]+/g, ''));
    return '';
}