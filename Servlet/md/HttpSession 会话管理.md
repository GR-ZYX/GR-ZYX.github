# HttpSession 会话管理

[TOC]

## 使用 HttpSession

### 使用 getSession() 进行会话管理

在Servlet/JSP中， 如果想要进行会话管理， 可以使用 HttpServletRequest 的 `getSession()` 方法取得HttpSession对象。

```
HttpSession session = request.getSession();
```

 `getSession()` 方法有两个版本，另一个版本可以传入布尔值，默认是true，表示若尚卡存在HttpSession实例时，直接创建一个新的对象。若传入false， 且尚未存在 HttpSession 实例，则直接返回null。

HttpSession上常使用的方法是 `setAttribute()` 与 `getAttribute()` ， 可以在对象中设置及取得属性。

如果想在浏览器与Web应用程序的会话期间，保留请求之间的相关信息，可以使用 HttpSession 的 `setAttribute()` 方法将相关信息设置为属性。在会话期间，可以当作Web应用程序“记得”浏览器的信息，如果想取出这些信息，通过 HttpSession 的 `getAttribute()` 就可以取出。

以下范例从隐藏域方式改用 HttpSession 方式来实现会话管理。

```
@WebServlet("/questionnaire")

    private void page2(HttpServletRequest request, PrintWriter out) {
        String p1q1 = request.getParameter("p1q1");
        String p1q2 = request.getParameter("p1q2");

        request.getSession().setAttribute("p1ql", p1q1); // 改用 HttpSession 存储第一页答案
        request.getSession().setAttribute("p1q2", p1q2); // 改用 HttpSession 存储第一页答案

        out.println("问题三: <input type='text' name='p2q1'><br>");
        out.println("<input type='submit' name='page' value='finish'>");
        
    }
    
    private voidpage 3(HttpServletRequestrequest，PrintWriterout) {
    	out.println(request.getSession().getAttribute("p1q1") + "<br>"); // 改用 HttpSession 取得第一页答案
        out.println(request.getSession().getAttribute("p1q2") + "<br>"); // 改用 HttpSession 取得第一页答案
        out.println(request.getParameter("p2ql") + "<br>");
    }
```

程序改写时，分别利用HttpSession的 `setAttribute()` 来设置第一页的问卷答案，以及 `getAttribute()` 来取得第一页的问卷答案。

### 使用 invalidate() 注销 HttpSession

默认在关闭浏览器前，取得HttpSession都是相同的实例。如果想在此次会话期间，直接让目前的HttpSession失效，可以执行HttpSession的 `invalidate()` 方法。

一个使用的时机就是实现注销机制， 如以下的范例所示，首先是登录的Servlet实现。

```
@webServlet("/login")
public class Login extends HttpServlet {
	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws                       	ServletException, IOException {
    	
    	String name = request.getParameter("name");
        String passwd = request.getParameter("passwd");
        
        String page;
        if("caterpillar".equals(name) && "123456".equals(passwd)){
        	if(request.getSession(false) != null) {
        		 request.changeSessionId(); // 变更 SessionID
        	}
        	request.getSession().setAttribute("login", name); // 设定登录字符
        	page = "user";
        } else {
        	page = "login.html";
        	response.sendRedirect(page);
        }
    }
    
}
```

基于Web安全考虑， 建议在登录成功后改变Seission ID。想改变SessionID，可以通过Servlet3.1在HttpServletRequest上新增的`changeSessionId()` 来达到。



至于Servlet 3. 0或更早的版本，必须自行取出HttpSession中的属性， 令目前的HttpSession失效，然后取得HttpSession并设定属性例如自行撰写一个 `changeSessionId()` 方法：

```
private void changeSessionId(HttpServletRequest request) {
	HttpSession oldSession = request.getSession();
	
	Map<String, object> attrs = new HashMap<>();
	for(String name : Collections.list(oldSession.getAttributeNames() )) {
		attrs.put(name, oldSession.getAttribute(name));
	}
	
	oldSession.invalidate(); // 令目前的 Session 失效
	
	// 逐一设置属性
	HttpSession newSession = requent.getsession();
	for(String name : attra.keySet() ) {
		newSession.setAttribute(name, attrs.get(name));
	}
   
}
```



在登录成功之后，为了之后免于重复验证用户是否登录的麻烦，可以设定一个login属性，用以代表用户做完成登录的动作。其他的Servlet/JSP，如果可以从HttpSession取得login属性，则确定是个已登录的用户， 这类用来识别用户是否登录的属性，通常称为**登录令牌**(Login Token) 。

下面这个范例在登录成功之后，会转发至用户页面。

```
@WebServlet("/user")
public class User extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException,     	IOException {
	
		HttpSession session = request.getSession();
		Optional<Object> token = Optional.ofNullable(session.getAttribute("login"));
		if(token.is Present()) {
			 request.getRequestDispatcher("user.view")·forward(request, response); // 取得登录字符，转发用户页面
		} else {
			 response.sendRedirect("login.html"); // 无法取得登录字符、重新定向至登录页面
		}
	}
	
}
```

