# CSS创建

[TOC]



## 外部样式表

**当样式需要应用于很多页面时**，外部样式表将是理想的选择。在使用外部样式表的情况下，可以通过改变一个文件来改变整个站点的外观。每个页面使用 `<link> `标签链接到样式表。`<link>` 标签在（文档的）头部：

```
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css" />
</head>
```



## 内部样式表

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



## 内联样式

要使用内联样式，需要在相关的标签内使用样式（style）属性。Style 属性可以包含任何 CSS 属性。

```
<p style="color: sienna; margin-left: 20px">
This is a paragraph
</p>
```



## 多重样式

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

