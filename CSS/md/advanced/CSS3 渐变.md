# CSS3 渐变

[TOC]

<div style="height:150px;width:100%;background-color:#1fc8db;background-image:linear-gradient(141deg,#9fb8ad 0%,#1fc8db 51%,#2cb5e8 75%);color:white;opacity:0.95;text-align:center;margin:auto;color:#f3f3f3;font-size:30px;font-weight:550;">
渐变效果
</div>



## 渐变-定义和使用

CSS3 渐变（gradients）可以在两个或多个指定的颜色之间显示平稳的过渡。

CSS3 定义了两种类型的渐变（gradients）：

- **线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向**
- **径向渐变（Radial Gradients）- 由它们的中心定义**



[返回目录](#CSS3 渐变)

------



## 线性渐变：`background-image: linear-gradient()`

### 定义和使用

为了创建一个线性渐变，必须至少定义两种颜色节点。颜色节点即想要呈现平稳过渡的颜色。同时，也可以设置一个起点和一个方向（或一个角度）。

**线性渐变的实例：**

![线性渐变](..\..\image\gradient_linear.png)

**语法**

```
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```

| 值                             | 描述                               |
| :----------------------------- | :--------------------------------- |
| *direction*                    | 用角度值指定渐变的方向（或角度）。 |
| *color-stop1, color-stop2,...* | 用于指定渐变的起止颜色。           |



#### 线性渐变 - 从上到下（默认情况下）

下面的实例演示了**从上到下**的线性渐变。起点是红色，慢慢过渡到蓝色：

```
#grad {
    height:200px;
    background-image: linear-gradient(#e66465, #9198e5); 
}

<div class="grad"></div>
```

<div id="grad" style="height:200px;background-image: linear-gradient(#e66465, #9198e5);"></div>



#### 线性渐变 - 从左到右

下面的实例演示了**从左到右**的线性渐变。起点是红色，慢慢过渡到黄色：

```
#grad {
    height: 200px;
    background-image: linear-gradient(to right, red , yellow); 
}

<div class="grad"></div>
```

<div id="grad" style="height: 200px;  background-image: linear-gradient(to right, red , yellow); "></div>



#### 线性渐变 - 对角

可以通过指定水平和垂直的起始位置来制作一个对角渐变。

下面的实例演示了从左上角到右下角的线性渐变。起点是红色，慢慢过渡到黄色：

```
#grad {
    height: 200px;  
    background-image: linear-gradient(to bottom right, red, yellow); 
}

<div class="grad"></div>
```

<div class="grad" style="height: 200px;  
    background-image: linear-gradient(to bottom right, red, yellow);"></div>



### 使用角度

如果想要在渐变的方向上做更多的控制，可以定义一个角度，而不用预定义方向（`to bottom`、`to top`、`to right`、`to left`、`to bottom right`，等等）。

**语法**

```
background-image: linear-gradient(angle, color-stop1, color-stop2);
```

角度是指**水平线和渐变线**之间的角度，逆时针方向计算。换句话说，0deg 将创建一个从下到上的渐变，90deg 将创建一个从左到右的渐变。

<img src="..\..\image\7B0CC41A-86DC-4E1B-8A69-A410E6764B91.jpg" alt="img" style="zoom: 67%;" />

**但是很多浏览器（Chrome、Safari、firefox等）的使用了旧的标准**，即 0deg 将创建一个从左到右的渐变，90deg 将创建一个从下到上的渐变。换算公式 **90 - x = y** ，其中 x 为标准角度，y为非标准角度。

**实例**

带有指定的角度（`90deg`）的线性渐变：

```
#grad {  
	height: 200px;  
	background-image: linear-gradient(90deg, red, yellow); 
}

<div class="grad"></div>
```

<div class="grad" style="height: 200px;  
	background-image: linear-gradient(90deg, red, yellow);"></div>



### 使用多个颜色节点

下面的实例演示了如何设置多个颜色节点：

**实例**

带有多个颜色节点的从上到下的线性渐变：

```
#grad { 
	height: 200px; 
	background-image: linear-gradient(red, yellow, green); 
}

<div class="grad"></div>
```

<div class="grad" style="height: 200px; 
	background-image: linear-gradient(red, yellow, green);"></div>



下面的实例演示了如何创建一个带有彩虹颜色和文本的线性渐变：

```
#grad {  
	height: 200px; 
	/* 标准的语法 */  
	background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet); 
}

<div class="grad"></div>
```

<div class="grad" style="height: 200px; 
	/* 标准的语法 */  
	background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet);"></div>