如果有浏览器请求用户页面， 程序先尝试取得HttpSession中的login属性， 如果可以取得login属性， 则转向用户页面。如果表示用户尚未登录，则要求浏览器重新定向至登录窗体。



若用户页面中有个可以执行注销的URI超链接：

```
out.println("<a href='logout'>注销</a>");
```

单击超链接后会请求一下Servlet：

```
@WebServlet("/logout")
public class Logout extends HttpServlet {
	@override
    protected void doGet(HttpServletRequest request, HttpservletResponse response) throws ServletException,     	IOException {
    	
    	// 使 HttpSession 失效
        request.getSession().invalidate();
        response.sendRedirect("login.html");
    }
    
}
```

执行HttpSession的 `invalidate()` 之后，容器就会销毁回收HttpSession对象，如果再次通过HttpServletRequest的 `getSession()` ，取得HttpSession就是另一个新对象了，这个新对象当然不会有先前的1ogin属性，所以再直接请求用户页面，就会因找不到1ogin属性，而复位向至登录页面。

注意：HttpSession 并非线程安全，多线程环境中必须注意属性设定时共享存取的问题。

提示：这里只是设计登录、注销的基本概念，用户的验证(Authentication) 、授权(Authorization)等流程实际上更为复杂，可以借助容器提供的机制，或者是第三方程式来实现。



