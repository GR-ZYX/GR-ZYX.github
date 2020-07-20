# CSS背景

[TOC]

## 背景色：`background-color`

可以使用 `background-color` 属性为元素设置背景色。

这条规则把元素的背景设置为灰色：

```
p {background-color: gray;}
```

如果您希望背景色从元素中的文本向外少有延伸，只需增加一些内边距：

```
p {background-color: gray; padding: 20px;}
```

可以为所有元素设置背景色，这包括 body 一直到 em 和 a 等行内元素。

background-color 不能继承，**其默认值是 transparent**。transparent 有“透明”之意。也就是说，如果一个元素没有指定背景色，那么背景就是透明的，这样其祖先元素的背景才能可见。

### 定义和用法

| 默认值：          | transparent                              |
| :---------------- | ---------------------------------------- |
| 继承性：          | no                                       |
| 版本：            | CSS1                                     |
| JavaScript 语法： | *object*.style.backgroundColor="#00FF00" |

### 属性值

| 值           | 描述                                                   |
| :----------- | :----------------------------------------------------- |
| *color_name* | 规定颜色值为颜色名称的背景颜色（比如 red）。           |
| *hex_number* | 规定颜色值为十六进制值的背景颜色（比如 #ff0000）。     |
| *rgb_number* | 规定颜色值为 rgb 代码的背景颜色（比如 rgb(255,0,0)）。 |
| transparent  | 默认。背景颜色为透明。                                 |
| inherit      | 规定应该从父元素继承 background-color 属性的设置。     |



