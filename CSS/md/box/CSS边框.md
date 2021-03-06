# CSS边框

[TOC]

## 边框概述

在 HTML 中，我们使用表格来创建文本周围的边框，但是通过使用 CSS 边框属性，我们可以创建出效果出色的边框，并且可以应用于任何元素。

元素外边距内就是元素的的边框 (`border`)。元素的边框就是围绕元素内容和内边据的一条或多条线。

每个边框有 3 个方面：**宽度、样式，以及颜色**。



[返回目录](#CSS边框)

------



## 边框与背景

CSS 规范指出，边框绘制在“元素的背景之上”。这很重要，因为有些边框是“间断的”（例如，点线边框或虚线框），元素的背景应当出现在边框的可见部分之间。

CSS2 指出背景只延伸到内边距，而不是边框。后来 CSS2.1 进行了更正：元素的背景是内容、内边距和边框区的背景。大多数浏览器都遵循 CSS2.1 定义，不过一些较老的浏览器可能会有不同的表现。



[返回目录](#CSS边框)

------



## 边框的样式：`border-style`

样式是边框最重要的一个方面，这不是因为样式控制着边框的显示（当然，样式确实控制着边框的显示），而是因为如果没有样式，将根本没有边框。

CSS 的 **`border-style` 属性**定义了 10 个不同的非 inherit 样式，包括 none。

例如，您可以为把一幅图片的边框定义为 outset，使之看上去像是“凸起按钮”：

### 定义多种样式

可以为一个边框定义多个样式，例如：

```
p.aside {border-style: solid dotted dashed double;}
```

上面这条规则为类名为 aside 的段落定义了四种边框样式：实线上边框、点线右边框、虚线下边框和一个双线左边框。

我们又看到了这里的值采用了 `top-right-bottom-left` 的顺序**（顺时针）**，讨论用多个值设置不同内边距时也见过这个顺序。

### 定义单边样式

如果希望为元素框的某一个边设置边框样式，而不是设置所有 4 个边的边框样式，可以使用下面的单边边框样式属性：

- `border-top-style`

  **JavaScript 语法**：*object*.style.borderTopStyle="dotted"

- border-right-style

  **JavaScript 语法**：*object*.style.borderRightStyle="dotted"

- border-bottom-style

  **JavaScript 语法**：*object*.style.borderBottomStyle="dotted"

- border-left-style

  **JavaScript 语法**：*object*.style.borderLeftStyle="dotted"

因此这两种方法是等价的：

```
p {border-style: solid solid solid none;}
p {border-style: solid; border-left-style: none;}
```

**注意：**如果要使用第二种方法，必须把单边属性放在简写属性之后。因为如果把单边属性放在 border-style 之前，简写属性的值就会覆盖单边值 none。

### 属性值

| 值      | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| none    | 定义无边框。                                                 |
| hidden  | 与 "none" 相同。不过应用于表时除外，对于表，hidden 用于解决边框冲突。 |
| dotted  | 定义点状边框。在大多数浏览器中呈现为实线。                   |
| dashed  | 定义虚线。在大多数浏览器中呈现为实线。                       |
| solid   | 定义实线。                                                   |
| double  | 定义双线。双线的宽度等于 border-width 的值。                 |
| groove  | 定义 3D 凹槽边框。其效果取决于 border-color 的值。           |
| ridge   | 定义 3D 垄状边框。其效果取决于 border-color 的值。           |
| inset   | 定义 3D inset 边框。其效果取决于 border-color 的值。         |
| outset  | 定义 3D outset 边框。其效果取决于 border-color 的值。        |
| inherit | 规定应该从父元素继承边框样式。                               |



[返回目录](#CSS边框)

------



## 边框的宽度：`border-width`

通过**`border-width` 属性**为边框指定宽度。

为边框指定宽度有两种方法：可以指定长度值，比如 2px 或 0.1em；或者使用 3 个关键字之一，它们分别是 thin 、medium（默认值） 和 thick。

**注释：**CSS 没有定义 3 个关键字的具体宽度，所以一个用户代理可能把 thin 、medium 和 thick 分别设置为等于 5px、3px 和 2px，而另一个用户代理则分别设置为 3px、2px 和 1px。

**如果希望边框出现，就必须声明一个边框样式。**

### 定义单边宽度

可以按照 top-right-bottom-left 的顺序设置元素的各边边框：

```
p {border-style: solid; border-width: 15px 5px 15px 5px;}
```

上面的例子也可以简写为（这样写法称为*值复制*）：

```
p {border-style: solid; border-width: 15px 5px;}
```

可以通过下列属性分别设置边框各边的宽度：

- `border-top-width`

  **JavaScript 语法**：*object*.style.borderTopWidth="thick"

- `border-right-width`

  **JavaScript 语法**：*object*.style.borderRightWidth="thick"

- `border-bottom-width`

  **JavaScript 语法**：*object*.style.borderBottomWidth="thick"

- `border-left-width`

  **JavaScript 语法**：*object*.style.borderLeftWidth="thick"

因此，下面的规则与上面的例子是等价的：

```
p {
  border-style: solid;
  border-top-width: 15px;
  border-right-width: 5px;
  border-bottom-width: 15px;
  border-left-width: 5px;
  }
```

### 属性值

| thin     | 定义细的右边框。               |
| -------- | ------------------------------ |
| medium   | 默认值。定义中等的右边框。     |
| thick    | 定义粗的右边框。               |
| *length* | 允许您自定义右边框的宽度。     |
| inherit  | 规定应该从父元素继承边框宽度。 |



[返回目录](#CSS边框)

------



## 边框的颜色：`border-color`

CSS 使用 **`border-color` 属性**，它一次可以接受最多 4 个颜色值。

可以使用任何类型的颜色值，例如可以是命名颜色，也可以是十六进制和 RGB 值：

```
p {
  border-style: solid;
  border-color: blue rgb(25%,35%,45%) #909090 red;
  }
```

如果颜色值小于 4 个，值复制就会起作用。例如下面的规则声明了段落的上下边框是蓝色，左右边框是红色：

```
p {
  border-style: solid;
  border-color: blue red;
  }
```

**注释：**默认的边框颜色是元素本身的前景色。如果没有为边框声明颜色，它将与元素的文本颜色相同。另一方面，如果元素没有任何文本，假设它是一个表格，其中只包含图像，那么该表的边框颜色就是其父元素的文本颜色（因为 `color` 可以继承）。这个父元素很可能是 `body`、`div` 或另一个 `table`。

### 定义单边颜色

还有一些单边边框颜色属性。它们的原理与单边样式和宽度属性相同：

- border-top-color

  **JavaScript 语法**：*object*.style.borderTopColor="blue"

- border-right-color

  **JavaScript 语法**：*object*.style.borderRightColor="blue"

- border-bottom-color

  **JavaScript 语法**：*object*.style.borderBottomColor="blue"

- border-left-color

  **JavaScript 语法**：*object*.style.borderLeftColor="blue"

要为 h1 元素指定实线黑色边框，而右边框为实线红色，可以这样指定：

```
h1 {
  border-style: solid;
  border-color: black;
  border-right-color: red;
  }
```

### 透明边框

如果边框没有样式，就没有宽度。不过有些情况下可能希望创建一个不可见的边框。

CSS2 引入了边框颜色值 `transparent`。这个值用于创建有宽度的不可见边框。例子：

```
<a href="#">AAA</a>
<a href="#">BBB</a>
<a href="#">CCC</a>
```

我们为上面的链接定义了如下样式：

```
a:link, a:visited {
  border-style: solid;
  border-width: 5px;
  border-color: transparent;
  }
a:hover {border-color: gray;}
```

如需查看以上样式的效果，请点击：[TIY](https://www.w3school.com.cn/tiy/t.asp?f=csse_border_color_transparent)

从某种意义上说，利用 `transparent`，使用边框就像是额外的内边距一样；此外还有一个好处，就是能在需要的时候使其可见。这种透明边框相当于内边距，因为元素的背景会延伸到边框区域（如果有可见背景的话）。

**重要事项：**在 IE7 之前，IE/WIN 没有提供对 transparent 的支持。在以前的版本，IE 会根据元素的 color 值来设置边框颜色。

### 属性值

| 值           | 描述                                                   |
| :----------- | :----------------------------------------------------- |
| *color_name* | 规定颜色值为颜色名称的边框颜色（比如 red）。           |
| *hex_number* | 规定颜色值为十六进制值的边框颜色（比如 #ff0000）。     |
| *rgb_number* | 规定颜色值为 rgb 代码的边框颜色（比如 rgb(255,0,0)）。 |
| transparent  | 默认值。边框颜色为透明。                               |
| inherit      | 规定应该从父元素继承边框颜色。                         |



[返回目录](#CSS边框)

------



## 上边框简写属性：`border-top`

**`border-top` 简写属性**把上边框的所有属性设置到一个声明中。

可以按顺序设置如下属性：

- border-top-width
- border-top-style
- border-top-color

**JavaScript 语法**：*object*.style.borderTop="3px solid blue"



[返回目录](#CSS边框)

------



## 右边框简写属性：`border-right`

**`border-right` 简写属性**把右边框的所有属性设置到一个声明中。

可以按顺序设置如下属性：

- border-right-width
- border-right-style
- border-right-color

**JavaScript 语法**：*object*.style.borderRight="3px solid blue"



[返回目录](#CSS边框)

------



## 下边框简写属性：`border-bottom`

**`border-bottom` 简写属性**把下边框的所有属性设置到一个声明中。

可以按顺序设置如下属性：

- border-bottom-width
- border-bottom-style
- border-bottom-color

**JavaScript 语法**：*object*.style.borderBottom="3px solid blue"



[返回目录](#CSS边框)

------



## 左边框简写属性：`border-left`

**`border-right` 简写属性**把左边框的所有属性设置到一个声明中。

可以按顺序设置如下属性：

- border-left-width
- border-left-style
- border-left-color

**JavaScript 语法**：*object*.style.borderLeft="3px solid blue"



[返回目录](#CSS边框)

------



## CSS3 圆角边框：`border-radius`

### 定义和用法

在 CSS3 中，**`border-radius` 属性**用于创建圆角：

`border-radius` 属性是一个**简写属性**，用于设置四个 border-\*-\*-radius 属性。

- **`border-top-left-radius`：**定义左上角的弧度

  **JavaScript 语法**：*object* object.style.borderTopLeftRadius="5px"

- **`border-top-right-radius`：**定义右上角的弧度

  **JavaScript 语法**：*object* object.style.borderTopRightRadius="5px"

- **`border-bottom-right-radius`：**定义右下角的弧度

  **JavaScript 语法**：*object* object.style.borderBottomRightRadius="5px"

- **`border-bottom-left-radius`：**定义左下角的弧度

  **JavaScript 语法**：*object* object.style.borderBottomLeftRadius="5px"

**实例**

向 div 元素添加圆角：

```
div{
    text-align:center;
    border:2px solid #a1a1a1;
    padding:10px 40px; 
    background:#dddddd;
    width:350px;
    border-radius:25px;
    -moz-border-radius:25px; /* 老的 Firefox */
}

<div>border-radius 属性允许您向元素添加圆角。</div>
```

**运行结果：**

<div style="text-align:center;border:2px solid #a1a1a1;padding:10px 40px; background:#dddddd;width:500px;border-radius:25px;">border-radius 属性允许向元素添加圆角。</div>

### 属性值

| 默认值：          | 0                                 |
| :---------------- | --------------------------------- |
| 继承性：          | no                                |
| 版本：            | CSS3                              |
| JavaScript 语法： | *object*.style.borderRadius="5px" |

**注释：**从左上角按顺时针顺序设置每个 `radii` 的四个值。如果省略 `bottom-left`，则与 `top-right` 相同。如果省略 `bottom-right`，则与 `top-left` 相同。如果省略 `top-right`，则与 `top-left` 相同。

| 值       | 描述                     |
| :------- | :----------------------- |
| *length* | 定义圆角的形状。         |
| *%*      | 以百分比定义圆角的形状。 |



[返回目录](#CSS边框)

------



## CSS3 边框阴影：`box-shadow`

### 定义和用法

在 CSS3 中，**`box-shadow`属性** 用于向方框添加阴影：

**实例**

向 div 元素添加方框阴影：

```
div{
    width:300px;
    height:100px;
    background-color:#ff9900;
    -moz-box-shadow: 10px 10px 5px #888888; /* 老的 Firefox */
    box-shadow: 10px 10px 5px #888888;
}

<div></div>
```

**运行结果**

<div style=" width:300px;height:100px;background-color:#ff9900;-moz-box-shadow: 10px 10px 5px #888888; /* 老的 Firefox */ box-shadow: 10px 10px 5px #888888;"></div>

| 默认值：          | none                                             |
| :---------------- | ------------------------------------------------ |
| 继承性：          | no                                               |
| 版本：            | CSS3                                             |
| JavaScript 语法： | *object*.style.boxShadow="10px 10px 5px #888888" |

**语法**

```
box-shadow: h-shadow v-shadow blur spread color inset;
```

**注释：**box-shadow 向框添加一个或多个阴影。该属性是由逗号分隔的阴影列表，每个阴影由 2-4 个长度值、可选的颜色值以及可选的 inset 关键词来规定。省略长度的值是 0。

### 属性值

| 值         | 描述                                     |
| :--------- | :--------------------------------------- |
| *h-shadow* | 必需。水平阴影的位置。允许负值。         |
| *v-shadow* | 必需。垂直阴影的位置。允许负值。         |
| *blur*     | 可选。模糊距离。                         |
| *spread*   | 可选。阴影的尺寸。                       |
| *color*    | 可选。阴影的颜色。请参阅 CSS 颜色值。    |
| inset      | 可选。将外部阴影 (outset) 改为内部阴影。 |



[返回目录](#CSS边框)

------



## CSS3 边框图片：`border-image`

### 定义和用法

通过 CSS3 的 **`border-image` 属性**，可以使用图片来创建边框：

用于创建上面的边框的原始图片：

![用于边框的图片](..\..\image\border.png)

**实例**

使用图片创建围绕 div 元素的边框：

```
div{
    border:15px solid transparent;
    width:300px;
    padding:10px 20px;
}

#round{
    -moz-border-image:url(/i/border.png) 30 30 round;	/* Old Firefox */
    -webkit-border-image:url(/i/border.png) 30 30 round;	/* Safari and Chrome */
    -o-border-image:url(/i/border.png) 30 30 round;		/* Opera */
    border-image:url(/i/border.png) 30 30 round;
}

#stretch{
    -moz-border-image:url(/i/border.png) 30 30 stretch;	/* Old Firefox */
    -webkit-border-image:url(/i/border.png) 30 30 stretch;	/* Safari and Chrome */
    -o-border-image:url(/i/border.png) 30 30 stretch;	/* Opera */
    border-image:url(/i/border.png) 30 30 stretch;
}

<div id="round">在这里，图片铺满整个边框。</div>
<br>
<div id="stretch">在这里，图片被拉伸以填充该区域。</div>
```

**运行结果**

![](..\..\image\边框图片.png)

**`border-image` 属性**是一个简写属性，用于设置以下属性：

- `border-image-source`
- `border-image-slice`
- `border-image-width`
- `border-image-outset`
- `border-image-repeat`

如果省略值，会设置其默认值。

**提示：**请使用 border-image-* 属性来构造漂亮的可伸缩按钮！

| 默认值：          | none 100% 1 0 stretch                                    |
| :---------------- | -------------------------------------------------------- |
| 继承性：          | no                                                       |
| 版本：            | CSS3                                                     |
| JavaScript 语法： | *object*.style.borderImage="url(border.png) 30 30 round" |

### 属性值

| 值                    | 描述                                                         |
| :-------------------- | :----------------------------------------------------------- |
| *border-image-source* | 用在边框的图片的路径。                                       |
| *border-image-slice*  | 图片边框向内偏移。                                           |
| *border-image-width*  | 图片边框的宽度。                                             |
| *border-image-outset* | 边框图像区域超出边框的量。                                   |
| *border-image-repeat* | 图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched)。 |



[返回目录](#CSS边框)

------

