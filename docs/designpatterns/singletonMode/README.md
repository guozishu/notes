# 单例模式

---
什么是单例模式？
---
> 保证一个类仅有一个实例，并提供一个访问它的全局访问点。

---
单例模式使用场景
---
单例模式是一种常用的模式,在 JavaScript 开发中，单例模式的用途同样非常广泛。当我们单击弹出按钮的时候，页面中会出现一个弹出浮窗，无论单击多少次登录按钮，这个浮窗都只会被创建一次，那么这个弹出浮窗就适合用单例模式来创建；当我们需要一个类的实例方法的时候，每次使用都需要创建一个新的实例，频繁的创建很消耗内存空间，这个时候适合使用单例模式来创建。

#### 优点：
- 在内存中只有一个对象，节省内存空间
- 避免频繁的创建销毁对象，可以提高性能
- 避免对共享资源的多重占用，简化访问
- 为整个系统提供一个全局访问点

---
单例模式的案例
---
```javascript
const getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    }
};

class Hello {
    constructor(...args){

    }
    sayHello() {
        return "hello world"
    }
}

const getHello = function() {
    return new Hello()
}

const createSingleHello = getSingle(getHello)

const hello = createSingleHello()
// output `hello world`

```


