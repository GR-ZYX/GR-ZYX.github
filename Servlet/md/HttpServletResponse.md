# HttpServletResponse

[TOC]

可以使用**HttpServletResponse**来对浏览器进行响应。

在大部分情况下，使用 `setContentType()` 设置响应类型，使用 `getWriter()` 取得 **PrintWriter** 对象，而后使用 Printwriter 的`println()` 等方法输出HTML内容。

还可以进一步使用 `setHeader()` 、`addHeader()` 等方法进行响应标头的设置，或者使用 `sendRedirect()` 、`sendError()` 方法对浏览器要求重定向网页，或是传送错误状态信息。若必要，也可以使用 `getOutputStream()` 取得 **ServletOutputStream**，直接使用串流对象对浏览器进行字节数据的响应。



当一个 Web 服务器响应一个 HTTP 请求时，响应通常包括一个状态行、一些响应报头、一个空行和文档。一个典型的响应如下所示：

```
HTTP/1.1 200 OK
Content-Type: text/html
Header2: ...
...
HeaderN: ...
  (Blank Line)
<!doctype ...>
<html>
    <head>...</head>
    <body>
    ...
    </body>
</html>
```



## HTTP 1.1 响应报头

从 Web 服务器端返回到浏览器的最有用的 HTTP 1.1 响应报头：

| 头信息              | 描述                                                         |
| :------------------ | :----------------------------------------------------------- |
| Allow               | 这个头信息指定服务器支持的请求方法（GET、POST 等）。         |
| Cache-Control       | 这个头信息指定响应文档在何种情况下可以安全地缓存。可能的值有：**public、private** 或 **no-cache** 等。Public 意味着文档是可缓存，Private 意味着文档是单个用户私用文档，且只能存储在私有（非共享）缓存中，no-cache 意味着文档不应被缓存。 |
| Connection          | 这个头信息指示浏览器是否使用持久 HTTP 连接。值 **close** 指示浏览器不使用持久 HTTP 连接，值 **keep-alive** 意味着使用持久连接。 |
| Content-Disposition | 这个头信息可以让您请求浏览器要求用户以给定名称的文件把响应保存到磁盘。 |
| Content-Encoding    | 在传输过程中，这个头信息指定页面的编码方式。                 |
| Content-Language    | 这个头信息表示文档编写所使用的语言。例如，en、en-us、ru 等。 |
| Content-Length      | 这个头信息指示响应中的字节数。只有当浏览器使用持久（keep-alive）HTTP 连接时才需要这些信息。 |
| Content-Type        | 这个头信息提供了响应文档的 MIME（Multipurpose Internet Mail Extension）类型。 |
| Expires             | 这个头信息指定内容过期的时间，在这之后内容不再被缓存。       |
| Last-Modified       | 这个头信息指示文档的最后修改时间。然后，客户端可以缓存文件，并在以后的请求中通过 **If-Modified-Since** 请求头信息提供一个日期。 |
| Location            | 这个头信息应被包含在所有的带有状态码的响应中。在 300s 内，这会通知浏览器文档的地址。浏览器会自动重新连接到这个位置，并获取新的文档。 |
| Refresh             | 这个头信息指定浏览器应该如何尽快请求更新的页面。您可以指定页面刷新的秒数。 |
| Retry-After         | 这个头信息可以与 503（Service Unavailable 服务不可用）响应配合使用，这会告诉客户端多久就可以重复它的请求。 |
| Set-Cookie          | 这个头信息指定一个与页面关联的 cookie。                      |



