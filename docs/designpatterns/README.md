# 多态

---
什么是多态 ？
---
> 多态的思想是把“做什么”和“谁去做”分离开来，要实现这一点，就要消除类型之间的耦合关系。

---
开发中的例子
---
```javascript
// 定义地图的显示
const googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};

const baiduMap = {
    show: function () {
        console.log('开始渲染百度地图');
    }
};

const renderMap = function (type) {
    // 根据不同的类型显示地图
    if (type === 'google') {
        googleMap.show();
    } else if (type === 'baidu') {
        baiduMap.show();
    }
};

renderMap('google'); // 输出：开始渲染谷歌地图
renderMap('baidu'); // 输出：开始渲染百度地图
```
**renderMap** 函数虽然保持了一定的弹性，但这种弹性是很脆弱的，一旦需要增加一个搜狗地图或腾讯地图，都要改动 **renderMap** 函数，继续往里面堆砌条件分支语句。

---
多态性的应用
---
- 这个时候我们需要把程序中相同的部分抽象出来，当我们分别“展示地图”消息时，会调用它们的 **show** 方法，就会产生各自不同的执行结果。对象的多态性“做什么”和“怎么去做”是可以分开的，即使以后增加了其他地图， **renderMap** 函数不需要做任何改变，如下所示：
```javascript
// 定义地图的显示
const googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};

const baiduMap = {
    show: function () {
        console.log('开始渲染百度地图');
    }
};
// 增加的搜狗地图
const sougouMap = {
    show: function () {
        console.log('开始渲染搜狗地图');
    }
};
// 增加的腾讯地图
const tengxuMap = {
    show: function () {
        console.log('开始渲染腾讯地图');
    }
};

const renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show();
    }
};

renderMap(googleMap); // 输出：开始渲染谷歌地图
renderMap(tengxuMap); // 输出：开始渲染腾讯地图
```
在这个例子中，每个 **API** 提供的方法名都是 **show**，在实际开发中方法名不会是相同的，这时可以借助适配器模式来解决问题。