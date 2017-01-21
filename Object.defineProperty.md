# Object.defineProperty
> [MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

- 意义与使用场景
    > `Object.defineProperty`可以监听某个对象的属性的设置与取值，并且可以自定义相关函数。
    > PS：对象初始化的值会被清空，定义初始值只能在函数内部定义
- 语法
    ```javascript
    Object.defineProperty(objName, propName, descriptor);
    ```
- 参数
    1. objName：需要定义属性的对象。
    1. propName：需定义或修改的属性的名字。
    1. descriptor：将被定义或修改的属性的描述符。

```javascript
{
    configurable: false, // 当且仅当configurable为true时，当前propName才能够被改变，也能够被删除。默认为 false。
    enumerable: false, // 当且仅当enumerable为true时，当前propName才能够出现在对象的枚举属性中。默认为 false。
    value: null, // 当前propName对应的值。可以是任何有效的JavaScript值（数值，对象，函数等）。默认为 undefined。这就是解释了为什么：”对象初始化的值会被清空，定义初始值只能在函数内部定义。“
    writable: false // 当且仅当writable为true时，当前propName才能被赋值运算符改变。默认为 false。
    get: function() { // getter方法。该方法返回值被用作属性值。默认为 undefined。
        // 其他的代码…
        return 'self define value'; // 也可以没有返回值，默认为 undefined
    },
    set: function(_val) { // setter方法。如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。
        // 其他的代码…
    }
}
```
> PS: 数据描述符和存取描述符不能混合使用。比如get 和 value不可以共存。

- 返回值
    > 返回传入函数的对象，即第一个参数obj