[返回目录](#HttpServletResponse)

------



## 设置响应标头、缓冲区

### 设置响应标头 `setHeader()` 、`addHeader()` 

可以使用HttpServletResponse对象上的 `setHeader()` 、`addHeader()` 来设置响应标头。

`setHeader()` 设置标头名称与值。

`addHeader()` 则可以在同一个标头名称上附加值。

`setHeader()` 、`addHeader()` 方法接受字符串值。

- 如果标头的值是**整数**， 可以使用 `setIntHeader()` 、`addIntHeader()` 方法；

- 如果标头的值是个**日期**， 可以使用 `setDateHeader()` 、`addDateHeader()` 方法。

#### 设置状态代码

有些标头必须搭配HTTP状态代码(Status code) ，设定状态代码可以通过 **HttpServletResponse** 的 `setstatus()` 方法。

例如， 正常响应的HTTP状态代码为200 OK，可以通过 HttpServletResponse.SC_OK来设定， 如果想要重新定向(Redirect) 页面， 必须传送状态代码301 Moved Permanently 、 302 Found， 前者可以通过 HttpServletResponse.SC_MOVED_PERMANENTLY 取得， 后者建议通过 HttpServletResponse.SC_SC_FOUND， 或者是 HttpServletResponse.SC_MOVED_TEMPORARILY 取得。

#### 永久重定向

若某个资源也许永久性地移动至另一个网址，当浏览器请求原有网址时，必须要求浏览器重新定向至新网址，并要求未来链接时也应使用新网址的话(像是告诉搜索引擎网站搬家了，有利于搜索引擎优化)，可以如下撰写程序：

```
response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
response.addHeader("Location", "new_url");
```

#### 暂时重定向

如果资源只是暂时性搬移，或者是将来可能改变，仍希望客户端依旧使用现有地址来存取资源，不要快取资源之类的，可以使用暂时重定向：

```
response.setStatus(HttpServletResponse.SC_FOUND);
response.addHeader("Location", "temp_url");
```



所有的标头设置， 必须在响应确认之前(Commit) ，在响应确认之后设置的标头，会被容器忽略。

 注意：除了301、302之外， HTTP 1.1增加了 303 See Other与 307 Temporary Redirect 状态代码。



### 设置缓冲区

容器可以（但非必要）对响应进行缓冲，通常容器默认都会对响应进行缓冲。可以操作 HttpServletResponse 以下有关缓冲的几个方法：

- `getBufferSize()`
- `setBufferSize()`
- `isCommitted()`
- `reset()`
- `resetBuffer()`
- `flushBuffer()`

`setBufferSize()` 必须在调用 **HttpServletResponse** 的 `getWriter()` 或 `getOutputStream()` 方法之前调用，取得的 **writer** 或 **servletOutputStream** 才会套用这个设置。

注意：在调用 HttpServletResponse 的`getWriter()` 或 `getOutputStream()` 方法之后调用 setBufferSize() ，会抛出IllegalStateException。

#### 查看响应是否确认

在缓冲区未满之前，设置的响应相关内容不会真正传至浏览器，可以使用 `isCommitted()` 看看是否响应已确认。

#### 重置响应信息

如果想要**重置所有响应信息**， 可以调用 `reset()` 方法，这会**连同已设置的标头一并清除**。

调用 `resetBuffer()` 会**重置响应内容**， 但不会清除已设置的标头内容。

`flushBuffer()` 会清除 (flush) 所有缓冲区中已设置的响应信息至浏览器。

`reset()` 、`resetBuffer()` 必须在响应未确认前调用。

注意：在响应已确认后调用 `reset()` 、`resetBuffer()`  会抛出 IllegalStateException。



HttpServletResponse 对象若被容器关闭，则必须清除所有的响应内容，响应对象被关闭的时机点有以下几个：

- Servlet 的 service() 方法已结束。
- 响应的内容长度超过 HttpServletResponse 的 `setContentLength()` 所设置的长度。
- 调用了`sendRedirect()` 方法。
- 调用了`sendError()` 方法。

- 调用了AsyncContext的 `complete()` 方法。



[返回目录](#HttpServletResponse)

------



## 使用 get writer() 输出字符

如果要对浏览器输出 HTML，要通过 HttpServletResponse 的 `getWriter()` 取得 Printwriter 对象， 然后指定字符串进行输出。例如：

```
PrintWriter out = response.getWriter();
out.println("<html>");
out.println("<head>");
```



### 对 HttpServletResponse 输出编码处理

 在没有设置任何内容类型或编码之前，HttpServletResponse 使用的字符编码默认是 ISO-8859-1。

也就是说， 如果直接输出中文， 在浏览器上就会看到乱码。

#### 设置 Locale

浏览器如果有发送 Accept-Language 标头， 可以使用 HttpServletRequest 的 `getLocale()` 来取得一个 Locale 对象， 代表客户端可接受的语系。

可以使用 HttpServletResponse 的 `setLocale()` 来设置地区(Locale) 信息，地区信息包括了语系与编码信息。语系信息通常通过响应标头Content Language来设置， 而 `setLocale()` 也会设置HTTP响应的 Content-Language 标头。例如：

`response.setLocale(Locale.TAIWAN);`   

这会将HTTP响应的 Conten-Language 设置为 zh-TW， 作为浏览器处理响应编码时的参考依据。

#### 使用 setCharacterEncoding() 或 setContentType()

##### setCharacterEncoding()

至于响应的字符编码处理， 可以调用 HttpServletResponse 的 `setCharacgerEncoding()` 进行设定：

`   response.setCharacterEncoding("UTF-8");` 

可以在web.xml中设置默认的区域与编码对应。例如：

```
...
<locale-encad ing-mapping-list>
    <locale-encoding-mapping>
    	<locale>zh_TW</1ocale>
    	<encoding>UTF-B</encoding>
    </locale-encoding-mapping>
</locale-encoding-mapping-list>
...
```

设置好以上信息后， 若使用 `resp.setLocale(Locale.TAIWAN)` 或 `resp.setLocale(newLocale("zh"，“TW"))`，则 HttpServlet Response 的字符编码处理就采用UTF-8，调用 HttpServletResponse 的 `getCharacterEncoding()` 取得的结果就是UTF-8。

##### setContentType()

使用 HttpServletResponse 的 `setContentType()` 指定内容类型时，一并指定 **charset**，charset 的值会自动用来调用 `setCharacterEncoding()` 。

例如， 以下不仅设置内容类型为 text/html， 而且会自动调用 setCharacterEncoding() ，设置编码为UTF-8：

`resp.setContentType("text/html; charset = UTF-8");` 

如果使用 `setCharacterEncoding ()` 或 `setContentType()` 时指定了**charset**， 则 setLocale() 就会被忽略。

在Servlet 4.0中， 也可以在web.xml中加入`<response-character-encoding>`， 设定整个应用程序要使用的响应编码， 如此一来， 就不用特别在每次请求使用 HttpServletResponse 的 setCharacterEncoding() 方法来设定编码了， 例如：

```
<response-character-encoding>UTF-8</response-character-encoding>
```

提示：如果要接收中文请求参数并在响应时通过浏览器正确显示中文，必须**同时设置 HttpServletRequest 的 setCharacterEncoding() 以及 HttpServletResponse 的 setCharacterEncoding() 或 setContentType() 为正确的编码**，或者是在web.xml中设定`<request-character-encoding>` 与`<response-character-encoding>`。

##### 设置 content-type 响应标头指定 MIME 类型

因为浏览器需要知道如何处理响应， 所以必须告知内容类型， `setContentType()` 方法在响应中设置 content-type 响应标头， 只要指定 MIME(Multipurpose Inte met Mail Extensions) 类型就可以了。

由于编码设置与内容类型通常都要设置， 所以调用 `setContentType()` 设置内容类型时， 同时指定 charset 属性是个方便且常见的做法。

常见的 MIME 设置有 text/html、application/pdf、application/jar、application/x-zip、image/jpeg 等。

对于应用程序中使用到的MIME类型， 可以在web.xml中设置后缀与MIME类型对应。例如：

```
...
	<mime-mapping>
		<extension>pdf</extension>
		<mime-type>application/pdf</mime-type>
   </mime-mapping>
```

   `<extension>`设置文件的后缀， `<mime-type>`设置对应的MIME类型名称。

如果想要知道某个文件的 MIME 类型名称， 可以使用 ServletContext 的 `getMimeType()` 方法，这个方法可以指定文件名称， 然后根据web.xml中设置的后缀对应， 取得MIME类型名称。



[返回目录](#HttpServletResponse)

------



## 使用 getOutputStream() 输出二进制字符

若需要直接对浏览器进字符输出，这时可以使用 HttpServletResponse 的 `getOutputStream()` 方法取得 ServletOutputStream 实例， 它是 OutputStream 的子类。

以输出 PDF 文件举例：

```
response.setContentType("application/pdf"); // 设置内容类型
try(InputStream in = getServletContext().getResourceAsStream("/WEB-INF/jdbc.pdf"); // 取得输入串流
	OutputStream out = response.getOutputStream() // 取得输出串流){
		byte[] buffer = new byte[1024];
		int length = -1;
		while((length = in.read(buffer)) != -1){ // 读取PDF并输出
			out.write(buffer, 0, length);
		}
}
```

对浏览器输出二进制串流，浏览器必须知道如何正确处理收到的字节数据，因为对浏览器输出的是 PDF 文件，所以设置内容类型为application/pdf 。这样，若浏览器有外挂 PDF 阅读器，就会直接使用阅读器打开 PDF（对于不知如何处理的内容类型， 浏览器通常会出现另存为的提示）。



为了取得 Web 应用程序中的文件串流， 可以使用 HttpServle t的 **`getServletContext()`** 取得 ServletContext 对象， 这个对象代表了目前这个Web应用程序可以使用 servletContext 的 **`getResourceAsStream()`** 方法以串流程序读取文件， 指定的路径要是相对于Web 应用程序环境根目录。为了不让浏览器直接请求 PDF 文件，在这里将 PDF 文件放在 WEB-INF 目录中。

然后通过 HttpServletResponse 的 **`getOutputStream()`** 来取得 servletOutputStream 对象。接下来就是 Java IO 的概念了，从PDF 读入字节数据，再用 ServletOutputStream 来对浏览器进行写出响应。



[返回目录](#HttpServletResponse)

------



## 使用 sendRedirect()、sendError()

RequestDispatcher 的 `forward()` 方法，`forward()` 会将请求转发至指定的 URI， 这个动作是在Web容器中进行的，浏览器并不知道请求被转发，地址栏也不会有变化。

![image-20201007111616428](..\image\image-20201007111616428.png)

在转发过程中，都还是在同一个请求周期， 这也是为什么 RequestDispatcher 是由调用 HttpServletRequest 的`getRequestDispatcher()` 方法取得， 在 HttpServletRequest 中使用 `setAttribute()` 设置的属性对象，可以在转发过程中共享。



### 重新定向

使用 HttpServletResponse 的 `sendRedirect()` 要求浏览器重新请求另一个URI， 又称为重新定向 (Redirect) ， 使用时可指定绝对URI 或相对 URI。例如：

```
response.sendRedirect("https://openhome.cc");
```

这个方法会在响应中设置 HTTP 状态码 302 及 Location 标头，无论是自行控制状态代码、标头， 或是通过 `sendRedirect()` 方法复位定向， 浏览器都会使用 GET 方法请求指定的 URI， 因此地址栏上会发现URI的变更。

![image-20201007121641412](..\image\image-20201007121641412.png)

注意：由于是利用 HTTP 状态码与标头信息，要求浏览器重定向网页，因此这个方法必须在响应未确认输出前执行，否则会抛出IllegalstateException。



重新定向的使用时机之一是， 若用户在 POST 窗体之后，重载网页造成重复发送 POST 内容，会对应用程序状态造成不良影响的话， 可以在 POST 之后要求重新定向。

重新定向的使用时机之二是用户登录后自动定回之前阅读的页面。例如，目前页面为 xyz.html，设定一个链接为`login?url=xyz.html`， 在用户登录成功之后取得 url 请求参数来进行重新定向。



### 传送HTTP服务器默认的状态与错误信息

如果在处理请求的过程中发现一些错误， 而你想要传送 HTTP 服务器默认的状态与错误信息，可以使用 `sendError()` 方法。

例如，根据请求参数必须返回的资源根本不存在，可以如下发送错误信息：

```
response.sendError(HttpServletResponse.SC_NOT_FOUND);
```

SC_NOT_FOUND 会令服务器响应 404 状态码， 这类常数定义在 HttpServletResponse 接口上。如果想使用自定义的信息来取代默认的信息文字，可以使用 `sendError()` 的另一个版本：

```
 response.sendError(HttpServletResponse.SC_NOT_FOUND, "笔记文件”);
```

注意：由于利用了 HTTP 状态码，要求浏览器重定向网页， 因此 `sendError()` 方法同样必须在响应未确认输出前执行，否则会抛出IllegalStateException。



[返回目录](#HttpServletResponse)

------



## 设置 HTTP 响应报头的方法

下面的方法可用于在 Servlet 程序中设置 HTTP 响应报头。这些方法通过 *HttpServletResponse* 对象可用。

| 序号 | 方法 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **String encodeRedirectURL(String url)** <br />为 sendRedirect 方法中使用的指定的 URL 进行编码，或者如果编码不是必需的，则返回 URL 未改变。 |
| 2    | **String encodeURL(String url)**<br /> 对包含 session 会话 ID 的指定 URL 进行编码，或者如果编码不是必需的，则返回 URL 未改变。 |
| 3    | **boolean containsHeader(String name)** <br />返回一个布尔值，指示是否已经设置已命名的响应报头。 |
| 4    | **boolean isCommitted()** <br />返回一个布尔值，指示响应是否已经提交。 |
| 5    | **void addCookie(Cookie cookie)** <br />把指定的 cookie 添加到响应。 |
| 6    | **void addDateHeader(String name, long date)** <br />添加一个带有给定的名称和日期值的响应报头。 |
| 7    | **void addHeader(String name, String value)** <br />添加一个带有给定的名称和值的响应报头。 |
| 8    | **void addIntHeader(String name, int value)** <br />添加一个带有给定的名称和整数值的响应报头。 |
| 9    | **void flushBuffer()** <br />强制任何在缓冲区中的内容被写入到客户端。 |
| 10   | **void reset()** <br />清除缓冲区中存在的任何数据，包括状态码和头。 |
| 11   | **void resetBuffer()** <br />清除响应中基础缓冲区的内容，不清除状态码和头。 |
| 12   | **void sendError(int sc)** <br />使用指定的状态码发送错误响应到客户端，并清除缓冲区。 |
| 13   | **void sendError(int sc, String msg)** <br />使用指定的状态发送错误响应到客户端。 |
| 14   | **void sendRedirect(String location)<br />** 使用指定的重定向位置 URL 发送临时重定向响应到客户端。 |
| 15   | **void setBufferSize(int size)** <br />为响应主体设置首选的缓冲区大小。 |
| 16   | **void setCharacterEncoding(String charset)** <br />设置被发送到客户端的响应的字符编码（MIME 字符集）例如，UTF-8。 |
| 17   | **void setContentLength(int len)** <br />设置在 HTTP Servlet 响应中的内容主体的长度，该方法设置 HTTP Content-Length 头。 |
| 18   | **void setContentType(String type)** <br />如果响应还未被提交，设置被发送到客户端的响应的内容类型。 |
| 19   | **void setDateHeader(String name, long date)** <br />设置一个带有给定的名称和日期值的响应报头。 |
| 20   | **void setHeader(String name, String value)** <br />设置一个带有给定的名称和值的响应报头。 |
| 21   | **void setIntHeader(String name, int value)** <br />设置一个带有给定的名称和整数值的响应报头。 |
| 22   | **void setLocale(Locale loc)** <br />如果响应还未被提交，设置响应的区域。 |
| 23   | **void setStatus(int sc)** <br />为该响应设置状态码。        |



[返回目录](#HttpServletResponse)

------

