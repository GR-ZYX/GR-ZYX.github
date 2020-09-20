# JavaScript 数据类型

[TOC]

## JavaScript数据类型

`JavaScript` 变量能够保存多种*数据类型*：数值、字符串值、数组、对象等等：

```
var length = 7;                             // 数字
var lastName = "Gates";                      // 字符串
var cars = ["Porsche", "Volvo", "BMW"];         // 数组
var x = {firstName:"Bill", lastName:"Gates"};    // 对象 
```



[返回目录](#JavaScript 数据类型)

------



## JavaScript拥有动态类型

JavaScript 拥有动态类型。这意味着相同变量可用作不同类型：

**实例**

```
var x;               // 现在 x 是 undefined
var x = 7;           // 现在 x 是数值
var x = "Bill";      // 现在 x 是字符串值
```



[返回目录](#JavaScript 数据类型)

------



## `typeof` 运算符

可使用 `JavaScript` 的 `typeof` 来确定 `JavaScript` 变量的类型：

`typeof` 运算符返回变量或表达式的类型：

**实例**

```
typeof ""                  // 返回 "string"
typeof "Bill"              // 返回 "string"
typeof "Bill Gates"          // 返回 "string"
```



[返回目录](#JavaScript 数据类型)

------



## `Undefined`

在 `JavaScript` 中，没有值的变量，其值是 `undefined`。`typeof` 也返回 `undefined`。

**实例**

```
var person;                  // 值是 undefined，类型是 undefined
```

任何变量均可通过设置值为 `undefined` 进行清空。其类型也将是 `undefined`。

**实例**

```
person = undefined;          // 值是 undefined，类型是 undefined
```



[返回目录](#JavaScript 数据类型)

------



## 空值

空值与 `undefined` 不是一回事。

空的字符串变量既有值也有类型。

**实例**

```
var car = "";                // 值是 ""，类型是 "string"
```



[返回目录](#JavaScript 数据类型)

------



## `Null`

在 `JavaScript` 中，`null` 是 "`nothing`"。它被看做不存在的事物，`null` 的数据类型是对象。

可以把 `null` 在 `JavaScript` 中是对象理解为一个 `bug`。它本应是 `null`。

可以通过设置值为 `null` 清空对象

**实例**

```
var person = null;           // 值是 null，但是类型仍然是对象
```



[返回目录](#JavaScript 数据类型)

------



## `Undefined` 与 `Null` 的区别

`Undefined` 与 `null` 的**值相等**，但**类型不相等**：

```
typeof undefined              // undefined
typeof null                   // object
null === undefined            // false
null == undefined             // true
```



[返回目录](#JavaScript 数据类型)

------



## 复杂数据

`typeof` 运算符可返回以下两种类型之一：

- `function`
- `object`

`typeof` 运算符把对象、数组或 `null` 返回 `object`。

`typeof` 运算符不会把函数返回 `object`。

**实例**

```
typeof {name:'Bill', age:62} // 返回 "object"
typeof [1,2,3,4]             // 返回 "object" (并非 "array"，参见下面的注释)
typeof null                  // 返回 "object"
typeof function myFunc(){}   // 返回 "function"
```



[返回目录](#JavaScript 数据类型)

------

