# CSS3 动画

[TOC]

## CSS3 动画属性

下面的表格列出了 `@keyframes` 规则和所有动画属性：

| 属性                                                         | 描述                                                         | CSS  |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :--- |
| [@keyframes](#规定动画：`@keyframes`)                        | 规定动画。                                                   | 3    |
| [animation](#动画属性简写：`animation`)                      | 所有动画属性的简写属性。                                     | 3    |
| [animation-name](#规定动画的名称：`animation-name`)          | 规定 @keyframes 动画的名称。                                 | 3    |
| [animation-duration](#规定动画时间：`animation-duration`)    | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。             | 3    |
| [animation-timing-function](#规定动画速度曲线：`animation-timing-function`) | 规定动画的速度曲线。默认是 "ease"。                          | 3    |
| [animation-fill-mode](#规定当动画不播放时应用样式：`animation-fill-mode`) | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 | 3    |
| [animation-delay](#规定动画延迟：`animation-delay `)         | 规定动画何时开始。默认是 0。                                 | 3    |
| [animation-iteration-count](#规定动画播放次数：`animation-iteration-count`) | 规定动画被播放的次数。默认是 1。                             | 3    |
| [animation-direction](#规定动画是否在下一周期逆向播放：`animation-direction`) | 规定动画是否在下一周期逆向地播放。默认是 "normal"。          | 3    |
| [animation-play-state](#规定动画是否运行或暂停：`animation--play-state`) | 规定动画是否正在运行或暂停。默认是 "running"。               | 3    |



[返回目录](#CSS3 动画)

------



## 规定动画：`@keyframes`

### 定义及使用说明

使用@keyframes规则，可以创建动画。

创建动画是通过逐步改变从一个CSS样式设定到另一个。

在动画过程中，可以更改CSS样式的设定多次。

指定的变化时发生时使用％，或关键字"from"和"to"，这是和0％到100％相同。

0％是开头动画，100％是当动画完成。

为了获得最佳的浏览器支持，应该始终定义为0％和100％的选择器。

**注意:** 使用`animation`属性来控制动画的外观，还使用选择器绑定动画。

------

**语法**

```
@keyframes animationname {keyframes-selector {css-styles;}}
```

### 属性值

| 值                 | 说明                                                         |
| :----------------- | :----------------------------------------------------------- |
| animationname      | 必需的。<br />定义animation的名称。                          |
| keyframes-selector | 必需的。<br />动画持续时间的百分比。<br />合法值：<br />0-100%<br />from (和0%相同) <br />to (和100%相同)<br />**注意：** 可以用一个动画keyframes-selectors。 |
| css-styles         | 必需的。<br />一个或多个合法的CSS样式属性                    |



[返回目录](#CSS3 动画)

------



## 动画属性简写：`animation`

### 定义及使用说明

| 默认值:          | none 0 ease 0 1 normal                        |
| :--------------- | --------------------------------------------- |
| 继承:            | no                                            |
| 版本:            | CSS3                                          |
| JavaScript 语法: | *object*.style.animation="mymove 5s infinite" |

**语法**

```
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```

### 属性值

| 值                                                           | 说明                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [animation-name](#规定动画的名称：`animation-name`)          | 指定要绑定到选择器的关键帧的名称                             |
| [animation-duration](#规定动画时间：`animation-duration`)    | 动画指定需要多少秒或毫秒完成                                 |
| [animation-timing-function](#规定动画速度曲线：`animation-timing-function`) | 设置动画将如何完成一个周期                                   |
| [animation-delay](#规定动画延迟：`animation-delay `)         | 设置动画在启动前的延迟间隔。                                 |
| [animation-iteration-count](#规定动画播放次数：`animation-iteration-count`) | 定义动画的播放次数。                                         |
| [animation-direction](#规定动画是否在下一周期逆向播放：`animation-direction`) | 指定是否应该轮流反向播放动画。                               |
| [animation-fill-mode](#规定当动画不播放时应用样式：`animation-fill-mode`) | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 |
| [animation-play-state](#规定动画是否运行或暂停：`animation--play-state`) | 指定动画是否正在运行或已暂停。                               |
| initial                                                      | 设置属性为其默认值。                                         |
| inherit                                                      | 从父元素继承属性。                                           |



[返回目录](#CSS3 动画)

------



## 规定动画的名称：`animation-name`

### 定义及使用说明

`animation-name` 属性为 `@keyframes` 动画指定名称。

| 默认值:          | none                                         |
| :--------------- | -------------------------------------------- |
| 继承:            | no                                           |
| 版本:            | CSS3                                         |
| JavaScript 语法: | *object* object.style.animationName="mymove" |

**语法**

```
animation-name: keyframename|none;
```

| 值           | 说明                                     |
| :----------- | :--------------------------------------- |
| keyframename | 指定要绑定到选择器的关键帧的名称         |
| none         | 指定有没有动画（可用于覆盖从级联的动画） |



[返回目录](#CSS3 动画)

------



## 规定动画时间：`animation-duration`

### 定义及使用说明

**`animation-duration`属性**定义动画完成一个周期需要多少秒或毫秒。

| 默认值:          | 0                                            |
| :--------------- | -------------------------------------------- |
| 继承:            | no                                           |
| 版本:            | CSS3                                         |
| JavaScript 语法: | *object* object.style.animationDuration="3s" |

**语法**

```
animation-duration: time;
```

| 值     | 说明                                                         |
| :----- | :----------------------------------------------------------- |
| *time* | 指定动画播放完成花费的时间。默认值为 0，意味着没有动画效果。 |



[返回目录](#CSS3 动画)

------



## 规定动画速度曲线：`animation-timing-function`

### 定义及使用说明

`animation-timing-function`指定动画将如何完成一个周期。

速度曲线定义动画从一套 CSS 样式变为另一套所用的时间。

速度曲线用于使变化更为平滑。

| 默认值:          | ease                                                   |
| :--------------- | ------------------------------------------------------ |
| 继承:            | no                                                     |
| 版本:            | CSS3                                                   |
| JavaScript 语法: | *object* object.style.animationTimingFunction="linear" |

**语法**

```
animation-timing-function: value;
```

`animation-timing-function`使用的数学函数，称为三次贝塞尔曲线，速度曲线。使用此函数，可以使用自己的值，或使用预先定义的值之一：

| 值                            | 描述                                                         |
| :---------------------------- | :----------------------------------------------------------- |
| linear                        | 动画从头到尾的速度是相同的。                                 |
| ease                          | 默认。动画以低速开始，然后加快，在结束前变慢。               |
| ease-in                       | 动画以低速开始。                                             |
| ease-out                      | 动画以低速结束。                                             |
| ease-in-out                   | 动画以低速开始和结束。                                       |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。 |



[返回目录](#CSS3 动画)

------



## 规定动画延迟：`animation-delay `

### 定义及使用说明

**`animation-delay` 属性**定义动画什么时候开始。

`animation-delay` 值单位可以是秒（s）或毫秒（ms）。

**提示:** 允许负值，-2s 使动画马上开始，但跳过 2 秒进入动画。

| 默认值:          | 0                                         |
| :--------------- | ----------------------------------------- |
| 继承:            | no                                        |
| 版本:            | CSS3                                      |
| JavaScript 语法: | *object* object.style.animationDelay="2s" |

**语法**

```
animation-delay: time;
```

| 值     | 描述                                                    |
| :----- | :------------------------------------------------------ |
| *time* | 可选。定义动画开始前等待的时间，以秒或毫秒计。默认值为0 |



[返回目录](#CSS3 动画)

------



## 规定动画播放次数：`animation-iteration-count`

### 定义及使用说明

**`animation-iteration-count`属性**定义动画应该播放多少次。

| 默认值:          | 1                                               |
| :--------------- | ----------------------------------------------- |
| 继承:            | no                                              |
| 版本:            | CSS3                                            |
| JavaScript 语法: | *object* object.style.animationIterationCount=3 |

**语法**

```
animation-iteration-count: value;
```

| 值       | 描述                             |
| :------- | :------------------------------- |
| *n*      | 一个数字，定义应该播放多少次动画 |
| infinite | 指定动画应该播放无限次（永远）   |



[返回目录](#CSS3 动画)

------



## 规定动画是否在下一周期逆向播放：`animation-direction`

### 定义和用法

**`animation-direction` 属性**定义是否循环交替反向播放动画。

**注意：**如果动画被设置为只播放一次，该属性将不起作用。

| 默认值：          | normal                                      |
| :---------------- | ------------------------------------------- |
| 继承：            | 否                                          |
| 可动画化：        | 否。                                        |
| 版本：            | CSS3                                        |
| JavaScript 语法： | *object*.style.animationDirection="reverse" |

**语法**

```
animation-direction: normal|reverse|alternate|alternate-reverse|initial|inherit;
```

### 属性值

| 值                | 描述                                                         |
| :---------------- | :----------------------------------------------------------- |
| normal            | 默认值。动画按正常播放。                                     |
| reverse           | 动画反向播放。                                               |
| alternate         | 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。 |
| alternate-reverse | 动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。 |
| initial           | 设置该属性为它的默认值。                                     |
| inherit           | 从父元素继承该属性。                                         |



[返回目录](#CSS3 动画)

------



## 规定当动画不播放时应用样式：`animation-fill-mode`

### 定义和用法

**`animation-fill-mode` 属性**规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。

默认情况下，CSS 动画在第一个关键帧播放完之前不会影响元素，在最后一个关键帧完成后停止影响元素。`animation-fill-mode` 属性可重写该行为。

| 默认值：          | none                                        |
| :---------------- | ------------------------------------------- |
| 继承：            | 否                                          |
| 可动画化：        | 否。                                        |
| 版本：            | CSS3                                        |
| JavaScript 语法： | *object*.style.animationFillMode="forwards" |

**语法**

```
animation-fill-mode: none|forwards|backwards|both|initial|inherit;
```

### 属性值

| 值        | 描述                                                         |
| :-------- | :----------------------------------------------------------- |
| none      | 默认值。动画在动画执行之前和之后不会应用任何样式到目标元素。 |
| forwards  | 在动画结束后（由 animation-iteration-count 决定），动画将应用该属性值。 |
| backwards | 动画将应用在 animation-delay 定义期间启动动画的第一次迭代的关键帧中定义的属性值。这些都是 from 关键帧中的值（当 animation-direction 为 "normal" 或 "alternate" 时）或 to 关键帧中的值（当 animation-direction 为 "reverse" 或 "alternate-reverse" 时）。 |
| both      | 动画遵循 forwards 和 backwards 的规则。也就是说，动画会在两个方向上扩展动画属性。 |
| initial   | 设置该属性为它的默认值。                                     |
| inherit   | 从父元素继承该属性。                                         |



[返回目录](#CSS3 动画)

------



## 规定动画是否运行或暂停：`animation--play-state`

### 定义及使用说明

**`animation--play-state`属性**指定动画是否正在运行或已暂停。

**注意：**在`JavaScript`中使用此属性在一个周期中暂停动画。

| 默认值:          | running                                           |
| :--------------- | ------------------------------------------------- |
| 继承:            | no                                                |
| 版本:            | CSS3                                              |
| JavaScript 语法: | *object* object.style.animationPlayState="paused" |

**语法**

```
animation-play-state: paused|running;
```

| 值      | 描述               |
| :------ | :----------------- |
| paused  | 指定暂停动画       |
| running | 指定正在运行的动画 |



[返回目录](#CSS3 动画)

------