### 使用透明度（transparent）

CSS3 渐变也支持透明度（transparent），可用于创建减弱变淡的效果。

为了添加透明度，我们使用 **`rgba()` 函数**来定义颜色节点。`rgba()` 函数中的最后一个参数可以是从 0 到 1 的值，它定义了颜色的透明度：0 表示完全透明，1 表示完全不透明。

`rgba()` 括号中前 3 个数字代表着 `red`、`green`、 `blue` 三种颜色的 rgb 值（0-255），最后一个是设定这个颜色的透明度即 alpha 值。

下面的实例演示了从左边开始的线性渐变。起点是完全透明，慢慢过渡到完全不透明的红色：

**实例**

```
#grad {  
	height: 200px; 
	background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)); 
}

<div class="grad"></div>
```

<div class="grad" style="height: 200px; 
	background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));"></div>



### 重复的线性渐变：`repeating-linear-gradient() `

**`repeating-linear-gradient()` 函数**用于重复线性渐变：

**语法**

```
background: repeating-linear-gradient(angle | to side-or-corner, color-stop1, color-stop2, ...);
```

| 值                             | 描述                                                         |
| :----------------------------- | :----------------------------------------------------------- |
| *angle*                        | 定义渐变的角度方向。从 0deg 到 360deg，默认为 180deg。       |
| *side-or-corner*               | 指定线性渐变的起始位置。由两个关键字组成：第一个为指定水平位置(left 或 right)，第二个为指定垂直位置（top 或bottom）。 顺序是随意的，每个关键字都是可选的。 |
| *color-stop1, color-stop2,...* | 指定渐变的起止颜色，由颜色值、停止位置（可选，使用百分比指定）组成。 |

#### 一个重复的线性渐变

```
#grad {  
    height: 200px;
    /* 标准的语法 */  
    background-image: repeating-linear-gradient(red, yellow 10%, orange 20%); 
}

<div class="grad"></div>
```

<div class="grad" style="height: 200px;
    /* 标准的语法 */  
    background-image: repeating-linear-gradient(red, yellow 10%, orange 20%); "></div>



