# CSS字体

[TOC]

## 字体系列

在 CSS 中，有两种不同类型的字体系列名称：

- 通用字体系列 - 拥有相似外观的字体系统组合（比如 "Serif" 或 "Monospace"）
- 特定字体系列 - 具体的字体系列（比如 "Times" 或 "Courier"）

除了各种特定的字体系列外，CSS 定义了 5 种通用字体系列：

- `Serif` 字体

- `Sans-serif` 字体

- `Monospace` 字体

- `Cursive` 字体

- `Fantasy` 字体

  

[返回目录](#CSS字体)

------



## 字体指定：`font-family`

使用 **`font-family` 属性**定义文本的字体系列。

**使用通用字体系列**

如果你希望文档使用一种 sans-serif 字体，但是你并不关心是哪一种字体，以下就是一个合适的声明：

```
body {font-family: sans-serif;}
```

这样用户代理就会从 sans-serif 字体系列中选择一个字体（如 `Helvetica`），并将其应用到 `body` 元素。因为有继承，这种字体选择还将应用到 `body` 元素中包含的所有元素，除非有一种更特定的选择器将其覆盖。

**字体指定**

除了使用通用的字体系列，还可以通过 `font-family` 属性设置更具体的字体。

下面的例子为所有 h1 元素设置了 Georgia 字体：

```
h1 {font-family: Georgia;}
```

这样的规则同时会产生另外一个问题，如果用户代理上没有安装 `Georgia` 字体，就只能使用用户代理的默认字体来显示 h1 元素。

可以通过结合特定字体名和通用字体系列来解决这个问题：

```
h1 {font-family: Georgia, serif;}
```

如果读者没有安装 `Georgia`，但安装了 Times 字体（serif 字体系列中的一种字体），用户代理就可能对 `h1` 元素使用 `Times`。尽管 `Times` 与 `Georgia` 并不完全匹配，但至少足够接近。

因此，我们建议在所有 `font-family` 规则中都提供一个通用字体系列。这样就提供了一条后路，在用户代理无法提供与规则匹配的特定字体时，就可以选择一个候选字体。

如果对字体非常熟悉，也可以为给定的元素指定一系列类似的字体。要做到这一点，需要把这些字体按照优先顺序排列，然后用逗号进行连接：

```
p {font-family: Times, TimesNR, 'New Century Schoolbook',
     Georgia, 'New York', serif;}
```

根据这个列表，用户代理会按所列的顺序查找这些字体。如果列出的所有字体都不可用，就会简单地选择一种可用的 `serif` 字体。

**使用引号**

只有当字体名中有一个或多个空格（比如 `New York`），或者如果字体名包括 # 或 $ 之类的符号，才需要在 `font-family` 声明中加引号。

单引号或双引号都可以接受。但是，如果把一个 `font-family` 属性放在 `HTML` 的 `style` 属性中，则需要使用该属性本身未使用的那种引号：

```
<p style="font-family: Times, TimesNR, 'New Century Schoolbook', Georgia,
 'New York', serif;">...</p>
```

### 定义和用法

| 默认值：          | *not specified*                              |
| :---------------- | -------------------------------------------- |
| 继承性：          | yes                                          |
| 版本：            | CSS1                                         |
| JavaScript 语法： | *object*.style.fontFamily="arial,sans-serif" |

### 属性值

| 值                            | 描述                                                         |
| :---------------------------- | :----------------------------------------------------------- |
| *family-name**generic-family* | 用于某个元素的字体族名称或/及类族名称的一个优先表。默认值：取决于浏览器。 |
| inherit                       | 规定应该从父元素继承字体系列。                               |

### [CSS 网络安全字体组合](https://www.w3school.com.cn/cssref/css_websafe_fonts.asp)



[返回目录](#CSS字体)

------



## 字体风格：`font-style` 

**`font-style` 属性**最常用于规定斜体文本。

**实例**

```
p.normal {font-style:normal;}
p.italic {font-style:italic;}
p.oblique {font-style:oblique;}
```

**`italic` 和 `oblique` 的区别**

`font-style` 非常简单：用于在 `normal` 文本、`italic` 文本和 `oblique` 文本之间选择。唯一有点复杂的是明确 `italic` 文本和 `oblique` 文本之间的差别。

斜体（`italic`）是一种简单的字体风格，对每个字母的结构有一些小改动，来反映变化的外观。与此不同，倾斜（`oblique`）文本则是正常竖直文本的一个倾斜版本。

通常情况下，`italic` 和 `oblique` 文本在 `web` 浏览器中看上去完全一样。



### 定义和用法

| 默认值：          | normal                            |
| :---------------- | --------------------------------- |
| 继承性：          | yes                               |
| 版本：            | CSS1                              |
| JavaScript 语法： | *object*.style.fontStyle="italic" |

### 属性值

| 值      | 描述                                   |
| :------ | :------------------------------------- |
| normal  | 默认值。浏览器显示一个标准的字体样式。 |
| italic  | 浏览器会显示一个斜体的字体样式。       |
| oblique | 浏览器会显示一个倾斜的字体样式。       |
| inherit | 规定应该从父元素继承字体样式。         |



[返回目录](#CSS字体)

------



## 字体变形：`font-variant`

**`font-variant` 属性**可以设定**小型大写字母**。

小型大写字母不是一般的大写字母，也不是小写字母，这种字母采用不同大小的大写字母，这意味着所有的小写字母均会被转换为大写，但是所有使用小型大写字体的字母与其余文本相比，其字体尺寸更小。



### 定义和用法

| 默认值：          | normal                                  |
| :---------------- | --------------------------------------- |
| 继承性：          | yes                                     |
| 版本：            | CSS1                                    |
| JavaScript 语法： | *object*.style.fontVariant="small-caps" |

### 属性值

| 值         | 描述                                         |
| :--------- | :------------------------------------------- |
| normal     | 默认值。浏览器会显示一个标准的字体。         |
| small-caps | 浏览器会显示小型大写字母的字体。             |
| inherit    | 规定应该从父元素继承 font-variant 属性的值。 |



[返回目录](#CSS字体)

------



## 字体加粗：`font-weight` 

**font-weight 属性**设置文本的粗细。

使用 `bold` 关键字可以将文本设置为粗体。

如果将元素的加粗设置为 `bolder`，浏览器会设置比所继承值更粗的一个字体加粗。与此相反，关键词 `lighter` 会导致浏览器将加粗度下移而不是上移。

### 定义和用法

| 默认值：          | normal                          |
| :---------------- | ------------------------------- |
| 继承性：          | yes                             |
| 版本：            | CSS1                            |
| JavaScript 语法： | *object*.style.fontWeight="900" |

### 属性值

| 值                                                           | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| normal                                                       | 默认值。定义标准的字符。                                     |
| bold                                                         | 定义粗体字符。                                               |
| bolder                                                       | 定义更粗的字符。                                             |
| lighter                                                      | 定义更细的字符。                                             |
| 100<br/>200<br/>300<br/>400<br/>500<br/>600<br/>700<br/>800<br/>900 | 定义由粗到细的字符。<br/>400 等同于 normal，而 700 等同于 bold。 |
| inherit                                                      | 规定应该从父元素继承字体的粗细。                             |



[返回目录](#CSS字体)

------



## 字体大小：`font-size`

**font-size 属性**设置文本的大小。

有能力管理文本的大小在 web 设计领域很重要。但是，不应当通过调整文本大小使段落看上去像标题，或者使标题看上去像段落。

始终使用正确的 `HTML` 标题，比如使用 `<h1> - <h6>` 来标记标题，使用 `<p>` 来标记段落。

`font-size` 值可以是绝对或相对值。

绝对值：

- 将文本设置为指定的大小
- 不允许用户在所有浏览器中改变文本大小（不利于可用性）
- 绝对大小在确定了输出的物理尺寸时很有用

相对大小：

- 相对于周围的元素来设置大小
- 允许用户在浏览器改变文本大小

**注意：**如果您没有规定字体大小，普通文本（比如段落）的默认大小是 16 像素 (16px=1em)。

**使用像素来设置字体大小**

通过像素设置文本大小，**可以对文本大小进行完全控制**

**使用 em 来设置字体大小**

如果要避免在 `Internet Explorer` 中无法调整文本的问题，许多开发者使用 `em` 单位代替 `pixels`。

**W3C 推荐使用 em 尺寸单位**

`1em` 等于当前的字体尺寸。如果一个元素的 `font-size` 为 `16` 像素，那么对于该元素，1em 就等于 16 像素。在设置字体大小时，**`em` 的值会相对于父元素的字体大小改变**。

浏览器中默认的文本大小是 16 像素。因此 1em 的默认尺寸是 16 像素。

可以使用下面这个公式将像素转换为 em：*pixels*/16=*em*

（注：16 等于父元素的默认字体大小，假设父元素的 font-size 为 20px，那么公式需改为：*pixels*/20=*em*）

**实例**

```
h1 {font-size:3.75em;} /* 60px/16=3.75em */
h2 {font-size:2.5em;}  /* 40px/16=2.5em */
p {font-size:0.875em;} /* 14px/16=0.875em */
```

在上面的例子中，以 `em` 为单位的文本大小与前一个例子中以像素计的文本是相同的。不过，如果使用 `em` 单位，则可以在所有浏览器中调整文本大小。

不幸的是，在 IE 中仍存在问题。在重设文本大小时，会比正常的尺寸更大或更小。

**结合使用百分比和 EM**

在所有浏览器中均有效的方案是**为 `body` 元素（父元素）以百分比设置默认的 `font-size` 值**：

```
body {font-size:100%;}
h1 {font-size:3.75em;}
h2 {font-size:2.5em;}
p {font-size:0.875em;}
```



### 定义和用法

| 默认值：          | medium                           |
| :---------------- | -------------------------------- |
| 继承性：          | yes                              |
| 版本：            | CSS1                             |
| JavaScript 语法： | *object*.style.fontSize="larger" |

### 属性值

| 值                                             | 描述                                                         |
| :--------------------------------------------- | :----------------------------------------------------------- |
| xx-smallx-smallsmallmediumlargex-largexx-large | 把字体的尺寸设置为不同的尺寸，从 xx-small 到 xx-large。默认值：medium。 |
| smaller                                        | 把 font-size 设置为比父元素更小的尺寸。                      |
| larger                                         | 把 font-size 设置为比父元素更大的尺寸。                      |
| *length*                                       | 把 font-size 设置为一个固定的值。                            |
| *%*                                            | 把 font-size 设置为基于父元素的一个百分比值。                |
| inherit                                        | 规定应该从父元素继承字体尺寸。                               |



[返回目录](#CSS字体)

------



## CSS3 `@font-face` 规则

在 CSS3 之前，`web` 设计师必须使用已在用户计算机上安装好的字体。

通过 CSS3，`web` 设计师可以使用他们喜欢的任意字体。

当找到或购买到希望使用的字体时，可将该字体文件存放到 web 服务器上，它会在需要时被自动下载到用户的计算机上。

**浏览器支持**

​		`Firefox`、`Chrome`、`Safari` 以及 `Opera` 支持 `.ttf (True Type Fonts)` 和 `.otf (OpenType Fonts)` 类型的字体。

​		Internet Explorer 9+ 支持新的 `@font-face` 规则，但是仅支持 `.eot` 类型的字体 `(Embedded OpenType)`。

​	**注释：**Internet Explorer 8 以及更早的版本不支持新的 `@font-face` 规则。

**使用需要的字体**

​		在新的 `@font-face` 规则中，必须首先定义字体的名称（比如 `myFirstFont`），然后指向该字体文件。

​		如需为 `HTML` 元素使用字体，请通过 `font-family` 属性来引用字体的名称 (`myFirstFont`)：

**实例**

```
<style> 
	@font-face{
        font-family: myFirstFont;
        src: url('Sansation_Light.ttf'),
        	 url('Sansation_Light.eot'); /* IE9+ */
	}

    div{
        font-family:myFirstFont;
       }
</style>
```

**使用粗体字体**

必须为粗体文本添加另一个包含描述符的 `@font-face`：

**实例**

```
@font-face{
	font-family: myFirstFont;
	src: url('Sansation_Bold.ttf'),
     	 url('Sansation_Bold.eot'); /* IE9+ */
	font-weight:bold;
}
```

文件 `"Sansation_Bold.ttf"` 是另一个字体文件，它包含了 `Sansation` 字体的粗体字符。

只要 `font-family` 为 `"myFirstFont"` 的文本需要显示为粗体，浏览器就会使用该字体。

通过这种方式，我们可以为相同的字体设置许多 `@font-face` 规则。

### CSS3 字体描述符

下面的表格列出了能够在 `@font-face` 规则中定义的所有字体描述符：

| 描述符        | 值                                                           | 描述                                                         |
| :------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| font-family   | *name*                                                       | 必需。规定字体的名称。                                       |
| src           | *URL*                                                        | 必需。定义字体文件的 URL。                                   |
| font-stretch  | normal<br/>condensed<br/>ultra-condensed<br/>extra-condensed<br/>semi-condensed<br/>expanded<br/>semi-expanded<br/>extra-expanded<br/>ultra-expanded | 可选。定义如何拉伸字体。默认是 "normal"。                    |
| font-style    | normal<br/>italic<br/>oblique                                | 可选。定义字体的样式。默认是 "normal"。                      |
| font-weight   | normal<br/>bold<br/>100<br/>200<br/>300<br/>400<br/>500<br/>600<br/>700<br/>800<br/>900 | 可选。定义字体的粗细。默认是 "normal"。                      |
| unicode-range | *unicode-range*                                              | 可选。定义字体支持的 UNICODE 字符范围。默认是 "U+0-10FFFF"。 |



[返回目录](#CSS字体)

------

