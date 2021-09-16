# 闭包的作用 - 提炼代码
---
1.封装变量
---
> 通过闭包的封装变量，可以把一些全局变量变成私有变量
```javascript
// 计算乘积的函数，相同的参数重复计算是一个浪费
const mult = function () {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
};

// 这里引入缓存机制提高函数的性能,但是有一个全局变量cacheMap
const cacheMap = new Map()
const mult = function () {
    const args = Array.prototype.join.call(arguments, ',');
    if (cacheMap.has(args)) {
        return cacheMap.has(args)
    }
    let result = 1;
    for (let i = 0, l = arguments.length; i < l; i++) {
        result = result * arguments[i];
    }
    cacheMap.set(args,result)
    return result;
};

// 通过闭包将cacheMap封闭在 mult 函数内部，减少全局变量的存在，避免这个变量在其他地方被不小心修改而引发错误。
const mult = (() => {
    const cacheMap = new Map()
    return function () {
        const args = Array.prototype.join.call(arguments, ',');
        if (cacheMap.has(args)) {
            return cacheMap.get(args)
        }
        let result = 1;
        for (let i = 0, l = arguments.length; i < l; i++) {
            result = result * arguments[i];
        }
        cacheMap.set(args, result)
        return result;
    };
})()

// 上面函数基本上已经ok，我们可以把计算的逻辑抽离出来，提炼代码也是代码重构的一个技巧
const mult = (() => {
    const cacheMap = new Map()
    //好的命名本身起到了注释的作用
    const calculate = function () {
        let result = 1;
        for (let i = 0, l = arguments.length; i < l; i++) {
            result = result * arguments[i];
        }
        return result;
    }
    return function () {
        const args = Array.prototype.join.call(arguments, ',');
        if (cacheMap.has(args)) {
            return cacheMap.get(args)
        }
        cacheMap.set(args, calculate.apply(null, arguments))
        return cacheMap.get(args);
    };
})()

mult(2,3,5) // output 30

```

---
2.延续局部变量的寿命 
---
> 使用 **Image** 对象用于数据上报
```javascript
// 数据上报会出现数据丢失的问题
const report = function (src) {
    var img = new Image();
    img.src = src;
};

report('http://paypal.com/handIn?v=1');

// 通过闭包把变量 img 封闭起来，数据上报丢失的原因是get请求未发出，函数已经执行完
const report = (function () {
    const imgs = [];
    return function (src) {
        const img = new Image();
        imgs.push(img);
        img.src = src;
    }
})();

```