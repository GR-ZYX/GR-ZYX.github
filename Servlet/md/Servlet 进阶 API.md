# Servlet 进阶 API

[TOC]

每个Servlet都必须由Web容器读取Servlet设置信息（无论使用标注还是web.xml） 、初始化等， 才可以真正成为一个Servlet。

对于每个Servlet的设置信息， Web容器会生成一个ServletConfig作为代表对象，可以从该对象取得Servlet初始参数， 以及代表整个Web应用程序的ServletContext对象。



## Servlet、ServletConfig 与 GenericServlet

### Servlet、ServletConfig

在Servlet接口上， 定义了与Servlet生命周期及请求服务相关的 `init()` 、`service()` 与 `destroy()` 三个方法。 每一次请求来到容器时， 会产生HttpServletRequest与HttpServletResponse对象，并在调用 `aervice()` 方法时当作参数传入。

在Web容器启动后， 会读取Servlet设置信息， 将Servlet类加载并实例化， 并为每个Servlet设置信息产生一个servletConfig对象， 而后调用servlet接口的  `init()`  方法， 将产生的ServletConfig对象当作参数传入。

<img src="..\image\image-20201011160403941.png" alt="image-20201011160403941" style="zoom:80%;" />

这个过程只在创建Servlet实例后发生一次，之后每次请求到来，调用Servlet实例的 `service()` 方法进行服务。

ServletConfig 实例即每个Servlet设置的代表对象，容器为每个Servlet设置信息产生一个servlet及 servletConfig 实例。



### GenericServlet 

**GenericServlet** 同时实现了**Servlet**及**ServletConfig**，

<img src="..\image\image-20201011160614813.png" alt="image-20201011160614813" style="zoom: 80%;" />

**GenericServlet** 的主要目的，是将初始Servlet调用 `init()` 方法传入的 ServletConfig 封装起来：

```
private transient ServletConfig config;
public void init(ServletConfig config) throws ServletException {
	this.config = config;
    this.init();
}

public void init() throws ServletException {

}
```

**GenericServlet** 在实现 Servlet 的 `init()` 方法时， 调用了另一个无参数的 `init()` 方法，在编写Servlet时，如果有一些初始时要运行的动作， 可以重新定义这个无参数的 `init()` 方法，而不是直接重新定义有ServletConfig参数的 `init()` 方法。

注意：当有一些对象实例化后要运行的操作， 必须定义构造器。在编写Servlet时， 若想运行与Web应用程序资源相关的初始化动作， 要重新定义  `init()` 方法。举例来说， 若要使用ServletConfig来取得Servlet初始参数等信息， 不能在构造函数中定义， 因为实例化Servlet时， 容器还没有调用 `init()` 方法传入ServletConfig，构造函数并没有ServletConfig实例可以使用。

**GenericServlet** 也包括了Servlet与ServletConfig所定义方法的简单实现，实现内容主要是通过ServletConfig来取得一些相关信息。

例如：

```
public ServletConfig getServletConfig() {
	return config;
}
public String getInitParameter(String name) {
    return getServletConfig().getInitParameter(name);
}
public Enumeration getInitParameterNames() {
	return getServletConfig().getInitParameterNames();
}
public ServletContext getServletContext() {
    return getServletConfig().getServletContext(); 
}
```

在继承HttpServlet实现Servlet时， 就可以通过这些方法来取得必要的相关信息， 而不是直接意识到Servletconfig的存在。

提示：Generic Servlet还定义了 `log()` 方法。例如：

```
public void log(String msg) {
	getServletContext().log(getServletName() + ": " + msg);
}
```

 这个方法主要是通过ServletContext的 `log()` 方法来运行日志功能。不过因为这个日志功能简单，实际上很少使用这个 `log()` 方法，而会使用功能更强大的日志API。

如果是使用Tomcat，ServletContext的 `log()` 方法保存的日志文件， 会存放在Tomcat目录的 logs 文件夹下。



