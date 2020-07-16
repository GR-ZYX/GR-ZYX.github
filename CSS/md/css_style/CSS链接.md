# CSS链接

[TOC]

## 设置链接的样式

能够设置链接样式的 CSS 属性有很多种（例如 color, font-family, background 等等）。

链接的特殊性在于能够根据它们所处的状态来设置它们的样式。

链接的四种状态：

- `a:link` - 普通的、未被访问的链接
- `a:visited` - 用户已访问的链接
- `a:hover` - 鼠标指针位于链接的上方
- `a:active` - 链接被点击的时刻

**当为链接的不同状态设置样式时**，按照以下次序规则：

- **`a:hover` 必须位于 `a:link` 和 `a:visited` 之后**
- **`a:active` 必须位于 `a:hover` 之后**