[返回目录](#CSS背景)

------



## 背景图像：`background-image`

要把图像放入背景，需要使用 `background-image` 属性

background-image 属性的默认值是 none，表示背景上没有放置任何图像。

如果需要设置一个背景图像，必须为这个属性设置一个 URL 值：

```
body {background-image: url(/i/eg_bg_04.gif);}
```

大多数背景都应用到 body 元素，不过并不仅限于此。

下面例子为一个段落应用了一个背景，而不会对文档的其他部分应用背景：

```
p.flower {background-image: url(/i/eg_bg_03.gif);}
```

可以为行内元素设置背景图像，下面的例子为一个链接设置了背景图像：

```
a.radio {background-image: url(/i/eg_bg_07.gif);}
```

理论上讲，甚至可以向 textareas 和 select 等替换元素的背景应用图像，不过并不是所有用户代理都能很好地处理这种情况。

**background-image 也不能继承**。**事实上，所有背景属性都不能继承。**

### 定义和用法

**提示：**请设置一种可用的背景颜色，这样的话，假如背景图像不可用，页面也可获得良好的视觉效果。

| 默认值：          | none                                            |
| :---------------- | ----------------------------------------------- |
| 继承性：          | no                                              |
| 版本：            | CSS1                                            |
| JavaScript 语法： | *object*.style.backgroundImage="url(stars.gif)" |

### 属性值

| 值           | 描述                                               |
| :----------- | :------------------------------------------------- |
| url('*URL*') | 指向图像的路径。                                   |
| none         | 默认值。不显示背景图像。                           |
| inherit      | 规定应该从父元素继承 background-image 属性的设置。 |



[返回目录](#CSS背景)

------



## 背景重复：`background-repeat`

如果需要在页面上对背景图像进行平铺，可以使用 `background-repeat` 属性

属性值 repeat 导致图像在水平垂直方向上都平铺，就像以往背景图像的通常做法一样。`repeat-x` 和 `repeat-y` 分别导致图像只在水平或垂直方向上重复，`no-repeat` 则不允许图像在任何方向上平铺。

默认地，背景图像将从一个元素的左上角开始。请看下面的例子：

```
body
  { 
  background-image: url(/i/eg_bg_03.gif);
  background-repeat: repeat-y;
  }
```

### 定义和用法

| 默认值：          | repeat                                     |
| :---------------- | ------------------------------------------ |
| 继承性：          | no                                         |
| 版本：            | CSS1                                       |
| JavaScript 语法： | *object*.style.backgroundRepeat="repeat-y" |

**提示：**背景图像的位置是根据 background-position 属性设置的。如果未规定 background-position 属性，图像会被放置在元素的左上角。

### 属性值

| 值        | 描述                                                |
| :-------- | :-------------------------------------------------- |
| repeat    | 默认。背景图像将在垂直方向和水平方向重复。          |
| repeat-x  | 背景图像将在水平方向重复。                          |
| repeat-y  | 背景图像将在垂直方向重复。                          |
| no-repeat | 背景图像将仅显示一次。                              |
| inherit   | 规定应该从父元素继承 background-repeat 属性的设置。 |



[返回目录](#CSS背景)

------



## 背景定位：`background-position`

可以利用 `background-position` 属性改变图像在背景中的位置

下面的例子在 body 元素中将一个背景图像居中放置：

```
body
  { 
    background-image:url('/i/eg_bg_03.gif');
    background-repeat:no-repeat;
    background-position:center;
  }
```

为 `background-position` 属性提供值有很多方法。首先，可以使用一些关键字：**top、bottom、left、right 和 center**。还可以使用长度值，如 100px 或 5cm，最后也可以使用百分数值。不同类型的值对于背景图像的放置稍有差异。

**关键字**

**根据规范，位置关键字可以按任何顺序出现，只要保证不超过两个关键字 - 一个对应水平方向，另一个对应垂直方向。**

**如果只出现一个关键字，则认为另一个关键字是 center。**

所以，如果希望每个段落的中部上方出现一个图像，只需声明如下：

```
p
  { 
    background-image:url('bgimg.gif');
    background-repeat:no-repeat;
    background-position:top;
  }
```

下面是等价的位置关键字：

| 单一关键字 | 等价的关键字                   |
| :--------- | :----------------------------- |
| center     | center center                  |
| top        | top center 或 center top       |
| bottom     | bottom center 或 center bottom |
| right      | right center 或 center right   |
| left       | left center 或 center left     |

**百分数值**

百分数值的表现方式更为复杂。用百分数值将图像在其元素中居中：

```
body
  { 
    background-image:url('/i/eg_bg_03.gif');
    background-repeat:no-repeat;
    background-position:50% 50%;
  }
```

这会导致图像适当放置，其中心与其元素的中心对齐。**换句话说，百分数值同时应用于元素和图像。**也就是说，**图像中描述为 50% 50% 的点（中心点）与元素中描述为 50% 50% 的点（中心点）对齐。**

如果图像位于 0% 0%，其左上角将放在元素内边距区的左上角。如果图像位置是 100% 100%，会使图像的右下角放在右边距的右下角。

因此，如果你想把一个图像放在水平方向 2/3、垂直方向 1/3 处，可以这样声明：

```
body
  { 
    background-image:url('/i/eg_bg_03.gif');
    background-repeat:no-repeat;
    background-position:66% 33%;
  }
```

如果只提供一个百分数值，所提供的这个值将用作水平值，垂直值将假设为 50%。这一点与关键字类似。

background-position 的默认值是 0% 0%，在功能上相当于 top left。这就解释了背景图像为什么总是从元素内边距区的左上角开始平铺，除非您设置了不同的位置值。

**长度值**

长度值解释的是元素内边距区左上角的偏移。**偏移点是图像的左上角。**

比如，如果设置值为 50px 100px，图像的左上角将在元素内边距区左上角向右 50 像素、向下 100 像素的位置上：

```
body
  { 
    background-image:url('/i/eg_bg_03.gif');
    background-repeat:no-repeat;
    background-position:50px 100px;
  }
```

注意，这一点与百分数值不同，因为偏移只是从一个左上角到另一个左上角。也就是说，**图像的左上角与 background-position 声明中的指定的点对齐**。

### 定义和用法

| 默认值：          | 0% 0%                                      |
| :---------------- | ------------------------------------------ |
| 继承性：          | no                                         |
| 版本：            | CSS1                                       |
| JavaScript 语法： | *object*.style.backgroundPosition="center" |

### 属性值

| 值                                                           | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| top left<br/>top center<br/>top right<br/>center left<br/>center center<br/>center right<br/>bottom  left<br/>bottom center<br/>bottom right | 如果仅规定了一个关键词，那么第二个值将是"center"。<br/>默认值：0% 0%。 |
| x%      y%                                                   | 第一个值是水平位置，第二个值是垂直位置。<br/>左上角是 0% 0%。右下角是 100% 100%。如果您仅规定了一个值，另一个值将是 50%。 |
| xpos    ypos                                                 | 第一个值是水平位置，第二个值是垂直位置。左上角是 0 0。<br/>单位是像素 (0px 0px) 或任何其他的 CSS 单位。<br/>如果仅规定了一个值，另一个值将是50%。<br/>可以混合使用 % 和 position 值。 |



[返回目录](#CSS背景)

------



## 背景关联：`background-attachment`

**如果文档比较长，那么当文档向下滚动时，背景图像也会随之滚动。当文档滚动到超过图像的位置时，图像就会消失。**

您可以通过 `background-attachment` 属性防止这种滚动。通过这个属性，可以声明图像相对于可视区是固定的（fixed），因此不会受到滚动的影响：

```
body 
  {
  background-image:url(/i/eg_bg_02.gif);
  background-repeat:no-repeat;
  background-attachment:fixed
  }
```

**background-attachment 属性的默认值是 scroll，也就是说，在默认的情况下，背景会随文档滚动**

### 定义和用法

`background-attachment` 属性设置背景图像是否固定或者随着页面的其余部分滚动。

| 默认值：          | scroll                                      |
| :---------------- | ------------------------------------------- |
| 继承性：          | no                                          |
| 版本：            | CSS1                                        |
| JavaScript 语法： | *object*.style.backgroundAttachment="fixed" |

### 属性值

| 值      | 描述                                                    |
| :------ | :------------------------------------------------------ |
| scroll  | 默认值。背景图像会随着页面其余部分的滚动而移动。        |
| fixed   | 当页面的其余部分滚动时，背景图像不会移动。              |
| inherit | 规定应该从父元素继承 background-attachment 属性的设置。 |



[返回目录](#CSS背景)

------



## CSS3 背景图片的尺寸：`background-size` 

### 定义和用法

**`background-size` 属性**规定背景图片的尺寸。

在 CSS3 之前，背景图片的尺寸是由图片的实际尺寸决定的。在 CSS3 中，可以规定背景图片的尺寸。

能够以像素或百分比规定尺寸。如果以百分比规定尺寸，那么尺寸相对于父元素的宽度和高度。

| 默认值：          | auto                                      |
| :---------------- | ----------------------------------------- |
| 继承性：          | no                                        |
| 版本：            | CSS3                                      |
| JavaScript 语法： | *object*.style.backgroundSize="60px 80px" |

**语法**

```
background-size: length|percentage|cover|contain;
```

### 属性值

| 值           | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| *length*     | 设置背景图像的高度和宽度。第一个值设置宽度，第二个值设置高度。如果只设置一个值，则第二个值会被设置为 "auto"。 |
| *percentage* | 以父元素的百分比来设置背景图像的宽度和高度。第一个值设置宽度，第二个值设置高度。如果只设置一个值，则第二个值会被设置为 "auto"。 |
| cover        | 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。背景图像的某些部分也许无法显示在背景定位区域中。 |
| contain      | 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。 |



[返回目录](#CSS背景)

------



## CSS3 背景图片的定位区域：`background-origin` 

### 定义和用法

**`background-origin` 属性**规定背景图片的定位区域。

背景图片可以放置于 `content-box`、`padding-box` 或 `border-box` 区域。

![背景图片的定位区域](..\..\image\background-origin.gif)

**注释：**如果背景图像的 `background-attachment` 属性为 "fixed"，则该属性没有效果。

| 默认值：          | padding-box                                   |
| :---------------- | --------------------------------------------- |
| 继承性：          | no                                            |
| 版本：            | CSS3                                          |
| JavaScript 语法： | *object*.style.backgroundOrigin="content-box" |

**语法**

background-origin: padding-box|border-box|content-box;

### 属性值

| 值          | 描述                           |
| :---------- | :----------------------------- |
| padding-box | 背景图像相对于内边距框来定位。 |
| border-box  | 背景图像相对于边框盒来定位。   |
| content-box | 背景图像相对于内容框来定位。   |



[返回目录](#CSS背景)

------



## CSS3 背景的绘制区域：`background-clip`

### 定义和用法

**`background-clip` 属性**规定背景的绘制区域。

| 默认值：          | border-box                                  |
| :---------------- | ------------------------------------------- |
| 继承性：          | no                                          |
| 版本：            | CSS3                                        |
| JavaScript 语法： | *object*.style.backgroundClip="content-box" |

**语法**

background-clip: border-box|padding-box|content-box;

### 属性值

| 值          | 描述                   |
| :---------- | :--------------------- |
| border-box  | 背景被裁剪到边框盒。   |
| padding-box | 背景被裁剪到内边距框。 |
| content-box | 背景被裁剪到内容框。   |



[返回目录](#CSS背景)

------



## CSS3 多重背景图片

CSS3 允许为元素使用多个背景图像。

**实例**

为 body 元素设置两幅背景图片：

```
body
{ 
background-image:url(bg_flower.gif),url(bg_flower_2.gif);
}
```

**运行结果**

<img src="D:\基础\Web 前端\note\GR-ZYX.github\CSS\image\多背景.png" style="zoom:33%;" />



[返回目录](#CSS背景)

------

