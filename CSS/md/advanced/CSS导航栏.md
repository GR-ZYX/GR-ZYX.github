# CSS导航栏

[TOC]

## 导航栏 = 链接列表

导航栏需要标准的 `HTML` 作为基础。

在例子中，将用标准的 `HTML` 列表来构建导航栏。

导航栏基本上是一个链接列表，因此使用 `<ul>` 和 `<li>` 元素是非常合适的：

### 示例

```
<ul>
<li><a href="default.asp">Home</a></li>
<li><a href="news.asp">News</a></li>
<li><a href="contact.asp">Contact</a></li>
<li><a href="about.asp">About</a></li>
</ul>
```

**运行结果：**

<ul>
<li><a href="default.asp">Home</a></li>
<li><a href="news.asp">News</a></li>
<li><a href="contact.asp">Contact</a></li>
<li><a href="about.asp">About</a></li>
</ul>

从列表中去掉圆点和外边距：

```
ul{
    list-style-type:none;
    margin:0;
    padding:0;
}
```

**运行结果：**

<ul style="list-style-type:none;margin:0;padding:0;">
<li><a href="">Home</a></li>
<li><a href="">News</a></li>
<li><a href="">Contact</a></li>
<li><a href="">About</a></li>
</ul>

**例子解释：**

- `list-style-type:none` - 删除圆点。导航栏不需要列表项标记。
- 把外边距和内边距设置为 0 可以去除浏览器的默认设定。

以上例子中的代码是用在**垂直、水平导航栏**中的标准代码。



[返回目录](#CSS导航栏)

------



## 垂直导航栏

如需构建垂直导航栏，我们只需要定义 `<a>` 元素的样式，除了上面的代码之外：

### 示例

```
a{
    display:block;
    width:60px;
    background-color:#bebebe;
}
```

**运行结果：**

<ul style="list-style-type:none;margin:0;padding:0;">
<li><a style="display:block;width:60px;background-color:#bebebe;" href="">Home</a></li>
<li><a style="display:block;width:60px;background-color:#bebebe;" href="">News</a></li>
<li><a style="display:block;width:60px;background-color:#bebebe;" href="">Contact</a></li>
<li><a style="display:block;width:60px;background-color:#bebebe;" href="">About</a></li>
</ul>

**例子解释：**

- `display:block` - 把链接显示为块元素可使整个链接区域可点击（不仅仅是文本），同时也允许我们规定宽度。
- `width:60px` - 块元素默认占用全部可用宽度。我们需要规定 60 像素的宽度。



[返回目录](#CSS导航栏)

------



## 水平导航栏

有两种创建水平导航栏的方法。使用**行内**或**浮动列表项**。

**如果希望链接拥有相同的尺寸，就必须使用浮动方法。**

### 行内列表项：`display:inline;`

除了上面的“标准”代码，构建水平导航栏的方法之一是将 `<li>` 元素规定为行内元素：

**示例**

```
li{
	display:inline;
}
```

**运行结果：**

<ul style="list-style-type:none;margin:0;padding:0;">
<li style="display:inline;"><a href="">Home</a></li>
<li style="display:inline;"><a href="">News</a></li>
<li style="display:inline;"><a href="">Contact</a></li>
<li style="display:inline;"><a href="">About</a></li>
</ul>

**例子解释：**

`display:inline;` - 默认地，`<li> `元素是块元素。在这里，我们去除了每个列表项前后的换行，以便让它们在一行中显示。

### 对列表项进行浮动：`float`

在上面的例子中，链接的宽度是不同的。

为了让所有链接拥有相等的宽度，浮动 `<li> `元素并规定 `<a>` 元素的宽度：

**实例**

```
li{
	float:left;
}
a{
    display:block;
    width:60px;
}
```

**运行结果：**

<ul style="list-style-type:none;margin:0;padding:0;">
<li style="float:left;"><a style="display:block;width:60px;background-color:#bebebe;" href="">Home</a></li>
<li style="float:left;"><a style="display:block;width:60px;background-color:#bebebe;" href="">News</a></li>
<li style="float:left;"><a style="display:block;width:60px;background-color:#bebebe;" href="">Contact</a></li>
<li style="float:left;"><a style="display:block;width:60px;background-color:#bebebe;" href="">About</a></li>
</ul>

**例子解释：**

- `float:left` - 使用 `float` 来把块元素滑向彼此。
- `display:block` - 把链接显示为块元素可使整个链接区域可点击（不仅仅是文本），同时也允许我们规定宽度。
- `width:60px` - 由于块元素默认占用全部可用宽度，链接无法滑动至彼此相邻。我们需要规定 60 像素的宽度。



[返回目录](#CSS导航栏)

------

