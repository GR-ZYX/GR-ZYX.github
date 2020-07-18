# CSS浮动

[TOC]

**浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。**

**由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样。**



## 浮动概念

当把框 1 向右浮动时，它脱离文档流并且向右移动，直到它的右边缘碰到包含框的右边缘：

![CSS 浮动实例 - 向右浮动的元素](..\..\image\ct_css_positioning_floating_right_example.gif)

当框 1 向左浮动时，它脱离文档流并且向左移动，直到它的左边缘碰到包含框的左边缘。因为它不再处于文档流中，所以它不占据空间，实际上覆盖住了框 2，使框 2 从视图中消失。

如果把所有三个框都向左移动，那么框 1 向左浮动直到碰到包含框，另外两个框向左浮动直到碰到前一个浮动框。

![CSS 浮动实例 - 向左浮动的元素](..\..\image\ct_css_positioning_floating_left_example.gif)

如下图所示，如果包含框太窄，无法容纳水平排列的三个浮动元素，那么其它浮动块向下移动，直到有足够的空间。如果浮动元素的高度不同，那么当它们向下移动时可能被其它浮动元素“卡住”：

![CSS 浮动实例 2 - 向左浮动的元素 ](..\..\image\ct_css_positioning_floating_left_example_2.gif)



[返回目录](#CSS浮动)

------



## 浮动：`float`

### 定义和用法

**`float` 属性**定义元素在哪个方向浮动。

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



[返回目录](#CSS浮动)

------



## 行框和清理

浮动框旁边的行框被缩短，从而给浮动框留出空间，行框围绕浮动框。

因此，**创建浮动框可以使文本围绕图像**：

![行框围绕浮动框](..\..\image\ct_css_positioning_floating_linebox.gif)

要想**阻止行框围绕浮动框**，需要对该框应用 [**`clear` 属性**](#浮动清理：`clear`)。

`clear` 属性的值可以是 `left`、`right`、`both` 或 `none`，它表示框的哪些边不应该挨着浮动框。

为了实现这种效果，在被清理的元素的*上外边距*上添加足够的空间，使元素的顶边缘垂直下降到浮动框下面：

![clear 属性实例 - 对行框应用 clear](..\..\image\ct_css_positioning_floating_clear.gif)

这是一个有用的工具，它让周围的元素为浮动元素留出空间。

假设希望让一个图片浮动到文本块的左边，并且希望这幅图片和文本包含在另一个具有背景颜色和边框的元素中。可能编写下面的代码：

```
.news {
  background-color: gray;
  border: solid 1px black;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }

<div class="news">
	<img src="news-pic.jpg" />
	<p>some text</p>
</div>
```

这种情况下，出现了一个问题。**因为浮动元素脱离了文档流，所以包围图片和文本的 div 不占据空间。**

如何让包围元素在视觉上包围浮动元素呢？需要在这个元素中的某个地方应用 clear：

![clear 属性实例 - 对空元素应用清理](..\..\image\ct_css_positioning_floating_clear_div.gif)

不幸的是出现了一个新的问题，由于没有现有的元素可以应用清理，所以我们只能添加一个空元素并且清理它。

```
.news {
  background-color: gray;
  border: solid 1px black;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }

.clear {
  clear: both;
  }

<div class="news">
	<img src="news-pic.jpg" />
	<p>some text</p>
	<div class="clear"></div>
</div>
```

这样可以实现我们希望的效果，但是需要添加多余的代码。常常有元素可以应用 `clear`，但是有时候不得不为了进行布局而添加无意义的标记。

还有另一种办法，那就是对容器 `div` 进行浮动：

```
.news {
  background-color: gray;
  border: solid 1px black;
  float: left;
  }

.news img {
  float: left;
  }

.news p {
  float: right;
  }

<div class="news">
	<img src="news-pic.jpg" />
	<p>some text</p>
</div>
```

这样会得到我们希望的效果。不幸的是，下一个元素会受到这个浮动元素的影响。为了解决这个问题，**可以选择对布局中的所有东西进行浮动，然后使用适当的有意义的元素（常常是站点的页脚）对这些浮动进行清理**。这有助于减少或消除不必要的标记。



[返回目录](#CSS浮动)

------



## 浮动清理：`clear`

### 定义和用法

**`clear` 属性**规定元素的哪一侧不允许其他浮动元素。

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



[返回目录](#CSS浮动)

------

