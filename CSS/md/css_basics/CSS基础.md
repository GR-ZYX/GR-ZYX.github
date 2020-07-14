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



## CSS 派生选择器

### 派生选择器

**通过依据元素在其位置的上下文关系来定义样式，可以使标记更加简洁。**

派生选择器允许根据文档的上下文关系来确定某个标签的样式。通过合理地使用派生选择器，我们可以使 HTML 代码变得更加整洁。

比方说，希望**列表**中的 `strong` 元素变为斜体字，而不是通常的粗体字，可以这样定义一个派生选择器：

```
li strong {
    font-style: italic;
    font-weight: normal;
  }
```

请注意标记为 `<strong>` 的蓝色代码的上下文关系：

```
<p><strong>我是粗体字，不是斜体字，因为我不在列表当中，所以这个规则对我不起作用</strong></p>

<ol>
<li><strong>我是斜体字。这是因为 strong 元素位于 li 元素内。</strong></li>
<li>我是正常的字体。</li>
</ol>
```

在上面的例子中，只有 li 元素中的 strong 元素的样式为斜体字，无需为 strong 元素定义特别的 class 或 id，代码更加简洁。



[返回目录](#CSS基础)

------



## CSS id 选择器

### id 选择器

**id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式。**

**id 选择器以 "#" 来定义。**

下面的两个 id 选择器，第一个可以定义元素的颜色为红色，第二个定义元素的颜色为绿色：

```
#red {color:red;}
#green {color:green;}
```

下面的 HTML 代码中，id 属性为 red 的 p 元素显示为红色，而 id 属性为 green 的 p 元素显示为绿色。

```
<p id="red">这个段落是红色。</p>
<p id="green">这个段落是绿色。</p>
```

**注意：**id 属性只能在每个 HTML 文档中出现一次。

### id 选择器和派生选择器

**在现代布局中，id 选择器常常用于建立派生选择器。**

```
#sidebar p {
	font-style: italic;
	}
```

上面的样式只会应用于出现在 id 是 sidebar 的元素内的段落。

### 一个选择器，多种用法

**即使被标注为 sidebar 的元素只能在文档中出现一次，这个 id 选择器作为派生选择器也可以被使用很多次：**

```
#sidebar p {
	font-style: italic;
	}

#sidebar h2 {
	font-size: 1em;
	}
```

在这里，sidebar 内的 p 元素得到了特殊的处理，sidebar 中的 h2 元素也得到了不同的特殊处理。



[返回目录](#CSS基础)

------



## CSS 类选择器

**在 CSS 中，类选择器以一个点号显示：**

```
.center {text-align: center}
```

**注意：**类名的第一个字符不能使用数字！它无法在 Mozilla 或 Firefox 中起作用。

**和 id 一样，class 也可被用作派生选择器：**

```
.fancy td {
	color: #f60;
	background: #666;
	}
```

**元素也可以基于它们的类而被选择：**

```
td.fancy {
	color: #f60;
	background: #666;
	}
```

在上面的例子中，类名为 fancy 的表格单元将是带有灰色背景的橙色。

```
<td class="fancy">
```

**这个效果被限制于被标注为 fancy 的表格单元（即使用 td 元素来选择 fancy 类）。**



[返回目录](#CSS基础)

------



## CSS 属性选择器

**对带有指定属性的 HTML 元素设置样式。**

**可以为拥有指定属性的 HTML 元素设置样式，而不仅限于 class 和 id 属性。**

**注释：**只有在规定了 !DOCTYPE 时，IE7 和 IE8 才支持属性选择器。在 IE6 及更低的版本中，不支持属性选择。

### 属性选择器

下面的例子为带有 title 属性的所有元素设置样式：

```
[title]{
	color:red;
}
```

### 属性和值选择器

下面的例子为 title="W3School" 的所有元素设置样式：

```
[title=W3School]{
	border:5px solid blue;
}
```

### 属性和值选择器 - 多个值

下面的例子为包含指定值的 title 属性的所有元素设置样式。适用于由空格分隔的属性值：

```
[title~=hello] { color:red; }
```

### 设置表单的样式

**属性选择器在为不带有 class 或 id 的表单设置样式时特别有用：**

```
input[type="text"]{
  width:150px;
}

input[type="button"]{
  width:120px;
}
```

### CSS 选择器参考手册

| 选择器                                                       | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [[*attribute*\]](https://www.w3school.com.cn/cssref/selector_attribute.asp) | 用于选取带有指定属性的元素。                                 |
| [[*attribute*=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value.asp) | 用于选取带有指定属性和值的元素。                             |
| [[*attribute*~=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value_contain.asp) | 用于选取属性值中包含指定词汇的元素。                         |
| [[*attribute*\|=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value_start.asp) | 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。 |
| [[*attribute*^=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_begin.asp) | 匹配属性值以指定值开头的每个元素。                           |
| [[*attribute*$=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_end.asp) | 匹配属性值以指定值结尾的每个元素。                           |
| [[*attribute**=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_contain.asp) | 匹配属性值中包含指定值的每个元素。                           |



[返回目录](#CSS基础)

------



## CSS 创建

### 外部样式表

**当样式需要应用于很多页面时**，外部样式表将是理想的选择。在使用外部样式表的情况下，可以通过改变一个文件来改变整个站点的外观。每个页面使用 <link> 标签链接到样式表。<link> 标签在（文档的）头部：

```
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css" />
</head>
```

### 内部样式表

当**单个文档需要特殊的样式时**，就应该使用内部样式表。你可以使用 <style> 标签在文档头部定义内部样式表，就像这样:

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

