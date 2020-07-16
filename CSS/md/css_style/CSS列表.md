# CSS列表

[TOC]

## CSS 列表

从某种意义上讲，不是描述性的文本的任何内容都可以认为是列表。人口普查、太阳系、家谱、参观菜单，甚至你的所有朋友都可以表示为一个列表或者是列表的列表。



[返回目录](#CSS列表)

------



## 列表类型：`list-style-type`

要影响列表的样式，最简单（同时支持最充分）的办法就是改变其标志类型。

例如，在一个无序列表中，列表项的标志 (`marker`) 是出现在各列表项旁边的圆点。在有序列表中，标志可能是字母、数字或另外某种计数体系中的一个符号。

要修改用于列表项的标志类型，可以使用属性 `list-style-type`



### 定义和用法

| 默认值：          | disc                                  |
| :---------------- | ------------------------------------- |
| 继承性：          | yes                                   |
| 版本：            | CSS1                                  |
| JavaScript 语法： | *object*.style.listStyleType="square" |

### 属性值

| 值                   | 描述                                                        |
| :------------------- | :---------------------------------------------------------- |
| none                 | 无标记。                                                    |
| disc                 | 默认。标记是实心圆。                                        |
| circle               | 标记是空心圆。                                              |
| square               | 标记是实心方块。                                            |
| decimal              | 标记是数字。                                                |
| decimal-leading-zero | 0开头的数字标记。(01, 02, 03, 等。)                         |
| lower-roman          | 小写罗马数字(i, ii, iii, iv, v, 等。)                       |
| upper-roman          | 大写罗马数字(I, II, III, IV, V, 等。)                       |
| lower-alpha          | 小写英文字母The marker is lower-alpha (a, b, c, d, e, 等。) |
| upper-alpha          | 大写英文字母The marker is upper-alpha (A, B, C, D, E, 等。) |
| lower-greek          | 小写希腊字母(alpha, beta, gamma, 等。)                      |
| lower-latin          | 小写拉丁字母(a, b, c, d, e, 等。)                           |
| upper-latin          | 大写拉丁字母(A, B, C, D, E, 等。)                           |
| hebrew               | 传统的希伯来编号方式                                        |
| armenian             | 传统的亚美尼亚编号方式                                      |
| georgian             | 传统的乔治亚编号方式(an, ban, gan, 等。)                    |
| cjk-ideographic      | 简单的表意数字                                              |
| hiragana             | 标记是：a, i, u, e, o, ka, ki, 等。（日文片假名）           |
| katakana             | 标记是：A, I, U, E, O, KA, KI, 等。（日文片假名）           |
| hiragana-iroha       | 标记是：i, ro, ha, ni, ho, he, to, 等。（日文片假名）       |
| katakana-iroha       | 标记是：I, RO, HA, NI, HO, HE, TO, 等。（日文片假名）       |



[返回目录](#CSS列表)

------



## 列表项图像：`list-style-image`

有时，常规的标志是不够的。对各标志使用一个图像，这可以利用 `list-style-image` 属性做到：

```
ul li {list-style-image : url(xxx.gif)}
```

只需要简单地使用一个 url() 值，就可以使用图像作为标志。

### 定义和用法

这个属性指定作为一个有序或无序列表项标志的图像。图像相对于列表项内容的放置位置通常使用 list-style-position 属性控制。

**注释：**请始终规定一个 "list-style-type" 属性以防图像不可用。

| 默认值：          | none                                                        |
| :---------------- | ----------------------------------------------------------- |
| 继承性：          | yes                                                         |
| 版本：            | CSS1                                                        |
| JavaScript 语法： | *object*.style.listStyleImage="url('/images/blueball.gif')" |

### 属性值

| 值      | 描述                                             |
| :------ | :----------------------------------------------- |
| *URL*   | 图像的路径。                                     |
| none    | 默认。无图形被显示。                             |
| inherit | 规定应该从父元素继承 list-style-image 属性的值。 |



[返回目录](#CSS列表)

------



## 列表标志位置：`list-style-position`

### 定义和用法

该属性用于声明列表标志相对于列表项内容的位置。外部 (`outside`) 标志会放在离列表项边框边界一定距离处，不过这距离在 CSS 中未定义。内部 (`inside`) 标志处理为好像它们是插入在列表项内容最前面的行内元素一样。

| 默认值：          | outside                                   |
| :---------------- | ----------------------------------------- |
| 继承性：          | yes                                       |
| 版本：            | CSS1                                      |
| JavaScript 语法： | *object*.style.listStylePosition="inside" |

### 属性值

| 值      | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| inside  | 列表项目标记放置在文本以内，且环绕文本根据标记对齐。         |
| outside | 默认值。保持标记位于文本的左侧。列表项目标记放置在文本以外，且环绕文本不根据标记对齐。 |
| inherit | 规定应该从父元素继承 list-style-position 属性的值。          |



[返回目录](#CSS列表)

------



## 简写列表样式：`list-style`

为简单起见，可以将以上 3 个列表样式属性合并为一个方便的属性：`list-style`，就像这样：

```
li {list-style : url(example.gif) square inside}
```

`list-style` 的值可以按任何顺序列出，而且这些值都可以忽略。只要提供了一个值，其它的就会填入其默认值。



[返回目录](#CSS列表)

------

