# CSS表格

[TOC]

## 表格边框：`border` 

如需在 CSS 中设置表格边框，使用 `border` 属性。

下面的例子为 `table`、`th` 以及 `td` 设置了蓝色边框：

```
table, th, td
  {
  border: 1px solid blue;
  }
```

上例中的表格具有双线条边框。这是由于 `table`、`th` 以及 `td` 元素都有独立的边框。



[返回目录](#CSS表格)

------



## 折叠边框：`border-collapse`

### 定义和用法

**`border-collapse` 属性**设置表格的边框是否被合并为一个单一的边框，还是象在标准的 HTML 中那样分开显示。

| 默认值：          | separate                                 |
| :---------------- | ---------------------------------------- |
| 继承性：          | yes                                      |
| 版本：            | CSS2                                     |
| JavaScript 语法： | *object*.style.borderCollapse="collapse" |

### 属性值

| 值       | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| separate | 默认值。边框会被分开。不会忽略 border-spacing 和 empty-cells 属性。 |
| collapse | 如果可能，边框会合并为一个单一的边框。会忽略 border-spacing 和 empty-cells 属性。 |
| inherit  | 规定应该从父元素继承 border-collapse 属性的值。              |



[返回目录](#CSS表格)

------



## 表格宽度和高度

通过 `width` 和 `height` 属性定义表格的宽度和高度。



[返回目录](#CSS表格)

------



## 表格文本对齐：`text-align`\\`vertical-align`

**`text-align` 和 `vertical-align` 属性**设置表格中文本的对齐方式。

**`text-align` 属性**设置水平对齐方式，比如左对齐、右对齐或者居中

**`vertical-align` 属性**设置垂直对齐方式，比如顶部对齐、底部对齐或居中对齐



[返回目录](#CSS表格)

------



## 表格内边距：`padding` 

如需控制表格中内容与边框的距离，为 `td` 和 `th` 元素设置 `padding` 属性



[返回目录](#CSS表格)

------



## 设置表格标题的位置：`caption-side` 

### 定义和用法

**`caption-side` 属性**设置表格标题的位置。

**说明**

该属性指定了表标题相对于表框的放置位置。表标题显示为好像它是表之前（或之后）的一个块级元素。

| 默认值：          | top                                 |
| :---------------- | ----------------------------------- |
| 继承性：          | yes                                 |
| 版本：            | CSS2                                |
| JavaScript 语法： | *object*.style.captionSide="bottom" |

### 属性值

| 值      | 描述                                         |
| :------ | :------------------------------------------- |
| top     | 默认值。把表格标题定位在表格之上。           |
| bottom  | 把表格标题定位在表格之下。                   |
| inherit | 规定应该从父元素继承 caption-side 属性的值。 |



[返回目录](#CSS表格)

------



## 设置分隔单元格边框的距离：`border-spacing`

### 定义和用法

border-spacing 属性设置相邻单元格的边框间的距离（仅用于“边框分离”模式）。

**注释：**某些版本的IE浏览器不支持此属性。

**说明**

该属性指定分隔边框模型中单元格边界之间的距离。在指定的两个长度值中，第一个是水平间隔，第二个是垂直间隔。除非 `border-collapse` 被设置为 `separate`，否则将忽略这个属性。尽管这个属性只应用于表，不过它可以由表中的所有元素继承。

| 默认值：          | *not specified*                     |
| :---------------- | ----------------------------------- |
| 继承性：          | yes                                 |
| 版本：            | CSS2                                |
| JavaScript 语法： | *object*.style.borderSpacing="15px" |

### 属性值

| 值              | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| *length length* | 规定相邻单元的边框之间的距离。使用 px、cm 等单位。不允许使用负值。如果定义一个 *length* 参数，那么定义的是水平和垂直间距。如果定义两个 *length* 参数，那么第一个设置水平间距，而第二个设置垂直间距。 |
| inherit         | 规定应该从父元素继承 border-spacing 属性的值。               |



[返回目录](#CSS表格)

------



## 设置是否显示表格中的空单元格：`empty-cells`

### 定义和用法

**`empty-cells` 属性**设置是否显示表格中的空单元格（**仅用于“分离边框”模式**）。

**注释：**某些版本的 IE 浏览器不支持此属性。

**说明**

该属性定义了不包含任何内容的表单元格如何表示。如果显示，就会绘制出单元格的边框和背景。**除非 `border-collapse` 设置为 `separate`，否则将忽略这个属性**。

| 默认值：          | show                             |
| :---------------- | -------------------------------- |
| 继承性：          | yes                              |
| 版本：            | CSS2                             |
| JavaScript 语法： | *object*.style.emptyCells="hide" |

### 属性值

| 值      | 描述                                        |
| :------ | :------------------------------------------ |
| hide    | 不在空单元格周围绘制边框。                  |
| show    | 在空单元格周围绘制边框。默认。              |
| inherit | 规定应该从父元素继承 empty-cells 属性的值。 |



[返回目录](#CSS表格)

------



## 设置显示单元、行和列的算法：`table-layout`

### 定义和用法

**`table-layout` 属性**用来显示表格单元格、行、列的算法规则。

**固定表格布局：**

固定表格布局与自动表格布局相比，允许浏览器更快地对表格进行布局。

在固定表格布局中，水平布局仅取决于表格宽度、列宽度、表格边框宽度、单元格间距，而与单元格的内容无关。

通过使用固定表格布局，用户代理在接收到第一行后就可以显示表格。

**自动表格布局：**

在自动表格布局中，列的宽度是由列单元格中没有折行的最宽的内容设定的。

此算法有时会较慢，这是由于它需要在确定最终的布局之前访问表格中所有的内容。

**说明**

该属性指定了完成表布局时所用的布局算法。固定布局算法比较快，但是不太灵活，而自动算法比较慢，不过更能反映传统的 HTML 表。

| 默认值：          | auto                               |
| :---------------- | ---------------------------------- |
| 继承性：          | yes                                |
| 版本：            | CSS2                               |
| JavaScript 语法： | *object*.style.tableLayout="fixed" |

### 属性值

| 值        | 描述                                         |
| :-------- | :------------------------------------------- |
| automatic | 默认。列宽度由单元格内容设定。               |
| fixed     | 列宽由表格宽度和列宽度设定。                 |
| inherit   | 规定应该从父元素继承 table-layout 属性的值。 |



[返回目录](#CSS表格)

------

