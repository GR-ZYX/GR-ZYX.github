# JavaScript 使用

[TOC]

## `<script>` 标签

在 HTML 中，JavaScript 代码必须位于 `<script>` 与 `</script>` 标签之间。

**实例**

```
<script>
document.getElementById("demo").innerHTML = "我的第一段 JavaScript";
</script>
```

**注释：**旧的 `JavaScript` 例子也许会使用 **type** 属性：`<script type="text/javascript">`。

**注释：**type 属性不是必需的。`JavaScript` 是 `HTML` 中的默认脚本语言。



[返回目录](#JavaScript 使用)

------



## JavaScript 函数和事件

`JavaScript` **函数**是一种 `JavaScript` 代码块，它可以在调用时被执行。

例如，当发生**事件**时调用函数，比如当用户点击按钮时。



[返回目录](#JavaScript 使用)

------



## `<head>` 或 `<body>` 中的 JavaScript

能够在 `HTML` 文档中放置任意数量的脚本。

脚本可被放置与 HTML 页面的 `<body> `或 `<head> `部分中，或兼而有之。



[返回目录](#JavaScript 使用)

------



## 外部脚本

脚本可放置与外部文件中：

外部文件：`myScript.js`

```
function myFunction() {
   document.getElementById("demo").innerHTML = "段落被更改。";
}
```

外部脚本很实用，如果相同的脚本被用于许多不同的网页。

`JavaScript` 文件的文件扩展名是 *`.js`*。

如需使用外部脚本，在` <script> `标签的 `src (source)` 属性中设置脚本的名称：

**实例**

```
<script src="myScript.js"></script>
```

可以在 `<head> `或 `<body> `中放置外部脚本引用。

该脚本的表现与它被置于` <script> `标签中是一样的。

**注释：**外部脚本不能包含 **`<script>`** 标签。



[返回目录](#JavaScript 使用)

------



