# CSS伪元素

[TOC]

**CSS 伪元素用于向某些选择器设置特殊效果。**



## 语法

伪元素的语法：

```
selector:pseudo-element {property:value;}
```

CSS 类也可以与伪元素配合使用：

```
selector.class:pseudo-element {property:value;}
```



[返回目录](#CSS伪元素)

------



## 文本首行添加特殊样式：`:first-line` 

### 定义和用法

**"`:first-line`" 伪元素**用于向文本的首行设置特殊样式。

在下面的例子中，浏览器会根据 **"first-line" 伪元素**中的样式对 `p` 元素的第一行文本进行格式化：

### 示例

```
p:first-line
  {
  color:#ff0000;
  font-variant:small-caps;
  }
```

**运行结果：**

![对p元素的第一行文本进行格式化](..\..\image\first-line.png)

**注释："first-line" 伪元素只能用于块级元素。**

### 可用属性

**注释：**下面的属性可应用于 `"first-line"` 伪元素：

- `font`
- `color`
- `background`
- `word-spacing`
- `letter-spacing`
- `text-decoration`
- `vertical-align`
- `text-transform`
- `line-height`
- `clear`



[返回目录](#CSS伪元素)

------



## 文本首字母设置特殊样式：`:first-letter`

### 定义和用法

**"first-letter" 伪元素用于向文本的首字母设置特殊样式：**

```
p:first-letter
  {
  color:#ff0000;
  font-size:xx-large;
  }
```

**运行结果：**

![文本首字母设置特殊样式](..\..\image\first-letter.png)

**注释：**"first-letter" 伪元素只能用于块级元素。

### 可用属性

**注释：**下面的属性可应用于 `"first-letter"` 伪元素：

- `font`
- `color`
- `background`
- `margin`
- `padding`
- `border`
- `text-decoration`
- `vertical-align (仅当 float 为 none 时)`
- `text-transform`
- `line-height`
- `float`
- `clear`



[返回目录](#CSS伪元素)

------



## 元素内容前插入新内容 ：`:before` 

**`:before` 伪元素**可以在元素的内容前面插入新内容。

下面的例子在每个 `<h1>` 元素前面插入一幅图片：

```
h1:before {content:url(/i/w3school_logo_white.gif)}

<h1>This is a heading</h1>
<p>The :before pseudo-element inserts content before an element.</p>
<h1>This is a heading</h1>
```

**运行结果：**

![在每个h1元素前面插入一幅图片](..\..\image\before.png)



[返回目录](#CSS伪元素)

------



## 元素内容后插入新内容：`:after` 

**"`:after`" 伪元素**可以在元素的内容之后插入新内容。

下面的例子在每个 `<h1>` 元素后面插入一幅图片：

```
h1:after {content:url(/i/w3school_logo_white.gif)}

<h1>This is a heading</h1>
<p>The :before pseudo-element inserts content before an element.</p>
<h1>This is a heading</h1>
```

**运行结果：**

![在每个 `<h1>` 元素后面插入一幅图片](..\..\image\after.png)



[返回目录](#CSS伪元素)

------



## 多重伪元素

可以结合多个伪元素来使用。

在下面的例子中，

段落的第一个字母将显示为红色，其字体大小为 xx-large。

第一行中的其余文本将为蓝色，并以小型大写字母显示。

段落中的其余文本将以默认字体大小和颜色来显示：

```
p:first-letter{
    color:#ff0000;
    font-size:xx-large;
}

p:first-line{
    color:#0000ff;
    font-variant:small-caps;
}

<p>You can combine the :first-letter and :first-line pseudo-elements to add a special effect to the first letter and the first line of a text!</p>
```

**实验结果：**

![多重伪元素](..\..\image\多重伪元素.png)



[返回目录](#CSS伪元素)

------