[返回目录](#Servlet 进阶 API)

------



## 从 ServletConfig 取得 Servlet 设置信息

ServletConfig相当于个别Servlet的设置信息代表对象， 这意味着可以从ServletConfig取得Servlet设置信息。

ServletConfig定义了 `getInitParameter()` 、`getInitParameterNames()` 方法， 可以取得设置Servlet时的初始参数。

若要使用标注设置个别Servlet的初始参数， 可以在 **@WebServlet** 中使用 **@WebInitParam** 设置 **InitParams** 属性。例如：

```
...
@WebServlet(name="ServletConfigDemo", urlPatterns={"/conf"},
	initParams={
    	@WebInitParam(name = "PARAM1", value = "VALUE1"),
		@WebInitparam(name = "PARAM2", value = "VALUE2")
	}
)
public class ServletConfigDemo extends HttpServlet {
	private String PARAM1;
	private String PARAM2;
	public void init() throws ServletException {
		PARAM1 = getServletConfig().getInitParameter("PARAM1");
		PARAM2 = getServletConfig().getInitParameter("PARAM2");
	}
	...
}
```

若要在web.xml中设置个别Servlet的初始参数， 可以在 `<servlet>` 标签中使用 `<init-param>` 等标签进行设置， web.xml中的设置会覆盖标注的设置。例如：

```
<servlet>
	<servlet-name>ServletConfigDemo</servlet-name>
	<servlet-class>cc.openhome.ServletConfigDemo</servlet-class>
	
	<init-param>
		<param-name>PARAM1</param-name>
    	<param-value>VALUE1</param-value>
	</init-param>
	<init-param>
    	<param-name>PARAM2</param-name>
    	<param-value>VALUE2</param-value>
    </init-param>
</servlet>
```

注意：若要用web.xml覆盖标注设置，web.xml的 `<servlet-name>` 设置必须与@WebServlet的name属性相同。

由于ServletConfig会在Web容器将Servlet实例化后，通过有参数的 `init()` 方法传入， 是与Web应用程序资源相关的对象， 在继承HttpServlet后， 通常会重新定义无参数的 `init()` 方法以获取Servlet初始参数。之前也提到， GenericServlet 定义了一些方法，将ServletConfig封装起来，便于取得设置信息，取得Servlet初始参数的代码也可以改写为：

```
@WebServlet(name="ServletConfigDemo", urlPatterns={"/conf"},
	initParams={
		@WebInitParam(name = "PARAM1", value = "VALUE1"),
		@WebInitParam(name = "PARAM2", value = "VALUE2")
	}
)
public class AddMessage extends HttpServlet {
	private String PARAM1;
	private String PARAM2;
	public void init() throws ServletException {
		PARAM1 = getInitParameter("PARAM1");
		PARAM2 = getInitParameter("PARAM2");
	}
	...
}
```

提示：Servlet初始参数通常作为常数设置， 可以将一些Servlet程序默认值使用标注设为初始参数， 之后若想变更那些信息， 可以创建web.xml进行设置，以覆盖标注设置，而不用进行修改源代码、重新编译、部署的操作。

下面这个范例简单地示范了如何设置、使用Servlet初始参数， 其中登录成功与失败的网页，可以由初始参数设置来决定：

```
@WebServlet(
	name = "Login" // 设置Servlet名称
	urlPatterns = {"/login.do"},
	initParams = {
		@WebInitParam(name = "SUCCESS", value = "success.view"),
		@WebInitParam(name = "ERROR", value = "error.view")     // 设置初始参数
	}
)

public class Login extends HttpServlet {
	private String SUCCESS_PATH;
	private String ERROR_PATH;
	
	@override
	 // 取得初始参数
	public void init() throws ServletException {
		SUCCESS_PATH = getInitParameter("SUCCESS");
		ERROR_PATH = getInitParameter("ERROR");
	}
	
	@override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, 		IOException {
    	
    	response.setContentType(“text/html; charset=UTE-8");
        String name = request.getParameter("name“);
        String passwd = request.getParameter("passwd");
        String path = login(name, passwd)? SUCCESS_PATH : ERROR_PATH;
        response.sendRedirect(path);
	}
	
	private boolean login(String name, String passwd) {
		return "caterpillar".equals(name) && "123456".equals(passwd);
	}
	
}
```

注意@webServlet的name属性设置，如果web.xml中的设置要覆盖标注设置， `<servlet-name>`的设置必须与@webServlet的name属性相同， 如果不设置name属性，默认是类完整名称。

程序中使用标注设置默认初始参数， 并在 `init()` 中读取，成功或失败时所发送的网页URI是由初始参数来决定的。如果想使用web.xml来覆盖这些初始参数设置，则可以如下编码：

```
...
    <servlet>
    	<servlet-name>Login</servlet-name> // 注意Servlet名称
		<servlet-class>cc.open home.Login</servlet-class>
	
		<init-param>
    		<param-name>SUCCESS</param-name>
    		<param-value>success.html</param-value>
		</init-param>
		<init-param>
            <param-name>ERROR</param-name>
            <param-value>error.html</param-value>
    	</init-param>
	</servlet>
	<servlet-mapping>
    	<servlet-name>Login</servlet-name>
		curl-pattern>/login</url-pattern>
	</servlet-mapping>
...
```

以上设置 web.xml，成功与失败网页分别设置为 success.html 及 error.html。



[返回目录](#Servlet 进阶 API)

------



## 取得所请求资源的信息：ServletContext

ServletContext接口定义了运行Servlet的应用程序环境的一些行为与观点， 可以使用ServletContext实现对象取得所请求资源的**URI、设置与存储属性、应用程序初始参数**，甚至动态设置Servlet实例。

当整个Web应用程序加载Web容器之后， 容器会生成一个servletContext对象，作为整个应用程序的代表，并设置给ServletConfig，只要通过ServletConfig的 `getServletContext()` 方法就可以取得servletContext对象。

以下则先简介几个需要注意的方法。

### 取得RequestDispatcher实例：getRequestDispatcher()

用来取得RequestDispatcher实例，使用时路径的指定必须以“/”作为开头， 这个斜杠代表应用程序环境根目录(Context Root) 。

取得RequestDispatcher实例之后， 就可以进行请求的转发(Forward) 或包含(Include) 。

```
context.getRequestDispatcher("/pages/some.jsp").forward(request，response);
```



提示：以“/”作为开头有时称为环境相对(Context-relative) 路径， 没有以“/”作为开头则称为请求相对(Request-relative) 路径。



### 读取Web应用程序的某个目录中的文件：getResourcePaths()

如果想要知道Web应用程序的某个目录中有哪些文件， 则可以使用 `getResourcePaths()` 方法， 它会传回 `Set<String>` 实例， 包含了指定文件夹中的文件。例如：

```
getServletContext().getResourcePaths("/").forEach(path -> out.println(path));
```

使用时指定路径必须以“/”作为开头，表示相对于应用程序环境根目录，返回的路径会如下所示。

```
/welcome.html
/catalog/
/catalog/index.html
/catalog/products.html
/customer/
/customer/login.jsp

/WEB-INF/
/WEB-INF/web.xml
/WEB-INF/classes/cc/openhome/Login.class
```

这个方法会连同WEB-INF的信息都列出来。如果是个目录信息， 会以“/”结尾。

以下范例利用了 `getResourcePaths()`  方法， 自动取得avatars目录下的图片路径， 并通过 `<img>` 标签来显示图片。

```
@WebServlet(
    urlPatterns = {"/avatar"},
	initParams = {
    	@WebInitParam(name = "AVATAR_DIR", value="/avatar")
    }
)

public class Avatar extends HttpServlet {
	private String AVATAR_DIR;
	
	@override
    public void init() throws ServletException {
    	AVATAR_DIR = getInitParameter("AVATAR_DIR");
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, 		IOException {
    	
    	response.setContentType("text/html; charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<body>");
        
        getServletContext().getResourcePaths(AVATAR_DIR) // 取得头像路径
        	.forEach( avatar -> {
        		out.printf("<img src='%s'>%n", avatar.replaceFirst("/", "")); // 设定<img>的src属性
            });
        
        out.println("</body>");
        out.println("</html>");
    }
}
```



### 读取Web应用程序中某个文件的内容：getResourceAsStream()

如果想**读取Web应用程序中某个文件的内容**， 则可以使用 `getResourceAsStream()` 方法，使用时指定路径必须以“/”作为开头，表示相对于应用程序环境根目录，或者相对是WEB-INF/ib 中 JAR 文件里 META-INF/resources 的路径， 运行结果会返回 Inputstream 实例，接着可以运用它来读取文件内容。

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

为了取得 Web 应用程序中的文件串流，可以使用 HttpServlet 的 **`getServletContext()`** 取得 ServletContext 对象， 这个对象代表了目前这个Web应用程序可以使用 servletContext 的 **`getResourceAsStream()`** 方法以串流程序读取文件， 指定的路径要是相对于Web 应用程序环境根目录。为了不让浏览器直接请求 PDF 文件，在这里将 PDF 文件放在 WEB-INF 目录中。

然后通过 HttpServletResponse 的 **`getOutputStream()`** 来取得 servletOutputStream 对象。接下来就是 Java IO 的概念了，从PDF 读入字节数据，再用 ServletOutputStream 来对浏览器进行写出响应。



注意：使用相对路径指定时， 此时路径不是相对于Web应用程序根目录，而是相对于启动Web容器时的命令执行目录。



每个Web应用程序都有一个相对应的ServletContext， 针对“应用程序”初始化时需用到的一些参数， 可以在web.xml中设置应用程序初始参数， 结合ServletContext Listener来做。



[返回目录](#Servlet 进阶 API)

------



## 主动推送资源：PushBuilder

在浏览器要请求服务器时， 会经过握手协议(Handshaking) (en.wikipedia.org/wiki/Handshaking) 建立TCP联机， 默认情况下， 该次联机进行一次HTTP请求与响应， 然后关闭TCP联机。

因此， 浏览器在某次HTTP请求得到了一个HTML响应后， 若HTML中需要CSS文件，浏览器必须再度建立联机，发出HTTP请求取得CSS文件，然后联机关闭。若HTML中还需要有JavaScript，浏览器又要建立联机，发出HTTP请求得到响应之后关闭联机……此过程重复直到必要的资源下载完成，每次的请求响应都需要一条联机，在需要对网站效能进行优化、对用户接口的高响应性场合上，着实是很大的负担。

虽然HTTP 1.1支持管线化(Pipelining) ，可以在一次TCP联机中，多次对服务器端发出请求，不用等待服务器端响应。然而，服务器端必须按请求的顺序进行响应，如果有某个响应需时较久，之后的响应也就会被延迟，造成所谓HOL(Head of line) 阻塞的问题。

为了加快网页相关资源的下载，HTTP 2.0支持服务器推送(Server Push) ，也就是在一次的请求中，允许服务器端主动推送必要的CSS、JavaScript、图片等资源到浏览器，不用浏览器后续再对资源发出请求。Servlet 4.0规范中制订了对HTTP 2.0的支持，在服务器推送上，提供了Push Builder，让Servlet**在必要的时候可以主动推送资源**。例如：

```
@WebServlet("/push")
public class Push extends HttpServlet {
	private static final long serialVersionUID = lL;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,     	IOException {
	
		Optional.ofNullable(request.newPushBuilder())
        	.ifPresent(pushBuilder -> {
        		pushBuilder.path("avatar/caterpillar.jpg")
        			.addHeader("Content-Type", "image/jpg")
        			.push();
        });
        
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<body>");
        out.println("<img src='avatars/caterpillar.jpg'>");
        out.println("</body>");
        out.println("</html>");
        
	}

}
```

可以通过HttpServletRequest的 `newPushBuilder()` 取得PushBuilder实例， 如果HTTP 2. 0不可用（浏览器或服务器不支持的情况）， 那么  `newPushBuilder()`  会返回null，若能取得 PushBuilder，就可以使用 `path() 、addHeader()` 等方式， 加入主动推送的资源， 然后调用 `push()` 进行推送。

如果使用Tomcat 9， 要启用HTTP 2.0支持， 必须在加密联机中进行， 这可以在server.xml中设定Connector。

如果是在Eclipse中， 只要设定 ProjectExplorer 中Servers里的server.xml就可以了，但必须准备好凭证，找到server.xml中的这些批注：

```
<!-- Define a SSL/TLS HTTP/1.1 Connector on port 8443 with HTTP/2
	This connector uses the APR/native implementation which always usesOpenSSL for TLS.
	Either JSSE or OpenSSL style configuration may be used. OpenSsL style configuration is used below.
-->

<!--
<Connector port="8443" prot0col="org.apache.coyote.http11.Httpl1AprProtocol" maxThreads="150" 					SSLEnabled="true”>
    <UpgradeProtocol className="org.apache.coyote.http2.Http2Protocol"/>
    <SSLHostConfig>
        <Certificate certificateKeyFile="conf/localhost-rsa-key.pem"
        	certificateFile="conf/localhost-rsa-cert.pem"
    		certificateChainFile="conf/localhost-raa-chain.pem"
        	type="RSA"/>
    </SSLHostConfig>
</Connector>
-->
```

将 `<Connetor>` 的批注去除，设定好凭证相关信息，重新启动Tomcat，就可以用支持HTTP2.0的浏览器，请求`https://localhost:8443/ServletAPI/push` 测试看看是否可取得pushBuilder。

例如， 使用Chrome并开启“开发者工具”，可以在Network标签中看到主动推送的图片。

<img src="..\image\image-20201012122656977.png" alt="image-20201012122656977" style="zoom:80%;" />

提示：如果Server的控制台中显示没有APR/native链接库，那是因为Java执行环境的 java.library.path 中找不到链接库，解决的方式之一是将 Tomeat 文件夹的 bin/tcnative-1.dll 复制至正在使用的 JDK 的 bin 文件夹。



[返回目录](#Servlet 进阶 API)

------

