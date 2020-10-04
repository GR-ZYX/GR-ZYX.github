# HttpServletRequest

[TOC]

当浏览器请求网页时，它会向 Web 服务器发送特定信息，这些信息不能被直接读取，因为这些信息是作为 HTTP 请求的头的一部分进行传输的。



## 1、浏览器端的重要头信息

| 头信息              | 描述                                                         |
| :------------------ | :----------------------------------------------------------- |
| Accept              | 这个头信息指定浏览器或其他客户端可以处理的 MIME 类型。值 **image/png** 或 **image/jpeg** 是最常见的两种可能值。 |
| Accept-Charset      | 这个头信息指定浏览器可以用来显示信息的字符集。例如 ISO-8859-1。 |
| Accept-Encoding     | 这个头信息指定浏览器知道如何处理的编码类型。值 **gzip** 或 **compress** 是最常见的两种可能值。 |
| Accept-Language     | 这个头信息指定客户端的首选语言，在这种情况下，Servlet 会产生多种语言的结果。例如，en、en-us、ru 等。 |
| Authorization       | 这个头信息用于客户端在访问受密码保护的网页时识别自己的身份。 |
| Connection          | 这个头信息指示客户端是否可以处理持久 HTTP 连接。持久连接允许客户端或其他浏览器通过单个请求来检索多个文件。值 **Keep-Alive** 意味着使用了持续连接。 |
| Content-Length      | 这个头信息只适用于 POST 请求，并给出 POST 数据的大小（以字节为单位）。 |
| Cookie              | 这个头信息把之前发送到浏览器的 cookies 返回到服务器。        |
| Host                | 这个头信息指定原始的 URL 中的主机和端口。                    |
| If-Modified-Since   | 这个头信息表示只有当页面在指定的日期后已更改时，客户端想要的页面。如果没有新的结果可以使用，服务器会发送一个 304 代码，表示 **Not Modified** 头信息。 |
| If-Unmodified-Since | 这个头信息是 If-Modified-Since 的对立面，它指定只有当文档早于指定日期时，操作才会成功。 |
| Referer             | 这个头信息指示所指向的 Web 页的 URL。例如，如果您在网页 1，点击一个链接到网页 2，当浏览器请求网页 2 时，网页 1 的 URL 就会包含在 Referer 头信息中。 |
| User-Agent          | 这个头信息识别发出请求的浏览器或其他客户端，并可以向不同类型的浏览器返回不同的内容。 |



[返回目录](#HttpServletRequest)

------



## 2、处理请求参数

请求来到服务器时，Web容器会创建HttpServletRequest实例来包装请求中的相关信息，HttpServletRequest定义了取得请求信息的方法。例如，可以使用以下方法来取得请求参数。



### 获取请求参数的值：`getParameter()`

指定请求参数名称来取得对应的值。

例如：`Stringusername=request.getParameter("name");`

`getParameter ()`返回的是string对象， 若传来的是像"123"这样的字符串值， 而需要的是基本数据类型时， 必须使用`Integer.parseInt()` 这类的方法将之剖析为基本类型。若请求中没有所指定的请求参数名称， 会返回null。



### 获取同一个请求参数多个值：`getParameterValues()`

`getParameterValues()` ：如果窗体上有可复选的元件， 如复选框(Checkbox) 、列表(List) 等， 同一个请求参数名称会有多个

（此时的HTTP查询字符串其实就如param=10&param=20&param=30) 

`getParameterValues()` 方法可取得一个String数组，数组元素就是被选取的选项值。

例如：`String[] values = request.getParameterValues("param");`



### 获取全部的请求参数名称：`getParameterNames() `

`getParameterNames()` ：使用`getParameterNames()` 方法， 会返回`Enumeration<String>`对象， 其中包括全部请求参数名称。

例如：

```
Enumeration<String> e = req.getParameterNames() ；

while(e.has More Elements()){
	String parame.nextElement();
	...
}	
```



### 将请求参数以 Map对象返回：`getParameterMap()`

`getParameterMap()`:将请求参数以 `Map<string, string[]>`对象返回。

