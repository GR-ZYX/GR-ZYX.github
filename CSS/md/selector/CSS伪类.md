# CSS伪类

[TOC]

## 语法

伪类的语法：

```
selector : pseudo-class {property: value}
```

**CSS 类也可与伪类搭配使用。**

```
selector.class : pseudo-class {property: value}
```



[返回目录](#CSS伪类)

------



## 锚伪类：`:link`、`:visited`、`:hover`、`:active`

### 定义和用法

在支持 CSS 的浏览器中，链接的不同状态都可以不同的方式显示，这些状态包括：**活动状态，已被访问状态，未被访问状态，和鼠标悬停状态**。

```
a:link {color: #FF0000}		/* 未访问的链接 */
a:visited {color: #00FF00}	/* 已访问的链接 */
a:hover {color: #FF00FF}	/* 鼠标移动到链接上 */
a:active {color: #0000FF}	/* 选定的链接 */
```

**提示：**在 CSS 定义中，a:hover 必须被置于 a:link 和 a:visited 之后，才是有效的。

**提示：**在 CSS 定义中，a:active 必须被置于 a:hover 之后，才是有效的。

**提示：伪类名称对大小写不敏感。**



[返回目录](#CSS伪类)

------



## CSS2 伪类：`:first-child` 

### 定义和用法

可以使用 **`:first-child` 伪类**来**选择元素的第一个子元素**。考虑以下标记：

```
<div>
	<p>These are the necessary steps:</p>
	<ul>
        <li>Intert Key</li>
        <li>Turn key 
        	<strong>clockwise</strong>
        </li>
        <li>Push accelerator</li>
	</ul>
	<p>Do 
		<em>not</em> 
		push the brake at the same time as the accelerator.
	</p>
</div>
```

在上面的例子中，作为第一个元素的元素包括第一个 `p`、第一个 `li` 和 `strong` 和 `em` 元素。

给定以下规则：

```
p:first-child {font-weight: bold;}
li:first-child {text-transform:uppercase;}
```

第一个规则将**作为某元素第一个子元素的所有 `p` 元素设置为粗体**。第二个规则将**作为某个元素（在 `HTML` 中，这肯定是 `ol` 或 `ul` 元素）第一个子元素的所有 `li` 元素变成大写**。

**运行结果：**

<div>
	<p style="font-weight: bold;">These are the necessary steps:</p>
	<ul>
        <li style="text-transform:uppercase;">Intert Key</li>
        <li>Turn key 
        	<strong>clockwise</strong>
        </li>
        <li>Push accelerator</li>
	</ul>
	<p>Do 
		<em>not</em> 
		push the brake at the same time as the accelerator.
	</p>
</div>

**提示：最常见的错误是认为 p:first-child 之类的选择器会选择 p 元素的第一个子元素。**

**注释：**必须声明 **`HTML <!DOCTYPE>` 标签**，这样 `:first-child` 才能在 IE 中生效。

### 示例

**例子 1 - 匹配第一个 `<p>` 元素**

在下面的例子中，选择器匹配作为任何元素的第一个子元素的 p 元素：

```
<html>
<head>
	<style type="text/css">
		p:first-child {
 			 color: red;
  		} 
</style>
</head>

<body>
    <p>some text</p>
    <p>some text</p>
</body>
</html>
```

**运行结果：**

<p style="color: red;">some text</p>

<p>some text</p>



**例子 2 - 匹配所有 `<p>` 元素中的第一个 `<i>` 元素**

在下面的例子中，选择器匹配所有 `<p> `元素中的第一个` <i> `元素：

```
<html>
<head>
    <style type="text/css">
    	p > i:first-child {
     		font-weight:bold;
     	} 
    </style>
</head>

<body>
    <p>some <i>text</i>. some <i>text</i>.</p>
    <p>some <i>text</i>. some <i>text</i>.</p>
</body>
</html>
```

**运行结果：**

 <p>some <i style="font-weight:bold;">text</i> . some <i>text</i>.</p>

<p>some <i style="font-weight:bold;">text</i> . some <i>text</i>.</p>



**例子 3 - 匹配所有作为第一个子元素的 `<p>` 元素中的所有` <i> `元素**

在下面的例子中，选择器匹配所有作为元素的第一个子元素的 `<p> `元素中的所有` <i>` 元素：

```
<html>
<head>
<style type="text/css">
	p:first-child i {
  		color:blue;
  	} 
</style>
</head>

<body>
    <p>some <i>text</i>. some <i>text</i>.</p>
    <p>some <i>text</i>. some <i>text</i>.</p>
</body>
</html>
```

**运行结果：**

<p>some <i style="color:blue;">text</i>. some <i style="color:blue;">text</i>.</p>

<p>some <i>text</i>. some <i>text</i>.</p>



[返回目录](#CSS伪类)

------



## CSS2 伪类：`:lang` 

### 定义和用法

**`:lang` 伪类**使我们有能力**为不同的语言定义特殊的规则**。

**向带有指定 `lang` 属性的元素添加样式。**

### 示例

在下面的例子中，`:lang` 类为属性值为 `no` 的 `q` 元素定义引号的类型：

```
<html>
<head>

<style type="text/css">
	q:lang(no){
   		quotes: "~" "~"
   	}
</style>

</head>

<body>
	<p>文字<q lang="no">段落中的引用的文字</q>文字</p>
</body></html>
```

**运行结果：**

<p>文字<q lang="no" style="quotes: '~' '~'">段落中的引用的文字</q>文字</p>



[返回目录](#CSS伪类)

------



# CSS2 伪类：`:focus` 

### 定义和用法

**`:focus` 伪类在元素获得焦点时向元素添加特殊的样式**

**说明**

这个伪类**应用于有焦点的元素**。

例如 `HTML` 中一个有文本输入焦点的输入框，其中出现了文本输入光标；也就是说，在用户开始键入时，文本会输入到这个输入框。其他元素（如超链接）也可以有焦点，不过 CSS 没有定义哪些元素可以有焦点。

```
a:link {color: #FF0000}     /* 未访问的链接 */
a:focus {color: #00FF00}  /* 获得焦点的链接 */
```

### 示例

**规定获得焦点的输入字段的颜色：**

```
input:focus
  {
  color:yellow;
  }
```

[运行结果](https://www.w3school.com.cn/tiy/t.asp?f=csse_link_focus)



[返回目录](#CSS伪类)

------