[返回目录](#CSS3 渐变)

------



## CSS3 径向渐变：`background-image: radial-gradient()`

### 定义和使用

径向渐变由它的中心定义。

为了创建一个径向渐变，必须至少定义两种颜色节点。颜色节点即想要呈现平稳过渡的颜色。同时，可以指定渐变的中心、形状（圆形或椭圆形）、大小。默认情况下，渐变的中心是 `center`（表示在中心点），渐变的形状是 `ellipse`（表示椭圆形），渐变的大小是 `farthest-corner`（表示到最远的角落）。

**径向渐变的实例：**

![Radial gradient](..\..\image\gradient_radial.jpg)

**语法**

```
background-image: radial-gradient(shape size at position, start-color, ..., last-color);
```

| 值                             | 描述                                                         |
| :----------------------------- | :----------------------------------------------------------- |
| *shape*                        | 确定圆的类型:<br />ellipse (默认): 指定椭圆形的径向渐变。<br />circle ：指定圆形的径向渐变 |
| *size*                         | 定义渐变的大小，<br />可能值：<br />`farthest-corner` (默认) : 指定径向渐变的半径长度为从圆心到离圆心最远的角<br />`closest-side` ：指定径向渐变的半径长度为从圆心到离圆心最近的边<br />`closest-corner` ： 指定径向渐变的半径长度为从圆心到离圆心最近的角<br />`farthest-side` ：指定径向渐变的半径长度为从圆心到离圆心最远的边 |
| *position*                     | 定义渐变的位置。<br />可能值：<br />**center**（默认）：设置中间为径向渐变圆心的纵坐标值。<br />**top**：设置顶部为径向渐变圆心的纵坐标值。<br />**bottom**：设置底部为径向渐变圆心的纵坐标值。 |
| *start-color, ..., last-color* | 用于指定渐变的起止颜色。                                     |



#### 径向渐变 - 颜色节点均匀分布（默认情况下）

颜色节点均匀分布的径向渐变：

```
#grad1 {
    height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image: radial-gradient(red, yellow , orange); /* 标准的语法（必须放在最后） */
}

<div id="grad1"></div>
```

<div id="grad1" style="height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image: radial-gradient(red, yellow , orange); /* 标准的语法（必须放在最后） */"></div>

#### 径向渐变 - 颜色节点不均匀分布

颜色节点不均匀分布的径向渐变：

```
#grad1 {
    height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image: radial-gradient(red 5%, yellow 15%, orange 60%); /* 标准的语法（必须放在最后） */
}

<div id="grad1"></div>
```

<div id="grad1" style="height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image: radial-gradient(red 5%, yellow 15%, orange 60%); /* 标准的语法（必须放在最后） */"></div>

### 设置径向渐变形状

`shape` 参数定义了形状。它可以是值 `circle` 或 `ellipse`。其中，`circle` 表示圆形，`ellipse` 表示椭圆形。默认值是 `ellipse`。

形状为圆形的径向渐变：

```
#grad1 {
    height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image: radial-gradient(circle, red, yellow , orange); /* 标准的语法（必须放在最后） */
}

<div id="grad1"></div>
```

<div id="grad1" style="height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image: radial-gradient(circle, red, yellow , orange); /* 标准的语法（必须放在最后） */"></div>

### 设置径向渐变大小

size 参数定义了渐变的大小。它可以是以下四个值：

- `closest-side`
- `farthest-side`
- `closest-corner`
- `farthest-corner`

带有不同尺寸大小关键字的径向渐变：

```
#grad1 {
    height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image: radial-gradient(closest-side at 60% 55%, red, yellow , orange); /* 标准的语法（必须放在最后） */
}

<div id="grad1"></div>
```

<div id="grad1" style="height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image: radial-gradient(closest-side at 60% 55%, red, yellow , orange); /* 标准的语法（必须放在最后） */"></div>

```
#grad1 {
    height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image: radial-gradient(farthest-side at 60% 55%, red, yellow , orange); /* 标准的语法（必须放在最后） */
}

<div id="grad1"></div>
```

<div id="grad1" style="height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image: radial-gradient(farthest-side at 60% 55%, red, yellow , orange); /* 标准的语法（必须放在最后） */"></div>

### 重复的径向渐变：`repeating-radial-gradient()`

**`repeating-radial-gradient()` 函数**用于重复径向渐变：

**语法**

```
background: repeating-linear-gradient(angle | to side-or-corner, color-stop1, color-stop2, ...);
```

| 值                             | 描述                                                         |
| :----------------------------- | :----------------------------------------------------------- |
| *angle*                        | 定义渐变的角度方向。从 0deg 到 360deg，默认为 180deg。       |
| *side-or-corner*               | 指定线性渐变的起始位置。由两个关键字组成：第一个为指定水平位置(left 或 right)，第二个为指定垂直位置（top 或bottom）。 顺序是随意的，每个关键字都是可选的。 |
| *color-stop1, color-stop2,...* | 指定渐变的起止颜色，由颜色值、停止位置（可选，使用百分比指定）组成。 |

#### 一个重复的径向渐变

```
#grad1 {
    height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image:  repeating-radial-gradient(red, yellow 10%, orange 15%); ; /* 标准的语法（必须放在最后） */
}

<div id="grad1"></div>
```

<div id="grad1" style="height: 150px;
    width: 200px;
    background-color: red; /* 浏览器不支持的时候显示 */
    background-image:  repeating-radial-gradient(red, yellow 10%, orange 15%); ; /* 标准的语法（必须放在最后） "></div>



[返回目录](#CSS3 渐变)

------

