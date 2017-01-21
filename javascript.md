# javascript

- ### LazyMan
    - 实现LazyMan（什么是LazyMan？请自行google）
    ```javascript
    function _LazyMan(_name) {
        var _this = this;
        _this.tasks = [];
        _this.tasks.push(function() {
            console.log('Hi! This is ' + _name + '!');
            // 这里的this是window，所以要缓存this
            _this.next();
        });
        setTimeout(function() {
            _this.next();
        }, 0);
    }

    // push函数里面的this和setTimeout函数里面的this都指向全局作用域，所以要缓存当前this指向
    _LazyMan.prototype.next = function() {
        var _fn = this.tasks.shift();
        _fn && _fn();
    }
    _LazyMan.prototype.sleep = function(_time) {
        var _this = this;
        _this.tasks.push(function() {
            setTimeout(function() {
                console.log('Wake up after ' + _time);
                _this.next();
            }, _time);
        });
        return _this;
    }
    _LazyMan.prototype.sleepFirst = function(_time) {
        var _this = this;
        _this.tasks.unshift(function() {
            setTimeout(function() {
                console.log('Wake up after ' + _time);
                _this.next();
            }, _time);
        });
        return _this;
    }
    _LazyMan.prototype.eat = function(_eat) {
        var _this = this;
        _this.tasks.push(function() {
            console.log('Eat ' + _eat);
            _this.next();
        });
        return _this;
    }

    // 封装对象
    var LazyMan = function(_name) {
        return new _LazyMan(_name);
    }
    ```

