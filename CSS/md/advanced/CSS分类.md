# CSS分类

[TOC]

**CSS 分类属性允许规定如何以及在何处显示元素。**



## 清除浮动：`clear `

### 定义和用法

`clear` 属性规定元素的哪一侧不允许其他浮动元素。

**说明**

**clear 属性定义了元素的哪边上不允许出现浮动元素。**

| 默认值：          | none                        |
| :---------------- | --------------------------- |
| 继承性：          | no                          |
| 版本：            | CSS1                        |
| JavaScript 语法： | *object*.style.clear="left" |

### 属性值

| 值      | 描述                                  |
| :------ | :------------------------------------ |
| left    | 在左侧不允许浮动元素。                |
| right   | 在右侧不允许浮动元素。                |
| both    | 在左右两侧均不允许浮动元素。          |
| none    | 默认值。允许浮动元素出现在两侧。      |
| inherit | 规定应该从父元素继承 clear 属性的值。 |



[返回目录](#CSS分类)

------



## 显示的光标的类型：`cursor `

## 定义和用法

**`cursor` 属性**规定要显示的光标的类型（形状）。

该属性定义了鼠标指针放在一个元素边界范围内时所用的光标形状（不过 CSS2.1 没有定义由哪个边界确定这个范围）。

| 默认值：          | auto                              |
| :---------------- | --------------------------------- |
| 继承性：          | yes                               |
| 版本：            | CSS2                              |
| JavaScript 语法： | *object*.style.cursor="crosshair" |

### 属性值

| 值        | 描述                                                         |
| :-------- | :----------------------------------------------------------- |
| *url*     | 需使用的自定义光标的 URL。注释：请在此列表的末端始终定义一种普通的光标，以防没有由 URL 定义的可用光标。 |
| default   | 默认光标（通常是一个箭头）                                   |
| auto      | 默认。浏览器设置的光标。                                     |
| crosshair | 光标呈现为十字线。                                           |
| pointer   | 光标呈现为指示链接的指针（一只手）                           |
| move      | 此光标指示某对象可被移动。                                   |
| e-resize  | 此光标指示矩形框的边缘可被向右（东）移动。                   |
| ne-resize | 此光标指示矩形框的边缘可被向上及向右移动（北/东）。          |
| nw-resize | 此光标指示矩形框的边缘可被向上及向左移动（北/西）。          |
| n-resize  | 此光标指示矩形框的边缘可被向上（北）移动。                   |
| se-resize | 此光标指示矩形框的边缘可被向下及向右移动（南/东）。          |
| sw-resize | 此光标指示矩形框的边缘可被向下及向左移动（南/西）。          |
| s-resize  | 此光标指示矩形框的边缘可被向下移动（南）。                   |
| w-resize  | 此光标指示矩形框的边缘可被向左移动（西）。                   |
| text      | 此光标指示文本。                                             |
| wait      | 此光标指示程序正忙（通常是一只表或沙漏）。                   |
| help      | 此光标指示可用的帮助（通常是一个问号或一个气球）。           |

<p>把鼠标移动到单词上，可以看到鼠标指针发生变化：</p>

<span style="cursor:auto">
Auto</span>、<span style="cursor:default">
Default</span>、<span style="cursor:crosshair">
Crosshair</span>、<span style="cursor:pointer">
Pointer</span>、<span style="cursor:move">
Move</span>、<span style="cursor:e-resize">
e-resize</span>、<span style="cursor:ne-resize">
ne-resize</span>、<span style="cursor:nw-resize">
nw-resize</span>、<span style="cursor:n-resize">
n-resize</span>、<span style="cursor:se-resize">
se-resize</span>、<span style="cursor:sw-resize">
sw-resize</span>、<span style="cursor:s-resize">
s-resize</span>、<span style="cursor:w-resize">
w-resize</span>、<span style="cursor:text">
text</span>、<span style="cursor:wait">
wait</span>、<span style="cursor:help">
help</span>



[返回目录](#CSS分类)

------



## 元素生成框类型：`display`

## 定义和用法

**`display` 属性**规定元素应该生成的框的类型。

**说明**

这个属性用于定义建立布局时元素生成的显示框类型。

对于 `HTML` 等文档类型，如果使用 `display` 不谨慎会很危险，因为可能违反 `HTML` 中已经定义的显示层次结构。

对于 `XML`，由于 `XML` 没有内置的这种层次结构，所有 `display` 是绝对必要的。

| 默认值：          | inline                          |
| :---------------- | ------------------------------- |
| 继承性：          | no                              |
| 版本：            | CSS1                            |
| JavaScript 语法： | *object*.style.display="inline" |

### 属性值

| 值                 | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| none               | 此元素不会被显示。                                           |
| block              | 此元素将显示为块级元素，此元素前后会带有换行符。             |
| inline             | 默认。此元素会被显示为内联元素，元素前后没有换行符。         |
| inline-block       | 行内块元素。（CSS2.1 新增的值）                              |
| list-item          | 此元素会作为列表显示。                                       |
| run-in             | 此元素会根据上下文作为块级元素或内联元素显示。               |
| compact            | CSS 中有值 compact，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。 |
| marker             | CSS 中有值 marker，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。 |
| table              | 此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。 |
| inline-table       | 此元素会作为内联表格来显示（类似 <table>），表格前后没有换行符。 |
| table-row-group    | 此元素会作为一个或多个行的分组来显示（类似 <tbody>）。       |
| table-header-group | 此元素会作为一个或多个行的分组来显示（类似 <thead>）。       |
| table-footer-group | 此元素会作为一个或多个行的分组来显示（类似 <tfoot>）。       |
| table-row          | 此元素会作为一个表格行显示（类似 <tr>）。                    |
| table-column-group | 此元素会作为一个或多个列的分组来显示（类似 <colgroup>）。    |
| table-column       | 此元素会作为一个单元格列显示（类似 <col>）                   |
| table-cell         | 此元素会作为一个表格单元格显示（类似 <td> 和 <th>）          |
| table-caption      | 此元素会作为一个表格标题显示（类似 <caption>）               |
| inherit            | 规定应该从父元素继承 display 属性的值。                      |



[返回目录](#CSS分类)

------



## 元素浮动：`float`

### 定义和用法

**`float` 属性**定义元素在哪个方向浮动。

浮动元素会生成一个块级框，而不论它本身是何种元素。

如果浮动非替换元素，则要指定一个明确的宽度；否则，它们会尽可能地窄。

**注释：**假如在一行之上只有极少的空间可供浮动元素，那么这个元素会跳至下一行，这个过程会持续到某一行拥有足够的空间为止。

| 默认值：          | none                           |
| :---------------- | ------------------------------ |
| 继承性：          | no                             |
| 版本：            | CSS1                           |
| JavaScript 语法： | *object*.style.cssFloat="left" |

### 属性值

| 值      | 描述                                                 |
| :------ | :--------------------------------------------------- |
| left    | 元素向左浮动。                                       |
| right   | 元素向右浮动。                                       |
| none    | 默认值。元素不浮动，并会显示在其在文本中出现的位置。 |
| inherit | 规定应该从父元素继承 float 属性的值。                |



[返回目录](#CSS分类)

------



## 元素是否可见：`visibility`

### 定义和用法

**`visibility` 属性**规定元素是否可见。

**提示：**即使不可见的元素也会占据页面上的空间。使用 "`display`" 属性来创建不占据页面空间的不可见元素。

**说明**

这个属性指定是否显示一个元素生成的元素框。这意味着元素仍占据其本来的空间，不过可以完全不可见。值 `collapse` 在表中用于从表布局中删除列或行。

| 默认值：          | visible                            |
| :---------------- | ---------------------------------- |
| 继承性：          | yes                                |
| 版本：            | CSS2                               |
| JavaScript 语法： | *object*.style.visibility="hidden" |

### 属性值

| 值       | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| visible  | 默认值。元素是可见的。                                       |
| hidden   | 元素是不可见的。                                             |
| collapse | 当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"。 |
| inherit  | 规定应该从父元素继承 visibility 属性的值。                   |



[返回目录](#CSS分类)

------