Map中的键(Key)是请求参数名称，值(Value)的部分是请求参数值。

以字符串数组类型`String[]`返回，是考虑到有时同一请求参数有多个值。



[返回目录](#HttpServletRequest)

------



## 3、处理请求标头

HTTP中包含了请求标头(Header) 信息，HttpServletRequest上设计了一些方法可以用来取得标头信息。



### 以字符串形式返回指定的请求头的值：`getHeader()`

`getHeader()`：使用方式与`getParameter()`类似， 指定标头名称后可返回字符串值，代表浏览器发送的标头信息。



### 获取同一个请求标头的多个值：`getHeaders()`

`getHeaders()` ：使用方式与`getParameterValues()` 类似，指定标头名称后可返回`Enumeration<String>`，元素为字符串



### 获取所有标头名称：`getHeaderNames()`

`getHeaderNames()` ：使用方式与getParameterNames() 类似， 取得所有标头名称，以`Enumeration<String>`返回内含所有标头字符串名称。



[返回目录](#HttpServletRequest)

------



## 4、处理请求参数编码

### POST 请求参数编码处理

如果浏览器没有在 Content-Type 标头中设置字符编码信息（例如可以设置 `Content-Type：text/html；charset=UTF-8`），此时使用**HttpServletRequest**的 `getCharacterEncoding()` 返回值会是null。

在这个情况下， 容器若使用的默认编码处理是 **ISO-8859-1** (zh.wikipedia.org/zh-tw/ISO/IEC_8859-1) ， 而浏览器使用 **UTF-8** 发送非ASCII字符的请求参数，Servlet直接使用 `getParameter()`  等方法取得该请求参数值， 就会是不正确的结果， 也就是得到乱码。

假设网页编码是UTF-8， 通过窗体使用POST发出“林“这个中文字符。浏览器会将“林”作URI编码为 %E6%9E%97 再发送， 也就是浏览器相当于做了这个操作：`String text = java.net.URLEncoder.encode("林"，”UTF-8") ；`

**解决方法：**

1. 可以使用 **HttpServletRequest** 的 **`setCharacterEncoding()`** 方法指定取得POST请求参数时使用的编码。

   例如， 浏览器以UTF-8来发送请求， 而接收时也想使用UTF-8编码字符串，那就在获得任何请求值之“前”，执行以下语句：**`request.setCharacterEncoding("UTF-8");`**

   这相当于要求容器做这个操作：

   `String text = java.net.URLDecoder.decode("%E6%9E%97"，"UTF-8");`

   这样就可以取得正确的“林”中文字符了。

   **必须要在取得任何请求参数前执行 `setCharacterEncoding()` 方法才有作用。**

2. 如果每个请求都需要设定字符编码， 在每个Servlet中撰写， 并不是建议的方式， 而是会设计在**过滤器**组件中。

3. 如果整个应用程序的请求， 都打算采用某个编码， 从Servlet 4.0开始， 可以在 **web.xml** 中修改。

   在 **web.xml** 中加入 `<request-character-encoding>`， 设定整个应用程序使用的请求参数编码。

   例如， 要设定整个应用程序的请求编码为UTF-8，可以在web.xml中加入：

   **`<request-character-encoding>UTF-8</request-character-encoding>`**



### GET 请求参数编码处理

在 **HTTPServletRequest** 的 API 文件中， 对 **setCharacterEncoding()** 的说明清楚地提到：

Overrides the name of the character encoding used in the body of this request.

也就是说，**`setCharacterEncoding()` 方法**对于请求本体中的字符编码才有作用——**这个方法只对POST产生作用**。当请求是用GET 发送时，规范中没有定义这个方法是否会影响Web器处理编码的方式。究其原因，是因为处理 URI 的是 HTTP 服务器，而非 Web容器。

对于 Tomcat7 或之前版本附带的 HTTP服务器来说，处理 URI 时使用的默认编码是 50-8859-1， 在不改变 Tomcat 附带的 HTTP服务器URI编码处理设定的情况下，若浏览器使用 UTF-8 发送请求，

**常见使用下面的处理方式：**

```
String name = request.getParameter("name");

String name = new String(name.getBytes(“ISO-8859-1”) , “UTF-8”);
```

举例来说， 在UTF-8的网页中， 对“林”这个字符， 若使用窗体发送GET请求， 浏览器相当于做了这个操作：

`String text = java.net.URLEncoder.decode(“林”， “UTF-8”);`

在Servlet中取得请求参数时， HTTP服务器在URI上， 若默认使用ISO-8859-1来处理编码，相当于做了这个动作：

`String text = Java.net.URLDecoder.decode(“%E6%9E%97”，”ISO-8859-1”) ;`

使用 getParameter() 取得的字符串就是上例text引用的字符串， 可以按照下面的编码转换得到正确的“林”字符：

text = new String(name.getBytes("ISO-8859-1") ， "UTF-8") ；

**在Servlet中直接进行编码设定或转换， 并不是最好的方法， 通常会使用过滤器(Filter) 进行转换。**

**从Tomcat 8之后， 附带的HTTP服务器在URI编码处理时， 默认使用UTF-8， 若浏览器使用UTF-8发送请求， 就不用自行转换字符串编码了。**



提示：

如果浏览器不是使用UTF-8发送请求， 例如过去许多中文网页是采用Big 5， 而且采用Tomcat7或更早版本， 使用的URI编码是ISO-8859-1，在升级至Tomcat 8后，若仍要能取得正确的中文请求参数值，可参考The HTTP Connector(tomcat.apache.org/tomcat-9.0-doc/confighttp.html) 自行更改Tomcat 8容器的 URI Encoding， 设定为ISO-8859-1， 而不是单纯使用new String(name.getBytes("UTF-8") , "Big 5") ，因为有些字符若被处理为UTF-8未知字符，就没办法再转换回原始字符的字节了。



[返回目录](#HttpServletRequest)

------



## 5、getReader()、getInputStream() 读取内容

**HttpServletRequest** 定义有 **`getReader()` 方法**，可以取得一个**BufferedReader**， 通过该对象可以读取请求的Body数据。

**取得上传的文件：**

基本方式就是判断文件的开始与结束区段，然后使用 **HttpServletRequest** 的 **`getInputStream()`** 取得 **servletInputStream**， 它是InputStream的子类，代表请求Body的串流对象， 可以利用它来处理上传的文件区段。

注意：在同一个请求期间，get Reader() 与getInputStream() 只能择一调用，若同一请求期间两者都有调用， 则会抛出IllegalStateException异常。

在Servlet 3.0中，可以使用 **`getPart()`** 或 **`getParts()`** 方法，协助处理文件上传事宜。



[返回目录](#HttpServletRequest)

------



## 6、getPart()、getParts() 取得上传文件

### 单文件上传：`getPart()`

可以通过 **HttpServeletRequest** 的 **`getPart()` 方法**取得 Part 实现对象。

使用getPart() 来处理上传的文件：

1. 设置**`@MultipartConfig`**

   必须设置此标注才能使用 getPart() 相关API。

2. 使用 `getPart()` 取得Part 对象

   **`Part file = request.getPart("file");`** 

   调用 getPart() 时要指定名称取得对应的 Part 对象。

3. 取得上传文件名

   ```
   private String getSubmittedFileName(Part file) {
   	String header = file.getHeader("Content-Disposition");
   	Matcher matcher = fileNameRegex.matcher(header);
   	matcher.find();
   	
   	String filename = matcher.group(l);
   	if(filename.contains("\\")) {
   		return filename.substring(filename.lastIndexOf("\\") + 1);
   	}
       return filename;
   }
   ```

4. 存储文件

   ```
   private void write(Part file, String filename)
   	throws IOException, FileNotFoundException{
   	
   	try(InputStream in = file.getInputStream();
   		OutputStream out = new FileOutputStream(String.format("c:/workspace/%s", filename))) {
   		
   		byte[] buffer = new byte[1024];
   		int length = -1;
   		while((length = in.read(buffer)) != -1) {
   			out.write(buffer, 0, length);
   		}
   	}
   }
   ```



**@MultipartConfig** 标注可用来设置 Servlet 处理上传文件的相关信息，没有设置任何属性， 这表示相关属性采用默认值。

**@MultipartConfig** 的可用属性如下：

- **fileSizeThreshold**：整数值设置，若上传文件大小超过设置门槛，会先写入缓存文件，默认值为0。
- **location**：字符串设置，设置写入文件时的目录，如果设置这个属性，则缓存文件就是写到指定的目录，可搭配 Part 的**`write()`** 方法使用， 默认为空字符串。
- **maxFileSize**：限制上传文件大小，默认值为-1L，表示不限制大小。
- **maxRequestSize**：限制 multipart/form-data 请求个数， 默认值为-1L， 表示不限个数。

要在 Tomcat 中的 Servlet 上设置 @MultipartConfig 才能取得 Part 对象， 否则 `getPart()` 会得到 null 的结果。



multipart/form-data 发送的每个内容区段， 都会有以下的标头信息：

```
Content-Disposition: form-data; name = "filename"; filename = "caterpillar.jpg"
Content-Type：image/jpeg
...
```

如果想取得这些标头信息， 可以使用 Part 对象的 `getHeader()` 方法， 指定标头名称来取得对应的值。

所以想要取得上传的文件名称， 就是取得 Content-Disposition 标头的值，然后取得 filename 属性的值。

最后，再利用 Java I/O API 写入文件中。



Servlet 3. 1中， Part 新增了 `getSubmittedFileName()`，可以取得上传的文件名。

然而各浏览器发送的文件名会有差异性，`getSubmittedFileName()` 的 API 文件并没有规定如何处理这个差异性， 就 Tomcat 9 的操作， 若是遇到名称中有 “\” 的话会过滤掉，这会造成无法判断真正的文件名，因此范例中自行实现了 `getSubmittedFileName()` 方法。

**就安全的考虑来说，不建议将浏览器发送的文件名直接作为存盘时的文件名。**



Part有个方便的 `write()` 方法， 可以直接将上传文件指定文件名写入磁盘中， `write()` 可指定文件名， 写入的路径是相对于     

@MultipartConfig 的 location 设置的路径。



### 多文件上传：`getParts()`

如果有多个文件要上传，可以使用`getParts()` 方法，会返回一个 `Collection<Part>`，其中有每个上传文件的 Part 对象。

处理文件上传请求：

```
@MultipartConfig(location="c:/workspace")
@WebServlet("/uploads")
public class Uploads extends HttpServlet{
	@Override
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws 	 						ServletException, IOException {
		
		request.setCharacterEncoding("UTE-8");
		reguest.getParts()
			.stream() //使用Stream
			.filter(part -> part.getName().startsWith("file")) //只处理上传文件区段
    		.forEach(this::write);
	}
	
	private void write(Part part) {
		
		String submittedFileName = part.getSubmittedFileName();
		String ext = submittedFileName.substring(submittedFileName.lastIndexOf('.')); // 取得扩展名
		
		try {
			part.write(String.format("%s%s", Instant.now().toEpochMilli(), ext)); // 使用时间毫秒数为主文件名
		}catch(IOExceptione){
			throw new UncheckedIOException(e);
		}
	}
}
```

在这个范例中， 使用 Java 8 stream API，由于**“上传”按钮也会是其中一个 Part 对象**，先判断 Part 的名称是不是以 file 开头，可以使用 Part 的 `getName()` 来取得名称。进一步过滤出文件上传区段的 Part 对象，然后取得扩展名。为了避免上传后可能发生的文件名重复问题，以获取系统时间之毫秒数作为主文件名写入文件。

### 使用 web.xml 设置 @MultipartConfig 对应的信息

```
<servlet>
    <servlet-name>Upload Servlet</servlet-name>
	<servlet-class>cc.open home.Upload Servlet</servlet-class>
	
	<multipart-config>
    	<location>c:/workspace</location>
    </multipart-config>
    
</servlet>
```



[返回目录](#HttpServletRequest)

------



## 7、使用RequestDispatcher 调派请求

在Web应用程序中， 经常需要多个 Servlet 来完成请求。

例如，将另一个 Servlet 的请求处理流程包含 (Include) 进来，或将请求转发 (Forward) 给别的 Servlet 处理。

可以使用 **HttpServletRequest** 的 **`getRequestDispatcher()` 方法**取得 **RequestDispatcher** 接口的实现对象实例，调用时指定转发或包含的相对URI网址。

例如：

`RequestDispatcher dispatcher = request.getRequestDispatcher(“some”) ;`

![RequestDispatcher 接口](..\image\image-20201004161051199.png)

### 使用 `include()` 方法

**RequestDispatcher** 的 **`include()`** 方法，可以将另一个 Servlet 的操作流程包括至目前 Servlet 操作流程之中。

**Request	Some.java**

```
@web Servlet("/some")
public class Some extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest reguest, HttpServletResponse response) throws ServletException, 		IOException {
		
		PrintWriter out = response.getWriter();
		out.println("Some do one...");
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("other");
		dispatcher.include(request, response);
		
		out.println("Some do two...");
	}
}
```

other.view 实际上会依 URI 模式取得对应的 Servlet。调用 `include()` 时，必须分别传入实现 ServletReguest、ServletResponse接口的对象，可以是 `service()` 方法传入的对象，或者是自定义的对象或封装器。

如果被 include() 的 Servlet 是这么编写的：

**Request	Other.java**

```
@WebServlet("/other")
public class Other extends HttpServlete {
	@override
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws Servlet Exception, 		 IOException {
	
		response.getWriter().println("Other do one...");
		
		}
} 
```

网页上见到的响应顺序是 

Some do one... 、Other do one... 、Some do two... 

在取得 RequestDispatcher 时，也可以包括查询字符串。例如：

`reg.getRequestDispatcher("other.view?data=123456).include(reg, resp) ;`

那么在被包含(或转发，如果使用的是 `forward()` ) 的Servlet中就可以使用 `getParameter("data")` 取得请求参数值。



### 请求范围属性

在 include() 或 `forward()` 时包括请求参数的做法，仅适用于传递字符串值给另一个 Servlet，在调派请求的过程中，如果有必须共享的“对象”，可以设置给请求对象成为属性，称为请求范围属性(Request Scope Attribute) 。

通过请求范围属性共享数据：

![通过请求范围属性共享数据](..\image\image-20201004163215240.png)

HttpServletRequest 与请求范围属性有关的几个方法如下。

1. `setAttribute()`：指定名称与对象设置属性。
2. `getAttribute()`：指定名称取得属性。
3. `getAttributeName()`：取得所有属性名称。
4. `removeAttribute()`：指定名称移除属性。

例如、有个 Servlet 会根据某些条件查询数据：

```
...

	List<Book> books = bookDAO.query("ServletJSP");
	request.setAttribute("books", books);
	request.getRequestDispatcher("result.view").include(request, response);
    
...
```

假设 result.view 这个URI是个负责响应的 Servlet 实例， 则它可以利用 HctpServlet-Request对象的 getAttribute() 取得查询结果：

`List<Book> books = (List<Book>) request.getAttribute("books") ;`

由于请求对象仅在此次请求周期内有效，在请求/响应之后，请求对象会被销毁回收，设置在请求对象中的属性自然也就消失了， 所以通过 setAttribute() 设置的属性才称为请求范围属性。



#### 取得 include() 时传入的信息

在设置请求范围属性时， 需注意属性名称由 java. 或 javax. 开头的名称通常保留给规格书中某些特定意义的属性。

例如，以下几个名称各有其意义：

1. javax.servlet.include.request_uri
2. javax.servlet.include.context path

3. javax.servlet.include.servlet_path
4. javax.servlet.include.path_info

5. javax.servlet.include.query_string

6. javax.servlet.include.mapping(Servlet 4.0新增)

以上的属性名称在被包含的 Servlet 中， 分别表示上一个 Servlet 的 **RequestURI、Contextpath、Servlet path、Pathinfo** 与**取得RequestDispatcher 时给定的请求参数**，如果被包含的 Servlet 还包括其他的 Servlet，这些属性名称的对应值也会被代换。

在 RequestDispatcher 执行include() 时， 必须传入request、response 对象，而这两个物件来自于最前端的 Servlet，后续的Servlet 若使用 request、response对象，也会是一开始最前端 Servlet 收到的两个对象，此时尝试在后续的 Servlet 中使用 request 对象的 getRequestURI() 等方法，得到的信息跟第一个 Servlet 中执行 getRequestURI() 等方法是相同的。

然而， 有时必须**取得include() 时传入的路径信息**，而不是第一个Servlet的路径信息，这时候就必须通过刚才的几个属性名称来取得，这些属性由容器在 include() 时设定。

可以通过RequestDispatcher定义的常数来取得：

1. **RequestDispatcher.INCLUDE_REQUEST_URI**

2. **RequestDispatcher.INCLUDE_CONTEXT_PATH**

3. **RequestDispatcher.INCLUDE_SERVLET_PATH**

4. **RequestDispatcher.INCLUDE_PATH_INFO**

5. **RequestDispatcher.INCLUDE_QUERY_STRING**

6. **RequestDispatcher.INCLUDE_MAPPING(Servlet 4.0新增)**

   前5个取得属性都是字符串， 而 RequestDispatcher.INCLUDE_MAPPING 取得的属性会是 HttpServletMapping 实例， 因此可以通过它的 getMappingMatch() 等方法取得相关的URI匹配信息。

注意：

使用 inelude() 时，被包含的Servlet中任何对请求标头的设置都会被忽略， 被包含的Servlet中可以使用getSession() 方法取得HttpSession对象。



#### 取得 forward() 时传入的信息

在被转发请求的Servlet中， 也可通过以下请求范围属性名称取得对应信息：

1. javax.servlet.forward.request_uri

2. javax.servlet.forward.context_path

3. javax.servlet.forward.servlet_path

4. javax.servlet.forward.path_info

5. javax.servlet.forward.query_string
6. javax.servlet.forward.mapping(Servlet 4.0新增)

同样地，会需要这些请求属性的原因在于，在 RequestDispatcher 执行 forward() 时，必须传入request、response 对象，而这两个物件来自于最前端的 Servlet，后续的Servlet 若使用 request、response对象，也会是一开始最前端 Servlet 收到的两个对象，此时尝试在后续的 Servlet 中使用 request 对象的 getRequestURI() 等方法，得到的信息跟第一个 Servlet 中执行 getRequestURI() 等方法是相同的。

然而， 有时必须**取得 forward()时传入的路径信息**，而不是第一个Servlet的路径信息，这时候就必须通过刚才的几个属性名称来取得。

可以通过RequestDispatcher定义的常数来取得：

1. **RequestDispatcher.FORWARD_REQUEST_URI**
2. **RequestDispatcher.FORWARD_CONTEXT_PATH**
3. **RequestDispatcher.FORWARD_SERVLET_PATH**
4. **RequestDispatcher.FORWARD_PATH_INFO**
5. **RequestDispatcher.FORWARD_QUERY_STRING**
6. **RequestDispatcher.FORWARD_MAPPING(Servlet 4.0新增)**





### 使用 `forward()` 方法

RequestDispatcher 有个 forward() 方法， 调用时同样传入请求与响应对象，这表示要将请求处理转发给别的 Servlet。

**“对浏览器的响应同时也转发给另一个Servlet”**

注意：

若要调用forward() 方法， 目前的Servlet不能有任何响应确认(Commit) ， 如果在目前的Servlet中通过响应对象设置了一些响应但未被确认(响应缓冲区未满或未调用任何清除方法) ，则所有响应设置会被忽略。如果已经有响应确认且调用了forward() 方法，则会抛出 IllegalStateException。



**由于请求的include() 或forward() ， 是属于容器内部流程的调派， 而不是在响应中要求浏览器重新请求某些URI， 因此浏览器不会知道实际的流程调派， 也就是说， 浏览器的地址栏上不会有任何变化。**



[返回目录](#HttpServletRequest)

------



## 8、读取 HTTP 头的方法

下面的方法可用在 Servlet 程序中读取 HTTP 头。这些方法通过 *HttpServletRequest* 对象可用。

| 序号 | 方法 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **Cookie[] getCookies()** <br/>返回一个数组，包含客户端发送该请求的所有的 Cookie 对象。 |
| 2    | **Enumeration getAttributeNames()** <br/>返回一个枚举，包含提供给该请求可用的属性名称。 |
| 3    | **Enumeration getHeaderNames()** <br/>返回一个枚举，包含在该请求中包含的所有的头名。 |
| 4    | **Enumeration getParameterNames()** <br/>返回一个 String 对象的枚举，包含在该请求中包含的参数的名称。 |
| 5    | **HttpSession getSession()** <br/>返回与该请求关联的当前 session 会话，或者如果请求没有 session 会话，则创建一个。 |
| 6    | **HttpSession getSession(boolean create)** <br/>返回与该请求关联的当前 HttpSession，或者如果没有当前会话，且创建是真的，则返回一个新的 session 会话。 |
| 7    | **Locale getLocale()** <br/>基于 Accept-Language 头，返回客户端接受内容的首选的区域设置。 |
| 8    | **Object getAttribute(String name)** <br/>以对象形式返回已命名属性的值，如果没有给定名称的属性存在，则返回 null。 |
| 9    | **ServletInputStream getInputStream()**<br/> 使用 ServletInputStream，以二进制数据形式检索请求的主体。 |
| 10   | **String getAuthType()**<br/> 返回用于保护 Servlet 的身份验证方案的名称，例如，"BASIC" 或 "SSL"，如果JSP没有受到保护则返回 null。 |
| 11   | **String getCharacterEncoding()** <br/>返回请求主体中使用的字符编码的名称。 |
| 12   | **String getContentType()** <br/>返回请求主体的 MIME 类型，如果不知道类型则返回 null。 |
| 13   | **String getContextPath()** <br/>返回指示请求上下文的请求 URI 部分。 |
| 14   | **String getHeader(String name)** <br/>以字符串形式返回指定的请求头的值。 |
| 15   | **String getMethod()** <br/>返回请求的 HTTP 方法的名称，例如，GET、POST 或 PUT。 |
| 16   | **String getParameter(String name)** <br/>以字符串形式返回请求参数的值，或者如果参数不存在则返回 null。 |
| 17   | **String getPathInfo()** <br/>当请求发出时，返回与客户端发送的 URL 相关的任何额外的路径信息。 |
| 18   | **String getProtocol()** <br/>返回请求协议的名称和版本。     |
| 19   | **String getQueryString()** <br/>返回包含在路径后的请求 URL 中的查询字符串。 |
| 20   | **String getRemoteAddr()** <br/>返回发送请求的客户端的互联网协议（IP）地址。 |
| 21   | **String getRemoteHost()** <br/>返回发送请求的客户端的完全限定名称。 |
| 22   | **String getRemoteUser()** <br/>如果用户已通过身份验证，则返回发出请求的登录用户，或者如果用户未通过身份验证，则返回 null。 |
| 23   | **String getRequestURI()**<br/> 从协议名称直到 HTTP 请求的第一行的查询字符串中，返回该请求的 URL 的一部分。 |
| 24   | **String getRequestedSessionId()** <br/>返回由客户端指定的 session 会话 ID。 |
| 25   | **String getServletPath()** <br/>返回调用 JSP 的请求的 URL 的一部分。 |
| 26   | **String[] getParameterValues(String name)** <br/>返回一个字符串对象的数组，包含所有给定的请求参数的值，如果参数不存在则返回 null。 |
| 27   | **boolean isSecure()** <br/>返回一个布尔值，指示请求是否使用安全通道，如 HTTPS。 |
| 28   | **int getContentLength()** <br/>以字节为单位返回请求主体的长度，并提供输入流，或者如果长度未知则返回 -1。 |
| 29   | **int getIntHeader(String name)** <br/>返回指定的请求头的值为一个 int 值。 |
| 30   | **int getServerPort()** <br/>返回接收到这个请求的端口号。    |
| 31   | **int getParameterMap()** <br/>将参数封装成 Map 类型。       |



[返回目录](#HttpServletRequest)

------



