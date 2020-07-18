# CSS子元素选择器

[TOC]

**与后代选择器相比，子元素选择器（`Child selectors`）只能选择作为某元素子元素的元素。**



## 选择子元素

如果不希望选择任意的后代元素，而是希望缩小范围，只选择某个元素的子元素，请使用子元素选择器（`Child selector`）。

例如，如果希望选择只作为 h1 元素子元素的 strong 元素，可以这样写：

```
h1 > strong {color:red;}
```

这个规则会把**第一个 h1 下面的两个 strong 元素变为红色，但是第二个 h1 中的 strong 不受影响**：

```
<h1>This is 
	<strong>very</strong> 
	<strong>very</strong> 
	important.
</h1>
<h1>This is 
	<em>really 
		<strong>very</strong>
	</em> 
	important.
</h1>
```



[返回目录](#CSS子元素选择器)

------



## 语法解释

子选择器使用了大于号（子结合符）。

子结合符两边可以有空白符，这是可选的。因此，以下写法都没有问题：

```
h1 > strong
h1> strong
h1 >strong
h1>strong
```



[返回目录](#CSS子元素选择器)

------



## 结合后代选择器和子选择器

```
table.company td > p
```

上面的选择器会选择作为 `td` 元素子元素的所有 `p` 元素，这个 `td` 元素本身从 `table` 元素继承，该 `table` 元素有一个包含 `company` 的 `class` 属性。



[返回目录](#CSS子元素选择器)

------

