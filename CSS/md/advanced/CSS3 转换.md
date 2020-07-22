# CSS3 2D、3D转换

[TOC]

## 转换属性：`transform`

### 定义和用法

**浏览器支持**

​		Internet Explorer 10、Firefox、Opera 支持 transform 属性。

​		Internet Explorer 9 支持替代的 -ms-transform 属性（仅适用于 2D 转换）。

​		Safari 和 Chrome 支持替代的 -webkit-transform 属性（3D 和 2D 转换）。

​		Opera 只支持 2D 转换。

**`transform` 属性**向元素应用 **2D 或 3D** 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。

为了更好地理解 transform 属性，可查看这个[演示](https://www.w3school.com.cn/example/css3/demo_css3_transform.html)。

| 默认值：          | none                                    |
| :---------------- | --------------------------------------- |
| 继承性：          | no                                      |
| 版本：            | CSS3                                    |
| JavaScript 语法： | *object*.style.transform="rotate(7deg)" |

**语法**

```
transform: none|transform-functions;
```

### `Tnsform`方法

| 值                                                           | 描述                                    |
| :----------------------------------------------------------- | :-------------------------------------- |
| none                                                         | 定义不进行转换。                        |
| matrix(*n*,*n*,*n*,*n*,*n*,*n*)                              | 定义 2D 转换，使用六个值的矩阵。        |
| matrix3d(*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*) | 定义 3D 转换，使用 16 个值的 4x4 矩阵。 |
| translate(*x*,*y*)                                           | 定义 2D 转换。                          |
| translate3d(*x*,*y*,*z*)                                     | 定义 3D 转换。                          |
| translateX(*x*)                                              | 定义转换，只是用 X 轴的值。             |
| translateY(*y*)                                              | 定义转换，只是用 Y 轴的值。             |
| translateZ(*z*)                                              | 定义 3D 转换，只是用 Z 轴的值。         |
| scale(*x*,*y*)                                               | 定义 2D 缩放转换。                      |
| scale3d(*x*,*y*,*z*)                                         | 定义 3D 缩放转换。                      |
| scaleX(*x*)                                                  | 通过设置 X 轴的值来定义缩放转换。       |
| scaleY(*y*)                                                  | 通过设置 Y 轴的值来定义缩放转换。       |
| scaleZ(*z*)                                                  | 通过设置 Z 轴的值来定义 3D 缩放转换。   |
| rotate(*angle*)                                              | 定义 2D 旋转，在参数中规定角度。        |
| rotate3d(*x*,*y*,*z*,*angle*)                                | 定义 3D 旋转。                          |
| rotateX(*angle*)                                             | 定义沿着 X 轴的 3D 旋转。               |
| rotateY(*angle*)                                             | 定义沿着 Y 轴的 3D 旋转。               |
| rotateZ(*angle*)                                             | 定义沿着 Z 轴的 3D 旋转。               |
| skew(*x-angle*,*y-angle*)                                    | 定义沿着 X 和 Y 轴的 2D 倾斜转换。      |
| skewX(*angle*)                                               | 定义沿着 X 轴的 2D 倾斜转换。           |
| skewY(*angle*)                                               | 定义沿着 Y 轴的 2D 倾斜转换。           |
| perspective(*n*)                                             | 为 3D 转换元素定义透视视图。            |



[返回目录](#CSS3 2D、3D转换)

------



## 改变被转换元素的位置：`transform-origin `

### 定义和用法

**`transform-origin` 属性**允许您改变被转换元素的位置。

2D 转换元素能够改变元素 x 和 y 轴。3D 转换元素还能改变其 Z 轴。

为了更好地理解 `transform-origin` 属性，可查看这个[演示](https://www.w3school.com.cn/example/css3/demo_css3_transform-origin.html)。

Safari/Chrome 用户：为了更好地理解 `transform-origin` 属性用于 3D 转换的情况，可查看这个[演示](https://www.w3school.com.cn/example/css3/demo_css3_transform-origin_3D.html)。

**注释：**该属性必须与 [transform](#转换属性：`transform`) 属性一同使用。

**浏览器支持**

​		Internet Explorer 10、Firefox、Opera 支持 `transform-origin` 属性。

​		Internet Explorer 9 支持替代的 `-ms-transform-origin` 属性（仅适用于 2D 转换）。

​		Safari 和 Chrome 支持替代的 `-webkit-transform-origin` 属性（3D 和 2D 转换）。

​		Opera 只支持 2D 转换。

| 默认值：          | 50% 50% 0                                |
| :---------------- | ---------------------------------------- |
| 继承性：          | no                                       |
| 版本：            | CSS3                                     |
| JavaScript 语法： | *object*.style.transformOrigin="20% 40%" |

**语法**

```
transform-origin: x-axis y-axis z-axis;
```

### 属性值

| 值     | 描述                                                         |
| :----- | :----------------------------------------------------------- |
| x-axis | 定义视图被置于 X 轴的何处。<br />可能的值：<br />left<br />center<br />right<br />*length*<br />*%* |
| y-axis | 定义视图被置于 X 轴的何处。<br />可能的值：<br />left<br />center<br />right<br />*length*<br />*%* |
| z-axis | 定义视图被置于 Z 轴的何处。<br />可能的值：<br />*length*    |



[返回目录](#CSS3 2D、3D转换)

------



## 2D转换-元素移动：`translate()`

通过 **`translate()` 方法**，元素从其当前位置移动，根据给定的 `left`（x 坐标） 和 `top`（y 坐标） 位置参数：

**实例**

```
div{
    width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
}
div#div2{
    transform:translate(50px,100px);
    -ms-transform:translate(50px,100px); / IE 9 /
    -moz-transform:translate(50px,100px); / Firefox /
    -webkit-transform:translate(50px,100px); / Safari and Chrome /
    -o-transform:translate(50px,100px); / Opera /
}

<div>这是一个 div 元素。</div>

<div id="div2">这是一个 div 元素。</div>
```

**运行结果：**

<div style="width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;">这是一个 div 元素。</div>

<div id="div2" style="width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;transform:translate(50px,100px);
    -ms-transform:translate(50px,100px); / IE 9 /
    -moz-transform:translate(50px,100px); / Firefox /
    -webkit-transform:translate(50px,100px); / Safari and Chrome /
    -o-transform:translate(50px,100px); / Opera /">这是一个 div 元素。</div>








值 `translate(50px,100px)` 把元素从左侧移动 50 像素，从顶端移动 100 像素。



[返回目录](#CSS3 2D、3D转换)

------



## 2D转换-元素旋转：`rotate()` 

通过 **`rotate()` 方法**，元素**顺时针旋转**给定的角度。允许**负值，元素将逆时针旋转**。

**实例**

```
div{
    width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
}
div#div2{
    transform:rotate(30deg);
    -ms-transform:rotate(30deg); / IE 9 /
    -moz-transform:rotate(30deg); / Firefox /
    -webkit-transform:rotate(30deg); / Safari and Chrome /
    -o-transform:rotate(30deg); / Opera /
}

<div>这是一个 div 元素。</div>

<div id="div2">这是一个 div 元素。</div>
```

**运行结果**

<div style="width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;">这是一个 div 元素。</div>

<div id="div2" style="width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
    transform:rotate(30deg);
    -ms-transform:rotate(30deg); /* IE 9 */
    -moz-transform:rotate(30deg); /* Firefox */
    -webkit-transform:rotate(30deg); /* Safari and Chrome */
    -o-transform:rotate(30deg); /* Opera */">这是一个 div 元素。</div>



值 `rotate(30deg)` 把元素顺时针旋转 30 度。



[返回目录](#CSS3 2D、3D转换)

------



## 2D转换-改变元素尺寸：`scale() `

通过 **`scale()` 方法**，元素的尺寸会增加或减少，根据给定的宽度（X 轴）和高度（Y 轴）参数：

**实例**

```
div{
    width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
}
div#div2{
    margin-left:100px;
    transform:scale(2,2);
    -ms-transform:scale(2,2); / IE 9 /
    -moz-transform:scale(2,2); / Firefox /
    -webkit-transform:scale(2,2); / Safari and Chrome /
    -o-transform:scale(2,2); / Opera /
}

<div>这是一个 div 元素。</div>

<div id="div2">这是一个 div 元素。</div>
```

**运行结果：**

<div style="width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;">这是一个 div 元素。</div>
<div id="div2" style="width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
    margin-left:100px;
    transform:scale(2,2);
    -ms-transform:scale(2,2); /* IE 9 */
    -moz-transform:scale(2,2); /* Firefox */
    -webkit-transform:scale(2,2); /* Safari and Chrome */
    -o-transform:scale(2,2); /* Opera */">这是一个 div 元素。</div>



值 scale(2,2) 把宽度转换为原始尺寸的 2 倍，把高度转换为原始高度的 2 倍。    



[返回目录](#CSS3 2D、3D转换)

------



## 2D转换-元素围绕X、Y轴旋转：`skew() `

通过 **`skew()` 方法**，元素翻转给定的角度，根据**给定的水平线（X 轴）和垂直线（Y 轴）**参数：

**实例**

```
div{
    width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
}
div#div2{
    transform:skew(30deg,20deg);
    -ms-transform:skew(30deg,20deg); / IE 9 /
    -moz-transform:skew(30deg,20deg); / Firefox /
    -webkit-transform:skew(30deg,20deg); / Safari and Chrome /
    -o-transform:skew(30deg,20deg); / Opera /
}

<div>这是一个 div 元素。</div>

<div id="div2">这是一个 div 元素。</div>
```

**运行结果：**

<div style="width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;">这是一个 div 元素。</div>

<div id="div2" style="width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
    transform:skew(30deg,20deg);
    -ms-transform:skew(30deg,20deg); / IE 9 /
    -moz-transform:skew(30deg,20deg); / Firefox /
    -webkit-transform:skew(30deg,20deg); / Safari and Chrome /
    -o-transform:skew(30deg,20deg); / Opera /">这是一个 div 元素。</div>



值 `skew(30deg,20deg)` 围绕 X 轴把元素翻转 30 度，围绕 Y 轴翻转 20 度。



[返回目录](#CSS3 2D、3D转换)

------



## 2D转换-方法简写：`matrix() `

**`matrix()` 方法**把所有 2D 转换方法组合在一起。

**`matrix()` 方法**需要六个参数，包含数学函数，允许：旋转、缩放、移动以及倾斜元素。

**实例**

如何使用 `matrix` 方法将 `div` 元素旋转 30 度：

```
div{
    width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
}
div#div2{
    transform:matrix(0.866,0.5,-0.5,0.866,0,0);
    -ms-transform:matrix(0.866,0.5,-0.5,0.866,0,0); / IE 9 /
    -moz-transform:matrix(0.866,0.5,-0.5,0.866,0,0); / Firefox /
    -webkit-transform:matrix(0.866,0.5,-0.5,0.866,0,0); / Safari and Chrome /
    -o-transform:matrix(0.866,0.5,-0.5,0.866,0,0); / Opera /
}

<div>这是一个 div 元素。</div>

<div id="div2">这是一个 div 元素。</div>
```

**运行结果：**

<div style="width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;">这是一个 div 元素。</div>

<div id="div2" style="width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
    transform:matrix(0.866,0.5,-0.5,0.866,0,0);
    -ms-transform:matrix(0.866,0.5,-0.5,0.866,0,0); / IE 9 /
    -moz-transform:matrix(0.866,0.5,-0.5,0.866,0,0); / Firefox /
    -webkit-transform:matrix(0.866,0.5,-0.5,0.866,0,0); / Safari and Chrome /
    -o-transform:matrix(0.866,0.5,-0.5,0.866,0,0); / Opera /">这是一个 div 元素。</div>



[返回目录](#CSS3 2D、3D转换)

------



## 2D `Transform` 方法

| 函数                            | 描述                                     |
| :------------------------------ | :--------------------------------------- |
| matrix(*n*,*n*,*n*,*n*,*n*,*n*) | 定义 2D 转换，使用六个值的矩阵。         |
| translate(*x*,*y*)              | 定义 2D 转换，沿着 X 和 Y 轴移动元素。   |
| translateX(*n*)                 | 定义 2D 转换，沿着 X 轴移动元素。        |
| translateY(*n*)                 | 定义 2D 转换，沿着 Y 轴移动元素。        |
| scale(*x*,*y*)                  | 定义 2D 缩放转换，改变元素的宽度和高度。 |
| scaleX(*n*)                     | 定义 2D 缩放转换，改变元素的宽度。       |
| scaleY(*n*)                     | 定义 2D 缩放转换，改变元素的高度。       |
| rotate(*angle*)                 | 定义 2D 旋转，在参数中规定角度。         |
| skew(*x-angle*,*y-angle*)       | 定义 2D 倾斜转换，沿着 X 和 Y 轴。       |
| skewX(*angle*)                  | 定义 2D 倾斜转换，沿着 X 轴。            |
| skewY(*angle*)                  | 定义 2D 倾斜转换，沿着 Y 轴。            |



[返回目录](#CSS3 2D、3D转换)

------

## ——————————————————————————



## 3D旋转-元素围绕其 X 轴旋转：`rotateX()`

通过 `rotateX()` 方法，元素围绕其 X 轴以给定的度数进行旋转。

**实例**

```
div{
    width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
}
div#div2{
    transform:rotateX(120deg);
    -webkit-transform:rotateX(120deg); / Safari and Chrome /
    -moz-transform:rotateX(120deg); / Firefox /
}

<div>这是一个 div 元素。</div>

<div id="div2">这是一个 div 元素。</div>
```

**运行结果：**

<div style=" width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;">这是一个 div 元素。</div>

<div id="div2" style=" width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
    transform:rotateX(120deg);
    -webkit-transform:rotateX(120deg); /* Safari and Chrome */
    -moz-transform:rotateX(120deg); /* Firefox */">这是一个 div 元素。</div>



[返回目录](#CSS3 2D、3D转换)

------



## 3D旋转-元素围绕其 Y轴旋转：`rotateY()`

通过 **`rotateY()` 方法**，元素围绕其 Y 轴以给定的度数进行旋转。

**实例**

```
div{
    width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
}
div#div2{
    transform:rotateY(120deg);
    -webkit-transform:rotateY(120deg); / Safari and Chrome /
    -moz-transform:rotateY(120deg); / Firefox /
}

<div>这是一个 div 元素。</div>

<div id="div2">这是一个 div 元素。</div>
```

**运行结果：**

<div style=" width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;">这是一个 div 元素。</div>

<div id="div2" style=" width:100px;
    height:75px;
    background-color:yellow;
    border:1px solid black;
    transform:rotateY(120deg);
    -webkit-transform:rotateY(120deg); / Safari and Chrome /
    -moz-transform:rotateY(120deg); / Firefox /">这是一个 div 元素。</div>



[返回目录](#CSS3 2D、3D转换)

------



## 3D空间中被嵌套元素的呈现：`transform-style`

### 定义和用法

**`transform-style` 属性**规定如何在 3D 空间中呈现被嵌套的元素。

**浏览器支持**

​	Firefox 支持 `transform-style` 属性。

​	Chrome、Safari 和 Opera 支持替代的 `-webkit-transform-style` 属性。

**注释：**该属性必须与 [transform](#转换属性：`transform`) 属性一同使用。

| 默认值：          | flat                                        |
| :---------------- | ------------------------------------------- |
| 继承性：          | no                                          |
| 版本：            | CSS3                                        |
| JavaScript 语法： | *object*.style.transformStyle="preserve-3d" |

**语法**

```
transform-style: flat|preserve-3d;
```

### 属性值

| 值          | 描述                       |
| :---------- | :------------------------- |
| flat        | 子元素将不保留其 3D 位置。 |
| preserve-3d | 子元素将保留其 3D 位置。   |



[返回目录](#CSS3 2D、3D转换)

------



## 3D元素距视图的距离：`perspective `

### 定义和用法

**`perspective` 属性**定义 3D 元素距视图的距离，以像素计。该属性允许改变 3D 元素查看 3D 元素的视图。

当为元素定义 `perspective` 属性时，其子元素会获得透视效果，而不是元素本身。

**注释：**`perspective` 属性只影响 3D 转换元素。

**浏览器支持**

​	目前浏览器都不支持 perspective 属性。

​	Chrome 和 Safari 支持替代的 `-webkit-perspective` 属性。

**提示：**请与 [perspective-origin](#3D元素的底部位置： `perspective-origin`) 属性一同使用该属性，这样就能够改变 3D 元素的底部位置。

| 默认值：          | none                           |
| :---------------- | ------------------------------ |
| 继承性：          | yes                            |
| 版本：            | CSS3                           |
| JavaScript 语法： | *object*.style.perspective=500 |

**语法**

```
perspective: number|none;
```

### 属性值

| 值       | 描述                            |
| :------- | :------------------------------ |
| *number* | 元素距离视图的距离，以像素计。  |
| none     | 默认值。与 0 相同。不设置透视。 |



[返回目录](#CSS3 2D、3D转换)

------



## 3D元素的底部位置： `perspective-origin`

### 定义和用法

`perspective-origin` 属性定义 3D 元素所基于的 X 轴和 Y 轴。该属性允许您改变 3D 元素的底部位置。

当为元素定义 `perspective-origin` 属性时，其子元素会获得透视效果，而不是元素本身。

**注释：**该属性必须与 [perspective](#3D元素距视图的距离：`perspective `) 属性一同使用，而且只影响 3D 转换元素。

**浏览器支持**

​		目前浏览器都不支持 `perspective-origin` 属性。

​		Chrome 和 Safari 支持替代的 `-webkit-perspecitve-origin` 属性。

| 默认值：          | 50% 50%                                    |
| :---------------- | ------------------------------------------ |
| 继承性：          | no                                         |
| 版本：            | CSS3                                       |
| JavaScript 语法： | *object*.style.perspectiveOrigin="10% 10%" |

**语法**

```
perspective-origin: x-axis y-axis;
```

### 属性值

| 值       | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| *x-axis* | 定义该视图在 x 轴上的位置。默认值：50%。<br/>可能的值：<br/>left<br/>center<br/>right<br/>*length*<br/>%* |
| *y-axis* | 定义该视图在 y 轴上的位置。默认值：50%。<br/>可能的值：<br/>top<br/>center<br/>bottom<br/>*length*<br/>% |



[返回目录](#CSS3 2D、3D转换)

------



## 设置元素不面向屏幕时是否可见：`backface-visibility`

### 定义和用法

**`backface-visibility` 属性**定义当元素不面向屏幕时是否可见。

如果在旋转元素不希望看到其背面时，该属性很有用。

**浏览器支持**

​		只有 Internet Explorer 10+ 和 Firefox 支持 `backface-visibility` 属性。

​		Opera 15+、Safari 和 Chrome 支持替代的 `-webkit-backface-visibility` 属性。

| 默认值：          | visible                                    |
| :---------------- | ------------------------------------------ |
| 继承性：          | no                                         |
| 版本：            | CSS3                                       |
| JavaScript 语法： | *object*.style.backfaceVisibility="hidden" |

**语法**

```
backface-visibility: visible|hidden;
```

### 属性值

| 值      | 描述             |
| :------ | :--------------- |
| visible | 背面是可见的。   |
| hidden  | 背面是不可见的。 |



[返回目录](#CSS3 2D、3D转换)

------



## 3D Transform 方法

| 函数                                                         | 描述                                      |
| :----------------------------------------------------------- | :---------------------------------------- |
| matrix3d(*n*,*n*,*n*,*n*,*n*,*n*, *n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*) | 定义 3D 转换，使用 16 个值的 4x4 矩阵。   |
| translate3d(*x*,*y*,*z*)                                     | 定义 3D 转化。                            |
| translateX(*x*)                                              | 定义 3D 转化，仅使用用于 X 轴的值。       |
| translateY(*y*)                                              | 定义 3D 转化，仅使用用于 Y 轴的值。       |
| translateZ(*z*)                                              | 定义 3D 转化，仅使用用于 Z 轴的值。       |
| scale3d(*x*,*y*,*z*)                                         | 定义 3D 缩放转换。                        |
| scaleX(*x*)                                                  | 定义 3D 缩放转换，通过给定一个 X 轴的值。 |
| scaleY(*y*)                                                  | 定义 3D 缩放转换，通过给定一个 Y 轴的值。 |
| scaleZ(*z*)                                                  | 定义 3D 缩放转换，通过给定一个 Z 轴的值。 |
| rotate3d(*x*,*y*,*z*,*angle*)                                | 定义 3D 旋转。                            |
| rotateX(*angle*)                                             | 定义沿 X 轴的 3D 旋转。                   |
| rotateY(*angle*)                                             | 定义沿 Y 轴的 3D 旋转。                   |
| rotateZ(*angle*)                                             | 定义沿 Z 轴的 3D 旋转。                   |
| perspective(*n*)                                             | 定义 3D 转换元素的透视视图。              |



[返回目录](#CSS3 2D、3D转换)

------

