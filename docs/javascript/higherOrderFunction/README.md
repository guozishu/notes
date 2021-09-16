# 高阶函数
---
函数作为返回值返回
---
- 判断一个数据是否是数组（字符串,数字），实现如下：

```javascript
const Type = {};
for (let i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
    (function (type) {
        Type['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    })(type)
};

Type.isArray([]); // 输出： true
Type.isString("str"); // 输出： true

```

---
AOP（面向切面编程）
---
- 跟核心业务无关的功能抽离出来，比如日志统计、安全控制、异常处理等。通过动态的方式掺入业务逻辑模块中
```javascript
Function.prototype.before = function (beforefn) {
    const __self = this;
    return function () {
        beforefn.apply(this, arguments);
        return __self.apply(this, arguments);
    }
};


Function.prototype.after = function (afterfn) {
    const __self = this;
    return function () {
        const ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

const getUserInfo = function () {
    console.log("hello world!");
};

const funcAop = getUserInfo.before(function () {
    console.log("before report");
}).after(function () {
    console.log("after report");
});

funcAop();

```

---
函数柯里化（function currying）
---
- 函数柯里化又称部分求值。一个柯里化的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被用于求值。
```javascript
// 是一项将一个调用形式为f(a,b,c)的函数转化为调用形式为f(a)(b)(c)的技术。
function currying(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    }
}

function sum(a, b, c) {
    return a + b + c;
}

let carriedSum = currying(sum);
// 支持正常的调用
console.log(carriedSum(1, 2, 6));
console.log(carriedSum(1)(2, 6));
console.log(carriedSum(1)(2)(6));
```
::: tip
高级的柯里化同时允许函数正常调用和获取偏函数。
:::

---
函数节流
---
> 在指定的时间间隔内只会执行一次任务，例如window.onscroll判断是否滚动到页面底部（翻页功能），频繁的触发函数很消耗性能。我们通过函数节流来保证每隔一段时间执行一次原本需要无时不刻地在执行的函数（多次滚动触发多次的函数的计算逻辑）。
#### 函数被频繁触发的场景
1. window.onresize
2. mousemove
3. 进度条的拖动

```javascript
const scrollFun = function(){
    const pageHeight = document.body.offsetHeight || document.documentElement.offsetHeight
    const scrollHeight = document.documentElement.scrollTop || window.pageYOffset
    const windowHeight = window.innerHeight
    let diffHeight = pageHeight - scrollHeight - windowHeight
    if (diffHeight > -50 && diffHeight < 50) {
        console.log("to end")
    }
}

// window.onscroll = scrollFun // 频繁的触发函数

window.onscroll = throttle(scrollFun) // 300毫秒以内执行一次

function throttle(fn, interval = 300) {
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, interval);
    };
}
```

---
函数防抖
---
- 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行,在指定时间内再次触发重新计时。
```javascript
const inputDom = document.getElementById("input")
const callbackFun = function(){
    fetch('/')
    .then(response => response.json())
    .then(res => {
        console.log("input")
    })
}
// 每输入一个字符发送一个请求，用户体验很不好和服务器的压力很大。
// inputDom.addEventListener("input", callbackFun)

// 控制在超过300毫秒执行一次，如果在300毫秒以内再次输入，重新计时
inputDom.addEventListener("input", debounce(callbackFun))

function debounce(fn, interval = 300) {
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    };
}
```

---
惰性载入函数
---
- 为了支持跨浏览器处理事件，我们会开发一些合适的事件处理的方法。该方法包含了一些if判断逻辑，为了避免if逻辑每次都执行（代码执行的更快），我们可以采用惰性载入方式重写createEvent函数，在函数内部被覆盖成另一个适合的函数，这样对原函数调用不用经过if判断。

```javascript
function createEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}

// 惰性载入函数方案
function createEvent(element, type, handler) {
    if (element.addEventListener) {
        createEvent = function (element, type, handler) {
            element.addEventListener(type, handler, false);
        }
    } else if (element.attachEvent) {
        createEvent = function (element, type, handler) {
            element.attachEvent("on" + type, handler);
        }
    } else {
        createEvent = function (element, type, handler) {
            element["on" + type] = handler;
        }
    }
    return createEvent(element, type, handler);
}

// 后续每次调用不用再走if逻辑
createEvent(
    document.getElementById("input"),
    "input",
    function () {
        console.log("input")
    }
)
```