- ### 数据类型
    - 6种原始值（不可变。“除非重置当前变量，否则不能改变元素值。”）
        1. Null(只有一个值： null)
        1. Undefined(一个没有被赋值的变量会有个默认值 undefined)
        1. Number
        1. Boolean(两个值：true 和 false)
        1. String
        1. [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
    - 和Object(对象指内存中的可以被标识符引用的一块区域)

- ### 数据类型检测
    - typeof(对变量或值调用 typeof 运算符将返回(字符串)下列值之一)
        1. undefined - Undefined类型
        1. number - Number类型
        1. boolean - Boolean类型
        1. string - String类型
        1. symbol - Symbol类型(ECMAScript6新增)
        1. function - 函数对象([[Call]]在ECMA-262条款中实现了)
        1. object - 引用类型 或 Null类型
    ```javascript
    typeof(Function) // function (Function是函数对象)
    typeof(new Function) // function (new Function也是是函数对象，同等：var func = function(){})
    typeof(Array) // function (Array是函数对象)
    typeof(new Array) // object（实例化的Array就是object）
    ```

- ### 变量赋值时候的返回值：
    ```javascript
    var name = 123; // 返回undefined
    name = 456; // 返回456
    ```
    > 结语：定义变量的时候赋值返回:undefined
    > 给已声明变量赋值时候返回当前赋值。

- ### 获取元素距离页面的top、left
    ```javascript
    function getRec(ele) {
        var _t = document.documentElement.clientTop,
            _l = document.documentElement.clientLeft,
            rect = ele.getBoundingClientRect();
        return {
            top: rect.top - _t,
            right: rect.right - _l,
            bottom: rect.bottom - _t,
            left: rect.left - _l
        }
    }
    ```
    > 注意：IE、Firefox3+、Opera9.5、Chrome、Safari支持，在IE中，默认坐标从(2,2)开始计算，导致最终距离比其他浏览器多出两个像素，我们需要做个兼容。

- ### 数字的固定小数位数
    ```javascript
    var a=8.88888,
        b=8;
    console.log(a.toFixed(2)); // 8.89 或者 8.88
    console.log(b.toFixed(2)); // 8.00
    ```

- ### js是编译语言，数组长度是随时程序变化而变化的
    ```javascript
    var arr = [0, 1];
    arr[3] = 3;
    console.log(arr[2]); // undefined
    console.log(arr.length); // 4
    ```

- ### 矩阵的转置
    ```javascript
    var arr = [ // 定义一个矩阵（二维数据）
        [1, 2, 3, 4],
        [5, 6, 6, 6],
        [7, 6, 7, 8],
        [8, 5, 3, 3]
    ];

    function changeArr(arr) { // 矩阵转置函数
        var c;
        for (var i = 1; i < arr.length; i++) {
            for (var j = 0; j < i; j++) {
                c = arr[i][j];
                arr[i][j] = arr[j][i];
                arr[j][i] = c;
            }
        }
    }
    changeArr(arr);
    console.table(arr);
    ```

- ### 冒泡排序方法
    ```javascript
    // 第一轮是对n-1的位置定位
    // 第二轮是 每一个位置的数的 确定
    var arr = [1, 4, 5, 6, 99, 111, 112, 113, 133],
        temp = 0,
        flag = false;
    for (var i = 0; i < arr.length - 1; i++) {
        document.writeln('come');
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = true;
            }
        }
        if (flag) {
            flag = false;
        } else {
            break;
        }
    }
    for (var i = 0; i < arr.length; i++) {
        document.writeln(arr[i]);
    };
    ```


- ### 二分查找
    ```javascript
    var arr = [41, 55, 76, 87, 88, 99, 123, 432, 546, 577, 688, 786];

    function twoFind(arr, wantVal, leftIndex, rightIndex) {
        if (leftIndex > rightIndex) {
            document.writeln('SORRY: 找不到 ' + wantVal + ' ！');
            return;
        }
        var minIndex = Math.floor((leftIndex + rightIndex) / 2);
        if (arr[minIndex] > wantVal) {
            twoFind(arr, wantVal, leftIndex, minIndex - 1);
        } else if (arr[minIndex] < wantVal) {
            twoFind(arr, wantVal, minIndex + 1, rightIndex);
        } else {
            document.writeln('找到了 ' + wantVal + ' ,下表为' + minIndex);
        }
    }
    twoFind(arr, 9, 0, arr.length - 1);
    ```

- ### js对象访问属性的二种方式
    ```javascript
    function Person () {};
    var new1 = new Person ();
    new1.name='冯杰';
    new1.age=21;
    window.alert(new1.name);
    window.alert(new1["age"]);
    ```


- ### js之delete只能删除对象的属性
    ```javascript
    function Person () {};
    var me = new Person();
    me.name='冯杰';
    console.log(me.name);
    delete me.name;
    console.log(me.name);
    ```

- ### 在js中对象的方法不是通用的，如果生成n个对象，那么就有n个内存堆栈
    ```javascript
    // js 中 一切类 继承自 Object 而Object 有propotype
    // 下面是解决办法 prototype 获得类的static性质
    function God() {}
    God.prototype.shout = function() {
        window.alert('小狗叫');
    }
    var dog1 = new God();
    var dog2 = new God();
    dog1.shout();
    dog2.shout();
    ```

- ### 对象
    ```javascript
    // js里要想创建对象 除了一般的创建方式 还有 通过Object 方式创建类
    // Object 类是所有js类的基类 Object 就表示对象（一切的对象）
    var p1 = new Object();
    p1.name = 'fj';
    window.alert(p1.name);
    window.alert(p1.constructor);

    // 原型链上新增默认对象方法
    var num = new Number(1);
    var num2 = 10;
    window.alert(num.constructor);
    window.alert(num2.constructor);
    // 上面2个弹出是一样的
    Number.prototype.add = function(a) { //prototype是属于类的
        return this + a;
    }
    window.alert(num.add(1).add(2));

    // 小实验 为Array 添加 find(val) 方法
    Array.prototype.find = function(a) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == a) {
                return i;
            }
        }
        return 'find fail.';
    }
    var arr = [0, 1, 2, 77, 4, 5];
    window.alert(arr.find(77));
    ```

- ### arguments
    ```javascript
    function abc() {
        var sum = 0;
        for (var i = 0; i < arguments.length; i++) {
            sum += arguments[i];
        }
        return sum;
    }
    window.alert(abc(1, 2, 3));
    ```

- ### call函数目的就是改变对象的this指向
    ```javascript
    var Person = {
        name: 'fjj'
    };

    function test() {
        window.alert(this.name);
    }
    test.call(Person);
    ```

- ### 体会js的封装
    ```javascript
    function Person() {
        var name = 'fj'; //私有
        this.age = 21; //共有
    }
    var p1 = new Person();
    window.alert(p1.name); //undefined
    window.alert(p1.age); //21
    ```

- ### prototype的方法不能访问私有属性和方法
    ```javascript
    function Person() {
        var name = 'fj'; //私有
        this.age = 21;
    }
    Person.prototype.showName = function() {
        window.alert(this.name);
    }
    Person.prototype.showAge = function() {
        window.alert(this.age);
    }
    var p1 = new Person();
    p1.showName();
    p1.showAge();
    ```

- ### 继承
    ```javascript
    // js 里面是对象冒充来继承的 不算是真正的继承 通过对象冒充 js可以实现多重继承和继承的效果 但是没有Extends关键字
    function Father(name, age) {
        this.name = name;
        this.age = age;
        this.show = function() {
            window.alert(this.name + '---' + this.age);
        }
    }

    function Son(name, age) {
        this.Father = Father;
        this.Father(name, age); //通过对象冒充 实现继承 这一句非常重要 js是动态语言 不是编译语言 要执行才会分配空间
    }
    var me = new Son('fj', 21);
    window.alert(me.name);
    me.show();
    ```

- ### 重载
    ```javascript
    // js从常理来说是不支持重载的 但是又可以说是天然支持重载 因为js天然支持可变参数 而且我们可以通过arguments[]数组的长度判断 而做出相应的处理
    ```

- ### 闭包
    ```javascript
    // 闭包实际上设计一个对象的属性，何时被gc处理的问题 闭包和gc是相关联的
    ```

- ### 数组长度
    ```javascript
    // 数组的长度是根据下标的最大而确定的
    var arr = new Array();
    arr['a'] = 1;
    arr['b'] = 2;
    window.alert(arr.length); // 打出0
    ```
