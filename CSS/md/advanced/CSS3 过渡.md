# CSS3 过渡

[TOC]

## 过渡属性：`transition`

### 定义和用法

transition 属性是一个简写属性，用于设置四个过渡属性：

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

**注释：**始终设置 [transition-duration](#过渡效果时间：`transition-duration` ) 属性，否则时长为 0，就不会产生过渡效果。

**浏览器支持**

​		Internet Explorer 10、Firefox、Opera 和 Chrome 支持 `transition` 属性。

​		Safari 支持替代的 `-webkit-transition` 属性。

**注释：**Internet Explorer 9 以及更早版本的浏览器不支持 `transition` 属性。

| 默认值：          | all 0 ease 0                         |
| :---------------- | ------------------------------------ |
| 继承性：          | no                                   |
| 版本：            | CSS3                                 |
| JavaScript 语法： | *object*.style.transition="width 2s" |

**语法**

```
transition: property duration timing-function delay;
```

### 属性值

| 值                                                           | 描述                                |
| :----------------------------------------------------------- | :---------------------------------- |
| [transition-property](#过渡效果的 CSS 属性名：`transition-property`) | 规定设置过渡效果的 CSS 属性的名称。 |
| [transition-duration](#过渡效果时间：`transition-duration`)  | 规定完成过渡效果需要多少秒或毫秒。  |
| [transition-timing-function](#过渡效果的速度曲线：`transition-timing-function`) | 规定速度效果的速度曲线。            |
| [transition-delay](https://www.w3school.com.cn/cssref/pr_transition-delay.asp) | 定义过渡效果何时开始。              |

[返回目录](#CSS3 过渡)



------



## 过渡效果时间：`transition-duration` 

### 定义和用法

**`transition-duration` 属性**规定完成过渡效果需要花费的时间（以秒或毫秒计）。

**浏览器支持**

​		Internet Explorer 10、Firefox、Opera 和 Chrome 支持 `transition-duration` 属性。

​		Safari 支持替代的 `-webkit-transition-duration` 属性。

**注释：**Internet Explorer 9 以及更早版本的浏览器不支持 `transition-duration` 属性。

| 默认值：          | 0                                      |
| :---------------- | -------------------------------------- |
| 继承性：          | no                                     |
| 版本：            | CSS3                                   |
| JavaScript 语法： | *object*.style.transitionDuration="5s" |

**语法**

```
transition-duration: time;
```

### 属性值

| 值     | 描述                                                         |
| :----- | :----------------------------------------------------------- |
| *time* | 规定完成过渡效果需要花费的时间（以秒或毫秒计）。默认值是 0，意味着不会有效果。 |



[返回目录](#CSS3 过渡)

------



## 过渡效果的 CSS 属性名：`transition-property`

### 定义和用法

`transition-property` 属性规定应用过渡效果的 CSS 属性的名称。（当指定的 CSS 属性改变时，过渡效果将开始）。

**注释：**始终设置 [transition-duration](#过渡效果时间：`transition-duration`) 属性，否则时长为 0，就不会产生过渡效果。

**浏览器支持**

​		nternet Explorer 10、Firefox、Opera 和 Chrome 支持 `transition-property` 属性。

​		Safari 支持替代的 `-webkit-transition-property` 属性。

**注释：**Internet Explorer 9 以及更早版本的浏览器不支持 `transition-property` 属性。

| 默认值：          | all                                              |
| :---------------- | ------------------------------------------------ |
| 继承性：          | no                                               |
| 版本：            | CSS3                                             |
| JavaScript 语法： | *object*.style.transitionProperty="width,height" |

**语法**

```
transition-property: none|all|property;
```

### 属性值

| 值         | 描述                                                  |
| :--------- | :---------------------------------------------------- |
| none       | 没有属性会获得过渡效果。                              |
| all        | 所有属性都将获得过渡效果。                            |
| *property* | 定义应用过渡效果的 CSS 属性名称列表，列表以逗号分隔。 |



[返回目录](#CSS3 过渡)

------



## 过渡效果的速度曲线：`transition-timing-function`

### 定义和用法

**`transition-timing-function` 属性**规定过渡效果的速度曲线。

该属性允许过渡效果随着时间来改变其速度。

**浏览器支持**

​		Internet Explorer 10、Firefox、Opera 和 Chrome 支持 `transition-timing-function` 属性。

​		Safari 支持替代的 `-webkit-transition-timing-function` 属性。

**注释：**Internet Explorer 9 以及更早版本的浏览器不支持 `transition-timing-function` 属性。

| 默认值：          | ease                                             |
| :---------------- | ------------------------------------------------ |
| 继承性：          | no                                               |
| 版本：            | CSS3                                             |
| JavaScript 语法： | *object*.style.transitionTimingFunction="linear" |

**语法**

```
transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-
bezier(n,n,n,n);
```

### 属性值

| 值                            | 描述                                                         |
| :---------------------------- | :----------------------------------------------------------- |
| linear                        | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。 |
| ease                          | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。 |
| ease-in                       | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。  |
| ease-out                      | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。  |
| ease-in-out                   | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。 |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。 |



[返回目录](#CSS3 过渡)

------



## 过渡效果开始时间：`transition-delay`

### 定义和用法

`transition-delay` 属性规定过渡效果何时开始。

`transition-delay` 值以秒或毫秒计。

**浏览器支持**

Internet Explorer 10、Firefox、Opera 和 Chrome 支持 `transition-delay` 属性。

Safari 支持替代的 `-webkit-transition-delay` 属性。

**注释：**Internet Explorer 9 以及更早版本的浏览器不支持 `transition-delay` 属性。

| 默认值：          | 0                                   |
| :---------------- | ----------------------------------- |
| 继承性：          | no                                  |
| 版本：            | CSS3                                |
| JavaScript 语法： | *object*.style.transitionDelay="2s" |

**语法**

```
transition-delay: time;
```

### 属性值

| 值     | 描述                                                 |
| :----- | :--------------------------------------------------- |
| *time* | 规定在过渡效果开始之前需要等待的时间，以秒或毫秒计。 |



[返回目录](#CSS3 过渡)

------