[返回目录](#HttpSession 会话管理)

------



## HttpSession 会话管理原理

使用HttpSession进行会话管理十分方便，让Web应用程序看似可以“记得”浏览器发出的请求，连接数个请求间的关系。不过，Web应用程序基于HTTP协议的事实并没有改变，如何“得知”数个请求之间的关系，这项任务实际上是由Web容器来负责的。

尝试运行HttpServletRequest的 `getSession()` 时，Web容器会创建Httpsession对象，关键在于每个HttpSession对象都会有个特殊的ID， 称为SessionID，可以执行HttpSession的 `getId()` 来取得SessionID。这个SessionID默认会使用Cookie存放在浏览器中， Cookie的名称是JSESSIONID，数值则是 `getId()` 取得的SessionID。

![image-20201010181850581](..\image\image-20201010181850581.png)

由于Web容器本身是执行于JVM中的一个Java程序，通过 `getSession()` 取得HttpSession，是Web容器中的一个Java对象， HttpSession中存放的属性，自然也就存放于Web应用程序的Web容器之中。每个HttpSession各有特殊的SessionID， 当浏览器请求应用程序时，会将Cookie中存放的SessionID一并发送给应用程序，Web容器会根据SessionID来找出对应的HttpSession对象， 这样就可以取得各浏览器个别的会话数据。

![image-20201010182033563](..\image\image-20201010182033563.png)

使用HttpSession来进行会话管理时，设定为属性的对象存储在Web应用程序，而Session ID默认使用Cookie存放于浏览器端，Web容器存储SessionID的Cookie“默认”为关闭浏览器就失效，因此重新启动浏览器请求应用程序时，通过 `getSession()` 取得的是新的HttpSession对象。

### 使 HttpSession 失效

每次请求来到应用程序时，容器会根据发送过来的Session ID取得对应的HttpSession。由于HttpSession对象会古用内存空间，所以HttpSession的属性中尽量不要存储耗资源的大型对象，必要时将属性移除，或者不需使用HttpSession时，执行 `invalidate()` 让HttpSession失效。

注意：默认关闭浏览器会马上失效的是浏览器上的Cookie， 不是HttpSession。因为Cookie失效了，就无法通过Cookie来发送Session ID，所以尝试 `getSession()` 时，容器会产生新的HttpSession。要让HttpSession立即失效必须运行 `invalidate()` 方法， 否则HttpSession会等到设定的失效期间过后，才会被容器销毁回收。

可以执行HttpSession的 `setMaxInactiveInterval()` 方法， 设定浏览器多久没有请求应用程序的话，HttpSession就自动失效， 设定的单位是“秒”。也可以在web.xml中设定HttpSession默认的失效时间，但要特别注意：此时设定的时间单位是“分钟”。

例如：

```
</web-app>
	略...
	<session-config>
		<!-30分钟-->
		<session-timeout>30</session-timeout>
	</session-config>
</web-app>
```

执行HttpSession的  `setMaxInactiveInterval()`  方法， 设定的是HttpSession对象在浏览器多久没活动就失效的时间， 而不是存储Session ID的Cookie失效时间。存储SessionID的Cookie默认为关闭浏览器就失效，而且仅用于存储SessionID。这意味着， 其他关闭浏览器后仍希望存储的信息，必须操作Cookie来达成。



### 设定存储 Session ID 的 Cookie 相关信息

在Servlet 3.0中新增了 **SessionCookieConfig** 接口，可以通过 **ServletContext** 的 `getSessionCookieConfig()` 来取得实现该接口的对象， 要取得 ServletContext 可以通过Servlet实例的 `getServletContext()` 来取得 。

通过 **SessionCookieConfig** 实现对象， 可以设定存储Session ID的Cookie相关信息，例如可以通过 `setName()` 将默认的Session ID名称修改为别的名称， 通过 `setAge()` 设定存储Session ID的Cookie存活期限等，单位是“秒”。

要注意的是， 设定 **SessionCookieConfig** 必须在 **ServletContext** 初始化之前， 因此要修改Session ID、存储Session ID的Cookie存活期限等信息时， 有一个方法是在 web.xml 中设定。

例如：

```
</web-app>
	...
	<session-config>
		<!--30分钟-->
   		<session-timeout>30</session-timeout>
   		
   		<cookie-config>
            <name>yourJsessionid</name>
        	<secure>true</secure>            <!-- 只在加密联机中传送 -->
        	<http-only>true</http-only>      <!-- 不可被JavaSecript读取 -->
        	<max-age>1800</max-age>          <!-- 1800秒，不建议 -->
    	</cookie-config>
    </session-config>
</web-app>
```



另一个方法是实现 **ServletContextListener** 容器在初始化 **ServletContext** 时会调用 **SereletContextListener** 的 `contextInitialized()` 方法， 可以在其中取得 **ServletContext** 进行 **SessionCookieConfig** 设定。

在Servlet4.0中， HttpSession默认失效时间，也可以通过ServletContext的 **setSessionTimeout()** 来设定。



[返回目录](#HttpSession 会话管理)

------



## HttpSession 与 URL 重写

HttpSession默认使用Cookie存储SessionID，如果用户关掉浏览器接收Cookie的功能，就无法使用Cookie在浏览器存储Session ID。

如果在用户禁用Cookie的情况下，仍打算运用HttpSession来进行会话管理， 那么可以搭配URI重写，向浏览器响应一段超链接，超链接URI后附加Session ID， 当用户单击超链接，将Session ID以GET请求发送给Web应用程序。

如果要使用URI重写的方式来发送Session ID， 可以使用 HttpServletResponse 的 `encodeURL()` 协助产生URI重写。当容器尝试取得HttpSession实例时， 若能从HTTP请求中取得带有Session ID的Cookie，`encodeURL()` 会将传入的URI原封不动地输出。如果容器尝试取得HttpSession实例时， 无法从HTTP请求中取得带有SessionID的Cookie（通常是浏览器禁用Cookie的情况） ，`encodeURL()` 会自动产生带有Session ID的URI重写。

例如：

```
@WebServlet("/counter")
public class Counter extends HttpServlet {
	 @override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, 		IOExCeption {
		
		response.setContentType("text/html; charset=UTF-8");
        
        Integer count = Optional.ofNullable(request.getSession().getAttribute("count")
        	).map(attr->(Integer)attr+1).orElse(0);
        	
        request.getSession().setAttribute("count", count);
        
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<metacharset='UTF-8'>");
        out.println("</head>");
        out.println("<body>");
        out.println(“<h1>"Servlet Count " + count + "</hl>");
        out.printf("<a href='%s'>递增</a>%n", response.encodeURL("counter")); // 使用encodeURL()
        out.println("</body>");
        out.println("</html>");
	}
	
}
```

这个程序会显示一个超链接， 如果单击超链接，会访问同一个URI，在关闭浏览器前，每次单击超链接都会使数字递增。如果浏览器没有禁用Cookie， 则 `encodeURL()` 产生的超链接就是原本的 count，如果浏览器禁用Cookie， 会生成带有Session ID的超链接， 单击超链接后，会在地址栏看到Session ID信息，如图所示。

![image-20201010190356895](..\image\image-20201010190356895.png)

如果不使用 `encodeURL()` 来产生超链接的URI， 在浏览器禁用Cookie的情况下，这个程序将会失效，也就是重复单击递增链接，计数也不会递增。

当再次请求时， 如果浏览器没有禁用 Cookie， 容器可以从Cookie（从Cookie标头）取得Session ID，则 `encodeURL()` 就只会输出index.jsp。如果浏览器禁用 Cookie， 由于无法从Cookie中取得Session ID， 此时 `encodeURL()` 会在URI编上 Session ID。

总而言之，当容器尝试取得HttpSession对象时， 无法从Cookie中取得Session ID，使用 `encode URL()` 就会产生有Session ID的URI， 以便于下次单击超链接时再次发送Session ID。

另一个 **HttpServletResponse** 上的 `encodeRedirectURL()` 方法， 可以为指定的复位向URI编上 Session ID。

注意：虽然用户为了隐私权等原因而禁用Cookie，然而，在URI上直接出现Session ID，反而会有安全上的隐忧，像是使得有心人士在指定特定Session ID变得容易，而造成Session固定攻击（Session Fixation）的可能性提高，或者在从目前网址链接至另一网址时、因为HTTP的Referer标头而泄漏了 Session ID。



[返回目录](#HttpSession 会话管理)

------

