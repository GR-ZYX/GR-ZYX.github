# CSS图像透明度

[TOC]

## 实例 1 - 创建透明图像

定义**透明效果**的 **`CSS3` 属性是 `opacity`**。

首先，展示如何通过 CSS 来创建透明图像。

常规图像：

![Peach Blossom](..\..\image\tulip_peach_blossom_w_s.jpg)

带有透明度的相同图像：

<img style="opacity:0.4;" src="..\..\image\tulip_peach_blossom_w_s.jpg" alt="Peach Blossom"  />

代码如下 ：

```
img{
	opacity:0.4;
	filter:alpha(opacity=40); /* 针对 IE8 以及更早的版本 */
}
```

IE9, Firefox, Chrome, Opera 和 Safari 使用属性 `opacity` 来设定透明度。`opacity` 属性能够设置的值从 0.0 到 1.0。**值越小，越透明。**

IE8 以及更早的版本使用滤镜 `filter:alpha(opacity=x)`。x 能够取的值从 0 到 100。**值越小，越透明。**



[返回目录](#CSS图像透明度)

------



## 实例 2 - 透明框中的文本

源码：

```
<!DOCTYPE html>
<html>
<head>
<style>

    div.background{
      width: 400px;
      height: 266px;
      background: url('/i/tulip_peach_blossom_w.jpg') no-repeat;
      border: 1px solid black;
    }

    div.transbox{
      width: 338px;
      height: 204px;
      margin:30px;
      background-color: #ffffff;
      border: 1px solid black;
      /* for IE */
      filter:alpha(opacity=60);
      /* CSS3 standard */
      opacity:0.6;
    }

    div.transbox p{
      margin: 30px 40px;
    }
    
</style>
</head>

<body>

    <div class="background">
        <div class="transbox">
            <p>
                This is some text that is placed in the transparent box.
                This is some text that is placed in the transparent box.
                This is some text that is placed in the transparent box.
                This is some text that is placed in the transparent box.
                This is some text that is placed in the transparent box.
            </p>
        </div>
    </div>

</body>
</html>
```

**运行结果：**

![](..\..\image\图像透明.png)



[返回目录](#CSS图像透明度)

------

