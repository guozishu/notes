# 深拷贝和浅拷贝
---
浅拷贝
---
#### 浅拷贝常用的技术有Object.assign ,es6展开操作符，赋值操作符=。这三种浅拷贝实现的细节也不一样，可以自己去探究下。
```js
let obj = {
  name:'javascript',
  time:'1996-12-12',
  type:{
    tech:'编程语言',
    operate:'前端'
  }
}
//  cloneObj1和cloneObj2都是浅拷贝对象。不过有细微差别
let cloneObj1 = Object.assign(obj);
let cloneObj2 = Object.assign({},obj);
// cloneObj3和cloneObj2是相同的拷贝方式
let cloneObj3 = {...obj};
// cloneObj4和cloneObj1是相同的拷贝方式
let cloneObj4 = obj;
```

---
 深拷贝
---
#### 深拷贝实现的常用方式有两种，一种是JSON.stringify和JSON.parse。一种是递归复制每个值。
```js
let obj = {
  name:'leon',
  age:38,
  list:['brother','sister','small'],
  type:{
    people:{
      sex:'男性'
    }，
    height:'2.1米'
  }
}
// 深拷贝，仅支持Object,Array,string,number,boolean,null类型
let deepClone1 = JSON.parse(JSON.stringify(obj))

// 递归深拷贝
function deepClone(obj) {
  // 非对像返回当前值
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  let newObj = {};
  // array or object
  if (Array.isArray(obj)) { 
    newObj = obj.map(item => deepClone(item));
  } else {
    for (let item in obj) {
      newObj[item] = deepClone(obj[item]);
    }
  }
  return newObj
}
// 深拷贝，基本支持所有类型
let deepClone2 = deepClone(obj);
```

- <font color=red>JSON.stringify和JSON.parse有自己的局限性，JSON.stringify将对象转换为JSON仅支持Object,Array,string,number,boolean,null。函数属性,Symbol,undefined这三种类型会被忽略。</font>