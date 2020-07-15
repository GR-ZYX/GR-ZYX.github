# CSS基础

[TOC]

## CSS高级语法

### 选择器的分组

可以对选择器进行分组，这样，被分组的选择器就可以分享相同的声明。用逗号将需要分组的选择器分开。在下面的例子中，我们对所有的标题元素进行了分组。所有的标题元素都是绿色的。

```
h1,h2,h3,h4,h5,h6 {
  color: green;
  }
```

### 继承及其问题

根据 CSS，子元素从父元素继承属性。但是它并不总是按此方式工作。看看下面这条规则：

```
body {
     font-family: Verdana, sans-serif;
     }
```

根据上面这条规则，站点的 `body` 元素将使用 `Verdana` 字体（假如访问者的系统中存在该字体的话）。

通过 CSS 继承，**子元素将继承最高级元素**（在本例中是 body）**所拥有的属性**（这些子元素诸如 p, td, ul, ol, ul, li, dl, dt,和 dd）。

但是，**`Netscape 4` 不支持继承**，它不仅忽略继承，而且也忽略应用于 body 元素的规则。IE/Windows 直到 IE6 还存在相关的问题，在表格内的字体样式会被忽略。

### 对待Netscape 4

可以通过使用我们称为 `"Be Kind to Netscape 4"` 的冗余法则来处理旧式浏览器无法理解继承的问题。

```
body  {
     font-family: Verdana, sans-serif;
     }

p, td, ul, ol, li, dl, dt, dd  {
     font-family: Verdana, sans-serif;
     }
```

4.0 浏览器无法理解继承，不过他们可以理解组选择器。这么做虽然会浪费一些用户的带宽，但是如果需要对 Netscape 4 用户进行支持，就不得不这么做。

### 摆脱继承

如果不希望 `"Verdana, sans-serif"` 字体被所有的子元素继承，又该怎么做呢？比方说，希望段落的字体是 Times。创建一个针对 `p` 的特殊规则，这样它就会摆脱父元素的规则：

```
body  {
     font-family: Verdana, sans-serif;
     }
     
p  {
     font-family: Times, "Times New Roman", serif;
     }
```



[返回目录](#CSS基础)

------



## CSS 创建

### 外部样式表

**当样式需要应用于很多页面时**，外部样式表将是理想的选择。在使用外部样式表的情况下，可以通过改变一个文件来改变整个站点的外观。每个页面使用 `<link> `标签链接到样式表。`<link>` 标签在（文档的）头部：

```
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css" />
</head>
```

### 内部样式表

当**单个文档需要特殊的样式时**，就应该使用内部样式表。你可以使用 `<style>` 标签在文档头部定义内部样式表，就像这样:

```
<head>
<style type="text/css">
  hr {color: sienna;}
  p {margin-left: 20px;}
  body {background-image: url("images/back40.gif");}
</style>
</head>
```

### 内联样式

要使用内联样式，需要在相关的标签内使用样式（style）属性。Style 属性可以包含任何 CSS 属性。

```
<p style="color: sienna; margin-left: 20px">
This is a paragraph
</p>
```

### 多重样式

**如果某些属性在不同的样式表中被同样的选择器定义，那么属性值将从更具体的样式表中被继承过来。**

例如，**外部样式表**拥有针对 h3 选择器的三个属性：

```
h3 {
  color: red;
  text-align: left;
  font-size: 8pt;
  }
```

而**内部样式表**拥有针对 h3 选择器的两个属性：

```
h3 {
  text-align: right; 
  font-size: 20pt;
  }
```

假如拥有内部样式表的这个页面同时与外部样式表链接，那么 h3 得到的样式是：

```
color: red; 
text-align: right; 
font-size: 20pt;
```

**即颜色属性将被继承于外部样式表，而文字排列（text-alignment）和字体尺寸（font-size）会被内部样式表中的规则取代。**



[返回目录](#CSS基础)

------

