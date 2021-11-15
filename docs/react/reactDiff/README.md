# react Diff 算法
---
1.对比不同类型的元素
---
- 当根节点为不同类型的元素时，React 会拆卸原有的树并且建立起新的树。
- 当卸载一棵树时，对应的 DOM 节点会被销毁。组件实例将执行 componentWillUnmount() 方法。当建立一棵新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中。组件实例将执行 UNSAFE_componentWillMount() 方法，紧接着 componentDidMount() 方法。所有与之前的树相关联的 state 也会被销毁。

---
2.对比同一类型的元素
---
- 当对比两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。

---
3.对比同类型的组件元素
---
- 当一个组件更新时，组件实例会保持不变，因此可以在不同的渲染时保持 state 一致。React 将更新该组件实例的 props 以保证与最新的元素保持一致，并且调用该实例的 UNSAFE_componentWillReceiveProps()、UNSAFE_componentWillUpdate() 以及 componentDidUpdate() 方法。