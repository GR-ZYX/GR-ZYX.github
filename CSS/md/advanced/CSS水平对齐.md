# CSS水平对齐

[TOC]



## 对齐块元素

块元素指的是占据全部可用宽度的元素，并且在其前后都会换行。

块元素的例子：

```
<h1>
<p>
<div>
```



[返回目录](#CSS水平对齐)

------



## 水平对齐：`margin` 

### 定义和使用

**可通过将左和右外边距设置为 "auto"，来对齐块元素。**

**注释：**除非已经声明了 !DOCTYPE，否则使用 margin:auto 在 IE8 以及更早的版本中是无效的。

把左和右外边距设置为 auto，规定的是均等地分配可用的外边距。结果就是居中的元素：

### 示例

```
.center
{
margin-left:auto;
margin-right:auto;
width:70%;
}
```

**提示：如果宽度是 100%，则对齐没有效果。**



[返回目录](#CSS水平对齐)

------



## 左、右对齐： ` position:absolute` 

**对齐元素的方法之一是使用绝对定位：**

### 示例

```
.right{
    position:absolute;
    right:0px;
    width:300px;
}
```

[运行结果](https://www.w3school.com.cn/tiy/t.asp?f=css_align_position)

**注释：**绝对定位元素会被从正常流中删除，并且能够交叠元素。



[返回目录](#CSS水平对齐)

------



## 左、右对齐：`float` 

对齐元素的另一种方法是使用 float 属性：

### 示例

```
.right{
    float:right;
    width:300px;
}
```



[返回目录](#CSS水平对齐)

------

