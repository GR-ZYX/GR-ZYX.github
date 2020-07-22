# CSS3 文本效果

[TOC]

## 文本溢出包含元素时的处理：`text-overflow`

### 定义和用法

**`text-overflow` 属性**规定当文本溢出包含元素时发生的事情。

| 默认值：          | clip                                   |
| :---------------- | -------------------------------------- |
| 继承性：          | no                                     |
| 版本：            | CSS3                                   |
| JavaScript 语法： | *object*.style.textOverflow="ellipsis" |

**语法**

```
text-overflow: clip|ellipsis|string;
```

### 属性值

| 值       | 描述                                 |
| :------- | :----------------------------------- |
| clip     | 修剪文本。                           |
| ellipsis | 显示省略符号来代表被修剪的文本。     |
| *string* | 使用给定的字符串来代表被修剪的文本。 |



[返回目录](#CSS3 文本效果)

------



## 设置文本阴影：`text-shadow`

### 定义和用法

**`text-shadow` 属性**向文本设置阴影。

| 默认值：          | none                                        |
| :---------------- | ------------------------------------------- |
| 继承性：          | yes                                         |
| 版本：            | CSS3                                        |
| JavaScript 语法： | *object*.style.textShadow="2px 2px #ff0000" |

**语法**

```
text-shadow: h-shadow v-shadow blur color;
```

**注释：**`text-shadow` 属性向文本添加一个或多个阴影。该属性是逗号分隔的阴影列表，每个阴影有两个或三个长度值和一个可选的颜色值进行规定。省略的长度是 0。

### 属性值

| 值         | 描述                             |
| :--------- | :------------------------------- |
| *h-shadow* | 必需。水平阴影的位置。允许负值。 |
| *v-shadow* | 必需。垂直阴影的位置。允许负值。 |
| *blur*     | 可选。模糊的距离。               |
| *color*    | 可选。阴影的颜色。               |



[返回目录](#CSS3 文本效果)

------



## 自动换行的处理方法：word-break

### 定义和用法

**`word-break` 属性**规定自动换行的处理方法。

**提示：**通过使用 `word-break` 属性，可以让浏览器实现在任意位置的换行。

| 默认值：          | normal                              |
| :---------------- | ----------------------------------- |
| 继承性：          | yes                                 |
| 版本：            | CSS3                                |
| JavaScript 语法： | *object*.style.wordBreak="keep-all" |

**语法**

```
word-break: normal|break-all|keep-all;
```

### 属性值

| 值        | 描述                           |
| :-------- | :----------------------------- |
| normal    | 使用浏览器默认的换行规则。     |
| break-all | 允许在单词内换行。             |
| keep-all  | 只能在半角空格或连字符处换行。 |



[返回目录](#CSS3 文本效果)

------



## 长单词或 URL 地址换行：`word-wrap`

### 定义和用法

**`word-wrap` 属性**允许长单词或 URL 地址换行到下一行。

| 默认值：          | normal                               |
| :---------------- | ------------------------------------ |
| 继承性：          | yes                                  |
| 版本：            | CSS3                                 |
| JavaScript 语法： | *object*.style.wordWrap="break-word" |

**语法**

```
word-wrap: normal|break-word;
```

### 属性值

| 值         | 描述                                         |
| :--------- | :------------------------------------------- |
| normal     | 只在允许的断字点换行（浏览器保持默认处理）。 |
| break-word | 在长单词或 URL 地址内部进行换行。            |



[返回目录](#CSS3 文本效果)

------



## 文本的换行（折行）规则：`text-wrap`

### 定义和用法

**浏览器支持**

目前主流浏览器**都不支持** `text-wrap` 属性。

**`text-wrap` 属性**规定文本的换行（折行）规则。

| 默认值：          | normal                         |
| :---------------- | ------------------------------ |
| 继承性：          | yes                            |
| 版本：            | CSS3                           |
| JavaScript 语法： | *object*.style.textWrap="none" |

**语法**

```
text-wrap: normal|none|unrestricted|suppress;
```

### 属性值

| 值           | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| normal       | 只在允许的换行点进行换行。                                   |
| none         | 不换行。元素无法容纳的文本会溢出。                           |
| unrestricted | 在任意两个字符间换行。                                       |
| suppress     | 压缩元素中的换行。浏览器只在行中没有其他有效换行点时进行换行。 |



[返回目录](#CSS3 文本效果)

------



## 文本轮廓：`text-outline`

### 定义和用法

**浏览器支持**

所有主流浏览器**都不支持** `text-outline` 属性。

**`text-outline` 属性**规定文本轮廓。

| 默认值：          | none                                         |
| :---------------- | -------------------------------------------- |
| 继承性：          | yes                                          |
| 版本：            | CSS3                                         |
| JavaScript 语法： | *object*.style.textOutline="2px 2px #ff0000" |

**语法**

```
text-outline: thickness blur color;
```

### 属性值

| 值          | 描述                   |
| :---------- | :--------------------- |
| *thickness* | 必需。轮廓的粗细。     |
| *blur*      | 可选。轮廓的模糊半径。 |
| *color*     | 必需。轮廓的颜色。     |



[返回目录](#CSS3 文本效果)

------



## 当 `text-align` 被设置为`"justify"`  时的齐行方法：`text-justify`

### 定义和用法

**只有 `Internet Explorer` 支持 `text-justify` 属性。**

`text-justify` 属性规定当 `text-align` 被设置为`"justify"` **（两端对齐）** 时的齐行方法。

该属性规定如何对齐行文本进行对齐和分隔。

| 默认值：          | auto                                    |
| :---------------- | --------------------------------------- |
| 继承性：          | yes                                     |
| 版本：            | CSS3                                    |
| JavaScript 语法： | *object*.style.textJustify="inter-word" |

**语法**

```
text-justify: auto|inter-word|inter-ideograph|inter-cluster|distribute|kashida|trim;
```

### 属性值

| 值              | 描述                                                   |
| :-------------- | :----------------------------------------------------- |
| auto            | 浏览器决定齐行算法。                                   |
| none            | 禁用齐行。                                             |
| inter-word      | 增加/减少单词间的间隔。                                |
| inter-ideograph | 用表意文本来排齐内容。                                 |
| inter-cluster   | 只对不包含内部单词间隔的内容（比如亚洲语系）进行排齐。 |
| distribute      | 类似报纸版面，除了在东亚语系中最后一行是不齐行的。     |
| kashida         | 通过拉伸字符来排齐内容。                               |



[返回目录](#CSS3 文本效果)

------



## 应用重点标记以及重点标记的前景色：`text-emphasis`

### 定义和用法

**浏览器支持**

目前主流浏览器**都不支持** `text-emphasis` 属性。

**`text-emphasis` 属性**是简写属性，用于在一个声明中设置 `text-emphasis-style` 和 `text-emphasis-color。`

**提示：**Adobe 的 "Kenten Generic OpenType Font" 是一个适合重点标记的字体，它专门为重点标记设计。

| 默认值：          | none                                      |
| :---------------- | ----------------------------------------- |
| 继承性：          | yes                                       |
| 版本：            | CSS3                                      |
| JavaScript 语法： | *object*.style.textEmphasis="filled blue" |

**语法**

```
text-emphasis: text-emphasis-style text-emphasis-color;
```

### 属性值

| 值                    | 描述                       |
| :-------------------- | :------------------------- |
| *text-emphasis-style* | 向元素的文本应用重点标记。 |
| *text-emphasis-color* | 定义重点标记的前景色。     |



[返回目录](#CSS3 文本效果)

------



## 是否对标点符号进行修剪：`punctuation-trim`

### 定义和用法

**浏览器支持**

目前主流浏览器**都不支持** `punctuation-trim` 属性。

**`punctuation-trim` 属性**规定如果标点位于行开头或结尾处，或者临近另一个全角标点符号，是否对标点符号进行修剪。

| 默认值：          | none                                   |
| :---------------- | -------------------------------------- |
| 继承性：          | yes                                    |
| 版本：            | CSS3                                   |
| JavaScript 语法： | *object*.style.punctuationTrim="start" |

**语法**

```
punctuation-trim: none|start|end|allow-end|adjacent;
```

### 属性值

| 值        | 描述                         |
| :-------- | :--------------------------- |
| none      | 不修剪开启或闭合标点符号。   |
| start     | 修剪每行结尾的开启标点符号。 |
| end       | 修剪每行结尾的闭合标点符号。 |
| allow-end |                              |
| adjacent  |                              |



[返回目录](#CSS3 文本效果)

------



## 标点符号放置位置：` hanging-punctuation`

### 定义和用法

**浏览器支持**

目前主流浏览器**都不支持** `hanging-punctuation` 属性。

**`hanging-punctuation` 属性**规定把标点符号放在文本整行的开头还是结尾的行框之外。

| 默认值：          | none                                      |
| :---------------- | ----------------------------------------- |
| 继承性：          | yes                                       |
| 版本：            | CSS3                                      |
| JavaScript 语法： | *object*.style.hangingPunctuation="first" |

**语法**

```
hanging-punctuation: none|first|last|allow-end|force-end;
```

### 属性值

| 值        | 描述                                               |
| :-------- | :------------------------------------------------- |
| none      | 不在文本整行的开头还是结尾的行框之外放置标签符号。 |
| first     | 标点附着在首行开始边缘之外。                       |
| last      | 标点附着在首行结尾边缘之外。                       |
| allow-end |                                                    |
| force-end |                                                    |



[返回目录](#CSS3 文本效果)

------

